import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slices/products';

const reducer = {
  products: productReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;