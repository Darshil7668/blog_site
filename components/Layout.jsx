import React from 'react'
import { Header } from './Index'

const layout = ({ children }) => {
    return (
        <>
            <Header />
            {children}
        </>
    )
}

export default layout