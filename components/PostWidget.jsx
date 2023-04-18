import moment from 'moment/moment'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getRecentPosts, getSimilarPosts } from './Fetch'
const PostWidget = ({ category, slug }) => {
  const [realatedPost, setRealatedPost] = useState([])
  useEffect(() => {
    if (slug) {
      getSimilarPosts(category, slug)
        .then((result) => setRealatedPost(result))
    } else {
      getRecentPosts(category, slug).then((result) => setRealatedPost(result))
    }

  }, [slug])

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8>PostWidget">
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>
      {
        realatedPost.map((post) => (
          <div key={post.id} className='flex items-center w-full mb-4'>
            <div className='w-16 flex-none '>
              <Image
                alt={post.title}
                src={post.featuredImage.url}
                width={70}
                height={70}
                className='align-middle rounded-full'
              />
            </div>
            <div className="flex-grow ml-4">
              <p className="text-gray-500 font-xs">{moment(post.createdAt).format('MMM DD, YYYY')}</p>
              <Link href={`/post/${post.slug}`} className="text-md" >{post.title}</Link>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default PostWidget


