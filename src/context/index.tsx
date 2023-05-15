import { createContext, ReactNode, useState } from 'react'

interface ICycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finisheDate?: Date
}

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
  const [cycles, setCycles] = useState<ICycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function CreateNewCycle(data: INewCycleFormDate) {
    const id = String(new Date().getTime())

    const newCycle: ICycle = {
      id,
      ...data,
      startDate: new Date(),
    }
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
    // reset()
  }

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finisheDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  function InterruptCurrentCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
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
