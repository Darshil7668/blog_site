import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { PostWidget, Categories, PostCard } from '../components/Index'
import { getPosts } from '@/components/Fetch'
import FeaturedPosts from '@/section/FeaturedPost'
const index = ({ posts }) => {
  console.log(posts);
  return (
    <>
      <div className='container mx-auto px-10 mb-8   '>
        <Head>
          <title>CMS Blog</title>
          <Link rel='icon' href={'../public/favicon.ico'} />
        </Head>
        <FeaturedPosts />
        <div className=''>
          <div className='row-span-10'>
            {posts.map((post, index) => <PostCard key={index} post={post} />)}
          </div>
          <div className='lg:col-span-4 col-span-12 '>
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </>
  )
}
export default index

export async function getStaticProps() {
  const posts = (await getPosts()) || [];
  return {
    props: { posts },
  };
}