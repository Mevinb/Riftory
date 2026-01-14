const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import the Product model
const Product = require('./models/Item');

// Simple CSV parser
function parseCSV(csvContent) {
    const lines = csvContent.split('\n');
    const headers = parseCSVLine(lines[0]);
    const products = [];

    for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim() === '') continue;
        
        try {
            const values = parseCSVLine(lines[i]);
            const product = {};
            
            headers.forEach((header, index) => {
                product[header] = values[index] || '';
            });
            
            products.push(product);
        } catch (error) {
            console.log(`Skipping line ${i + 1}: ${error.message}`);
        }
    }

    return products;
}

// Parse a single CSV line handling quoted values
function parseCSVLine(line) {
    const values = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
            if (inQuotes && line[i + 1] === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            values.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    
    values.push(current.trim());
    return values;
}

// Parse price value
function parsePrice(priceStr) {
    if (!priceStr || priceStr === 'null' || priceStr === '') return 0;
    // Remove quotes and currency symbols
    const cleaned = priceStr.replace(/["""$£€]/g, '').trim();
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
}

// Parse categories array from string
function parseCategories(catStr) {
    if (!catStr || catStr === 'null') return [];
    try {
        // Try parsing as JSON array
        const parsed = JSON.parse(catStr.replace(/'/g, '"'));
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

// Parse features array from string
function parseFeatures(featStr) {
    if (!featStr || featStr === 'null' || featStr === '[]') return [];
    try {
        const parsed = JSON.parse(featStr.replace(/'/g, '"'));
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

// Parse images array from string
function parseImages(imgStr) {
    if (!imgStr || imgStr === 'null' || imgStr === '[]') return [];
    try {
        const parsed = JSON.parse(imgStr.replace(/'/g, '"'));
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

// Determine rarity based on price and rating
function determineRarity(price, rating, reviews) {
    if (price > 200 || (rating >= 4.7 && reviews > 1000)) return 'rare';
    if (price > 50 || (rating >= 4.3 && reviews > 500)) return 'uncommon';
    return 'common';
}

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Read CSV file
        const csvPath = path.join(__dirname, '..', 'amazon-products.csv');
        console.log(`Reading CSV from: ${csvPath}`);
        
        const csvContent = fs.readFileSync(csvPath, 'utf-8');
        const rawProducts = parseCSV(csvContent);
        console.log(`Parsed ${rawProducts.length} products from CSV`);

        // Clear existing products
        await Product.deleteMany({});
        console.log('Cleared existing products');

        // Transform products to match our schema
        const products = rawProducts.map((raw, index) => {
            const initialPrice = parsePrice(raw.initial_price);
            const finalPrice = parsePrice(raw.final_price);
            const rating = parseFloat(raw.rating) || 0;
            const reviewsCount = parseInt(raw.reviews_count) || 0;
            const categories = parseCategories(raw.categories);

            return {
                title: raw.title || `Product ${index + 1}`,
                name: raw.title || `Product ${index + 1}`,
                description: raw.description || '',
                brand: raw.brand || '',
                
                initial_price: initialPrice,
                final_price: finalPrice || initialPrice,
                currency: raw.currency || 'USD',
                discount: raw.discount || '',
                
                availability: raw.availability || 'In Stock',
                
                imageUrl: raw.image_url || '',
                image_url: raw.image_url || '',
                images: parseImages(raw.images),
                
                category: categories[0] || '',
                categories: categories,
                
                seller_name: raw.seller_name || 'Unknown',
                seller_id: raw.seller_id || '',
                
                asin: raw.asin || '',
                model_number: raw.model_number || '',
                manufacturer: raw.manufacturer || '',
                
                rating: rating,
                reviews_count: reviewsCount,
                top_review: raw.top_review || '',
                
                features: parseFeatures(raw.features),
                product_dimensions: raw.product_dimensions || '',
                item_weight: raw.item_weight || '',
                
                url: raw.url || '',
                
                department: raw.department || '',
                date_first_available: raw.date_first_available || '',
                
                isUpsideDown: false,
                rarity: determineRarity(finalPrice || initialPrice, rating, reviewsCount),
                
                amazon_choice: raw.amazon_choice === 'true' || raw.amazon_choice === true,
                badge: raw.badge || '',
                bought_past_month: parseInt(raw.bought_past_month) || 0
            };
        });

        // Insert products in batches
        const batchSize = 50;
        let inserted = 0;
        
        for (let i = 0; i < products.length; i += batchSize) {
            const batch = products.slice(i, i + batchSize);
            await Product.insertMany(batch, { ordered: false });
            inserted += batch.length;
            console.log(`Inserted ${inserted}/${products.length} products...`);
        }

        console.log('\n✅ Database seeded successfully!');
        console.log(`\nTotal products added: ${products.length}`);
        
        // Show sample products
        console.log('\nSample products:');
        products.slice(0, 5).forEach(p => {
            const price = p.final_price || p.initial_price;
            console.log(`  - ${p.title.substring(0, 50)}... ($${price.toFixed(2)}) ⭐${p.rating}`);
        });

        // Count by category
        const categoryCounts = {};
        products.forEach(p => {
            const cat = p.category || 'Uncategorized';
            categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
        });
        
        console.log('\nProducts by category:');
        Object.entries(categoryCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .forEach(([cat, count]) => {
                console.log(`  - ${cat}: ${count}`);
            });

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
