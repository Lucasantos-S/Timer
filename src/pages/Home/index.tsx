import { createContext, useState } from 'react'
import { HandPalm, Play } from 'phosphor-react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { FormProvider, useForm } from 'react-hook-form'

import {
  HomeContainer,
  StartCountdowbButton,
  StopCountdowbButton,
} from './styles'

import Countdown from './Components/Countdown'
import NewCycleForm from './Components/NewCycleForm'

interface ICycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finisheDate?: Date
}

interface ICylesContextProps {
  activeCycle: ICycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number

  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (passed: number) => void
}

export const CyclesContext = createContext({} as ICylesContextProps)

const newCycleFormValidadeSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser de no minimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no maximo 60 minutos '),
})

type INewCycleFormDate = zod.infer<typeof newCycleFormValidadeSchema>

export default function Home() {
  const [cycles, setCycles] = useState<ICycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const newCyleForm = useForm<INewCycleFormDate>({
    resolver: zodResolver(newCycleFormValidadeSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCyleForm

  const task = watch('task')
  const minutesAmount = watch('minutesAmount')
  const isSubimitDisabled = !task || !minutesAmount

  function handleCreateNewCycle(data: INewCycleFormDate) {
    const id = String(new Date().getTime())

    const newCycle: ICycle = {
      id,
      ...data,
      startDate: new Date(),
    }
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
    reset()
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setSecondsPassed(passed: number) {
    setAmountSecondsPassed(passed)
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

  function handleInterruptCycle() {
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

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            amountSecondsPassed,
            setSecondsPassed,
          }}
        >
          <FormProvider {...newCyleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CyclesContext.Provider>
        {activeCycle ? (
          <StopCountdowbButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdowbButton>
        ) : (
          <StartCountdowbButton type="submit" disabled={isSubimitDisabled}>
            <Play size={24} />
            Começar
          </StartCountdowbButton>
        )}
      </form>
    </HomeContainer>
  )
}
