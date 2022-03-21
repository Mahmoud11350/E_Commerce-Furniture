import Image from 'next/image'
import styled from 'styled-components'
function Header() {
  const Div = styled.div`
    position: relative;

    &:after {
     content: '';
    right: -23px;
    position: absolute;
    top: 50%;
    height: 113%;
    width: 50px;
    background-color: var(--main);
    transform: translateY(-50%);
    z-index: -1;
}
    }
  `
  return (
    <section className="container grid items-center gap-5 pt-12 md:grid-cols-2">
      <div>
        <h2 className="text-2xl font-bold text-main md:text-3xl lg:text-4xl">
          Design Your Comfort Zone
        </h2>
        <p className="w- py-4">
          rem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, at sed
          omnis corporis doloremque possimus velit! Repudiandae nisi odit,
          aperiam odio ducimus, obcaecati libero et quia tempora excepturi quis
          alias?
        </p>
        <button className=" rounded border-2 border-main py-2 px-6 text-lg transition-colors duration-300 hover:bg-main hover:text-white">
          Shop Now
        </button>
      </div>
      <div>
        <Div className="hidden md:block">
          <Image
            src="/LivingRoom.jpg"
            width={800}
            height={533}
            alt="Living Room"
            className="rounded "
          />
        </Div>
      </div>
    </section>
  )
}

export default Header
