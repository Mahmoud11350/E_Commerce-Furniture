import { Formik, Form, Field } from 'formik'
import Link from 'next/link'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import api from '../axios/axios'
import { saveLocalStorage, getAuthInfo } from '../store/productSlice'
function RegisterForm({ inputs, initialValues, btnType }) {
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const handleSubmit = async (values, { resetForm }) => {
    if (btnType === 'login') {
      try {
        const { data } = await api.post('/auth/login', values)
        const { token, user } = data
        dispatch(saveLocalStorage({ token, user }))
        dispatch(getAuthInfo({ token, user }))
      } catch (error) {
        setError(error.response.data.msg)
      }
      resetForm()
    }
    if (btnType === 'register') {
      try {
        const { data } = await api.post('/auth/register', values)
        const { token, user } = data
        dispatch(saveLocalStorage({ token, user }))
        dispatch(getAuthInfo({ token, user }))
      } catch (error) {
        setError(error.response.data.msg)
      }
    }
    resetForm()
  }

  return (
    <section className=" mx-auto w-96 rounded-xl border border-t-8 border-t-secondary">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className="rounded-lg  py-4 ">
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
                  className="mx-auto mt-3 mb-8 block w-full rounded border bg-secondary/20 px-4 py-1 text-lg outline-none"
                  name={input}
                  type={input}
                />
              </div>
            )
          })}

          <div className="mx-auto text-center ">
            <button
              className="rounded bg-secondary/80 py-2 px-4 text-xl font-bold capitalize text-mainDark transition-colors duration-300 hover:bg-secondary"
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
            {error && <h2>{error}</h2>}
          </div>
        </Form>
      </Formik>
    </section>
  )
}

export default RegisterForm
