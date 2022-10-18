import { FC, PropsWithChildren } from 'react';
import Head from 'next/head';

import { Navbar } from '../ui/Navbar';

interface Props {
	titulo?: string;
}

// Evitamos que coorra en el servidor por que el objeto window solo esta en el cliente
const origin = typeof window === 'undefined' ? '' : window.location.origin;

export const Layout: FC<PropsWithChildren<Props>> = ({ children, titulo }) => {
	return (
		<>
			<Head>
				<title>{titulo || 'Pokemon App'}</title>
				<meta name='author' content='Ernesto I. Copca Soriano' />
				<meta name='description' content={`Información del Pokemon ${titulo}`} />
				<meta name='keywords' content={`${titulo}, pokemon, pokedex`} />

				{/* metatags para SEO */}
				<meta property='og:title' content={`Información sobre ${titulo}`} />
				<meta
					property='og:description'
					content={`Esta es la página sobre ${titulo}`}
				/>
				<meta property='og:image' content={`${origin}/img/banner.png`} />
			</Head>

			<Navbar />

			<main className='container mt-8'>{children}</main>
		</>
	);
};
