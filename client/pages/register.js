import { useRouter } from 'next/router'
import Register from '../components/registerForm'
import { useEffect } from 'react'
function RegisterForm() {
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
      <Register
        inputs={['name', 'email', 'password']}
        initialValues={{ name: '', email: '', password: '' }}
        btnType="register"
      />
    </>
  )
}

export default RegisterForm
