import { api, baseApiURL } from '../app/api';
import { deleteServiceStateType, postServiceStateType } from '../types/types';

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
    console.log(error);
    return false;
  }
};

/**
 * Register new source
 * @param
 * @returns tenant[]
 */

export const registerSource = async (data: {
  sourceName: string;
  sourceCode: string;
  system: string;
  token: string;
  activeFlag: boolean;
}) => {
  try {
    const response = await api.post(
      `${baseApiURL}/api/systems/${data.system}`,
      JSON.stringify([
        {
          sourceCode: data.sourceCode,
          sourceName: data.sourceName,
          active: Number(data.activeFlag),
        },
      ]),

      {
        headers: {
          // ...authHeaders,
          Authorization: data.token,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log('ERROR registering service');
    console.log(error);
    return {
      status: error.message,
      success: false,
      error: true,
    };
  }
};

/**
 * Get All Available sources
 * @param
 * @returns tenant[]
 */

export const fetchServices = async (token: string) => {
  try {
    // console.log(token);
    const response = await api.get(`${baseApiURL}/api/systems`, {
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

/**
 * create/update service states
 * @param
 * @returns tenant[]
 */

export const postSoureConfiguration = async (data: {
  systemCode: string;
  sourceCode: string;
  token: string;
  body: Object;
}) => {
  try {
    const response = await api.post(
      `${baseApiURL}/api/systems/${data.systemCode}/${data.sourceCode}`,
      JSON.stringify(Object),
      {
        headers: {
          Authorization: data.token,
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
 * create/update service states
 * @param
 * @returns tenant[]
 */
