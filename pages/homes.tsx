import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import ProductListingPage from 'src/components/templates/ProductListingPage'

const Signup: NextPage = () => (
  <div>
    <NextSeo
      title='Next boilerplate - Sample page.'
      description='This is the amazing sample page. A short description goes here which says what goes here.'
    />
    <ProductListingPage />
  </div>
)

export default Signup