import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'

function AllProducts({ products }) {
  const [filteredProducts, setFilterProducts] = useState([...products])
  const filter = useSelector((state) => state.product.products)
  const { name, category, color, company } = filter
  useEffect(() => {
    if (name) {
      setFilterProducts((oldState) =>
        oldState.filter((product) => product.name.startsWith(name))
      )
    } else {
      setFilterProducts([...products])
    }
    if (category && category !== 'all') {
      setFilterProducts((oldState) =>
        oldState.filter((product) => product.category === category)
      )
    } else if (category === 'all') {
      setFilterProducts([...products])
    }
    if (company && company !== 'all') {
      console.log('company')

      setFilterProducts((oldState) =>
        oldState.filter((product) => product.company === company)
      )
    } else if (company === 'all') {
      setFilterProducts([...products])
    }
  }, [filter])
  const Div = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 96%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 10;
    border-radius: 8px;
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
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-1 lg:grid-cols-3">
      {products &&
        filteredProducts.map((product) => {
          return (
            <div key={product._id} className="relative">
              <div className="relative">
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
                <Image
                  src={product.image}
                  width={1200}
                  height={992}
                  alt={product.name}
                  className="relative rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-lg capitalize">{product.name}</h2>
                <p className="text-main">$ {product.price}</p>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default AllProducts
