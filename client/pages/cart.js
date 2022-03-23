import OrderedItems from '../components/cart/orderedItems'
import EmptyCart from '../components/cart/noItemsMsg'
import { useSelector } from 'react-redux'
import OrderCheck from '../components/cart/orderedCheck'
import { useEffect, useState } from 'react'
function Cart() {
  const cartItems = useSelector((state) => state.product.cartItems)
  const [parsedCartItems, setParsedCartItems] = useState(cartItems)
  useEffect(() => {
    if (typeof parsedCartItems === 'string') {
      setParsedCartItems(JSON.parse(cartItems))
    }
  }, [])
  return (
    <>
      <section className="container">
        {cartItems.length > 0 ? (
          <>
            <OrderedItems cartItems={parsedCartItems} />
            <OrderCheck cartItems={parsedCartItems} />
          </>
        ) : (
          <EmptyCart />
        )}
      </section>
    </>
  )
}

export default Cart
