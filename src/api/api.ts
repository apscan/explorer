import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = 'https://api.apscan.io/'

// export const queryFunc = async ({ url, method, params, data }: any) => {
//   try {
//     const response = await axios({ url: BASE_URL + url, params, method, data })

//     if (response.data?.message !== 'Success' || !response.data.data) {
//       return { error: { status: response.status, data: response.data, message: response.data.message } }
//     }

//     return { data: response.data.data }
//   } catch (error: any) {
//     if (error.response) {
//       const err = error as AxiosError
//       return { error: { status: err.response?.status, data: err.response?.data } }
//     } else {
//       return { error: { message: error.message } }
//     }
//   }
// }

// export const axiosBaseQuery =
//   (): BaseQueryFn<
//     {
//       url: string
//       method?: AxiosRequestConfig['method']
//       params?: AxiosRequestConfig['params']
//       data?: AxiosRequestConfig['data']
//     },
//     unknown,
//     unknown
//   > =>
//   async ({ url, method, params, data }: any) => {
//     try {
//       const response = await axios({ url: BASE_URL + url, params, method, data })

//       if (response.data?.message !== 'Success' || !response.data.data) {
//         return { error: { status: response.status, data: response.data, message: response.data.message } }
//       }

//       return { data: response.data.data }
//     } catch (error: any) {
//       if (error.response) {
//         const err = error as AxiosError
//         return { error: { status: err.response?.status, data: err.response?.data } }
//       } else {
//         return { error: { message: error.message } }
//       }
//     }
//   }

export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: () => ({}),
})
