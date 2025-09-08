import { NextResponse } from 'next/server'

export async function GET() {
  const templates = [
    {
      id: '1',
      name: 'Code Review',
      content: 'Please review the following code and provide feedback on:\n1. Code quality and best practices\n2. Potential bugs or issues\n3. Performance optimizations\n4. Security considerations\n\nCode:\n',
      category: 'Development',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      name: 'Creative Writing',
      content: 'Write a creative story about a character who discovers they have the ability to...',
      category: 'Creative',
      createdAt: '2024-01-14T15:30:00Z',
      updatedAt: '2024-01-14T15:30:00Z'
    },
    {
      id: '3',
      name: 'Data Analysis',
      content: 'Analyze the following dataset and provide insights on:\n1. Key trends and patterns\n2. Statistical significance\n3. Recommendations for action\n\nData:\n',
      category: 'Analysis',
      createdAt: '2024-01-13T09:15:00Z',
      updatedAt: '2024-01-13T09:15:00Z'
    },
    {
      id: '4',
      name: 'Email Draft',
      content: 'Draft a professional email with the following details:\n\nTo: \nSubject: \nPurpose: \nKey points to include:\n',
      category: 'Communication',
      createdAt: '2024-01-12T14:20:00Z',
      updatedAt: '2024-01-12T14:20:00Z'
    },
    {
      id: '5',
      name: 'Meeting Summary',
      content: 'Summarize the following meeting notes:\n\nDate: \nAttendees: \nKey discussion points:\n\nPlease provide:\n1. Executive summary\n2. Action items\n3. Next steps',
      category: 'Business',
      createdAt: '2024-01-11T11:45:00Z',
      updatedAt: '2024-01-11T11:45:00Z'
    }
  ]

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))

  return NextResponse.json({ templates })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, content, category } = body

    if (!name || !content) {
      return NextResponse.json(
        { error: 'Name and content are required' },
        { status: 400 }
      )
    }

    const newTemplate = {
      id: Date.now().toString(),
      name,
      content,
      category: category || 'General',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200))

    return NextResponse.json({ template: newTemplate }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}
