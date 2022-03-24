import OrderedItems from '../components/cart/orderedItems'
import EmptyCart from '../components/cart/noItemsMsg'
import { useSelector, useDispatch } from 'react-redux'
import OrderCheck from '../components/cart/orderedCheck'
import { useEffect } from 'react'
import { convertJsonCart } from '../store/productSlice'
function Cart() {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.product.cartItems)
  useEffect(() => {
    if (typeof cartItems === 'string') {
      dispatch(convertJsonCart())
    }
  }, [])
  return (
    <>
      <section className="container">
        {cartItems.length > 0 ? (
          <>
            <OrderedItems cartItems={cartItems} />
            <OrderCheck cartItems={cartItems} />
          </>
        ) : (
          <EmptyCart />
        )}
      </section>
    </>
  )
}

export default Cart
