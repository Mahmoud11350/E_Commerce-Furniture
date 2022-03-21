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
      const user = await api.post('/user/verify', token)
      if (token) {
        dispatch(getToken(token))
        return <Component {...props} />
      }
      router.replace('/login')
    }

    return null
  }

export default WithAuth
