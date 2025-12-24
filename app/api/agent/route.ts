import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { command, gmailApiKey, notionApiKey, notionDatabaseId } = await request.json()

    if (!command) {
      return NextResponse.json(
        { error: 'Command is required' },
        { status: 400 }
      )
    }

    const commandLower = command.toLowerCase()
    let result: any = {}

    // Gmail operations
    if (commandLower.includes('email') || commandLower.includes('gmail')) {
      if (!gmailApiKey) {
        return NextResponse.json(
          { error: 'Gmail API key is required for email operations' },
          { status: 400 }
        )
      }

      if (commandLower.includes('latest') || commandLower.includes('recent') || commandLower.includes('get')) {
        result.gmail = {
          action: 'list_emails',
          status: 'simulated',
          message: 'Gmail API integration ready. In production, this would fetch your latest emails.',
          data: {
            emails: [
              {
                id: '1',
                from: 'example@gmail.com',
                subject: 'Welcome to Gmail Agent',
                snippet: 'This is a simulated email response...',
                date: new Date().toISOString()
              }
            ]
          }
        }
      } else if (commandLower.includes('send')) {
        result.gmail = {
          action: 'send_email',
          status: 'simulated',
          message: 'Gmail API integration ready. In production, this would send an email.',
        }
      } else if (commandLower.includes('search')) {
        result.gmail = {
          action: 'search_emails',
          status: 'simulated',
          message: 'Gmail API integration ready. In production, this would search your emails.',
        }
      }
    }

    // Notion operations
    if (commandLower.includes('notion') || commandLower.includes('database') || commandLower.includes('page')) {
      if (!notionApiKey) {
        return NextResponse.json(
          { error: 'Notion API key is required for Notion operations' },
          { status: 400 }
        )
      }

      if (commandLower.includes('create') && commandLower.includes('page')) {
        result.notion = {
          action: 'create_page',
          status: 'simulated',
          message: 'Notion API integration ready. In production, this would create a new page.',
        }
      } else if (commandLower.includes('list') || commandLower.includes('get')) {
        result.notion = {
          action: 'list_databases',
          status: 'simulated',
          message: 'Notion API integration ready. In production, this would list your databases.',
          data: {
            databases: [
              {
                id: 'demo-db-123',
                title: 'Sample Database',
                created_time: new Date().toISOString()
              }
            ]
          }
        }
      } else if (commandLower.includes('query') || commandLower.includes('search')) {
        result.notion = {
          action: 'query_database',
          status: 'simulated',
          message: 'Notion API integration ready. In production, this would query the database.',
        }
      }
    }

    // Combined operations
    if (Object.keys(result).length === 0) {
      result = {
        message: 'Command received. Specify "email" for Gmail operations or "notion" for Notion operations.',
        examples: [
          'Get my latest emails',
          'Create a new Notion page',
          'List my Notion databases',
          'Search emails from specific sender'
        ]
      }
    }

    result.command_received = command
    result.timestamp = new Date().toISOString()
    result.note = 'This is a demo implementation. Connect real API keys to enable full functionality.'

    return NextResponse.json(result)
  } catch (error: any) {
    console.error('Agent error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
