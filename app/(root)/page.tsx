import React from 'react'

import OwnedFlashCards from '@/components/shared/OwnedFlashcards'
import { auth } from '@clerk/nextjs/server'
import AllFlashcards from '@/components/shared/AllFlashcards'
import {getAllPublicGroups} from '@/lib/actions/cardgroup.actions'

const page = async () => {
  const {sessionClaims} = auth()

  const userId = sessionClaims?.userId as string;

  const groups = await getAllPublicGroups()

  return (
    <main className='flex-1 py-8 px-4 md:px-6'>
      <div className="container max-w-5xl">
        <OwnedFlashCards userId={userId} />
        <AllFlashcards flashCards={JSON.stringify(groups)} />
      </div>
    </main>
  )
}

export default page
