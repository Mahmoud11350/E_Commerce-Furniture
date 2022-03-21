import Header from '../components/header'
import CustomFurniture from '../components/customFurniture'
import Subscribe from '../components/subscribe'
import Featured from '../components/featured'
import axios from '../axios/axios'

const Home = ({ featured }) => {
  return (
    <>
      <Header />
      <Featured featured={featured} />
      <CustomFurniture />
      <Subscribe />
    </>
  )
}

export default Home

export async function getStaticProps() {
  const { data } = await axios.get('/products')
  const featured = data.products.filter((product) => product.featured)
  return {
    props: {
      featured,
    },
  }
}
