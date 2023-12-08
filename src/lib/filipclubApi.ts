import { api, baseApiURL } from '../app/api';
import { productServiceType } from '../types/types';

/**
 * Check if health is ok
 * @param
 * @returns true/false
 */

export const checkHealth = async (token: string) => {
  try {
    const response = await api.get(`${baseApiURL}/api/health`, {
      headers: {
        // 'x-request-accesskey': token,
        // ...authHeaders,
        Accept: 'application/json, text/plain, */*',
      },
    });
    if (response.data.healthy) return true;
    throw new Error('Something failed');
  } catch (error) {
    return false;
  }
};

/**
 * signin API for login process
 * @param
 * @returns token
 */

export const postSignin = async (data: { email: string; password: string }) => {
  try {
    const response = await api.post(
      `${baseApiURL}/api/signin`,
      JSON.stringify(data),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return {
      token: 'Bearer ' + response.data.jwttoken,
      email: response.data.email,
    };
  } catch (error) {
    return {
      error: true,
      message: error.message,
    };
  }
};

/**
 * Get all available products
 * @param
 * @returns product[]
 */

export const fetchProducts = async (token: string) => {
  try {
    const response = await api.get(`${baseApiURL}/api/product/products`, {
      headers: {
        // ...authHeaders,
        Authorization: token,
        Accept: 'application/json, text/plain, */*',
      },
    });
    return response.data;
  } catch (error) {
    if (!error.response) return { error: true, message: 'Network Error' };
    return {
      error: true,
      message: error.response.data.message,
      status: error.response.status,
    };
  }
};

/**
 * create/update product states
 * @param
 * @returns tenant[]
 */

export const updateProduct = async (
  data: productServiceType,
  token: string
) => {
  try {
    const response = await api.put(
      `${baseApiURL}/api/product/products/${data.productId}`,
      JSON.stringify(data),
      {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    return {
      error: true,
      message: error.message,
    };
  }
};

/**
 * Get source configuration
 * @param
 * @returns tenant[]
 */

export const fetchSourceConfiguration = async (
  system: string,
  source: string,
  token: string
) => {
  try {
    const response = await api.get(
      `${baseApiURL}/api/systems/${system}/${source}`,
      {
        headers: {
          // ...authHeaders,
          Authorization: token,
          'Content-Type': 'application/json, text/plain, */*',
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response.status === 404) {
      return {};
    }

    return {
      error: true,
      message: error.message,
    };
  }
};

/**
 * Fetch source credentials
 * @param system
 * @param source
 * @param token
 * @returns credential object for corespopnding system
 */
export const fetchSourceCredentials = async (
  system: string,
  source: string,
  token: string
) => {
  try {
    const response = await api.get(
      `${baseApiURL}/api/systems/${system}/${source}/credentials`,
      {
        headers: {
          // ...authHeaders,
          Authorization: token,
          'Content-Type': 'application/json, text/plain, */*',
        },
      }
    );
    return { data: response.data, status: response.status };
  } catch (error) {
    if (error.response.status === 404) {
      return null;
    }

    return {
      error: true,
      message: error.message,
    };
  }
};
