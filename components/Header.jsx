import { useTheme } from 'next-themes'
import Link from 'next/link'
import React, { useEffect } from 'react'
const Header = () => {
    const categories = [{ name: 'React', slug: 'react' }, { name: 'Web Development', slug: 'webdev' }]
    const { theme, setTheme } = useTheme()

useEffect(() => {
    if (theme === 'light') {
        document.body.style.backgroundImage = "url('https://raw.githubusercontent.com/adrianhajdin/project_graphql_blog/main/public/bg.jpg')"
    } else {
        document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1502239608882-93b729c6af43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')"
    }
}, [])


    const changeTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
        if (theme === 'dark') {
            document.body.style.backgroundImage = "url('https://raw.githubusercontent.com/adrianhajdin/project_graphql_blog/main/public/bg.jpg')"
        } else {
            document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1502239608882-93b729c6af43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')"
        }
    }
    return (
        <div className='container mx-auto px-10 mb-8'>
            <div className='border-b w-full inline-block border-blue-400 py-8'>
                <div className='md:float-left block'>
                    <Link href={'/'}>
                        <span className='cursor-pointer font-bold text-4xl text-white'>
                            Graph CMS
                        </span>
                    </Link>
                </div>
                <div className='hidden md:float-left md:contents' >
                    {
                        categories.map((category) => <Link key={category.slug} href={`/category/${category.slug}`}>
                            <span className='md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer'>
                                {category.name}
                            </span>
                        </Link>)
                    }
                </div>
            </div>
            <button className='bg-cyan-400 rounded-3xl shadow-xl p-3 dark:bg-slate-800 ' onClick={changeTheme}>Change Mode</button>
        </div>
    )
}

export default Header