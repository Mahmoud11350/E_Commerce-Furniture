import { createSlice } from '@reduxjs/toolkit'
const isServer = typeof window === 'undefined'
const token = isServer ? null : window.localStorage.getItem('token')
const user = isServer ? null : window.localStorage.getItem('user')
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
  token,
  user,
  review: {
    rating: 0,
    title: '',
    comment: '',
  },
  showReviewForm: false,
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
      state.cartItems[index].amount -= 1
    },
    clearCart(state, action) {
      state.cartItems = []
    },
    getAuthInfo(state, action) {
      state.token = action.payload.token
      state.user = action.payload.user
    },
    saveLocalStorage(state, action) {
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      localStorage.setItem('token', action.payload.token)
      state.token = action.payload.token
      state.user = action.payload.user
    },
    removeLocalStorage(state, action) {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      state.token = null
      state.user = null
    },
    showReviewForm(state, action) {
      state.showReviewForm = action.payload
    },
    updateRating(state, action) {
      state.review = action.payload
      state.showReviewForm = true
    },
    deleteCartItem(state, action) {
      state.cartItems = state.cartItems.filter((item) => {
        return item.productId !== action.payload
      })
    },
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
  getAuthInfo,
  saveLocalStorage,
  removeLocalStorage,
  showReviewForm,
  updateRating,
  deleteCartItem,
} = productSlice.actions
