'use client'
import {Card, CardContent} from '@/components/ui/card'
import ReactCardFlip from "react-card-flip";
import {Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import {CardParams} from '@/types'
import { Progress } from "@/components/ui/progress"
import {useRouter} from 'next/navigation'
import Link from 'next/link';


const Cardd = ({answer, question, flip, setFlip}: {answer: string, question: string, flip: boolean, setFlip: (arg: boolean) => void}) => {
  return (
    <ReactCardFlip isFlipped={flip} >
      <Card className="w-96 min-h-44 flex justify-center items-center cursor-pointer" onClick={() => setFlip(!flip)}>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-center">{question}</h2>
          </div>
        </CardContent>
      </Card>  
      <Card className="w-96 min-h-44 flex justify-center items-center cursor-pointer" onClick={() => setFlip(!flip)}>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-2">
            <p className="text-center">{answer}</p>
          </div>
        </CardContent>
      </Card>        
    </ReactCardFlip>
  )
}

const PlayingHall = ({cards}: {cards: string}) => {

  const [flip, setFlip] = useState(false)

  const [parsed, setParsed] = useState<CardParams[]>(JSON.parse(cards))
  const [number, setNumber] = useState(0)
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(parsed[number]);
  
  useEffect(() => {
    // Update the currentQuestion state whenever number changes
    setCurrentQuestion(parsed[number]);
    setFlip(false)
  }, [number]);


  function shuffleArray(array: CardParams[]) {
    // Create a copy of the original array to avoid mutating the original
    let shuffledArray = [...array];
    
    // Fisher-Yates shuffle algorithm
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
    }
    console.log('shuffled')
    return shuffledArray;
  }

  

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col gap-[10%]">
      <Cardd answer={currentQuestion.answer} question={currentQuestion.question} flip={flip} setFlip={setFlip}/>
      <Progress value={(number / parsed.length) * 100}  className="w-[60%]"/>
      <div className="flex justify-center gap-10 w-full">
          <Button variant="outline">
            <Link href="/">Go back</Link>
          </Button>
          <Button variant="outline" onClick={() => {
            if (number === parsed.length - 1) {
               router.push('/')
            } else {
              setNumber(n => n + 1)
            }
          }}>Next Question</Button>
      </div>
    </div>
  )
}

export default PlayingHall