import { useSelector } from 'react-redux'
import axios from '../../axios/axios'
import { updateRating } from '../../store/productSlice'
import Router from 'next/router'

function Review({ reviews }) {
  const { user, review } = useSelector((state) => {
    return {
      user: state.product.user,
      review: state.product.review,
    }
  })

  let parsedUser = user
  if (typeof user === 'string') {
    parsedUser = JSON.parse(user)
  }

  let signedUser = null
  if (parsedUser) {
    signedUser = parsedUser._id
  }

  const deleteReview = async (reviewId, productId) => {
    try {
      await axios.delete(`/reviews/${reviewId}`)
      await axios.get(
        `https://e-commerce-alpha-green.vercel.app/api/revalidate?id=${productId}`
      )
      Router.reload()
    } catch (error) {
      console.log(error)
    }
  }
  const updateReview = async (reviewId) => {
    dispatch(updateRating(ratingValues))
    try {
      await axios.patch(reviewId, review)
    } catch (error) {
      console.log(error)
    }
  }
  console.log(reviews)

  return (
    <section className="container">
      <div className="mb-7 grid cursor-pointer grid-cols-1  md:grid-cols-3">
        {reviews.map((review) => {
          return (
            <div className="rounded-xl  border  border-mainLight p-5 shadow-xl transition-transform duration-300 hover:-translate-y-2">
              <span className="flex text-3xl font-bold text-yellow-400">
                {[...Array(review.rating)].map((span) => (
                  <svg
                    key={Math.random()}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </span>
              <h2 className="mt-2 text-lg font-bold capitalize text-main">
                {review.title}
              </h2>
              <p className="py-2 capitalize">{review.comment}</p>
              {signedUser === review.user && (
                <div className="flex justify-between ">
                  <button
                    className="rounded-lg bg-red-600 py-2 px-4 font-bold text-white"
                    onClick={() => deleteReview(review._id, review.product)}
                  >
                    Delete Review
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Review
