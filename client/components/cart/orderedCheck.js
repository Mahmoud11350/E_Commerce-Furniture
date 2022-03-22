function OrderCheck({ cartItems }) {
  const subtotal = cartItems
    .map((acc) => {
      return acc.amount * acc.price
    })
    .reduce((acc, current) => acc + current)

  return (
    <section className="container my-8 capitalize">
      <div className=" w-[300px] rounded-lg border py-4 px-4 sm:w-96 ">
        <div className="flex flex-col content-end ">
          <div className="mb-6  flex justify-between">
            <h2 className="text-lg font-bold text-main ">Subtotal:</h2>
            <h2 className="text-lg font-bold text-mainDark">{subtotal} $</h2>
          </div>
        </div>
        <div>
          <div className="mb-6 flex justify-between">
            <h2 className="text-lg font-bold text-main ">shipping fee :</h2>
            <h2 className="text-lg font-bold text-mainDark">10$</h2>
          </div>
        </div>
        <div>
          <div className="mb-6 flex justify-between border-b">
            <h2 className="text-lg font-bold text-main ">tax :</h2>
            <h2 className="text-lg font-bold text-mainDark">5$</h2>
          </div>
          <div className="mlex bbrder-b  font-m mb-6 flex  justify-between">
            <h2 className="text-xl font-bold text-red-600 md:text-2xl lg:text-3xl ">
              {' '}
              order total :
            </h2>
            <h2 className="text-2xl font-bold text-red-600">
              {' '}
              {subtotal + 10 + 5} $
            </h2>
          </div>
        </div>
        <button className="rounded bg-red-600 py-2 px-4 text-lg font-bold text-white transition-colors duration-300 hover:bg-red-800">
          Order Now
        </button>
      </div>
    </section>
  )
}

export default OrderCheck
