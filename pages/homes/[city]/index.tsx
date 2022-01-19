import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/dist/client/router'
import ProductListingPage from 'src/components/templates/ProductListingPage'

const Homes: NextPage = () => {
  const router = useRouter()
  const { city } = router.query
  console.log('Router city: ', city)

  return (
    <div>
      <NextSeo
        title='Next boilerplate - Sample page.'
        description='This is the amazing sample page. A short description goes here which says what goes here.'
      />
      <ProductListingPage />
    </div>
  )
}

export default Homes
