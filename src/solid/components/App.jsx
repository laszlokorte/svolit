import { StoreProvider } from '../context'
import Inner from './Inner'

export default function App({store}) {

  return (
    <StoreProvider store={store}>
      <Inner></Inner>
    </StoreProvider>
  );
}