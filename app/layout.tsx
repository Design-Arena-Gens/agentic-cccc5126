import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Gmail & Notion Agent',
  description: 'AI Agent with Gmail and Notion integration',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
