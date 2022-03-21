function Subscribe() {
  return (
    <section className="container py-12">
      <div className="text-2xl capitalize text-main ">
        Join our newsletter and get 20% off
      </div>
      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat sint
          unde quaerat ratione soluta veniam provident adipisci cumque eveniet
          tempore?
        </div>
        <div>
          <form>
            <input
              type="text"
              className="w-3/4 rounded-l border-2 border-main py-2 px-2 text-lg outline-none"
            />
            <button className="rounded-r border-2 border-main bg-main py-2 px-2 text-lg text-white">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Subscribe
