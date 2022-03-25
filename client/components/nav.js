import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
function Navigation() {
  const links = ['home', 'about', 'products', 'cart', 'login']
  const [toggle, setToggle] = useState(false)
  const router = useRouter()
  const toggleHandler = () => setToggle(!toggle)
  let { user } = useSelector((state) => {
    return {
      user: state.product.user,
    }
  })
  if (user && typeof user === 'string') {
    user = JSON.parse(user)
  }

  return (
    <nav className=" shadow-lg">
      <div className="container flex items-center justify-between bg-white py-3">
        <div className="font-sofia text-3xl font-bold uppercase ">
          <span className=" text-mainDark" style={{ fontSize: '48px' }}>
            f
          </span>
          urniture
        </div>
        <div
          className={`fixed top-0 right-0 z-10 transition-all duration-[.4s]  ${
            !toggle ? '-translate-x-full md:translate-x-0 ' : 'translate-x-0 '
          }flex h-full  w-full flex-col bg-white md:relative md:w-fit md:bg-transparent`}
        >
          <div
            className="flex items-center justify-between p-5 md:hidden"
            onClick={toggleHandler}
          >
            <div className=" text-2xl font-bold uppercase">
              <span
                className="text-5xl text-mainDark"
                style={{ fontSize: '48px' }}
              >
                F
              </span>
              urniture
            </div>
            <Image
              src={'/icons/x-square-fill.svg'}
              width={28}
              height={28}
              alt="list"
              className="cursor-pointer bg-white"
            />
          </div>
          <ul className="mt-12 flex flex-col  space-y-4 p-9 text-xl  md:mt-0  md:flex-row md:space-x-5 md:space-y-0 md:p-0 ">
            {links.map((link) => {
              return (
                <li
                  key={link}
                  onClick={toggleHandler}
                  className={`capitalize transition-all duration-[.4s] hover:px-4  hover:font-bold hover:text-secondary md:hover:px-0 md:hover:font-normal 
                `}
                >
                  <Link href={`/${link === 'home' ? '' : link}`}>
                    <a
                      className={`${
                        router.pathname === `/${link}`
                          ? 'rounded-lg bg-main py-1 px-2 text-white'
                          : ''
                      }
                    ${
                      router.pathname === `/` && link === 'home'
                        ? 'rounded-lg bg-main py-1 px-2 text-white'
                        : ''
                    }
                    
                   `}
                    >
                      {link === 'login' && user && typeof user !== 'string'
                        ? `${user.name}`
                        : link}
                    </a>
                  </Link>
                </li>
              )
            })}
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
      </div>
    </nav>
  )
}

export default Navigation
