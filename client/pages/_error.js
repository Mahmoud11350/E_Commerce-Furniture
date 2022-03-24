import Image from 'next/image'
import { useDispatch } from 'react-redux'
import Router from 'next/router'
import { setActiveLink } from '../store/productSlice'
function Error({ statusCode }) {
  const dispatch = useDispatch()
  const backHome = () => {
    dispatch(setActiveLink('home'))
    Router.replace('/')
  }
  return (
    <p>
      {statusCode ? (
        <>
          <Image src={'/404.jpg'} layout="fill" className="z-10" />
          <div className="text-center">
            <button
              onClick={backHome}
              className="relative z-10 mx-auto w-fit rounded-lg bg-main py-2 px-4 text-white "
            >
              BACK HOME
            </button>
          </div>
        </>
      ) : (
        'An error occurred on client'
      )}
    </p>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
