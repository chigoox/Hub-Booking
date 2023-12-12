import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from './Support/Componets/NavBar/NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TheHub',
  description: 'Rentals',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        {children}
      </body>
    </html>
  )
}
