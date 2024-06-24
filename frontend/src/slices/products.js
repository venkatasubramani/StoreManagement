import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductDataService from "../services/product.service";

const initialState = [];

export const createProduct = createAsyncThunk(
  "products/create",
  async ({ product_id,product_name, product_desc }) => {
    const res = await ProductDataService.create({ product_id,product_name, product_desc });
    return res.data;
  }
);

export const retrieveProducts = createAsyncThunk(
  "products/retrieve",
  async () => {
    const res = await ProductDataService.getAll();
    return res.data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, data }) => {
    const res = await ProductDataService.update(id, data);
    return res.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async ({ id }) => {
    await ProductDataService.delete(id);
    return { id };
  }
);

export const deleteAllProducts = createAsyncThunk(
  "products/deleteAll",
  async () => {
    const res = await ProductDataService.deleteAll();
    return res.data;
  }
);

export const findProductsByTitle = createAsyncThunk(
  "products/findByTitle",
  async ({ product_name }) => {
    const res = await ProductDataService.findByTitle(product_name);
    console.log(res.data);
    return res.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: {
    [createProduct.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrieveProducts.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updateProduct.fulfilled]: (state, action) => {
      const index = state.findIndex(product => product.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteProduct.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
    [deleteAllProducts.fulfilled]: (state, action) => {
      return [];
    },
    [findProductsByTitle.fulfilled]: (state, action) => {
      return [...action.payload];
    },
  },
});

const { reducer } = productSlice;
export default reducer;
