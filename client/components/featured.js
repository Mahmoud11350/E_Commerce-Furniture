import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
function Featured({ featured }) {
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
    <section className="mt-8 bg-[#eee] pb-8">
      <h2 className="relative py-8 text-center text-4xl font-bold text-main after:absolute after:bottom-[30px] after:left-1/2 after:h-[2px] after:w-24 after:-translate-x-1/2 after:bg-main">
        Featured
      </h2>
      <div className="container mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
        {featured.map((product) => {
          return (
            <div key={product._id}>
              <Link href={`/product/${product._id}`}>
                <div className="cursor-pointer">
                  <div className="relative">
                    <Div>
                      <div>
                        {' '}
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
                    <Image
                      src={product.image}
                      width={1200}
                      height={992}
                      alt={product.name}
                      className="relative rounded"
                    ></Image>
                  </div>

                  <div className="flex justify-between uppercase">
                    <span className="text-md font-bold text-main">
                      {product.name}
                    </span>
                    <span className="text-mainDark">{product.price} $</span>
                  </div>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Featured
