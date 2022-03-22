import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import SignUp from 'src/components/templates/Signup'
import { useRedirectLoggedInUsers } from 'src/hooks'

const Signup: NextPage = () => {
  useRedirectLoggedInUsers()
  return (
    <div>
      <NextSeo
        title='🏡 Next boilerplate - Sample page.'
        description='This is the amazing sample page. A short description goes here which says what goes here.'
      />
      <SignUp />
    </div>
  )
}

export default Signup
