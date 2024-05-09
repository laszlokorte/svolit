import { createContext, createSignal, useContext, onCleanup } from 'solid-js';


export const StoreContext = createContext()

export function StoreProvider(props) {
  const store = props.store

  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  )
}

export function useStoreContext(mapStateFn, mapDispatchFn) {
  const store = useContext(StoreContext)
  if (!store) {
    throw new Error("useCounterContext: cannot find a StoreContext")
  }

  const [currentState, setCurrentState] = createSignal(mapStateFn(store.getState()))

  const unsubscribe = store.subscribe(() => {
    setCurrentState(mapStateFn(store.getState()))
  })

  onCleanup(() => unsubscribe());

  const value = [
    currentState,
    mapDispatchFn ? mapDispatchFn(store.dispatch) : store.dispatch
  ]

  return value
}