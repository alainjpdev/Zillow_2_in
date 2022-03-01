import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Streams from './Streams'

export default {
  title: 'molecules/Streams',
  component: Streams,
} as ComponentMeta<typeof Streams>

const Template: ComponentStory<typeof Streams> = () => <Streams />

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
