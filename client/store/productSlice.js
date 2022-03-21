import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  products: {
    name: '',
    category: '',
    company: '',
    color: '',
    freeShipping: '',
  },
  cartItems: [],
  ui: null,
  token: null,
}

const productSlice = createSlice({
  name: 'product slice',
  initialState,
  reducers: {
    getProducts(state, action) {
      state.products = action.payload.values
    },
    setError(state, action) {
      state.error = true
    },
    setUi(state, action) {
      state.ui = {
        status: action.payload.status,
        loading: action.payload.loading,
        error: action.payload.error,
      }
    },
    addToCart(state, action) {
      const newItem = action.payload.productOrder
      const index = state.cartItems.findIndex(
        (element) => element.productId === newItem.productId
      )
      if (index === -1) {
        state.cartItems.push({
          ...newItem,
        })
      } else {
        state.cartItems[index].amount += 1
      }
    },
    plusAmount(state, action) {
      const index = state.cartItems.findIndex(
        (item) => item.productId === action.payload.product.productId
      )
      state.cartItems[index].amount += 1
    },
    minusAmount(state, action) {
      const index = state.cartItems.findIndex(
        (item) => item.productId === action.payload.product.productId
      )
      console.log(index)
      state.cartItems[index].amount -= 1
    },
    clearCart(state, action) {
      state.cartItems = []
    },
    getToken(state, action) {
      state.token = action.payload
    },
    // handleLogin(state, action) {
    //  const {data} = await api.post("/auth/login",action.payload)
    //   console.log('LOgin')
    //   console.log(action.payload)
    // },
    // handleRegister(state, action) {
    //   console.log('register')
    //   console.log(action.payload)
    // },
  },
})

export default productSlice.reducer

export const {
  getProducts,
  setUi,
  addToCart,
  plusAmount,
  minusAmount,
  clearCart,
  handleLogin,
  handleRegister,
  getToken,
} = productSlice.actions
