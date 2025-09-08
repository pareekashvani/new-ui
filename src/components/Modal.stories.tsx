import type { Meta, StoryObj } from '@storybook/react'
import { Modal } from './Modal'
import { useState } from 'react'

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: { type: 'boolean' },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const ModalWithState = (args: any) => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="btn-primary"
      >
        Open Modal
      </button>
      <Modal
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Modal Title</h2>
          <p className="text-surface-600 dark:text-surface-400 mb-6">
            This is a modal dialog. It can contain any content you want to display to the user.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setIsOpen(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="btn-primary"
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export const Default: Story = {
  render: ModalWithState,
  args: {
    title: 'Default Modal',
  },
}

export const Small: Story = {
  render: ModalWithState,
  args: {
    title: 'Small Modal',
    size: 'sm',
  },
}

export const Large: Story = {
  render: ModalWithState,
  args: {
    title: 'Large Modal',
    size: 'lg',
  },
}

export const WithoutTitle: Story = {
  render: ModalWithState,
  args: {},
}
