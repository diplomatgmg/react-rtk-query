import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type Goods } from '../../types'

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/'
  }),
  endpoints: (build) => ({
    getGoods: build.query<Goods, string>({
      query: (limit) => ({
        url: limit === '' ? 'goods' : `goods?_limit=${limit}`,
        method: 'GET'
      })
    }),
    addProduct: build.mutation({
      query: (body) => ({
        url: 'goods',
        method: 'POST',
        body
      })
    }),
    deleteProduct: build.mutation({
      query: (id: string) => ({
        url: `goods/${id}`,
        method: 'DELETE'
      })
    })
  })
})

export const {
  useGetGoodsQuery,
  useAddProductMutation,
  useDeleteProductMutation
} = api
export default api
