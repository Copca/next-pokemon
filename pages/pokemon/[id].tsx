// * Ejemplo de SSG (Static Site Generation con ISR (Incremental Static Regeneration), habiltiando la propiedad "revalidate" de los Props dentro de la funcion getStaticProps )

import { useEffect, useState } from 'react';
import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import confetti from 'canvas-confetti';

import { getPokemonInfo, localFavorites } from '../../utils';
import { IPokemon } from '../../interfaces';

import { Layout } from '../../components/layouts';

interface Props {
	pokemon: IPokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
	const [isInFavorites, setIsInFavorites] = useState(false);

	useEffect(() => {
		// Guardamos en la variable de estado si el pokemon esta en LocalStorage
		setIsInFavorites(localFavorites.existInFavorites(pokemon.id));
	}, [pokemon.id]);

	const onToggleFavorite = () => {
		// Actualiza el LocalStorage
		localFavorites.toggleFavorite(pokemon.id);

		setIsInFavorites(!isInFavorites);

		if (isInFavorites) return;

		// solo lanza confeti si NO esta en favoritos
		confetti({
			zIndex: 999,
			particleCount: 100,
			spread: 160,
			angle: -100,
			origin: {
				x: 1,
				y: 0
			}
		});
	};

	return (
		<Layout titulo={pokemon.name}>
			<div className='flex flex-col lg:flex-row gap-4'>
				<div className='basis-1/3 bg-zinc-900 rounded-md p-4 text-center'>
					<Image
						src={
							pokemon.sprites.other?.dream_world.front_default ||
							'/no-image.png'
						}
						alt={pokemon.name}
						width={200}
						height={200}
						className='animate-rebote'
					/>
				</div>

				<div className='flex-1 bg-zinc-900 rounded-md p-8'>
					<div className='flex flex-col sm:flex-row items-center justify-between gap-4 mb-8'>
						<h1 className='text-5xl font-bold capitalize'>{pokemon.name}</h1>

						<div
							data-mdb-ripple='true'
							className='bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-md p-[2px]'
						>
							<button
								className={`${
									isInFavorites
										? 'bg-transparent hover:bg-black'
										: 'bg-black hover:bg-transparent'
								}  font-bold text-sm py-2 px-4 rounded-md transition-colors`}
								onClick={onToggleFavorite}
							>
								{isInFavorites ? 'En favoritos' : 'Guardar Favoritos'}
							</button>
						</div>
					</div>

					<h3 className='text-2xl'>Spriters:</h3>
					<div className='flex justify-between'>
						<Image
							src={pokemon.sprites.front_default}
							alt={pokemon.name}
							width={100}
							height={100}
						/>

						<Image
							src={pokemon.sprites.back_default}
							alt={pokemon.name}
							width={100}
							height={100}
						/>

						<Image
							src={pokemon.sprites.front_shiny}
							alt={pokemon.name}
							width={100}
							height={100}
						/>

						<Image
							src={pokemon.sprites.back_shiny}
							alt={pokemon.name}
							width={100}
							height={100}
						/>
					</div>
				</div>
			</div>
		</Layout>
	);
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {
	// Generamos un arreglo de strings del 1 al 151 => ['1', '2'... '151' ]
	const pokemon151 = [...Array(151)].map((value, index) => `${index + 1}`);

	return {
		// Se crean todas las rutas en build time
		// paths: [{params: {id:'1}'}, {params: {id: '2'}}, ...]
		paths: pokemon151.map((id) => ({
			params: { id }
		})),
		fallback: 'blocking' //'blocking' ->permite entrar a la pagina, false -> redirecciona a pagina 404 si el param no esta incluido en el arreglo path
	};
};

// ? Como habilitamos el fallback: 'blocking, debemos validamos que el param escrito en la url sea permitido

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { id } = params as { id: string };

	// la validación se hace con un trycatch dentro de esta función
	const pokemon = await getPokemonInfo(id);

	// Si no existe el pokemon, redireccionamos
	if (!pokemon) {
		return {
			redirect: {
				destination: '/',
				permanent: false // true -> los boots de google nunca indexarán esa url que falló,
				// false -> puede que en un futuro esa url si exista y pueda ser indexada
			}
		};
	}

	// Si existe lo enviamos por props
	return {
		props: {
			pokemon
		},
		revalidate: 86400 // 846400 seg -> 24 hrs // * Habilita el ISR (Incremental Static Regeneration)
	};
};

export default PokemonPage;
