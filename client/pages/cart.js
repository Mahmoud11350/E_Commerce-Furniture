import OrderedItems from '../components/cart/orderedItems'
import EmptyCart from '../components/cart/noItemsMsg'
import { useSelector } from 'react-redux'
import OrderCheck from '../components/cart/orderedCheck'
import WithAuth from '../components/WithAuth'
function Cart() {
  const cartItems = useSelector((state) => state.product.cartItems)
  const token = useSelector((state) => state.product.token)
  console.log(token)
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

export default WithAuth(Cart)
