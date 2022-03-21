import { Formik, Form, Field } from 'formik'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import api from '../axios/axios'
import { handleLogin, handleRegister, getToken } from '../store/productSlice'
function RegisterForm({ inputs, initialValues, btnType }) {
  const token = useSelector((state) => state.product.token)
  console.log(token)
  const dispatch = useDispatch()
  const handleSubmit = async (values, { resetForm }) => {
    if (btnType === 'login') {
      try {
        const { data } = await api.post('/auth/login', values)
        localStorage.setItem('token', data.token)
        dispatch(getToken(data.token))
      } catch (error) {
        console.log(error.response)
      }
    }
    if (btnType === 'register') {
      try {
        const { data } = await api.post('/auth/register', values)
        localStorage.setItem('token', data.token)
        dispatch(getToken(data.token))
      } catch (error) {
        console.log(error.response)
      }
    }
    resetForm()
  }
  return (
    <section className=" mx-auto w-96 rounded-xl border-t-8 border-mainDark">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className="rounded-lg bg-mainLight py-4 ">
          {inputs.map((input) => {
            return (
              <div className="mx-auto w-3/4">
                <label
                  className="mx-auto block  text-lg capitalize"
                  htmlFor={input}
                >
                  {input}
                </label>
                <Field
                  id={input}
                  className="mx-auto mt-3 mb-8 block w-full rounded border px-4 py-1 text-lg outline-none"
                  name={input}
                  type={input}
                />
              </div>
            )
          })}
          <div className="mx-auto text-center ">
            <button
              className="rounded bg-mainDark py-2 px-4 text-xl font-bold capitalize text-white transition-colors duration-300 hover:bg-main"
              type="submit"
            >
              {btnType}
            </button>
            <h2 className="mt-4 text-lg uppercase">
              Don't have account !{' '}
              <Link href={`/${btnType === 'login' ? 'register' : 'login'}`}>
                <span className="cursor-pointer font-bold text-red-600">
                  {btnType === 'login' ? 'register' : 'login'}
                </span>
              </Link>
            </h2>
          </div>
        </Form>
      </Formik>
    </section>
  )
}

export default RegisterForm
