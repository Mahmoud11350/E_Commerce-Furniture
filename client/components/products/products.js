import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'

function AllProducts({ products }) {
  const [filteredProducts, setFilterProducts] = useState([...products])
  const filter = useSelector((state) => state.product.products)
  const { name, category, color, company, freeShipping } = filter
  let newProducts = []
  useEffect(() => {
    newProducts = products
      .filter((product) => {
        return name === '' ? product : product.name.startsWith(name)
      })
      .filter((product) => {
        return category === 'all' ? product : product.category === category
      })
      .filter((product) => {
        return company === 'all' ? product : product.company === company
      })
      .filter((product) => {
        return color === 'allColor' ? product : product.colors.includes(color)
      })
      .filter((product) => {
        return freeShipping === ''
          ? product
          : freeShipping === false
          ? product
          : product.shipping === freeShipping
      })

    setFilterProducts(newProducts)
  }, [filter])
  console.log(filter)

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-1 lg:grid-cols-3">
      {products &&
        filteredProducts.map((product) => {
          return (
            <WrapDiv key={product._id} className="relative">
              <div className=" relative">
                <Link href={`/product/${product._id}`}>
                  <Div>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        fill="currentColor"
                        className="bi bi-search  "
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                      </svg>
                    </div>
                  </Div>
                </Link>
                <div className="">
                  <Image
                    src={product.image}
                    width={1200}
                    height={992}
                    alt={product.name}
                    className="scale-200 relative rounded transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-lg capitalize">{product.name}</h2>
                <p className="text-main">$ {product.price}</p>
              </div>
            </WrapDiv>
          )
        })}
      <div>
        {filteredProducts.length === 0 && (
          <h2 className="text-center text-lg font-bold capitalize text-mainDark">
            sorry , your filters doesn't match any products
          </h2>
        )}
      </div>
    </div>
  )
}

export default AllProducts
const Div = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 98%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 10;
  border-radius: 4px;
  opacity: 0;
  cursor: pointer;
  transition: opacity 0.4s;

  &:hover {
    opacity: 1;
  }
  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
  }
`
const WrapDiv = styled.div`
  &:hover img {
    transform: scale(1.3);
  }
`
