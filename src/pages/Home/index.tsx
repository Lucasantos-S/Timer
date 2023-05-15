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
import { useContext } from 'react'
import { CyclesContext } from '../../context'

const newCycleFormValidadeSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser de no minimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no maximo 60 minutos '),
})

type INewCycleFormDate = zod.infer<typeof newCycleFormValidadeSchema>

export default function Home() {
  const { activeCycle, InterruptCurrentCycle, CreateNewCycle } =
    useContext(CyclesContext)

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
    CreateNewCycle(data)
    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCyleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />
        {activeCycle ? (
          <StopCountdowbButton type="button" onClick={InterruptCurrentCycle}>
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
