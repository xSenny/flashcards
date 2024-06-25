'use client'
import {Button} from '@/components/ui/button'
import {deleteGroup} from '@/lib/actions/cardgroup.actions'
import {useRouter} from 'next/navigation'

const DeleteGroup = ({id}: {id: string}) => {
  const router = useRouter()
  const handleDeleteGroup = async () => {
    try {
      await deleteGroup(id) 
    } catch (e) {
      console.log(e)
    } finally {
      router.push('/')
    }
  }
  return (
    <Button variant="outline" onClick={handleDeleteGroup}>Delete Group</Button>
  )
} 
export default DeleteGroup;