import { useDispatch } from 'react-redux'
import { getToken } from '../store/productSlice'
import { useRouter } from 'next/router'
import api from '../axios/axios'

const WithAuth =
  (Component) =>
  ({ ...props }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')
      if (token && user) {
        dispatch(getAuthInfo({ token, user }))
        return <Component {...props} />
      }
      router.replace('/login')
    }

    return null
  }

export default WithAuth
