import { useRouter } from 'next/router'
import { useEffect } from 'react'
import LoginForm from '../components/registerForm'
import WithAuth from '../components/WithAuth'

function Login() {
  const Router = useRouter()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      Router.replace('/')
    }
  }, [])
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

export default WithAuth(Login)
