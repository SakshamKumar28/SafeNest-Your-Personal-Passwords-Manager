import React from 'react'
import { useState } from 'react'

const Navbar = () => {
    const [hover, setHover] = useState(false);
    return (
        <nav className='bg-green-400 flex justify-between items-center p-4'>
            
            <h1 className='font-bold text-lg'>Safe<span className='text-green-900'>Nest</span></h1>
            
            <button 
                onMouseEnter={() => setHover(true)} 
                onMouseLeave={() => setHover(false)} 
                className='flex items-center space-x-2 transition duration-300 cursor-pointer'
            >
                <span className={`font-semibold transition-opacity duration-300 ${hover ? 'opacity-100' : 'opacity-0'}`}>
                    GitHub
                </span>
                <a href="https://github.com/SakshamKumar28/SafeNest-Your-Personal-Passwords-Manager.git" target='_blank'><img className='w-6 rounded-full' src="/icons/github-logo.png" alt="github" /></a>
            </button>
        </nav>
    )
}

export default Navbar
