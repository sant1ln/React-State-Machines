import { useMachine } from "@xstate/react"
import { bookingMachine } from "../machines/bookingMachine"

export const BaseLayout = () => {
  const [state,send] = useMachine(bookingMachine)
  console.log('Machine>',state)
  return (
    <div>BaseLayout</div>
  )
}
