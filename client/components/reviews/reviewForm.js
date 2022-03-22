import axios from '../../axios/axios'
import { Field, Form, Formik } from 'formik'
import { useState } from 'react'
import Router from 'next/router'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { showReviewForm, updateRating } from '../../store/productSlice'

function ReviewForm({ productId }) {
  const [error, setError] = useState(null)
  const { token, user, reviewValues, ReviewForm } = useSelector((state) => {
    return {
      token: state.product.token,
      user: state.product.user,
      reviewValues: state.product.review,
      ReviewForm: state.product.showReviewForm,
    }
  })
  const dispatch = useDispatch()
  const inputs = ['rating', 'title']

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await axios.post('/reviews', { ...values, product: productId })
      dispatch(showReviewForm(false))
      Router.reload()
    } catch (error) {
      setError(error.response.data.msg)
    }
    resetForm()
  }
  const handleReview = () => {
    if (token && user) {
      dispatch(showReviewForm(true))
    } else {
      Router.replace('/login')
    }
  }

  return (
    <>
      {!ReviewForm && (
        <div className="mx-auto my-7 w-fit rounded-lg border border-mainLight py-5 px-4 text-left shadow-lg">
          <h2 className="text-lg font-bold text-main">Review This Product</h2>
          <p className="text-md font-bold text-mainDark">
            Share your thoughts with other customers
          </p>
          <button
            onClick={handleReview}
            className={
              'text-md rounded border border-mainDark py-1 px-2 transition-colors duration-300 hover:bg-mainDark hover:text-white'
            }
          >
            write a customer review
          </button>
        </div>
      )}

      {ReviewForm && (
        <div className=" mx-auto mb-6 max-w-[500px] rounded-lg border border-t-[6px] border-t-secondary  py-4 px-3">
          <Formik initialValues={reviewValues} onSubmit={handleSubmit}>
            <Form>
              <div className="grid grid-cols-[130px_1fr]">
                {inputs.map((input) => {
                  return (
                    <div>
                      <Field
                        placeholder={input}
                        className={`mb-2 ${
                          input === 'rating' ? 'w-28' : 'w-full'
                        } rounded-lg border-mainDark bg-[#eee] py-1 px-3 text-xl capitalize outline-none`}
                        id={input}
                        name={input}
                        type={`${input === 'rating' ? 'number' : 'text'}`}
                        min={input === 'rating' ? 0 : null}
                        max={input === 'rating' ? 5 : null}
                      />
                    </div>
                  )
                })}
              </div>

              <Field
                as={'textarea'}
                name="comment"
                placeholder="comment"
                className="mb-2 w-full rounded-lg  border-mainDark bg-[#eee]  py-1 px-3 text-xl capitalize outline-none"
              />
              <button
                className="mt-5  rounded border border-secondary  py-2 px-4 text-lg font-bold transition duration-300 hover:bg-secondary"
                type="submit"
              >
                Review
              </button>
            </Form>
          </Formik>
          {error && (
            <h2 className="text-md mt-2 text-center text-red-500">{error}</h2>
          )}
        </div>
      )}
    </>
  )
}

export default ReviewForm
