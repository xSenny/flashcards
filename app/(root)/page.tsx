import React from 'react'

import OwnedFlashCards from '@/components/shared/OwnedFlashcards'
import { auth } from '@clerk/nextjs/server'


const page = () => {
  const {sessionClaims} = auth()

  const userId = sessionClaims?.userId as string;
  return (
    <main className='flex-1 py-8 px-4 md:px-6'>
      <div className="container max-w-5xl">
        <OwnedFlashCards userId={userId} />
      </div>
    </main>
  )
}

export default page
