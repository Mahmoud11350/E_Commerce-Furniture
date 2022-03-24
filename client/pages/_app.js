import '../styles/global.css'
import Head from 'next/head'
import Navigation from '../components/nav'
import Footer from '../components/footer'
import { Provider } from 'react-redux'
import store from '../store/index'
import Router from 'next/router'
import { useState } from 'react'
import Spinner from '../components/spinner'
function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false)
  Router.onRouteChangeStart = () => {
    setLoading(true)
  }

  Router.onRouteChangeComplete = () => {
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Furniture</title>
      </Head>
      <Provider store={store}>
        {loading && <Spinner />}
        {!loading && (
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
        )}
      </Provider>
    </>
  )
}

export default MyApp
