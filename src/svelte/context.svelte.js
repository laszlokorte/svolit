import { setContext, getContext } from 'svelte';

const reduxStore = Object.create({})

export function setStoreContext(store) {
	setContext(reduxStore, store)
}

export function useStoreContext(mapStateFn, mapDispatchFn) {
	const store = getContext(reduxStore)

	const currentState = $state(mapStateFn(store.getState()));

	store.subscribe(() => {
		const nextState = store.getState()

		const mapped = mapStateFn(nextState),
        mapKeys = Object.keys(mapped);
		for (let i = 0; i < mapKeys.length; i++) {
			const key = mapKeys[i];
			currentState[key] = mapped[key]
		}
	})

	return [
		currentState,
		mapDispatchFn ? mapDispatchFn(store.dispatch, store) : store.dispatch
	]
}