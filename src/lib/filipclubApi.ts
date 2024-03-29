import { api, baseApiURL } from '../app/api';
import {
  accountServiceType,
  productServiceType,
  filmServiceType,
} from '../types/types';

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
 * update product
 * @param
 * @returns product
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
 * create new product
 * @param
 * @returns product
 */

export const createNewProduct = async (
  data: productServiceType,
  token: string
) => {
  try {
    const response = await api.post(
      `${baseApiURL}/api/product/products`,
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
 *
 * @param token Delete Product
 * @returns
 */

export const removeProduct = async (productId: number, token: string) => {
  try {
    const response = await api.delete(
      `${baseApiURL}/api/product/products/${productId}`,
      {
        headers: {
          // ...authHeaders,
          Authorization: token,
          Accept: 'application/json, text/plain, */*',
        },
      }
    );
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
 * Get all available account
 * @param
 * @returns accounts[]
 */

export const fetchAccounts = async (token: string) => {
  try {
    const response = await api.get(`${baseApiURL}/api/admin/accounts`, {
      headers: {
        // ...authHeaders,
        Authorization: token,
        Accept: 'application/json',
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
 * new account
 * @param
 * @returns product
 */

export const createNewAccount = async (
  data: accountServiceType,
  token: string
) => {
  try {
    const response = await api.post(
      `${baseApiURL}/api/admin/accounts`,
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
 * update account
 * @param
 * @returns product
 */

export const updateAccount = async (
  data: accountServiceType,
  token: string
) => {
  try {
    const response = await api.put(
      `${baseApiURL}/api/admin/accounts/${data.accountId}`,
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
 * delete account
 *
 * @param
 * @returns product
 */

export const deleteAccount = async (accountId: number, token: string) => {
  try {
    const response = await api.delete(
      `${baseApiURL}/api/admin/accounts/${accountId}`,
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
 * Get all available products
 * @param
 * @returns product[]
 */

export const fetchFilms = async (token: string) => {
  try {
    const response = await api.get(`${baseApiURL}/api/film/films`, {
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
 * update product
 * @param
 * @returns product
 */

export const updateFilm = async (data: filmServiceType, token: string) => {
  try {
    const response = await api.put(
      `${baseApiURL}/api/film/films/${data.filmId}`,
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
 * create new product
 * @param
 * @returns product
 */

export const createNewFilm = async (data: filmServiceType, token: string) => {
  try {
    const response = await api.post(
      `${baseApiURL}/api/film/films`,
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
 *
 * @param token Delete Product
 * @returns
 */

export const removeFilm = async (filmId: number, token: string) => {
  try {
    const response = await api.delete(
      `${baseApiURL}/api/film/films/${filmId}`,
      {
        headers: {
          // ...authHeaders,
          Authorization: token,
          Accept: 'application/json, text/plain, */*',
        },
      }
    );
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
