import axios from '../../axios/axios'
import Image from 'next/image'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../store/productSlice'
import { useRouter } from 'next/router'
function Product({ product }) {
  const dispatch = useDispatch()
  const router = useRouter()
  const { name, price, colors, shipping, company, description, image, _id } =
    product
  const productOrder = { name, price, image, productId: _id, amount: 1 }
  const handleAddToCart = () => {
    dispatch(addToCart({ productOrder }))
    router.replace('/cart')
  }
  return (
    <section className="">
      <h2 className="mb-8 bg-mainLight p-12 text-center text-2xl font-bold uppercase">
        {name}
      </h2>
      <div className="container">
        <Link href="/products">
          <button className="my-8 rounded bg-main py-2 px-4  capitalize text-white">
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
          <h2 className="text-lg capitalize text-main">{name}</h2>
          <span className="text-lg capitalize text-main">$ {price}</span>
          <p>{description}</p>
          <div className="text-lg uppercase">
            <h2>
              avaliable : {shipping === 'true' ? 'In Stock' : 'Not Avaliable'}
            </h2>
            <h2>Sku : {_id} </h2>
            <h2>Brand : {company} </h2>
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
          <div>
            <button
              className="my-8 rounded bg-main py-2 px-4  capitalize text-white"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Product

export async function getStaticPaths() {
  const { data } = await axios.get('/products')

  const paths = data.products.map((product) => {
    return {
      params: { product: product._id.toString() },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const productId = params.product
  const { data } = await axios.get(`/products/${productId}`)

  return {
    props: {
      product: data.product,
    },
  }
}
