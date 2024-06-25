import { auth } from '@clerk/nextjs/server'
import {getOwnedGroups} from '@/lib/actions/cardgroup.actions'
import CreateGroup from '@/components/shared/CreateGroup'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import {Button} from '@/components/ui/button'
const Owned = async() => {

  const {sessionClaims} = auth()

  const userId = sessionClaims?.userId as string;

  const yourGroups = await getOwnedGroups(userId, true);

  console.log(yourGroups)

  return(
    <main className="flex-1 py-8 px-4 md:px-6">
      <div className="container max-w-5xl">
        <div className="flex items-center justify-center mb-6">
          <h1 className="text-2xl font-bold">My Flashcard Groups</h1>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <CreateGroup userId={userId}/>
          {yourGroups !== undefined && yourGroups.map(g => (
            <Card className="p-4">
              <CardHeader>
                <CardTitle>{g.name}</CardTitle>
                <CardDescription>{g.length} cards</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{g.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Study</Button>
                <Button variant="outline" className="ml-auto">
                  Edit
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
} 

export default Owned;