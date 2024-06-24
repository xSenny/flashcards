import React from 'react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { SignedIn, SignedOut, UserButton, UserProfile } from '@clerk/nextjs'
import { UserIcon } from 'lucide-react'
import Link from 'next/link'
import CreateGroup from './CreateGroup'

import {getOwnedGroups} from '@/lib/actions/cardgroup.actions'

const OwnedFlashcards = async ({userId}: {userId: String}) => {
  const groups = await getOwnedGroups(userId)
  console.log(groups)
  // undefined daca i nelogat
  return (
    <>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-bold'>My Flashcard Groups</h1>
        <SignedIn>
          <Button>See all your groups</Button>
        </SignedIn>
        <SignedOut>
          <Button disabled>See all your groups</Button>
        </SignedOut>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <SignedOut>
          <div className='flex justify-center items-center bg-muted p-8 flex-col col-span-full'>
            <UserIcon className="h-8 w-8 text-muted-foreground"/>
            <h3 className="mt-4 text-lg font-semibold">Sign in to access your flashcard groups</h3>
            <p className="mt-2 text-sm text-muted-foreground">Create an account or log in to start building and studying flashcard groups.</p>
            <div className="mt-4 flex gap-2">
                <Link href="sign-up">
                  <Button>Sign Up</Button>
                </Link>
                <Link href="sign-in">
                  <Button variant="outline">Log In</Button>
                </Link>
              </div>
          </div>
        </SignedOut>
        <SignedIn>
          <CreateGroup userId={userId}/>
          {groups !== undefined && groups.map(i => (
            <Card key={i._id} className="p-4 hover:bg-muted transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle>{i.name}</CardTitle>
                <CardDescription>{i.length} cards</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{i.description}</p>
              </CardContent>
            </Card>
          ))}
        </SignedIn>
      </div>
    </>
    
  )
}

export default OwnedFlashcards
