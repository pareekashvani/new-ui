import type { Meta, StoryObj } from '@storybook/react'
import { ChatBubble } from './ChatBubble'

const meta: Meta<typeof ChatBubble> = {
  title: 'Components/ChatBubble',
  component: ChatBubble,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    role: {
      control: { type: 'select' },
      options: ['user', 'assistant'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const UserMessage: Story = {
  args: {
    role: 'user',
    content: 'Hello! Can you help me with a coding problem?',
    timestamp: new Date(),
  },
}

export const AssistantMessage: Story = {
  args: {
    role: 'assistant',
    content: 'Of course! I\'d be happy to help you with your coding problem. What specific issue are you working on?',
    timestamp: new Date(),
  },
}

export const LongMessage: Story = {
  args: {
    role: 'assistant',
    content: `This is a longer message that demonstrates how the chat bubble handles multiple lines of text. It should wrap properly and maintain good readability.

The message can contain multiple paragraphs and should still look good in the interface. This helps users read longer responses from the AI assistant without any formatting issues.`,
    timestamp: new Date(),
  },
}

export const CodeMessage: Story = {
  args: {
    role: 'assistant',
    content: `Here's a simple React component:

\`\`\`jsx
function Button({ children, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      {children}
    </button>
  );
}
\`\`\`

This component accepts children and an onClick handler as props.`,
    timestamp: new Date(),
  },
}
