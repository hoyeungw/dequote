import { Dequote } from '../src'
import { castList } from './assets/Bistro'

export const factoryTest = () => {
  const dequote = Dequote.build(castList)

  const says = {
    chef: dequote.credit('chef'),
    aboyeur: dequote.credit('aboyeur')
  }

  'Shakespeare' |> says.chef
  'Dickens' |> says.aboyeur
}


