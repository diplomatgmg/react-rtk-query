import React, { type ChangeEvent, useState } from 'react'
import { useAddProductMutation, useDeleteProductMutation, useGetGoodsQuery } from './redux/api/api'

const App = (): React.ReactElement | null => {
  const [count, setCount] = useState<string>('')
  const [newProduct, setNewProduct] = useState<string>('')

  const [addProduct] = useAddProductMutation()
  const [deleteProduct] = useDeleteProductMutation()

  const {
    data: goods,
    isLoading,
    refetch
  } = useGetGoodsQuery(count)

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (goods === undefined) {
    return null
  }

  const handleSetCount = (e: ChangeEvent<HTMLSelectElement>): void => {
    setCount(e.target.value)
  }

  const handleInputNewProduct = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewProduct(e.target.value)
  }

  const handleAddProduct = async (): Promise<void> => {
    if (newProduct === '') {
      return
    }

    await addProduct({ name: newProduct })
    setNewProduct('')
    void refetch()

  }

  const handleDeleteProduct = (id: string) => async () => {
    await deleteProduct(id)
    void refetch()
  }

  return (
    <div>
      <div>
        <input type="text" value={newProduct} onChange={handleInputNewProduct}/>
        <button onClick={handleAddProduct}>Add product</button>
      </div>

      <div>
        <select value={count} onChange={handleSetCount}>
          <option value="">All</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>

      <ul>
        {goods?.map(({ id, name }) => <li key={id} onClick={handleDeleteProduct(id)}>{name}</li>)}
      </ul>
    </div>
  )
}

export default App
