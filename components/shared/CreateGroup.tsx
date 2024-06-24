'use client'

import React from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"

import { PlusIcon } from 'lucide-react'
import {useState} from 'react'
import { Input } from '../ui/input'
import {Button} from '../ui/button'
import { Checkbox } from "@/components/ui/checkbox"


import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { createGroup } from '@/lib/actions/cardgroup.actions'


const CreateGroup = ({userId}: {userId: String}) => {

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    public: false 
  })

  const handleCreateGroup = async () => {
    try {
      await createGroup({
        creator: userId,
        description: formData.description,
        public: formData.public,
        name: formData.name,
        length: 0,
        createdAt: new Date()
      })
    } catch (e) {
      console.log(e)
    }
  }


  return (
    <>
    <Dialog>
      <DialogTrigger>
      <Card className="p-4 hover:bg-muted transition-colors cursor-pointer h-full">
        <CardContent className="flex flex-col items-center justify-center h-full">
          <PlusIcon className="h-8 w-8 text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">Create a new flashcard group</p>
        </CardContent>
      </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create your new flashcards group</DialogTitle>
          <DialogDescription>
            <div className="flex flex-col gap-4 mt-6">
              <Input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData(data => ({...data, name: e.target.value}))}/>
              <Input type="text" placeholder="Description" value={formData.description} onChange={(e) => setFormData(data => ({...data, description: e.target.value}))}/>
              <div className="flex items-center space-x-2">
                <Checkbox id="public" checked={formData.public} onCheckedChange={(e) => setFormData(data => ({...data, public: !!e}))}/>
                <label
                  htmlFor="public"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Make this flashcard group public
                </label>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <DialogClose asChild>
            <Button type="button" variant="ghost" onClick={handleCreateGroup}>
              Create
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>

  )
}

export default CreateGroup
