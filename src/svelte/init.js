import { mount } from 'svelte';
import App from './components/App.svelte';

export default function(domRoot, store) {
	mount(App, {
		props: {
			store
		},
		target: domRoot
	});

}