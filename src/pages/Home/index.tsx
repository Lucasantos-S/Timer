import { useEffect, useState } from 'react'
import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { differenceInSeconds } from 'date-fns'

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdowbButton,
  TaskInput,
  Datalist,
} from './styles'

const newCycleFormValidadeSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5).max(60),
})

type INewCycleFormDate = zod.infer<typeof newCycleFormValidadeSchema>

interface ICycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
}

export default function Home() {
  const [cycles, setCycles] = useState<ICycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<INewCycleFormDate>({
    resolver: zodResolver(newCycleFormValidadeSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  function handleCreateNewCycle(data: INewCycleFormDate) {
    const id = String(new Date().getTime())

    const newCycle: ICycle = {
      id,
      ...data,
      startDate: new Date(),
    }
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    reset()
    setAmountSecondsPassed(0)
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  useEffect(() => {
    if (activeCycle) {
      setInterval(() => {
        setAmountSecondsPassed(
          differenceInSeconds(new Date(), activeCycle.startDate),
        )
      }, 1000)
    }
  }, [activeCycle])

  const toalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? toalSeconds - amountSecondsPassed : 0

  const minutesAmaunt = Math.floor(currentSeconds / 60)
  const secondsAmaunt = currentSeconds % 60

  const minute = String(minutesAmaunt).padStart(2, '0')
  const seconds = String(secondsAmaunt).padStart(2, '0')

  const task = watch('task')
  const minutesAmount = watch('minutesAmount')
  const isSubimitDisabled = !task || !minutesAmount

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
          />

          <Datalist id="task-suggestions">
            <option value="projeto 1" />
            <option value="projeto 2" />
            <option value="projeto 3" />
            <option value="Banana" />
          </Datalist>

          <label htmlFor="minutesAmount">Durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step="5"
            min="5"
            max="60"
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>Minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minute[0]}</span>
          <span>{minute[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        <StartCountdowbButton disabled={isSubimitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountdowbButton>
      </form>
    </HomeContainer>
  )
}
