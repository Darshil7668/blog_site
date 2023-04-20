import { Layout } from '../components/Index'
import layout from '@/components/Layout'
import '@/styles/globals.scss'
import { ThemeProvider } from 'next-themes'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute='class'>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}
