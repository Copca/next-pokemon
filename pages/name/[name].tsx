import { useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import confetti from 'canvas-confetti';

import { getPokemonInfo, localFavorites } from '../../utils';
import { IPokemon, IPokemonList } from '../../interfaces/';
import pokeApi from '../../axios/pokeApi';
import { Layout } from '../../components/layouts/Layout';

interface Props {
	pokemon: IPokemon;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
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
	const { data } = await pokeApi.get<IPokemonList>('/pokemon?limit=150');

	return {
		// paths: [{params: {name: bulbasaur}}, {params: {name: ivysaour}}, ...]
		paths: data.results.map(({ name }) => ({
			params: { name }
		})),
		fallback: false //'blocking' ->permite entrar a la pagina, false redirecciona a pagina 404 si el param no esta incluido en el arreglo path
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { name } = params as { name: string };

	const pokemon = await getPokemonInfo(name);

	return {
		props: {
			pokemon
		}
	};
};

export default PokemonByNamePage;
