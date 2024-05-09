import { increment, decrement } from '$redux/features/counter'
import { useStoreContext } from '../context'
import Screen from './Screen'

export default function Inner({}) {
  let [state, fns] = useStoreContext((s) => ({
    value: s.counter.value,
  }), (d) => ({
    decr: () => d(decrement()),
    incr: () => d(increment()),
  }))

  return (
    <div>
      Solid working x: {() => state().value}
      <button onclick={fns.incr}>Incr</button>
      <button onclick={fns.decr}>Decr</button>
      <simple-greeting></simple-greeting>
      <Screen></Screen>
    </div>
  );
}
