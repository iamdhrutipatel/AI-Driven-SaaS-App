import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import BrandGuru from '@/components/brandguru'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>BrandGuru - An AI Assistant for Marketing</title>
        <meta name="description" content="generate branding snipeet, brand name and, keywords for your product" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BrandGuru />
    </>
  )
}
