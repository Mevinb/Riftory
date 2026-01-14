/**
 * API Service for connecting frontend to MongoDB backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  seller: {
    name: string;
    type: 'artisan' | 'alchemist' | 'blacksmith' | 'collector' | 'unknown';
  };
  tags: string[];
  isUpsideDown?: boolean;
  rarity?: 'common' | 'uncommon' | 'rare' | 'forbidden';
  warning?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ApiResponse<T> {
  success: boolean;
  count?: number;
  data: T;
  error?: string;
}

/**
 * Fetch all products from the database
 */
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    const result: ApiResponse<Product[]> = await response.json();
    
    if (result.success) {
      return result.data;
    }
    throw new Error(result.error || 'Failed to fetch products');
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Fetch normal marketplace products
 */
export const fetchNormalProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/normal`);
    const result: ApiResponse<Product[]> = await response.json();
    
    if (result.success) {
      return result.data;
    }
    throw new Error(result.error || 'Failed to fetch normal products');
  } catch (error) {
    console.error('Error fetching normal products:', error);
    throw error;
  }
};

/**
 * Fetch black market (upside down) products
 */
export const fetchBlackMarketProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/blackmarket`);
    const result: ApiResponse<Product[]> = await response.json();
    
    if (result.success) {
      return result.data;
    }
    throw new Error(result.error || 'Failed to fetch black market products');
  } catch (error) {
    console.error('Error fetching black market products:', error);
    throw error;
  }
};

/**
 * Fetch a single product by ID
 */
export const fetchProductById = async (id: string): Promise<Product> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    const result: ApiResponse<Product> = await response.json();
    
    if (result.success) {
      return result.data;
    }
    throw new Error(result.error || 'Failed to fetch product');
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

/**
 * Create a new product
 */
export const createProduct = async (product: Omit<Product, '_id'>): Promise<Product> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    const result: ApiResponse<Product> = await response.json();
    
    if (result.success) {
      return result.data;
    }
    throw new Error(result.error || 'Failed to create product');
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

/**
 * Update an existing product
 */
export const updateProduct = async (id: string, product: Partial<Product>): Promise<Product> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    const result: ApiResponse<Product> = await response.json();
    
    if (result.success) {
      return result.data;
    }
    throw new Error(result.error || 'Failed to update product');
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

/**
 * Delete a product
 */
export const deleteProduct = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
    });
    const result: ApiResponse<{}> = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to delete product');
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

/**
 * Fetch products by category
 */
export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products?category=${encodeURIComponent(category)}`);
    const result: ApiResponse<Product[]> = await response.json();
    
    if (result.success) {
      return result.data;
    }
    throw new Error(result.error || 'Failed to fetch products by category');
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

/**
 * Fetch products by rarity
 */
export const fetchProductsByRarity = async (rarity: string): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products?rarity=${encodeURIComponent(rarity)}`);
    const result: ApiResponse<Product[]> = await response.json();
    
    if (result.success) {
      return result.data;
    }
    throw new Error(result.error || 'Failed to fetch products by rarity');
  } catch (error) {
    console.error('Error fetching products by rarity:', error);
    throw error;
  }
};
