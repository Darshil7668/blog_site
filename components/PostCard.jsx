import { fadeLeft } from '@/animations/animation';
import { motion } from 'framer-motion';
import moment from 'moment/moment';
import Image from 'next/image';
import Link from 'next/link'
import React, {useEffect} from 'react'

const PostCard = ({ post,  index }) => {
  return (
    <motion.div variants={fadeLeft} initial={fadeLeft.initial} animate={fadeLeft.animate} className='bg-white  shadow-lg rounded-lg  p-0 lg:p-8 pb-12 mb-8 dark:bg-gray-800 dark:bg-opacity-40' id={`blog-${index}`>
      <div className='relative overflow-hidden shadow-md pb-80 mb-6 '>
        <div className='dark:bg-black absolute h-80 w-full  z-10 opacity-40'>
        </div>
        <Image
          className='object-top absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg z-0'
          src={post.node.featuredImage.url}
          alt={post.node.title}
          width={500}
          height={500}
        />
      </div>
      <h1 className="text-blue-900 transition duration-700 text-center mb-8 cursor-pointer hover:text-blue-400 text-3xl font-semibold">
        <Link href={`/post/${post.node.slug}`}>{post.title}</Link>
      </h1>
      <div className="block lg:flex text-center items-center justify-center mb-8 w-full ">
        <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8 items-center">

          <Image
            src={post.node.author.photo.url}
            alt="Picture of the author"
            width={30}
            height={30}
          />
          <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg dark:text-white">{post.node.author.name}</p>
        </div>
        <div className='font-medium text-gray-700'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="align-middle dark:text-white">{moment(post.node.createdAt).format('MMM DD, YYYY')}</span>
        </div>
      </div>
      <p className="text-center text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8 dark:text-white">
        {post.node.excerpt}
      </p>
      <div className="text-center">
        <Link href={`/post/${post.node.slug}`}>
          <span className=" transition duration-500 ease transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer dark:bg-slate-600 ">Continue Reading</span>
        </Link>
      </div>
    </motion.div>
  )
}

export default PostCard
