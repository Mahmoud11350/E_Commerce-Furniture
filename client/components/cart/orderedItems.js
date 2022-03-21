import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { plusAmount, minusAmount, clearCart } from '../../store/productSlice'
import { useRouter } from 'next/router'
function OrderedItems({ cartItems }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const continueShoping = () => router.replace('/products')
  return (
    <section className="container mt-8">
      {cartItems.map((product) => {
        return (
          <>
            <div className="mt-4 grid grid-cols-[150px_1fr] items-center justify-center border-b pb-4">
              <div>
                <Image
                  src={product.image}
                  height={150}
                  width={150}
                  className="rounded"
                ></Image>
              </div>
              <div className="flex justify-around ">
                <h2 className="flex items-center text-4xl font-bold">
                  {' '}
                  <span
                    onClick={() => dispatch(plusAmount({ product }))}
                    className=" mr-4 cursor-pointer rounded border   px-2 text-lg hover:bg-mainDark hover:text-white"
                  >
                    +
                  </span>
                  {product.amount}{' '}
                  <span
                    onClick={() => dispatch(minusAmount({ product }))}
                    className=" ml-4 cursor-pointer rounded border   px-2 text-lg hover:border-red-500 hover:bg-red-500 hover:text-white"
                  >
                    -
                  </span>
                </h2>
                <h2 className="font-bold md:text-lg">
                  {' '}
                  {product.price * product.amount} $
                </h2>
              </div>
            </div>
          </>
        )
      })}
      <div className="mt-8 flex flex-wrap justify-between space-y-2">
        <button
          onClick={continueShoping}
          className="rounded bg-main py-2 px-4 text-lg capitalize text-white transition-colors duration-300 hover:bg-mainDark"
        >
          Continue Shopping
        </button>
        <button
          onClick={() => dispatch(clearCart())}
          className="rounded bg-red-400 py-2 px-4 text-lg capitalize text-white transition-colors duration-300 hover:bg-red-600"
        >
          clear Shopping Cart
        </button>
      </div>
    </section>
  )
}

export default OrderedItems
