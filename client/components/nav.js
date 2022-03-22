import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from 'react-redux'
function Navigation() {
  const [toggle, setToggle] = useState(false)
  const toggleHandler = () => setToggle(!toggle)
  const token = useSelector((state) => state.product.token)
  return (
    <nav className="container flex items-center justify-between py-3">
      <div className="text-3xl font-bold uppercase">
        <span className="text-mainDark">home</span> center
      </div>
      <div
        className={`absolute top-0 right-0 z-10 transition-all duration-[.4s]  ${
          !toggle ? '-translate-x-full md:translate-x-0 ' : 'translate-x-0 '
        }flex h-full  w-full flex-col bg-white md:relative md:w-fit md:bg-transparent`}
      >
        <div
          className="flex items-center justify-between p-5 md:hidden"
          onClick={toggleHandler}
        >
          <div className="font-mono text-2xl font-bold uppercase">
            <span className=" text-mainDark">home</span> center
          </div>
          <Image
            src={'/icons/x-square-fill.svg'}
            width={28}
            height={28}
            alt="list"
            className="cursor-pointer bg-white"
          />
        </div>
        <ul className="captalize  mt-12 flex flex-col  space-y-4 p-9 text-2xl  md:mt-0  md:flex-row md:space-x-5 md:space-y-0 md:p-0 ">
          <li
            onClick={toggleHandler}
            className="transition-all duration-[.4s] hover:px-4  hover:font-bold hover:text-secondary md:hover:px-0 md:hover:font-normal"
          >
            <Link href="/">
              <a className="font-mono">Home</a>
            </Link>
          </li>
          <li
            onClick={toggleHandler}
            className="transition-all duration-[.4s] hover:px-4 hover:font-bold  hover:text-secondary md:hover:px-0 md:hover:font-normal"
          >
            <Link href="/about">About</Link>
          </li>
          <li
            onClick={toggleHandler}
            className="transition-all duration-[.4s] hover:px-4 hover:font-bold  hover:text-secondary md:hover:px-0 md:hover:font-normal"
          >
            <Link href="/products">Products</Link>
          </li>
          <div className="flex justify-center space-x-5 ">
            <Link href={'/cart'}>
              <li
                onClick={toggleHandler}
                className="flex cursor-pointer transition-all duration-[.4s] hover:px-4  hover:font-bold hover:text-secondary md:hover:px-0 md:hover:font-normal"
              >
                <h2 className="mr-2">Cart</h2>
                <Image
                  src={'/icons/cart-plus-fill.svg'}
                  width={28}
                  height={28}
                  alt="list"
                  className="cursor-pointer bg-white"
                />
              </li>
            </Link>
            {!token && (
              <Link href={'/login'}>
                <li
                  onClick={toggleHandler}
                  className="flex cursor-pointer transition-all duration-[.4s]  hover:px-4 hover:font-bold hover:text-secondary md:hover:px-0 md:hover:font-normal"
                >
                  <h2 className="mr-2">Login</h2>
                  <Image
                    src={'/icons/person-plus-fill.svg'}
                    width={28}
                    height={28}
                    alt="list"
                    className="cursor-pointer "
                  />
                </li>
              </Link>
            )}
          </div>
        </ul>
      </div>
      <div className="text-4xl md:hidden" onClick={toggleHandler}>
        <Image
          src={'/icons/list.svg'}
          width={40}
          height={40}
          alt="list"
          className="cursor-pointer md:hidden "
        />
      </div>
    </nav>
  )
}

export default Navigation
