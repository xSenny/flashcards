'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { generateQuestions } from "@/lib/actions/generate.actions"
import { Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"

export function GenerateQuestions({groupId}: { groupId: string }) {

  const [input, setInput] = useState('')
  const [pending, startPending] = useTransition()
  const router = useRouter()

  const submit = async () => {
    startPending(async () => {
      if (input === '') {
        alert('Write an input')
      }

      const { qa } =  await generateQuestions(input);

      window.localStorage.setItem(groupId, JSON.stringify(qa))
      router.push(`/${groupId}/edit/generatedQuestions`)
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="space-x-2 font-bold"><Sparkles /> <span>Generate Questions</span></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate new questions</DialogTitle>
          <DialogDescription>
            Our AI capabilities can help you generate 10 new questions for <span className="bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 text-transparent bg-clip-text">FREE</span> for your flash card group.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          Write your text, so we'll generate you some questions!
          <Textarea value={input} onChange={(e) => setInput(e.target.value)}/>
        </div>
        <DialogFooter>
          <Button onClick={submit} disabled={pending}>Generate Questions</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
