import React, { useContext } from 'react'
import {
  Datalist,
  FormContainer,
  MinutesAmountInput,
  TaskInput,
} from './styles'

import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '../../../../context'

export default function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        {...register('task')}
        disabled={!!activeCycle}
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
        min="1"
        max="60"
        {...register('minutesAmount', { valueAsNumber: true })}
        disabled={!!activeCycle}
      />

      <span>Minutos.</span>
    </FormContainer>
  )
}
