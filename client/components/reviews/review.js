import { useEffect } from 'react'
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

  const deleteReview = async (reviewId) => {
    try {
      await axios.delete(`/reviews/${reviewId}`)
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

  return (
    <section className="container">
      <div className="mb-7 cursor-pointer shadow-xl transition-transform duration-300 hover:-translate-y-2">
        {reviews.map((review) => {
          return (
            <div className="rounded border p-5">
              <span className="flex text-3xl font-bold text-yellow-400">
                {[...Array(review.rating)].map((span) => (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                ))}
              </span>
              <h2 className="text-lg font-bold capitalize text-mainDark">
                {review.title}
              </h2>
              <p className="capitalize">{review.comment}</p>
              {signedUser === review.user && (
                <div className="flex justify-between ">
                  {/* <button
                    className="rounded-lg bg-main py-2 px-4 font-bold text-white"
                    onClick={() => updateReview(review._id)}
                  >
                    Update Review
                  </button> */}
                  <button
                    className="rounded-lg bg-red-900 py-2 px-4 font-bold text-white"
                    onClick={() => deleteReview(review._id)}
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
