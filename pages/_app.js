import { Layout } from '../components/Index'
import layout from '@/components/Layout'
import '@/styles/globals.scss'
import { useEffect, useState } from 'react'
export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
