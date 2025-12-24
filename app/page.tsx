'use client'

import { useState } from 'react'
import { Mail, FileText, Send, CheckCircle, AlertCircle } from 'lucide-react'

export default function Home() {
  const [gmailApiKey, setGmailApiKey] = useState('')
  const [notionApiKey, setNotionApiKey] = useState('')
  const [notionDatabaseId, setNotionDatabaseId] = useState('')
  const [command, setCommand] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleExecute = async () => {
    setIsProcessing(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          command,
          gmailApiKey,
          notionApiKey,
          notionDatabaseId,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to execute command')
      }

      setResult(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            Gmail & Notion Agent
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            AI-powered assistant for Gmail and Notion integration
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
            <Mail className="w-5 h-5" />
            API Configuration
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Gmail API Key / OAuth Token
              </label>
              <input
                type="password"
                value={gmailApiKey}
                onChange={(e) => setGmailApiKey(e.target.value)}
                placeholder="Enter your Gmail API credentials"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Notion API Key
              </label>
              <input
                type="password"
                value={notionApiKey}
                onChange={(e) => setNotionApiKey(e.target.value)}
                placeholder="Enter your Notion integration token"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Notion Database ID (optional)
              </label>
              <input
                type="text"
                value={notionDatabaseId}
                onChange={(e) => setNotionDatabaseId(e.target.value)}
                placeholder="Enter database ID for operations"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Agent Command
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                What would you like the agent to do?
              </label>
              <textarea
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                placeholder="Examples:&#10;- Get my latest 5 emails&#10;- Create a new Notion page&#10;- List my Notion databases&#10;- Search emails from john@example.com"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            <button
              onClick={handleExecute}
              disabled={isProcessing || !command}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Execute Command
                </>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-300">Error</h3>
                <p className="text-red-700 dark:text-red-400 text-sm mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {result && (
          <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">Success</h3>
                <pre className="text-green-700 dark:text-green-400 text-sm bg-white dark:bg-gray-800 p-4 rounded overflow-x-auto">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
            Getting Started
          </h3>
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <div>
              <strong>Gmail Setup:</strong>
              <ol className="list-decimal ml-5 mt-1 space-y-1">
                <li>Go to Google Cloud Console</li>
                <li>Enable Gmail API</li>
                <li>Create OAuth 2.0 credentials or API key</li>
                <li>Paste your credentials above</li>
              </ol>
            </div>
            <div>
              <strong>Notion Setup:</strong>
              <ol className="list-decimal ml-5 mt-1 space-y-1">
                <li>Visit notion.so/my-integrations</li>
                <li>Create a new integration</li>
                <li>Copy the Internal Integration Token</li>
                <li>Share your databases with the integration</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
