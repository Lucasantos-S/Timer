import { createContext, ReactNode, useReducer, useState } from 'react'
import { cyclesReducer, ICycle } from '../Reducers/Cycles'
import {
  ActionTypes,
  CreateNewCycleActions,
  InterruptCurrentCycleActions,
  markCurrentCycleAsFinishedActions,
} from '../Reducers/Cycles/actions'
interface INewCycleFormDate {
  task: string
  minutesAmount: number
}
interface ICylesContextProps {
  activeCycle: ICycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  cycles: ICycle[]

  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (passed: number) => void
  CreateNewCycle: (data: INewCycleFormDate) => void
  InterruptCurrentCycle: () => void
}
interface ICyclesContextProviderPorps {
  children: ReactNode
}

export const CyclesContext = createContext({} as ICylesContextProps)

export function CyclesContextProvider({
  children,
}: ICyclesContextProviderPorps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  })
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { cycles, activeCycleId } = cyclesState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function CreateNewCycle(data: INewCycleFormDate) {
    const id = String(new Date().getTime())

    const newCycle: ICycle = {
      id,
      ...data,
      startDate: new Date(),
    }
    dispatch(CreateNewCycleActions(newCycle))

    setAmountSecondsPassed(0)
    // reset()
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedActions())
  }

  function InterruptCurrentCycle() {
    dispatch(InterruptCurrentCycleActions())
  }

  function setSecondsPassed(passed: number) {
    setAmountSecondsPassed(passed)
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        InterruptCurrentCycle,
        CreateNewCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
