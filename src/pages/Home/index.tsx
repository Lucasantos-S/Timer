import { Play } from 'phosphor-react'
import React from 'react'
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

export default function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            type="text"
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
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

        <StartCountdowbButton disabled type="submit">
          <Play size={24} />
          Começar
        </StartCountdowbButton>
      </form>
    </HomeContainer>
  )
}
