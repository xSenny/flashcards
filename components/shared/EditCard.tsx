'use client'
import { CardParams} from '@/types'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/card'
import {Textarea} from '../ui/textarea'
import {Button} from '../ui/button'
import {Input} from '../ui/input'
import {updateCard, deleteCard} from '@/lib/actions/card.actions'

import {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation'

const EditCard = ({card}: {card: string}) => {
  const parsed: CardParams = JSON.parse(card)

  const [data, setData] = useState({
    question: parsed.question,
    answer: parsed.answer
  })

  const router = useRouter()

  const [isChanged, setIsChanged] = useState(false)

  useEffect(() => {
    if (data.answer !== parsed.answer || data.question !== parsed.question) {
      setIsChanged(true)
    } else {
      setIsChanged(false)
    }
  }, [data])

  const handleSaveCard = async () => {
    try {
      await updateCard({
        id: parsed._id!,
        question: data.question,
        answer: data.answer
      })
    } catch (e) {
      alert(e)
    } finally {
      router.refresh()
    }
  }

  const handleDeleteCard = async () => {
    try {
      await deleteCard(parsed._id!)
      router.refresh() 
    } catch (e) {
      alert(e)
    } finally {
      router.refresh()
    }
  }

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>
          <Input
            value={data.question}
            placeholder='Question'
            onChange={(e) => setData(data => ({...data, question: e.target.value}))}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          value={data.answer}
          placeholder='Answer'
          onChange={(e) => setData(data => ({...data, answer: e.target.value}))}
          className="min-h-[100px]"
        />
      </CardContent>
      <CardFooter className="flex gap-3">
        <Button variant="outline" onClick={handleDeleteCard}>
          Remove Card
        </Button>
        <Button variant="outline" onClick={() => handleSaveCard()} disabled={!isChanged}>
          Save card
        </Button>
      </CardFooter>
    </Card>
  )
}


export default EditCard