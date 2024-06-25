'use client'
import React from 'react'
import { Input } from '../ui/input'
import {Button} from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import {useState} from 'react'
import {NotebookTabs, SearchIcon} from 'lucide-react'
import { CreateGroupParams } from '@/types';
import Link from 'next/link'

const AllFlashcards = ({flashCards}: {flashCards: string}) => {
  const groups: CreateGroupParams[] = JSON.parse(flashCards)

  const [validGroups, setValidGroups] = useState(groups)

  const [query, setQuery] = useState('')

  const handleSearch = (reset?: Boolean) => {
    if (query === '' || reset) {
      setValidGroups(groups);
    } else {
      setValidGroups([])
      groups.forEach(g => {
        if (g.name === query || g.name.includes(query) || g.description.includes(query)) setValidGroups(val => ([...val, g]))
      })
    }
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Discover Public Groups</h2>
        <div className="relative w-full max-w-md">
          <Input placeholder="Search flashcard groups" className="pr-8" value={query} onChange={e => setQuery(e.target.value)}/>
          <Button variant="ghost" size="icon" className="absolute top-1/2 right-2 -translate-y-1/2" onClick={() => handleSearch(false)}>
            <SearchIcon className="h-4 w-4"/>
          </Button>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {validGroups.length !== 0 ? validGroups.map((g, i) => (
          <Card className="p-4" key={i}>
            <CardHeader>
              <CardTitle>{g.name}</CardTitle>
              <CardDescription>{`${g.length}`} cards</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{g.description}</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild>
                <Link href={`/${g._id!}`}>View Group</Link>
              </Button>
            </CardFooter>
          </Card>
        )) : (
          <div className='flex justify-center items-center bg-muted p-8 flex-col col-span-full'>
            <NotebookTabs className="h-8 w-8 text-muted-foreground"/>
            <h3 className="mt-4 text-lg font-semibold">Can't find your perfect flashcard group</h3>
            <p className="mt-2 text-sm text-muted-foreground">Try to use a perfect keyword for your search query.</p>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" onClick={() => {setQuery(''); handleSearch(true)}}>Try again</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AllFlashcards
