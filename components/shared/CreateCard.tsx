'use client'

import {useState} from 'react'
import { Input } from '../ui/input'
import {Button} from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import {Textarea} from '../ui/textarea'
import {createCard} from '@/lib/actions/card.actions'
import {useRouter} from 'next/navigation'

const CreateCard = ({groupId}: {groupId: string}) => {
  const [formData, setFormData] = useState({
    question: '',
    answer: ''
  })
  const router = useRouter()

  const handleAddCard = async () => {
    try {
      const created = await createCard({
        group: groupId,
        question: formData.question,
        answer: formData.answer
      })
    } catch (e) {
      alert(e)
    } finally {
      router.refresh()
      setFormData({
        question: '',
        answer: ''
      })
    }
  }

  return (
    <Card className="p-4">
      <CardContent className="flex flex-col items-center justify-center h-full w-full">
        <div className="grid gap-2 mb-4 w-full">
          <Input placeholder="Question" className="w-full" value={formData.question} onChange={e => setFormData(formData => ({...formData, question: e.target.value}))}/>
          <Textarea placeholder="Answer" value={formData.answer} onChange={e => setFormData(formData => ({...formData, answer: e.target.value}))}/>
        </div>
        <Button onClick={handleAddCard}>Add Card</Button>
      </CardContent>
    </Card>
  )
}

export default CreateCard;