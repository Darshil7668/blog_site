import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { PostWidget, Categories, PostCard } from '../components/Index'
import { getPostDetails, getPosts } from '@/components/Fetch'
import FeaturedPosts from '@/section/FeaturedPost'
const Index = ({ posts }) => {

  useEffect(() => {
  }, [])

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
            {/* <PostWidget slug={null} categories={null} /> */}
            <Categories />
          </div>
        </div>
      </div>
    </>
  )
}
export default Index

export async function getStaticProps() {
  const posts = (await getPosts()) || [];
  return {
    props: { posts },
  };
}