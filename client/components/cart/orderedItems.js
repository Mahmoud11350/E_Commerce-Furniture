import Image from 'next/image'
import { useDispatch } from 'react-redux'
import {
  plusAmount,
  minusAmount,
  clearCart,
  deleteCartItem,
} from '../../store/productSlice'
import { useRouter } from 'next/router'
function OrderedItems({ cartItems }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const continueShoping = () => {
    router.replace('/products')
  }
  return (
    <section className="container mt-8">
      {typeof cartItems !== 'string' &&
        cartItems?.map((product) => {
          return (
            <div
              className="mt-4 grid grid-cols-[150px_1fr] items-center justify-center border-b pb-4"
              key={product.productId}
            >
              <div>
                <Image
                  src={product.image}
                  height={150}
                  width={150}
                  className="rounded"
                ></Image>
              </div>
              <div className="flex justify-around ">
                <h2 className="text-sm font-bold capitalize text-secondary sm:text-lg">
                  {product.name}
                </h2>
                <h2 className="flex items-center  text-sm font-bold md:text-4xl">
                  {' '}
                  <span
                    onClick={() => dispatch(plusAmount({ product }))}
                    className=" mr-1 cursor-pointer rounded border px-2   text-lg hover:bg-secondary hover:text-white md:mr-4"
                  >
                    +
                  </span>
                  {product.amount}{' '}
                  <span
                    onClick={() => dispatch(minusAmount({ product }))}
                    className="ml-1 cursor-pointer rounded border px-2   text-lg hover:border-red-500 hover:bg-red-500 hover:text-white md:ml-4"
                  >
                    -
                  </span>
                </h2>
                <h2 className="text-sm font-bold md:text-lg">
                  {' '}
                  {product.price * product.amount} $
                </h2>
                <h2
                  onClick={() => dispatch(deleteCartItem(product.productId))}
                  className="cursor-pointer  transition-colors duration-300 hover:text-red-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </h2>
              </div>
            </div>
          )
        })}

      <div className="mt-8 flex flex-wrap justify-between space-y-2 space-x-3">
        <button
          onClick={continueShoping}
          className="rounded bg-secondary py-2 px-4 text-lg capitalize text-white transition-colors duration-300 hover:bg-mainDark"
        >
          Continue Shopping
        </button>
        <button
          onClick={() => dispatch(clearCart())}
          className="rounded bg-red-600 py-2 px-4 text-lg capitalize text-white transition-colors duration-300 hover:bg-red-600"
        >
          clear Shopping Cart
        </button>
      </div>
    </section>
  )
}

export default OrderedItems
