import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { API_RESPONSE } from "@/shared/types/response";

interface ApiError {
  message: string;
  status?: number;
}

interface RequestConfig {
  isMultipart?: boolean;
  headers?: Record<string, string>;
}

export class Api {
  private instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:9000/api/v1",
      withCredentials: true,
      headers: {
        Branchname: "utama",
        Branchcode: "b246285b-d9ed-4eca-afbd-ad86b284c5b2",
      },
    });

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as any;
      }
    );
  }

  private formatData(data: unknown, isMultipart: boolean = false): unknown {
    if (!isMultipart) return data;

    const formData = new FormData();
    if (data && typeof data === "object") {
      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (Array.isArray(value)) {
          value.forEach((item, index) => {
            if (item instanceof File) {
              formData.append(`${key}[${index}]`, item);
            } else {
              formData.append(`${key}[${index}]`, String(item));
            }
          });
        } else {
          formData.append(key, String(value));
        }
      });
    }
    return formData;
  }
  private getHeaders(config?: RequestConfig) {
    if (config?.isMultipart) {
      return {
        ...config?.headers,
      };
    }

    return {
      "Content-Type": "application/json",
      ...config?.headers,
    };
  }

  async get<T>(url: string, config?: RequestConfig): Promise<API_RESPONSE<T>> {
    try {
      const response: API_RESPONSE<T> = await this.instance.get(url, {
        headers: this.getHeaders(config),
      });
      return {
        data: response.data,
        status: response.status as number,
        message: response.message,
      };
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  async post<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<API_RESPONSE<T>> {
    try {
      const formattedData =
        data instanceof FormData
          ? data
          : this.formatData(data, config?.isMultipart);

      const response: AxiosResponse<T> = await this.instance.post(
        url,
        formattedData,
        {
          headers: this.getHeaders(config),
        }
      );
      return {
        data: response.data,
        status: response.status,
        message: response.statusText,
      };
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }
  async put<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<API_RESPONSE<T>> {
    try {
      const formattedData =
        data instanceof FormData
          ? data
          : this.formatData(data, config?.isMultipart);

      const response: AxiosResponse<T> = await this.instance.put(
        url,
        formattedData,
        {
          headers: this.getHeaders(config),
        }
      );
      return {
        data: response.data,
        status: response.status,
        message: response.statusText,
      };
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  async patch<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<API_RESPONSE<T>> {
    try {
      const formattedData = this.formatData(data, config?.isMultipart);
      const response: AxiosResponse<T> = await this.instance.patch(
        url,
        formattedData,
        {
          headers: this.getHeaders(config),
        }
      );
      return {
        data: response.data,
        status: response.status,
        message: response.statusText,
      };
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  async delete<T>(
    url: string,
    config?: RequestConfig
  ): Promise<API_RESPONSE<T>> {
    try {
      const response: AxiosResponse<T> = await this.instance.delete(url, {
        headers: this.getHeaders(config),
      });
      return {
        data: response.data,
        status: response.status,
        message: response.statusText,
      };
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  private handleError(error: any): ApiError {
    return {
      message: error.message,
      status: error.response?.status,
    };
  }
}

export const api = new Api();
