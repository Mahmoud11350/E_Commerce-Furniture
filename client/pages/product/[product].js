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
  const { name, price, colors, shipping, company, description, image, _id } =
    product
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
              <span className=" flex text-2xl font-bold text-yellow-400">
                {[...Array(product.averageRating)].map((svg) => (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className=" h-6 w-6"
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
