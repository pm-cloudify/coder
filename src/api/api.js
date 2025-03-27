import axios from "axios";
import { getToken, clearToken } from "@/utils/storage";

// TODO: read defaults from env

/**
 * ApiClient is a wrapper to simplify configuring axios to make api calls
 */
export class ApiClient {
  /**
   * create a api client
   * @param {string} baseAddress base address like "http://localhost:5000"
   * @param {string} baseApiURL base route for api url without version like "api"
   * @param {string} apiVersion  base route for api version like "v1"
   * @param {object} specified_headers addition headers. it will also replace duplicates.
   */
  constructor(
    baseAddress = "http://localhost:5000",
    baseApiURL = "api",
    apiVersion = "v1",
    specified_headers = {}
  ) {
    const token = getToken();

    let headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers = {
        ...headers,
        Authorization: "Bearer " + token,
      };
    }

    this.axiosInstance = axios.create({
      baseURL: baseAddress + "/" + baseApiURL + "/" + apiVersion + "/",
      timeout: 5000, // 5 sec
      headers: {
        ...headers,
        ...specified_headers,
      },
    });
  }

  errorHandler(error) {
    if (error?.response?.status == 401) {
      clearToken();
      window.location = "/login";
    }
  }

  /**
   * get request
   * @param {string} url
   * @param {import("axios").AxiosRequestConfig} config
   * @returns {Promise}
   */
  async get(url = "ping", config = {}) {
    return this.axiosInstance
      .get(url, {
        ...config,
      })
      .catch((error) => this.errorHandler(error));
  }

  /**
   * post request
   * @param {string} url
   * @param {any} data
   * @param {import("axios").AxiosRequestConfig} config
   * @returns {Promise}
   */
  async post(url, data = null, config = {}) {
    return this.axiosInstance
      .post(url, data, {
        ...config,
      })
      .catch((error) => this.errorHandler(error));
  }

  /**
   * put request
   * @param {string} url
   * @param {any} data
   * @param {import("axios").AxiosRequestConfig} config
   * @returns {Promise}
   */
  async put(url, data = null, config = {}) {
    return this.axiosInstance
      .put(url, data, {
        ...config,
      })
      .catch((error) => this.errorHandler(error));
  }

  /**
   * patch request
   * @param {string} url
   * @param {any} data
   * @param {import("axios").AxiosRequestConfig} config
   * @returns {Promise}
   */
  async patch(url, data = null, config = {}) {
    return this.axiosInstance
      .patch(url, data, {
        ...config,
      })
      .catch((error) => this.errorHandler(error));
  }

  /**
   * delete request
   * @param {string} url
   * @param {import("axios").AxiosRequestConfig} config
   * @returns {Promise}
   */
  async delete(url = "ping", config = {}) {
    return this.axiosInstance
      .delete(url, {
        ...config,
      })
      .catch((error) => this.errorHandler(error));
  }
}
