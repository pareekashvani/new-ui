import type { Meta, StoryObj } from '@storybook/react'
import { Slider } from './Slider'
import { useState } from 'react'

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    min: {
      control: { type: 'number' },
    },
    max: {
      control: { type: 'number' },
    },
    step: {
      control: { type: 'number' },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const SliderWithState = (args: any) => {
  const [value, setValue] = useState(args.value || 0.5)
  
  return (
    <div className="w-80">
      <Slider
        {...args}
        value={value}
        onChange={setValue}
      />
      <div className="mt-2 text-sm text-surface-600 dark:text-surface-400">
        Current value: {value}
      </div>
    </div>
  )
}

export const Default: Story = {
  render: SliderWithState,
  args: {
    min: 0,
    max: 1,
    step: 0.1,
    value: 0.5,
    'aria-label': 'Temperature slider',
  },
}

export const Temperature: Story = {
  render: SliderWithState,
  args: {
    min: 0,
    max: 2,
    step: 0.1,
    value: 0.7,
    'aria-label': 'Temperature',
  },
}

export const MaxTokens: Story = {
  render: SliderWithState,
  args: {
    min: 100,
    max: 4000,
    step: 100,
    value: 1000,
    'aria-label': 'Max Tokens',
  },
}

export const TopP: Story = {
  render: SliderWithState,
  args: {
    min: 0,
    max: 1,
    step: 0.01,
    value: 1,
    'aria-label': 'Top P',
  },
}
