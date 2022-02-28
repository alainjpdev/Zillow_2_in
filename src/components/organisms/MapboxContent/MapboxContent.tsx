import { Ref } from 'react'
import { useTransition, animated, config } from 'react-spring'

import {
  useGetHomeByIdQuery,
  useSearchHomesByLocationQuery,
} from 'src/generated/graphql'
import { useAppSelector, useAppDispatch } from 'src/store'
import { NavigationControl, Marker, MapRef } from 'react-map-gl'
import RefreshIcon from '@heroicons/react/outline/RefreshIcon'
import {
  selectFilters,
  selectHighlightedHomeId,
  setHighlightedHomeId,
  setMapLocation,
} from 'src/store/cities/citySlice'
import MapMarker from 'src/components/molecules/MapMarker'
import MapPopup from 'src/components/molecules/Popup'
import GlobeIcon from '@heroicons/react/outline/GlobeIcon'

const MapboxContent = ({ mapRef }: { mapRef: Ref<MapRef> | undefined }) => {
  const dispatch = useAppDispatch()
  /**
   * Query homes and create animated markers.
   */
  const filterVariables = useAppSelector(selectFilters)
  const [{ data: homesMap, fetching, error }] = useSearchHomesByLocationQuery({
    variables: filterVariables,
  })

  const highlightedHomeId = useAppSelector(selectHighlightedHomeId)

  const [highlightedHomeDetails] = useGetHomeByIdQuery({
    variables: {
      id: highlightedHomeId,
    },
  })

  const markersTransitions = useTransition(homesMap?.homes || [], {
    keys: (home) => home.id,
    from: { opacity: 0, transform: 'translateY(-6px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0, transform: 'translateY(-6px)' },
    trail: 50,
    duration: 500,
    config: config.gentle,
  })
  const cityMarkersTransitions = useTransition(homesMap?.cities || [], {
    keys: (city) => city.id,
    from: { opacity: 0, transform: 'translateY(6px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0, transform: 'translateY(6px)' },
    trail: 100,
    duration: 2000,
    config: config.wobbly,
  })

  return (
    <>
      <NavigationControl showCompass={false} className='z-30 p-2 ' />

      {fetching && (
        <div className='absolute top-0 right-0 flex justify-end w-10 h-10 p-2 text-gray-700 '>
          <RefreshIcon className='w-full h-full animate-spin-reverse' />
        </div>
      )}
      {error && (
        <div className='absolute top-0 right-0 flex justify-end w-full h-10 p-2 text-red-700 bg-red-200/50 '>
          Someting went wrong.
        </div>
      )}
      {markersTransitions((style, marker) => (
        <>
          {highlightedHomeId === marker.id && (
            <MapPopup
              marker={marker}
              highlightedHome={highlightedHomeDetails}
            />
          )}
          <animated.div key={marker?.id} style={style}>
            {/* FIX */}
            <MapMarker
              lat={marker.lat}
              lng={marker.lng}
              style={marker.style}
              highlighted={highlightedHomeId === marker.id}
              mouseHoverAction={() => dispatch(setHighlightedHomeId(marker.id))}
              mouseLeaveAction={() => dispatch(setHighlightedHomeId(null))}
            />
          </animated.div>
        </>
      ))}
      {cityMarkersTransitions((style, marker) => (
        <animated.div
          key={marker?.id}
          style={style}
          onClick={() => {
            dispatch(
              setMapLocation({
                latitude: marker.lat,
                longitude: marker.lng,
                zoom: 10,
              })
            )
          }}
        >
          {/* FIX */}
          <Marker latitude={marker.lat} longitude={marker.lng}>
            <div className='flex items-center justify-center p-3 font-light text-white border-2 border-black rounded-full shadow-xl shadow-gray-600 aspect-square bg-black/80'>
              {marker.propertiesCount}
            </div>
          </Marker>
        </animated.div>
      ))}
      <button
        type='button'
        className='border border-white bg-white/30'
        onClick={() => {
          dispatch(
            setMapLocation({
              latitude: 39.0119,
              longitude: -98.4842,
              zoom: 3,
            })
          )
        }}
      >
        <GlobeIcon className='absolute top-0 right-0 z-20 w-10 h-10 p-2' />
      </button>
    </>
  )
}

export default MapboxContent
