import React, { useContext, useEffect } from 'react'
import { CountdownContainer, Separator } from './styled'
import { differenceInSeconds } from 'date-fns'
import { CyclesContext } from '../..'

export default function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
  } = useContext(CyclesContext)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )
        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()
          setSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  ])

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmaunt = Math.floor(currentSeconds / 60)
  const secondsAmaunt = currentSeconds % 60

  const minute = String(minutesAmaunt).padStart(2, '0')
  const seconds = String(secondsAmaunt).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) document.title = `${minute} : ${seconds}`
  }, [minute, seconds, activeCycle])

  return (
    <CountdownContainer>
      <span>{minute[0]}</span>
      <span>{minute[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
