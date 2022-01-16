import { useState } from 'react'
import Image from 'src/components/atoms/Image'
import HScroll from 'src/components/molecules/HScroll'

export interface IProductPageCarouselProps {}
const data = [
  'https://res.cloudinary.com/thankyou/image/upload/v1640667691/nike/rowan-heuvel-bjej8BY1JYQ-unsplash_ekhbh0.jpg',
  'https://res.cloudinary.com/thankyou/image/upload/v1640617959/nike/house1_tmtonc.jpg',
  'https://res.cloudinary.com/thankyou/image/upload/v1640674085/nike/villas_xev2wm.jpg',
  'https://res.cloudinary.com/thankyou/image/upload/v1640667691/nike/rowan-heuvel-bjej8BY1JYQ-unsplash_ekhbh0.jpg',
  'https://res.cloudinary.com/thankyou/image/upload/v1640617959/nike/house1_tmtonc.jpg',
  'https://res.cloudinary.com/thankyou/image/upload/v1640674085/nike/villas_xev2wm.jpg',
  'https://res.cloudinary.com/thankyou/image/upload/v1640667691/nike/rowan-heuvel-bjej8BY1JYQ-unsplash_ekhbh0.jpg',
  'https://res.cloudinary.com/thankyou/image/upload/v1640617959/nike/house1_tmtonc.jpg',
  'https://res.cloudinary.com/thankyou/image/upload/v1640674085/nike/villas_xev2wm.jpg',
  'https://res.cloudinary.com/thankyou/image/upload/v1640667691/nike/rowan-heuvel-bjej8BY1JYQ-unsplash_ekhbh0.jpg',
  'https://res.cloudinary.com/thankyou/image/upload/v1640617959/nike/house1_tmtonc.jpg',
  'https://res.cloudinary.com/thankyou/image/upload/v1640674085/nike/villas_xev2wm.jpg',
]

const ProductPageCarousel = ({}: IProductPageCarouselProps) => {
  const [selected, setSelected] = useState(0)
  return (
    <div>
      <div className='h-96'>
        <Image
          key={data[selected]}
          src={data[selected]}
          alt=''
          className='h-full border border-white rounded-lg shadow-md'
        />
      </div>

      <HScroll className='relative flex gap-2 h-28'>
        <HScroll.Body>
          {data.map((item, index) => (
            <Image
              key={item}
              src={item}
              alt=''
              className='h-full border border-white rounded-lg shadow-md w-44'
              onClick={() => setSelected(index)}
            />
          ))}
        </HScroll.Body>
        <HScroll.LeftArrow className='absolute right-0 z-10 h-full'>
          <div className='flex items-center justify-center w-8 h-8 bg-white rounded-full opacity-90'>
            &gt;
          </div>
        </HScroll.LeftArrow>

        <HScroll.RightArrow className='absolute left-0 z-10 h-full'>
          <div className='flex items-center justify-center w-8 h-8 bg-white rounded-full opacity-90'>
            &lt;
          </div>
        </HScroll.RightArrow>
      </HScroll>
    </div>
  )
}

export default ProductPageCarousel