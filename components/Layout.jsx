import React from 'react'
import { Header } from './Index'

const layout = ({ children }) => {
    return (
        <>
            <Header />
            <title>CMS Blog</title>
            {children}
        </>
    )
}

export default layout