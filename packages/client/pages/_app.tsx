import '../styles/globals.css'
import { ReduxProvider } from '../redux/features/provider'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { AuthContextProvider } from '@context/AuthContext'

export default function App({ Component, pageProps }) {
	const [queryClient] = useState(() => new QueryClient())

	return (
		<ReduxProvider>
			<QueryClientProvider client={queryClient}>
				<AuthContextProvider>
					<Component {...pageProps} />
				</AuthContextProvider>
			</QueryClientProvider>
		</ReduxProvider>
	)
}