import React from 'react'
import SliderMui from './SliderMui'

describe('SliderMui Component', () => {
  beforeEach(() => {
    cy.mount(
      <SliderMui
        initialData={[0, 100]}
        step={12}
        value={[34, 56]}
        onChange={() => {}}
      />
    )
  })
  it('SliderMui renders', () => {})
})