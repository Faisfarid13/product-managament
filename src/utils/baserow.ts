import { getBaserowToken } from './auth';
import { Product } from '../types/product';

const BASEROW_DATABASE_ID = '187599';
const BASEROW_API_TOKEN = 'pzAac4xOx4OgbZi4yF7Q1tHTibgBDQbf';
const TABLE_ID = '455976';
const BASE_URL = 'https://api.baserow.io/api/database/rows/table';

export const baserowApi = {
  async getProducts(): Promise<Product[]> {
    const token = getBaserowToken();
    if (!token) {
      throw new Error('User not authenticated');
    }

    const response = await fetch(`${BASE_URL}/${TABLE_ID}/?user_field_names=true`, {
      headers: {
        'Authorization': `Token ${BASEROW_API_TOKEN}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    const data = await response.json();
    return data.results;
  },

  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    const token = getBaserowToken();
    if (!token) {
      throw new Error('User not authenticated');
    }

    const response = await fetch(`${BASE_URL}/${TABLE_ID}/?user_field_names=true`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${BASEROW_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create product');
    }
    
    return response.json();
  },

  async updateProduct(id: number, product: Partial<Product>): Promise<Product> {
    const token = getBaserowToken();
    if (!token) {
      throw new Error('User not authenticated');
    }

    const response = await fetch(`${BASE_URL}/${TABLE_ID}/${id}/?user_field_names=true`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Token ${BASEROW_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'name': product.name,
        'price': product.price,
        'description': product.description,
        'stock': product.stock,
      }),
    });

    console.log(product);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to update product: ${errorData.detail}`);
    }
    
    return response.json();
  },

  async deleteProduct(id: number): Promise<void> {
    const token = getBaserowToken();
    if (!token) {
      throw new Error('User not authenticated');
    }

    const response = await fetch(`${BASE_URL}/${TABLE_ID}/${id}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${BASEROW_API_TOKEN}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
  },
};
