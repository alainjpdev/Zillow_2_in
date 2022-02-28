import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { NextSeo } from 'next-seo'
import Hero from 'src/components/templates/Hero'
import Cities from 'src/components/templates/Cities'
import CityCard, { CityCardShadow } from 'src/components/organisms/CityCard'
import BannerHomeLoan from 'src/components/organisms/BannerHomeLoan'
import { BadgeCheckIcon } from '@heroicons/react/solid'
import useTriggerOnScroll from 'src/hooks'
import Image from 'src/components/atoms/Image'
import React from 'react'
import { useGetCitiesQuery } from 'src/generated/graphql'
import HScroll from 'src/components/molecules/HScroll'

export const getStaticProps: GetStaticProps = async () => ({
  props: { data: ['Karthick', 'Ragavendran'] }, // will be passed to the page component as props
})

const Home: NextPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [{ data: citiesData, fetching }] = useGetCitiesQuery()

  const [show, el] = useTriggerOnScroll()

  return (
    <div>
      <NextSeo
        title='Zillow - Refactor'
        description='A short description goes here which says what goes here.'
      />
      <Head>
        <title>Zillow - Refactor</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Hero />

        <div className='container mx-auto space-y-24'>
          <Cities title='Buy a home' description=''>
            <HScroll className='mt-2'>
              <HScroll.Arrow
                className='absolute right-0 h-full'
                right
                distance={300}
              />
              <HScroll.Arrow
                className='absolute left-0 h-full '
                distance={300}
              />
              <HScroll.Body className='gap-4 mb-12'>
                {fetching
                  ? ['1', '2', '3', '4'].map((item) => (
                      <HScroll.Child key={item}>
                        <CityCardShadow />
                      </HScroll.Child>
                    ))
                  : citiesData?.cities?.map((city) => (
                      <HScroll.Child key={city.displayName}>
                        <CityCard
                          key={city.displayName}
                          displayName={city.displayName}
                          lat={city.lat}
                          lng={city.lng}
                          propertiesCount={city.propertiesCount}
                          image={city.image || ''}
                        />
                      </HScroll.Child>
                    ))}
              </HScroll.Body>
            </HScroll>
          </Cities>

          {/* <Cities
            title='Pick your style'
            description='No matter what path you take to sell your home, we can help you navigate a successful sale.'
          >
            <CityCard
              key='Los Angeles'
              displayName='Los Angeles'
              image='https://res.cloudinary.com/thankyou/image/upload/v1640726401/nike/cities/denys-nevozhai-k5w21D7PgMk-unsplash_zz2obf.jpg'
            />
            <CityCard key='Hello' displayName='Hello' />
            <CityCard key='Hello 2' displayName='Hello' />
            <CityCard key='Hello 3' displayName='Hello' />
          </Cities> */}
          <BannerHomeLoan
            title='Zillow Home Loans'
            description={
              <div>
                Get pre-approved and take a big step toward buying your new
                home.
              </div>
            }
            btnText='Request Pre approval'
          />
          <BannerHomeLoan
            reverse
            title='Find an Agent'
            src='https://res.cloudinary.com/thankyou/image/upload/v1640726673/nike/people/austin-distel-va_Opp86kfQ-unsplash_avexl4.jpg'
            description={
              <div>
                Zillow&apos;s directory of local real estate agents and brokers
                connects you with professionals who can help meet your needs.
              </div>
            }
            btnText='Find agents'
          />
          <BannerHomeLoan
            title='Zillow Rental Manager'
            description={
              <div>
                <ul>
                  <li className='flex items-center gap-2'>
                    <BadgeCheckIcon className='w-5 h-5 text-black' /> List your
                    rental.
                  </li>
                  <li className='flex items-center gap-2'>
                    <BadgeCheckIcon className='w-5 h-5 text-black' /> Screen
                    tenants.
                  </li>
                  <li className='flex items-center gap-2'>
                    <BadgeCheckIcon className='w-5 h-5 text-black' /> Sign a
                    lease.
                  </li>
                  <li className='flex items-center gap-2'>
                    <BadgeCheckIcon className='w-5 h-5 text-black' /> Get paid.
                  </li>
                </ul>
                <div className='mt-2'>All in one place!</div>
              </div>
            }
            btnText='Post your first listing free'
          />
          <div
            ref={el}
            className='flex flex-col items-center justify-center h-96'
          >
            <div className='text-4xl font-bold tracking-tighter text-luxury'>
              Most visited rental network
            </div>
            <div className='max-w-lg mt-4 text-center tex-gray-600'>
              Zillow Rentals is the most visited rental network with more than{' '}
              <strong className='whitespace-nowrap text-primary-500'>
                194 million
              </strong>{' '}
              average monthly unique users in Q2 2019.
            </div>
            <button
              className='flex items-center px-8 py-3 mt-6 font-semibold text-white capitalize rounded-full bg-primary-500' // bg-gradient-to-tr from-primary-400 to-primary-600
              type='button'
            >
              join now
            </button>
            {/* <ChevronRightIcon className='inline w-6 h-6 ml-3 ' /> */}
          </div>
          <div>
            <Image
              className='h-12'
              alt=''
              src='https://wp-tid.zillowstatic.com/bedrock/app/uploads/sites/2/2020/05/Zillow_Sites2x-cd3144-c697dc-fbb28e.png'
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
