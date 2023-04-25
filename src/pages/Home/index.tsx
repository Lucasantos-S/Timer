import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

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

export default function Home() {
  const { register, handleSubmit, watch, reset } = useForm<INewCycleFormDate>({
    resolver: zodResolver(newCycleFormValidadeSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  function handleCreateNewCycle(data: INewCycleFormDate) {
    console.log(data)
    reset()
  }

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
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdowbButton disabled={isSubimitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountdowbButton>
      </form>
    </HomeContainer>
  )
}
