import Review from './review'
import ReviewForm from './reviewForm'

function Reviews({ reviews, productId }) {
  return (
    <>
      <section className="container">
        {reviews.length === 0 && (
          <div className="my-4 text-center text-lg font-bold capitalize text-mainDark">
            <h2>product has no reviews yet</h2>
          </div>
        )}
        <ReviewForm productId={productId} />
        {reviews.length > 0 && <Review reviews={reviews} />}
      </section>
    </>
  )
}

export default Reviews
