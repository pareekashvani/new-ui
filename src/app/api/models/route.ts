import { NextResponse } from 'next/server'

export async function GET() {
  const models = [
    {
      id: 'gpt-4',
      name: 'GPT-4',
      description: 'Most capable model for complex tasks',
      provider: 'OpenAI',
      maxTokens: 8192,
      capabilities: ['text', 'code', 'reasoning']
    },
    {
      id: 'gpt-3.5-turbo',
      name: 'GPT-3.5 Turbo',
      description: 'Fast and efficient for most tasks',
      provider: 'OpenAI',
      maxTokens: 4096,
      capabilities: ['text', 'code']
    },
    {
      id: 'claude-3',
      name: 'Claude 3',
      description: 'Anthropic\'s latest model with strong reasoning',
      provider: 'Anthropic',
      maxTokens: 200000,
      capabilities: ['text', 'analysis', 'reasoning']
    },
    {
      id: 'claude-2',
      name: 'Claude 2',
      description: 'Previous generation Claude model',
      provider: 'Anthropic',
      maxTokens: 100000,
      capabilities: ['text', 'analysis']
    },
    {
      id: 'gemini-pro',
      name: 'Gemini Pro',
      description: 'Google\'s advanced multimodal model',
      provider: 'Google',
      maxTokens: 30720,
      capabilities: ['text', 'code', 'multimodal']
    }
  ]

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  return NextResponse.json({ models })
}
