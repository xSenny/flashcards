import React from 'react'
import {getGroupById} from '@/lib/actions/cardgroup.actions'
import {getAllCardsForGroup} from '@/lib/actions/card.actions'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import {Button} from '@/components/ui/button'
import CreateCard from '@/components/shared/CreateCard'
import EditCard from '@/components/shared/EditCard'
import DeleteGroup from '@/components/shared/DeleteGroup'
import { GenerateQuestions } from '@/components/shared/GenerateQuestions';

const page = async ({params}: {params: {id: string}}) => {

  const group = await getGroupById(params.id)
  const {sessionClaims} = auth()

  const userId = sessionClaims?.userId as string;

  if (!group || userId !== group.creator.id) {
    return redirect('/')
  }

  const cards = await getAllCardsForGroup(group.id)
  console.log(cards)

  

  return (
    <main className="flex-1 px-4 py-8 md:px-6">
      <div className="container max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">{group.name}</h1>
          <div className="flex gap-4">
            <GenerateQuestions groupId={params.id}/>
            <DeleteGroup id={group.id} />
          </div>
        </div>
        <div className="mb-6">
          <p className="text-muted-foreground">{group.description}</p>
        </div>
        <div className="grid gap-4">
          {cards !== undefined && cards.map(c => (
            <EditCard card={JSON.stringify(c)}/>
          ))}
          <CreateCard groupId={group.id}/>
        </div>
      </div>
    </main>
  )
}

export default page
