import  SelectQuestions from '@/components/shared/SelectQuestions';
import {getGroupById} from '@/lib/actions/cardgroup.actions'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';


export default async function Page({params}: {params: {id: string}}){
  const group = await getGroupById(params.id)
  const {sessionClaims} = auth()

  const userId = sessionClaims?.userId as string;

  if (!group || userId !== group.creator.id) {
    return redirect('/')
  }

  return (
    <SelectQuestions groupId={params.id}/>
  )
}