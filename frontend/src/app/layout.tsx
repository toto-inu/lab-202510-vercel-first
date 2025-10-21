import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'Next.js + NestJS Todo Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
