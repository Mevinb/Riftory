const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    // Basic product info
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true
    },
    name: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    brand: {
        type: String,
        trim: true
    },
    
    // Pricing
    initial_price: {
        type: Number,
        default: 0
    },
    final_price: {
        type: Number,
        default: 0
    },
    currency: {
        type: String,
        default: 'USD'
    },
    discount: {
        type: String,
        default: ''
    },
    
    // Availability & stock
    availability: {
        type: String,
        default: 'In Stock'
    },
    
    // Images
    imageUrl: {
        type: String,
        default: ''
    },
    image_url: {
        type: String,
        default: ''
    },
    images: [{
        type: String
    }],
    
    // Categories & classification
    category: {
        type: String,
        trim: true
    },
    categories: [{
        type: String
    }],
    
    // Seller info
    seller_name: {
        type: String,
        default: 'Unknown'
    },
    seller_id: {
        type: String,
        default: ''
    },
    
    // Product identifiers
    asin: {
        type: String,
        default: ''
    },
    model_number: {
        type: String,
        default: ''
    },
    manufacturer: {
        type: String,
        default: ''
    },
    
    // Reviews & ratings
    rating: {
        type: Number,
        default: 0
    },
    reviews_count: {
        type: Number,
        default: 0
    },
    top_review: {
        type: String,
        default: ''
    },
    
    // Product details
    features: [{
        type: String
    }],
    product_dimensions: {
        type: String,
        default: ''
    },
    item_weight: {
        type: String,
        default: ''
    },
    
    // URLs
    url: {
        type: String,
        default: ''
    },
    
    // Additional fields
    department: {
        type: String,
        default: ''
    },
    date_first_available: {
        type: String,
        default: ''
    },
    
    // For marketplace categorization (normal vs upside down)
    isUpsideDown: {
        type: Boolean,
        default: false
    },
    rarity: {
        type: String,
        enum: ['common', 'uncommon', 'rare', 'forbidden'],
        default: 'common'
    },
    
    // Amazon specific
    amazon_choice: {
        type: Boolean,
        default: false
    },
    badge: {
        type: String,
        default: ''
    },
    bought_past_month: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Virtual for backwards compatibility with 'name' field
productSchema.virtual('displayName').get(function() {
    return this.name || this.title;
});

// Virtual for price (use final_price or initial_price)
productSchema.virtual('price').get(function() {
    return this.final_price || this.initial_price || 0;
});

module.exports = mongoose.model('Product', productSchema);
