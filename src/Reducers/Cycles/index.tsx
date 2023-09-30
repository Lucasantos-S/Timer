import { ActionTypes } from './actions'
import { produce } from 'immer'

export interface ICycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finisheDate?: Date
}

export interface CyclesState {
  cycles: ICycle[]
  activeCycleId: string | null
}

export function cyclesReducer(state: CyclesState, action: any) {
  const currentCycleIndex = state.cycles.findIndex((cycle) => {
    return cycle.id === state.activeCycleId
  })

  if (action.type === ActionTypes.ADD_NEW_CYCLE) {
    return produce(state, (draf) => {
      draf.cycles.push(action.payload.newCycle)
      draf.activeCycleId = action.payload.newCycle.id
    })
  }

  if (action.type === ActionTypes.INTERRUPT_CURRENT_CYCLE) {
    if (currentCycleIndex < 0) return state

    return produce(state, (draf) => {
      draf.cycles[currentCycleIndex].interruptedDate = new Date()
      draf.activeCycleId = null
    })
  }

  if (currentCycleIndex < 0) return state

  return produce(state, (draf) => {
    draf.cycles[currentCycleIndex].finisheDate = new Date()
    draf.activeCycleId = null
  })
}
