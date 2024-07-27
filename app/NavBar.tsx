"use client"
import Link from 'next/link'
import React from 'react'
import { FaBug } from "react-icons/fa";
import { usePathname } from 'next/navigation';
import classnames from 'classnames';

export const NavBar = () => {
    const links = [
        {label: 'Dashboard', href: '/'},
        {label: 'Issues', href:'/issues'}
    ]
    const currentPath = usePathname()

    return (
        <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
            <Link href="/">
                <FaBug />
            </Link>
            <ul className='flex space-x-6'>
                {links.map(link=>
                <li>
                    <Link 
                    href={link.href} 
                    className={classnames({
                        'text-zinc-900': link.href===currentPath,
                        'text-zinc-500': link.href!==currentPath,
                        'hover:text-zinc-800': true,
                        'transition-colors': true
                    })}
                    >
                        {link.label}
                    </Link>
                </li>
                )
                }
            </ul>
        </nav>
    )
}
