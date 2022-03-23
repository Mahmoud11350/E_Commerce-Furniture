import styled from 'styled-components'
import Image from 'next/image'
function OurStory() {
  return (
    <section className="container grid grid-cols-1 items-center gap-8 py-12 md:grid-cols-2">
      <div>
        <Image
          src="/LivingRoom.jpg"
          width={800}
          height={533}
          alt="Living Room"
          className="rounded-lg"
        />
      </div>
      <div>
        <H1 className="relative mb-4 text-2xl text-main">Our Story</H1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat
          accusantium sapiente tempora sed dolore esse deserunt eaque excepturi,
          delectus error accusamus vel eligendi, omnis beatae. Quisquam, dicta.
          Eos quod quisquam esse recusandae vitae neque dolore, obcaecati
          incidunt sequi blanditiis est exercitationem molestiae delectus saepe
          odio eligendi modi porro eaque in libero minus unde sapiente
          consectetur architecto. Ullam rerum, nemo iste ex, eaque perspiciatis
          nisi, eum totam velit saepe sed quos similique amet. Ex, voluptate
          accusamus nesciunt totam vitae esse iste.
        </p>
      </div>
    </section>
  )
}

export default OurStory

const H1 = styled.h1`
    &:after {
      content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 73px;
    height: 2px;
    background-color: var(--main);
}
    }
  `
