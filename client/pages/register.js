import { useRouter } from 'next/router'
import Register from '../components/registerForm'
import WithAuth from '../components/WithAuth'
import { useEffect } from 'react'
function RegisterForm() {
  const Router = useRouter()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      Router.replace('/')
    }
  }, [])
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

export default WithAuth(RegisterForm)
