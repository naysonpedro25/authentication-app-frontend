/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { env } from './../env/index';

let isRefreshing = false;

let failedQueue: any = [];
const processQueue = (error: unknown, token: string | null = null) => {
   failedQueue.forEach((prom: any) => {
      if (error) prom.onFailure(error);
      else if (token) prom.onSuccess(token);
   });
   failedQueue = [];
};

export const api = axios.create({
   baseURL: env.VITE_BACKEND_DOMAIN,
   withCredentials: true, // cookies
   // validateStatus: (status) => status >= 200 && status < 500,
});

api.interceptors.request.use((config) => {
   const token = localStorage.getItem('token');
   if (token) {
      config.headers.Authorization = `Bearer ${token}`;
   }
   return config;
});

api.interceptors.response.use(
   (response) => response,
   async (error) => {
      const orignalConfig: any = error.config;
      if (
         error?.response?.status === 401 &&
         !orignalConfig.url.includes('/auth/refresh-token')
      ) {
         if (!isRefreshing) {
            isRefreshing = true;

            api.patch<{ token: string }>('/auth/refresh-token')
               .then((response) => {
                  const { token } = response.data;
                  api.defaults.timeout = 15000;
                  api.defaults.headers['Authorization'] = `Bearer ${token}`;
                  localStorage.setItem('token', token);
                  processQueue(null, token);
               })
               .catch((refreshError) => {
                  processQueue(refreshError, null);
               })
               .finally(() => {
                  isRefreshing = false;
               });
         }

         // Requisições subsequentes enquanto o refresh está em andamento
         return new Promise((resolve, reject) => {
            failedQueue.push({
               onSuccess: (token: string) => {
                  orignalConfig.headers['Authorization'] = `Bearer ${token}`;
                  // console.log(orignalConfig);
                  resolve(api(orignalConfig));
               },
               onFailure: (error: unknown) => {
                  reject(error);
               },
            });
         });
      }

      return Promise.reject(error);
   },
);
// api.interceptors.response.use(
//    (response) => response,
//    async (error) => {
//       const originalRequest = error.config as AxiosRequestConfig & {
//          _retry?: boolean;
//       };
//       if (error?.response?.status === 401 && !originalRequest._retry) {
//          originalRequest._retry = true;

//          if (!isRefreshing) {
//             isRefreshing = true;

//             try {
//                const { data } = await api.patch<{ token: string }>(
//                   '/auth/refresh-token',
//                );
//                localStorage.setItem('token', data.token);
//                console.log('Token refreshed');
//                processQueue(null, data.token);
//             } catch (refreshError) {
//                processQueue(refreshError);
//                console.error('Error refreshing token:', refreshError);
//                return Promise.reject(refreshError);
//             } finally {
//                isRefreshing = false;
//             }
//          }

//          return new Promise((resolve, reject) => {
//             failedQueue.push({ resolve, reject });
//          })
//             .then((token) => {
//                originalRequest.headers = {
//                   ...originalRequest.headers,
//                   Authorization: `Bearer ${token}`,
//                };
//                return api(originalRequest);
//             })
//             .catch((error) => {
//                return Promise.reject(error);
//             });
//       }
//       return Promise.reject(error);
//    },
// );
