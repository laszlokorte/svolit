import './lit/init'
import setupStore from './redux/init'
import setupSolid from './solid/init'
import setupSvelte from './svelte/init'

const reduxStore = setupStore()

console.log(reduxStore)

setupSolid(document.getElementById('solid-root'), reduxStore)
setupSvelte(document.getElementById('svelte-root'), reduxStore)