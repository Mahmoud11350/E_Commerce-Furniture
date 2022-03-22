import Link from 'next/link'
function EmptyCart() {
  return (
    <section>
      <div className="mt-20 text-center">
        <h2 className="mb-12 font-mono text-2xl font-bold text-mainDark">
          Your cart is empty
        </h2>
        <Link href={'/products'}>
          <button className="rounded border bg-secondary   py-2 px-6 font-mono font-bold capitalize text-white">
            Fill it
          </button>
        </Link>
      </div>
    </section>
  )
}

export default EmptyCart
