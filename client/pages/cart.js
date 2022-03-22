import OrderedItems from '../components/cart/orderedItems'
import EmptyCart from '../components/cart/noItemsMsg'
import { useSelector } from 'react-redux'
import OrderCheck from '../components/cart/orderedCheck'
function Cart() {
  const cartItems = useSelector((state) => state.product.cartItems)
  return (
    <>
      {cartItems.length > 0 ? (
        <>
          <OrderedItems cartItems={cartItems} />
          <OrderCheck cartItems={cartItems} />
        </>
      ) : (
        <EmptyCart />
      )}
    </>
  )
}

export default Cart
