import { render } from 'solid-js/web';
import App from './components/App.jsx';

export default function(domRoot, store) {
	render(() => <App store={store} />, domRoot)
}