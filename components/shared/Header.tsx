import Link from 'next/link'
import React from 'react'

import {BookOpenIcon} from 'lucide-react'
import { SignedIn, SignedOut, UserButton, UserProfile } from '@clerk/nextjs'

const Header = () => {
  return (
    <header className='bg-background px-4 lg:px-6 h-14 flex items-center border-b justify-between w-full'>
      <Link href={'/'} className="flex items-center justify-center" prefetch={false}>
        <BookOpenIcon className='h-6 w-6'/>
        <span className="ml-2 font-bold">Flashy</span>
      </Link>
      <div className='flex gap-4 sm:gap-6 items-center'>
        <SignedIn>
          <Link href='/owned' prefetch={false} className='text-sm font-medium hover:underline underline-offset-4'>
            My Flashcards
          </Link>
          <Link href='/discover' prefetch={false} className='text-sm font-medium hover:underline underline-offset-4'>
            Discover
          </Link>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Link href='/sign-in' prefetch={false} className='text-sm font-medium hover:underline underline-offset-4'>
            Sign in
          </Link>
          <Link href='/sign-up' prefetch={false} className='text-sm font-medium hover:underline underline-offset-4'>
            Sign up
          </Link>
        </SignedOut>
      </div>
    </header>
  )
}

export default Header
