import Image from 'next/image'
import React from 'react'

const Author = ({ author }) => {
  return (
    <div className="text-center  mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
      <div className=" absolute left-44 right-0 ">
        <Image
          unoptimized
          alt={author.name}
          height={100}
          width={100}
          className="align-middle rounded-lg"
          src={author.photo.url}
        />
      </div>
      <h3 className="text-white mt-4 mb-4 text-xl font-bold">{author.name}</h3>
      <p className="text-white text-ls">{author.bio}</p>
    </div>
  )
}

export default Author