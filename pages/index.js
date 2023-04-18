import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { PostWidget, Categories, PostCard } from '../components/Index'
import { fetch } from '@/components/Fetch'
const index = ({ posts }) => {
  return (
    <>
      <div className='container mx-auto px-10 mb-8   '>
        <Head>
          <title>CMS Blog</title>
          <Link rel='icon' href={'../public/favicon.ico'} />
        </Head>
        <div className='grid grid-cols-2 lg:grid-cols-12 gap-12'>
          <div className='lg:col-span-8 col-span-1'>
            {posts.map((post) => <PostCard post={post} key={post.id} />)}
          </div>
          <div className='lg:col-span-4 col-span-1'>
            <div className='lg:sticky relative top-8'>
              <PostWidget />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default index

export async function getStaticProps() {
  const posts = (await fetch()) || [];
  return {
    props: { posts },
  };
}