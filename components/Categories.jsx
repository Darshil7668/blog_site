import { fadeRight } from '@/animations/animation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getCategories } from './Fetch'

const Categories = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories))
  }, [])
  return (
    
    <motion.div variants={fadeRight} initial={fadeRight.initial} animate={fadeRight.animate} className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8 dark:bg-gray-800 dark:bg-opacity-40">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Categories</h3>
      {categories.map((category, index) => (
        <Link key={index} href={`/category/${category.slug}`}>
          <span className={`cursor-pointer block ${(index === categories.length - 1) ? 'border-b-0' : 'border-b'} pb-3 mb-3`}>{category.name}</span>
        </Link>
      ))}
    </motion.div>
  )
}

export default Categories