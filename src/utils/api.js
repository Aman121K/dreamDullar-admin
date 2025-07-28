import API_CONFIG, { buildApiUrl, getApiConfig } from '../config/apiConfig';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

// Helper function to check if user is authenticated
export const isAuthenticated = () => {
  const token = getAuthToken();
  return token && localStorage.getItem("isAuthenticated") === "true";
};

// Helper function to get default headers with auth token
const getHeaders = (customHeaders = {}) => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...customHeaders
  };
};

// Generic API call function
export const apiCall = async (endpoint, options = {}) => {
  const config = getApiConfig();
  const url = buildApiUrl(endpoint);
  
  const requestConfig = {
    headers: getHeaders(options.headers),
    timeout: config.TIMEOUT,
    ...options
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.TIMEOUT);

    const response = await fetch(url, {
      ...requestConfig,
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    
    // If response is 401 (Unauthorized), clear auth and redirect to login
    if (response.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");
      window.location.href = "/login";
      return;
    }

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }
    
    return data;
  } catch (error) {
    console.error('API call failed:', error);
    if (error.name === 'AbortError') {
      throw new Error('Request timeout. Please try again.');
    }
    throw error;
  }
};

// Specific API functions
export const api = {
  // Authentication
  auth: {
    login: (credentials) => apiCall(API_CONFIG.AUTH.LOGIN, {
      method: 'POST',
      body: JSON.stringify(credentials)
    }),
    logout: () => apiCall(API_CONFIG.AUTH.LOGOUT, {
      method: 'POST'
    }),
    refresh: () => apiCall(API_CONFIG.AUTH.REFRESH, {
      method: 'POST'
    }),
    verify: () => apiCall(API_CONFIG.AUTH.VERIFY, {
      method: 'GET'
    })
  },

  // Products
  products: {
    getAll: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return apiCall(`${API_CONFIG.PRODUCTS.BASE}${queryString ? `?${queryString}` : ''}`);
    },
    getById: (id) => apiCall(API_CONFIG.PRODUCTS.BY_ID(id)),
    create: (product) => apiCall(API_CONFIG.PRODUCTS.BASE, {
      method: 'POST',
      body: JSON.stringify(product)
    }),
    update: (id, product) => apiCall(API_CONFIG.PRODUCTS.BY_ID(id), {
      method: 'PUT',
      body: JSON.stringify(product)
    }),
    delete: (id) => apiCall(API_CONFIG.PRODUCTS.BY_ID(id), {
      method: 'DELETE'
    }),
    search: (query) => apiCall(`${API_CONFIG.PRODUCTS.SEARCH}?q=${encodeURIComponent(query)}`),
    getByCategory: (categoryId) => apiCall(API_CONFIG.PRODUCTS.CATEGORY(categoryId)),
    getByBrand: (brandId) => apiCall(API_CONFIG.PRODUCTS.BRAND(brandId))
  },

  // Categories
  categories: {
    getAll: () => apiCall(API_CONFIG.CATEGORIES.BASE),
    getById: (id) => apiCall(API_CONFIG.CATEGORIES.BY_ID(id)),
    create: (category) => apiCall(API_CONFIG.CATEGORIES.BASE, {
      method: 'POST',
      body: JSON.stringify(category)
    }),
    update: (id, category) => apiCall(API_CONFIG.CATEGORIES.BY_ID(id), {
      method: 'PUT',
      body: JSON.stringify(category)
    }),
    delete: (id) => apiCall(API_CONFIG.CATEGORIES.BY_ID(id), {
      method: 'DELETE'
    }),
    getSubCategories: (categoryId) => apiCall(API_CONFIG.CATEGORIES.SUB_CATEGORIES(categoryId))
  },

  // Sub Categories
  subCategories: {
    getAll: () => apiCall(API_CONFIG.SUB_CATEGORIES.BASE),
    getById: (id) => apiCall(API_CONFIG.SUB_CATEGORIES.BY_ID(id)),
    create: (subCategory) => apiCall(API_CONFIG.SUB_CATEGORIES.BASE, {
      method: 'POST',
      body: JSON.stringify(subCategory)
    }),
    update: (id, subCategory) => apiCall(API_CONFIG.SUB_CATEGORIES.BY_ID(id), {
      method: 'PUT',
      body: JSON.stringify(subCategory)
    }),
    delete: (id) => apiCall(API_CONFIG.SUB_CATEGORIES.BY_ID(id), {
      method: 'DELETE'
    }),
    getByCategory: (categoryId) => apiCall(API_CONFIG.SUB_CATEGORIES.BY_CATEGORY(categoryId))
  },

  // Brands
  brands: {
    getAll: () => apiCall(API_CONFIG.BRANDS.BASE),
    getById: (id) => apiCall(API_CONFIG.BRANDS.BY_ID(id)),
    create: (brand) => apiCall(API_CONFIG.BRANDS.BASE, {
      method: 'POST',
      body: JSON.stringify(brand)
    }),
    update: (id, brand) => apiCall(API_CONFIG.BRANDS.BY_ID(id), {
      method: 'PUT',
      body: JSON.stringify(brand)
    }),
    delete: (id) => apiCall(API_CONFIG.BRANDS.BY_ID(id), {
      method: 'DELETE'
    }),
    getProducts: (brandId) => apiCall(API_CONFIG.BRANDS.PRODUCTS(brandId))
  },

  // Sizes
  sizes: {
    getAll: () => apiCall(API_CONFIG.SIZES.BASE),
    getById: (id) => apiCall(API_CONFIG.SIZES.BY_ID(id)),
    create: (size) => apiCall(API_CONFIG.SIZES.BASE, {
      method: 'POST',
      body: JSON.stringify(size)
    }),
    update: (id, size) => apiCall(API_CONFIG.SIZES.BY_ID(id), {
      method: 'PUT',
      body: JSON.stringify(size)
    }),
    delete: (id) => apiCall(API_CONFIG.SIZES.BY_ID(id), {
      method: 'DELETE'
    }),
    getProducts: (sizeId) => apiCall(API_CONFIG.SIZES.PRODUCTS(sizeId))
  },

  // Colors
  colors: {
    getAll: () => apiCall(API_CONFIG.COLORS.BASE),
    getById: (id) => apiCall(API_CONFIG.COLORS.BY_ID(id)),
    create: (color) => apiCall(API_CONFIG.COLORS.BASE, {
      method: 'POST',
      body: JSON.stringify(color)
    }),
    update: (id, color) => apiCall(API_CONFIG.COLORS.BY_ID(id), {
      method: 'PUT',
      body: JSON.stringify(color)
    }),
    delete: (id) => apiCall(API_CONFIG.COLORS.BY_ID(id), {
      method: 'DELETE'
    }),
    getProducts: (colorId) => apiCall(API_CONFIG.COLORS.PRODUCTS(colorId))
  },

  // Age Groups
  ageGroups: {
    getAll: () => apiCall(API_CONFIG.AGE_GROUPS.BASE),
    getById: (id) => apiCall(API_CONFIG.AGE_GROUPS.BY_ID(id)),
    create: (ageGroup) => apiCall(API_CONFIG.AGE_GROUPS.BASE, {
      method: 'POST',
      body: JSON.stringify(ageGroup)
    }),
    update: (id, ageGroup) => apiCall(API_CONFIG.AGE_GROUPS.BY_ID(id), {
      method: 'PUT',
      body: JSON.stringify(ageGroup)
    }),
    delete: (id) => apiCall(API_CONFIG.AGE_GROUPS.BY_ID(id), {
      method: 'DELETE'
    }),
    getProducts: (ageGroupId) => apiCall(API_CONFIG.AGE_GROUPS.PRODUCTS(ageGroupId))
  },

  // Banners
  banners: {
    getAll: () => apiCall(API_CONFIG.BANNERS.BASE),
    getById: (id) => apiCall(API_CONFIG.BANNERS.BY_ID(id)),
    create: (banner) => apiCall(API_CONFIG.BANNERS.BASE, {
      method: 'POST',
      body: JSON.stringify(banner)
    }),
    update: (id, banner) => apiCall(API_CONFIG.BANNERS.BY_ID(id), {
      method: 'PUT',
      body: JSON.stringify(banner)
    }),
    delete: (id) => apiCall(API_CONFIG.BANNERS.BY_ID(id), {
      method: 'DELETE'
    }),
    getActive: () => apiCall(API_CONFIG.BANNERS.ACTIVE),
    upload: (formData) => apiCall(API_CONFIG.BANNERS.UPLOAD, {
      method: 'POST',
      body: formData,
      headers: {} // Let browser set Content-Type for FormData
    })
  },

  // Discounts
  discounts: {
    getAll: () => apiCall(API_CONFIG.DISCOUNTS.BASE),
    getById: (id) => apiCall(API_CONFIG.DISCOUNTS.BY_ID(id)),
    create: (discount) => apiCall(API_CONFIG.DISCOUNTS.BASE, {
      method: 'POST',
      body: JSON.stringify(discount)
    }),
    update: (id, discount) => apiCall(API_CONFIG.DISCOUNTS.BY_ID(id), {
      method: 'PUT',
      body: JSON.stringify(discount)
    }),
    delete: (id) => apiCall(API_CONFIG.DISCOUNTS.BY_ID(id), {
      method: 'DELETE'
    }),
    getActive: () => apiCall(API_CONFIG.DISCOUNTS.ACTIVE),
    apply: (discountData) => apiCall(API_CONFIG.DISCOUNTS.APPLY, {
      method: 'POST',
      body: JSON.stringify(discountData)
    })
  },

  // Customers
  customers: {
    getAll: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return apiCall(`${API_CONFIG.CUSTOMERS.BASE}${queryString ? `?${queryString}` : ''}`);
    },
    getById: (id) => apiCall(API_CONFIG.CUSTOMERS.BY_ID(id)),
    search: (query) => apiCall(`${API_CONFIG.CUSTOMERS.SEARCH}?q=${encodeURIComponent(query)}`),
    getOrders: (customerId) => apiCall(API_CONFIG.CUSTOMERS.ORDERS(customerId))
  },

  // Orders
  orders: {
    getAll: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return apiCall(`${API_CONFIG.ORDERS.BASE}${queryString ? `?${queryString}` : ''}`);
    },
    getById: (id) => apiCall(API_CONFIG.ORDERS.BY_ID(id)),
    getByCustomer: (customerId) => apiCall(API_CONFIG.ORDERS.BY_CUSTOMER(customerId)),
    updateStatus: (orderId, status) => apiCall(API_CONFIG.ORDERS.STATUS(orderId), {
      method: 'PUT',
      body: JSON.stringify({ status })
    }),
    getTracking: (orderId) => apiCall(API_CONFIG.ORDERS.TRACKING(orderId))
  },

  // File Uploads
  uploads: {
    image: (formData) => apiCall(API_CONFIG.UPLOADS.IMAGES, {
      method: 'POST',
      body: formData,
      headers: {} // Let browser set Content-Type for FormData
    }),
    productImage: (formData) => apiCall(API_CONFIG.UPLOADS.PRODUCTS, {
      method: 'POST',
      body: formData,
      headers: {}
    }),
    bannerImage: (formData) => apiCall(API_CONFIG.UPLOADS.BANNERS, {
      method: 'POST',
      body: formData,
      headers: {}
    }),
    categoryImage: (formData) => apiCall(API_CONFIG.UPLOADS.CATEGORIES, {
      method: 'POST',
      body: formData,
      headers: {}
    })
  },

  // Dashboard
  dashboard: {
    getStats: () => apiCall(API_CONFIG.DASHBOARD.STATS),
    getSales: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return apiCall(`${API_CONFIG.DASHBOARD.SALES}${queryString ? `?${queryString}` : ''}`);
    },
    getOrders: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return apiCall(`${API_CONFIG.DASHBOARD.ORDERS}${queryString ? `?${queryString}` : ''}`);
    },
    getProducts: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return apiCall(`${API_CONFIG.DASHBOARD.PRODUCTS}${queryString ? `?${queryString}` : ''}`);
    },
    getCustomers: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return apiCall(`${API_CONFIG.DASHBOARD.CUSTOMERS}${queryString ? `?${queryString}` : ''}`);
    }
  }
};

export default api; 