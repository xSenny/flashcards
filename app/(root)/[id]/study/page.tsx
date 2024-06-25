import {getGroupById} from '@/lib/actions/cardgroup.actions'
import {getAllCardsForGroup} from '@/lib/actions/card.actions'
import PlayingHall from './PlayingHall'
import {CardParams} from '@/types'


const StudyPage = async ({params}: {params: {id: string}}) => {

  const group = await getGroupById(params.id)
  let cards: CardParams[] = await getAllCardsForGroup(group.id) as CardParams[]

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

  cards = shuffleArray(cards)

  return (
    <div className="w-full min-h-screen"><PlayingHall cards={JSON.stringify(cards)}/></div>
  )
}

export default StudyPage;