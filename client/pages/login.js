import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import LoginForm from '../components/registerForm'

function Login() {
  const Router = useRouter()
  const { token, user } = useSelector((state) => {
    return {
      token: state.product.token,
      user: state.product.user,
    }
  })

  useEffect(() => {
    if (token && user) {
      Router.replace('/')
    }
  }, [token, user])
  return (
    <>
      <LoginForm
        inputs={['email', 'password']}
        initialValues={{ email: '', password: '' }}
        btnType="login"
      />
    </>
  )
}

export default Login
