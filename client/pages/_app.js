import '../build.css'
import Head from 'next/head'
import Navigation from '../components/nav'
import Footer from '../components/footer'
import { Provider } from 'react-redux'
import store from '../store/index'
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Home Center</title>
      </Head>
      <Provider store={store}>
        <section className="grid min-h-screen grid-rows-[100px_1fr_50px] ">
          <header className="">
            <Navigation />
          </header>
          <main>
            <Component {...pageProps} />
          </main>
          <footer className="flex items-center justify-center bg-main text-lg text-white md:text-xl">
            <Footer />
          </footer>
        </section>
      </Provider>
    </>
  )
}

export default MyApp
