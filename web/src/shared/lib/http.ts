import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { config } from "@/shared/config/runtime";
import { ApiResponse } from "../types/response";
import type { JsonValue } from "../types/json";

let http: AxiosInstance | undefined;

function getHttp(): AxiosInstance {
  http ??= axios.create({
    baseURL: config.apiUrl,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
    timeout: config.httpTimeoutMs,
  });
  return http;
}

export class HttpError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly statusCode?: string,
    public readonly retryAfter?: number,
    public readonly data?: JsonValue,
  ) {
    super(message);
    this.name = "HttpError";
  }
}

const handleRequest = async <T>(
  requestFn: () => Promise<AxiosResponse<ApiResponse<T>>>,
): Promise<ApiResponse<T>> => {
  try {
    const response = await requestFn();
    return {
      data: response.data.data,
      status: response.data.status,
      statusCode: response.data?.statusCode || "SUCCESS",
    };
  } catch (error) {
    if (!axios.isAxiosError<ApiResponse<JsonValue>>(error)) throw error;
    const axiosError = error;
    const errorData = axiosError.response?.data;
    const retryAfterHeader = axiosError.response?.headers?.["retry-after"];
    const retryAfter =
      typeof retryAfterHeader === "string" &&
      /^\d+$/.test(retryAfterHeader.trim())
        ? Number(retryAfterHeader)
        : undefined;

    throw new HttpError(
      errorData?.error ||
        errorData?.message ||
        axiosError.message ||
        "An unexpected error occurred",
      axiosError.response?.status,
      errorData?.statusCode,
      retryAfter,
      errorData?.data,
    );
  }
};

export const httpClient = {
  postRaw: async (url: string, data: JsonValue, config: AxiosRequestConfig): Promise<JsonValue> => {
    const response = await getHttp().post<JsonValue>(url, data, config);
    return response.data;
  },
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    handleRequest<T>(() => getHttp().get(url, config)),

  post: <T>(url: string, data?: JsonValue, config?: AxiosRequestConfig) =>
    handleRequest<T>(() => getHttp().post(url, data, config)),

  put: <T>(url: string, data?: JsonValue, config?: AxiosRequestConfig) =>
    handleRequest<T>(() => getHttp().put(url, data, config)),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    handleRequest<T>(() => getHttp().delete(url, config)),

  patch: <T>(url: string, data?: JsonValue, config?: AxiosRequestConfig) =>
    handleRequest<T>(() => getHttp().patch(url, data, config)),
};

export default httpClient;
