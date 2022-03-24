import { createSlice } from '@reduxjs/toolkit'
const isServer = typeof window === 'undefined'
const token = isServer ? null : window.localStorage.getItem('token')
const user = isServer ? null : window.localStorage.getItem('user')
const cartItems = isServer ? [] : window.localStorage.getItem('cartItems')
const activeLink = isServer ? null : window.localStorage.getItem('activeLink')
const initialState = {
  products: {
    name: '',
    category: 'all',
    company: 'all',
    color: 'allColor',
    freeShipping: '',
  },
  cartItems: cartItems || [],
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
      let cartItems = state.cartItems
      if (typeof cartItems === 'string') {
        state.cartItems = JSON.parse(cartItems)
      }
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
      window.localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    plusAmount(state, action) {
      let cartItems = state.cartItems
      if (typeof cartItems === 'string') {
        state.cartItems = JSON.parse(cartItems)
      }
      const index = state.cartItems.findIndex(
        (item) => item.productId === action.payload.product.productId
      )
      if (state.cartItems[index].amount < 5) {
        state.cartItems[index].amount += 1
      }
    },
    minusAmount(state, action) {
      let cartItems = state.cartItems
      if (typeof cartItems === 'string') {
        state.cartItems = JSON.parse(cartItems)
      }
      const index = state.cartItems.findIndex(
        (item) => item.productId === action.payload.product.productId
      )
      if (state.cartItems[index].amount > 1) {
        state.cartItems[index].amount -= 1
      }
    },
    clearCart(state, action) {
      state.cartItems = []
    },
    convertJsonCart(state, action) {
      state.cartItems = JSON.parse(state.cartItems)
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
      if (typeof state.cartItems === 'string') {
        state.cartItems = JSON.parse(state.cartItems)
      }
      state.cartItems = state.cartItems.filter((item) => {
        return item.productId !== action.payload
      })
      window.localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },

    clearFilters(state, action) {
      state.products = {
        name: '',
        category: 'all',
        company: 'all',
        color: 'allColor',
        freeShipping: false,
      }
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
  clearFilters,
  convertJsonCart,
} = productSlice.actions
