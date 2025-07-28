// API Configuration
export const API_CONFIG = {
  // Base URL for all API calls
  BASE_URL: 'http://localhost:5000/api',
  
  // Authentication endpoints
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    VERIFY: '/auth/verify'
  },
  
  // Product management endpoints
  PRODUCTS: {
    BASE: '/products',
    BY_ID: (id) => `/products/${id}`,
    SEARCH: '/products/search',
    CATEGORY: (categoryId) => `/products/category/${categoryId}`,
    BRAND: (brandId) => `/products/brand/${brandId}`
  },
  
  // Category management endpoints
  CATEGORIES: {
    BASE: '/categories',
    BY_ID: (id) => `/categories/${id}`,
    SUB_CATEGORIES: (categoryId) => `/categories/${categoryId}/subcategories`
  },
  
  // Sub-category management endpoints
  SUB_CATEGORIES: {
    BASE: '/subcategories',
    BY_ID: (id) => `/subcategories/${id}`,
    BY_CATEGORY: (categoryId) => `/subcategories/category/${categoryId}`
  },
  
  // Brand management endpoints
  BRANDS: {
    BASE: '/brands',
    BY_ID: (id) => `/brands/${id}`,
    PRODUCTS: (brandId) => `/brands/${brandId}/products`
  },
  
  // Size management endpoints
  SIZES: {
    BASE: '/sizes',
    BY_ID: (id) => `/sizes/${id}`,
    PRODUCTS: (sizeId) => `/sizes/${sizeId}/products`
  },
  
  // Color management endpoints
  COLORS: {
    BASE: '/colors',
    BY_ID: (id) => `/colors/${id}`,
    PRODUCTS: (colorId) => `/colors/${colorId}/products`
  },
  
  // Age group management endpoints
  AGE_GROUPS: {
    BASE: '/age-groups',
    BY_ID: (id) => `/age-groups/${id}`,
    PRODUCTS: (ageGroupId) => `/age-groups/${ageGroupId}/products`
  },
  
  // Banner management endpoints
  BANNERS: {
    BASE: '/banners',
    BY_ID: (id) => `/banners/${id}`,
    ACTIVE: '/banners/active',
    UPLOAD: '/banners/upload'
  },
  
  // Discount management endpoints
  DISCOUNTS: {
    BASE: '/discounts',
    BY_ID: (id) => `/discounts/${id}`,
    ACTIVE: '/discounts/active',
    APPLY: '/discounts/apply'
  },
  
  // Customer management endpoints
  CUSTOMERS: {
    BASE: '/customers',
    BY_ID: (id) => `/customers/${id}`,
    ORDERS: (customerId) => `/customers/${customerId}/orders`,
    SEARCH: '/customers/search'
  },
  
  // Order management endpoints
  ORDERS: {
    BASE: '/orders',
    BY_ID: (id) => `/orders/${id}`,
    BY_CUSTOMER: (customerId) => `/orders/customer/${customerId}`,
    STATUS: (orderId) => `/orders/${orderId}/status`,
    TRACKING: (orderId) => `/orders/${orderId}/tracking`
  },
  
  // File upload endpoints
  UPLOADS: {
    IMAGES: '/uploads/images',
    PRODUCTS: '/uploads/products',
    BANNERS: '/uploads/banners',
    CATEGORIES: '/uploads/categories'
  },
  
  // Dashboard and analytics endpoints
  DASHBOARD: {
    STATS: '/dashboard/stats',
    SALES: '/dashboard/sales',
    ORDERS: '/dashboard/orders',
    PRODUCTS: '/dashboard/products',
    CUSTOMERS: '/dashboard/customers'
  }
};

// Helper function to build full API URL
export const buildApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Environment-based configuration
export const getApiConfig = () => {
  const environment = process.env.NODE_ENV || 'development';
  
  const configs = {
    development: {
      BASE_URL: 'http://localhost:5000/api',
      TIMEOUT: 10000
    },
    production: {
      BASE_URL: 'https://your-production-api.com/api',
      TIMEOUT: 15000
    },
    staging: {
      BASE_URL: 'https://your-staging-api.com/api',
      TIMEOUT: 12000
    }
  };
  
  return configs[environment] || configs.development;
};

export default API_CONFIG; 