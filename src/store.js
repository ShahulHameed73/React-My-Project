import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { thunk } from "redux-thunk";

export const getProducts = async () => {
  try{
    const response = await axios.get('http://localhost:9015/api/v1/products')
    console.log('API Response:', response.data);
    return response.data;
  }
  catch(error)
  {   console.log(error)
    return [];
  }
};
export const fetchProducts = createAsyncThunk( 'products/fetchProducts',
  async () => {
    const response = await getProducts();  // Fetch products from API

    // Filter the items based on category
    const veg = response.filter(item => item.category === 'veg');
    const nonVeg = response.filter(item => item.category === 'Nonveg');
    console.log('API xxx veg items:', veg);

    // Return the filtered items
    return { veg, nonVeg };
  }
);

// Slice for products
const productsSlice = createSlice({
  name: "products",
  initialState: {
    veg: [],
    nonVeg: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.veg = action.payload.veg || [];
        state.nonVeg = action.payload.nonVeg || [];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Cart slice to manage cart actions (add, remove, increment, decrement, clear)
const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.find((item) => item.name === action.payload.name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => state.filter((item) => item.name !== action.payload.name),
    incrementQuantity: (state, action) => {
      const item = state.find((item) => item.name === action.payload.name);
      if (item) item.quantity += 1;
    },
    decrementQuantity: (state, action) => {
      const item = state.find((item) => item.name === action.payload.name);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          return state.filter((cartItem) => cartItem.name !== item.name);
        }
      }
    },
    clearCart: () => [],
  },
});

// Purchase history slice
const purchaseHistorySlice = createSlice({
  name: "purchaseHistory",
  initialState: [],
  reducers: {
    addPurchase: (state, action) => {
      state.push(action.payload);
    },
  },
});

// Configure the store
const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
    purchaseHistory: purchaseHistorySlice.reducer,
  },
  middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(thunk)
});

// Export actions
export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;
export const { addPurchase } = purchaseHistorySlice.actions;
export default store;
