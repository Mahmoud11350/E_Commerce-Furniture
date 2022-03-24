import { Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getProducts, clearFilters } from '../../store/productSlice'

function productsSidebar() {
  const [activeCompany, setactiveCompany] = useState('all')
  const [activeColor, setActiveColor] = useState('allColor')
  const dispatch = useDispatch()
  const products = useSelector((state) => state.product.products)
  const category = ['all', 'office', 'kitchen', 'bedroom']
  const company = ['all', 'liddy', 'marcos', 'ikea', 'caressa']
  const colors = [
    'allColor',
    '#ffb900',
    '#ff0000',
    '#00ff00',
    '#0000ff',
    '#000',
  ]
  const handleSubmit = (values) => {
    dispatch(getProducts({ values }))
  }
  const handleRemoveFilters = (values, { resetForm }) => {
    dispatch(clearFilters())
    setactiveCompany('all')
    setActiveColor('allColor')
    resetForm()
  }
  return (
    <>
      <div className="md:sticky md:top-10 md:h-screen ">
        <Formik
          initialValues={products}
          validate={handleSubmit}
          onSubmit={handleRemoveFilters}
        >
          <Form>
            <div>
              <Field
                name="name"
                type="text"
                className="mb-3 w-5/6 rounded border border-main py-1 px-2 outline-none"
                placeholder="Search"
              />
              <div>
                <h2 className="mb-3 text-lg capitalize">category</h2>
                <ul className="flex flex-wrap space-x-3 sm:space-x-0 md:flex-col">
                  <Field
                    as="select"
                    name="company"
                    className="relative w-5/6 border border-main bg-transparent py-1 px-2  capitalize md:hidden"
                  >
                    {category.map((item) => {
                      return (
                        <option
                          value={item}
                          key={item}
                          className="bg-mainLight"
                        >
                          {item}
                        </option>
                      )
                    })}
                  </Field>
                  {category.map((item) => {
                    return (
                      <div key={item}>
                        <Field
                          id={item}
                          name="category"
                          value={item}
                          type="radio"
                          className="hidden"
                        />
                        <label
                          htmlFor={item}
                          className={`mb-2 hidden h-fit cursor-pointer  rounded border border-main py-1 px-2 text-center capitalize hover:bg-secondary hover:text-white md:block md:w-5/6 ${
                            activeCompany === item
                              ? 'bg-secondary text-white'
                              : ''
                          }`}
                          onClick={() => setactiveCompany(item)}
                        >
                          {item}
                        </label>
                      </div>
                    )
                  })}
                </ul>
              </div>
            </div>
            <div>
              <h2 className="mb-3 text-lg capitalize">Company</h2>
              <Field
                as="select"
                name="company"
                className="w-5/6 border border-main bg-transparent py-1  px-2 capitalize"
              >
                {company.map((item) => {
                  return (
                    <option value={item} key={item} className=" bg-mainLight">
                      {item}{' '}
                    </option>
                  )
                })}
              </Field>
              <div>
                <h2 className="mb-3 mt-3 text-lg capitalize">colors</h2>
                <ul className="flex space-x-4">
                  {colors.map((color) => {
                    return (
                      <div key={color}>
                        <label
                          onClick={() => setActiveColor(color)}
                          htmlFor={color}
                          style={{ backgroundColor: color }}
                          className={`${
                            color === 'allColor'
                              ? ' cursor-pointer rounded-lg py-1 px-2'
                              : 'flex h-6 w-6 cursor-pointer items-center rounded-full'
                          }    ${
                            activeColor === color
                              ? ' h-7 w-7 border-4 border-main'
                              : ''
                          }`}
                        >
                          {color === 'allColor' && 'ALL'}
                        </label>
                        <Field
                          id={color}
                          value={color}
                          className="hidden"
                          type="radio"
                          name="color"
                        ></Field>
                      </div>
                    )
                  })}
                </ul>
              </div>
              <div className="mt-5">
                <Field id="shipping" name="freeShipping" type="checkbox" />

                <label className="text-md ml-4" htmlFor="shipping">
                  {' '}
                  Free Shipping
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="mt-5 rounded-lg bg-red-500 py-2 px-4 text-white transition-all duration-300 hover:bg-red-700 active:-translate-y-3"
            >
              Clear Fillters
            </button>
          </Form>
        </Formik>
      </div>
    </>
  )
}

export default productsSidebar
