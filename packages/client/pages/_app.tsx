import { ReduxProvider } from '../redux/features/provider';
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
	return (
		<ReduxProvider>
			<Component {...pageProps} />
		</ReduxProvider>
	)
}
