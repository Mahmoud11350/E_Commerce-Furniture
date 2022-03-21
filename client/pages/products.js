import ProductsSideBar from '../components/products/productsSidebar'
import AllProducts from '../components/products/products'
import axios from '../axios/axios'

function Products({ products }) {
  return (
    <>
      <section>
        <h1 className="bg-main py-8 text-center text-2xl uppercase text-white">
          Products
        </h1>
        <div className="container mb-8 mt-12 grid  gap-y-4 md:grid-cols-[300px_1fr]">
          <ProductsSideBar />
          <AllProducts products={products} />
        </div>
      </section>
    </>
  )
}

export default Products

export async function getStaticProps() {
  const { data } = await axios.get('/products')
  return {
    props: {
      products: data.products,
    },
  }
}
