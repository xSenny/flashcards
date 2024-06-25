import {Button} from '@/components/ui/button'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {getGroupById} from '@/lib/actions/cardgroup.actions'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';


type Props = {
  params: {id: string}
}

const GroupInfo = async ({params}: Props) => {
  const group = await getGroupById(params.id)
  const {sessionClaims} = auth()

  const userId = sessionClaims?.userId as string;
  if (!group) {
    return redirect('/')
  }

  return (
    <main className="flex-1 py-12 px-4 md:px-6">
        <div className="container max-w-5xl grid gap-12">
          <div className="grid gap-8 bg-card p-8 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">{group.name}</h1>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <Link href={`${group.id}/study`} prefetch={false}>Study</Link>
                </Button>
                <Button variant="outline" disabled={group.creator.id !== userId}>
                  <Link href={`${group.id}/edit`} prefetch={false}>Edit</Link>
                </Button>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">{group.description}</p>
                <p className="mt-4 text-sm text-muted-foreground">
                  Created by{" "}
                  {group.creator.firstName}
                </p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <Avatar className="w-12 h-12 border">
                  <AvatarImage src={group.creator.imageUrl} />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                {group.creator.firstName}
              </div>
            </div>
          </div>
        </div>
      </main>
  )
}

export default GroupInfo;