import axios from '../../axios/axios'
import Image from 'next/image'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../store/productSlice'
import { useRouter } from 'next/router'
import Reviews from '../../components/reviews/reviews'
import { useState } from 'react'
function Product({ product }) {
  const dispatch = useDispatch()
  const router = useRouter()
  const {
    name,
    price,
    colors,
    shipping,
    company,
    description,
    image,
    _id,
    numOfReview,
  } = product
  const [productOrder, setProductOrder] = useState({
    name,
    price,
    image,
    productId: _id,
    amount: 1,
  })

  const handleAddToCart = () => {
    dispatch(addToCart({ productOrder }))
    router.replace('/cart')
  }
  const handlePlusAmount = () => {
    setProductOrder({
      ...productOrder,
      amount: productOrder.amount === 5 ? 5 : (productOrder.amount += 1),
    })
  }
  const handleMinusAmount = () => {
    setProductOrder({
      ...productOrder,
      amount: productOrder.amount === 1 ? 1 : (productOrder.amount -= 1),
    })
  }
  return (
    <>
      <section className="">
        <h2 className="mb-8 bg-mainLight p-12 text-center text-2xl font-bold uppercase text-white">
          {name}
        </h2>
        <div className="container">
          <Link href="/products">
            <button className="my-8 rounded bg-secondary py-2 px-4  capitalize text-white">
              Back to Products
            </button>
          </Link>
        </div>
        <div className="container mb-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <Image
              src={image}
              width={768}
              height={512}
              alt={name}
              className={'rounded-lg'}
            />
          </div>
          <div>
            <h2 className="text-lg font-bold capitalize text-main">{name}</h2>
            <div className="flex items-center justify-between">
              <span className=" flex items-center text-2xl font-bold text-yellow-400">
                {[...Array(product.averageRating)].map((svg) => (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-sm text-main">{numOfReview} Reviews</span>
              </span>
              <span className="inline-block text-xl capitalize text-main">
                $ {price}
              </span>
            </div>
            <p>{description}</p>
            <div className="mt-4 text-lg uppercase">
              <h2>
                <span className="text-red-600">avaliable :</span>{' '}
                {shipping === 'true' ? 'In Stock' : 'Available'}
              </h2>
              <h2>
                {' '}
                <span className="text-red-600">Sku :</span> {_id}{' '}
              </h2>
              <h2>
                {' '}
                <span className="text-red-600">Brand :</span> {company}{' '}
              </h2>
            </div>
            <hr />
            <div className="mb-9 mt-9 flex items-center">
              <h2 className="mr-7 text-lg uppercase">Colors : </h2>
              <ul className="flex space-x-5">
                {colors.map((color) => {
                  return (
                    <li
                      className="h-8 w-8 rounded-full"
                      style={{ backgroundColor: color }}
                    ></li>
                  )
                })}
              </ul>
            </div>
            <div className="flex items-center justify-between">
              <h2 className="flex items-center text-4xl font-bold">
                {' '}
                <span
                  onClick={handlePlusAmount}
                  className=" mr-4 cursor-pointer rounded border   px-2 text-lg hover:bg-mainDark hover:text-white"
                >
                  +
                </span>
                {productOrder.amount}{' '}
                <span
                  onClick={handleMinusAmount}
                  className=" ml-4 cursor-pointer rounded border   px-2 text-lg hover:border-red-500 hover:bg-red-500 hover:text-white"
                >
                  -
                </span>
              </h2>
              <button
                className="my-8 rounded bg-secondary py-2 px-4  capitalize text-white"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>
      <Reviews reviews={product.reviews} productId={product._id} />
    </>
  )
}

export default Product

// export async function getStaticPaths() {
//   const { data } = await axios.get('/products')

//   const paths = data.products.map((product) => {
//     return {
//       params: { product: product._id.toString() },
//     }
//   })

//   return {
//     paths,
//     fallback: false,
//   }
// }

export async function getServerSideProps({ params }) {
  const productId = params.product
  const { data: product } = await axios.get(`/products/${productId}`)

  return {
    props: {
      product: product.product,
    },
  }
}
