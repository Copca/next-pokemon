import type { NextPage, GetStaticProps } from 'next';

import { pokeApi } from '../axios';
import { IPokemonList, SmallPokemon } from '../interfaces';
import { PokemonCard } from '../components/pokemon';

import { Layout } from '../components/layouts/Layout';

interface Props {
	pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
	return (
		<Layout titulo='Listado de Pokemons'>
			<div className='grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-3 mt-4'>
				{pokemons.map((pokemon) => (
					<PokemonCard key={pokemon.id} pokemon={pokemon} />
				))}
			</div>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async (ctx) => {
	const { data } = await pokeApi.get<IPokemonList>('/pokemon?limit=151');

	const pokemons: SmallPokemon[] = data.results.map((poke) => {
		const id = poke.url.split('/')[6];

		return {
			...poke,
			id,
			img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`
		};
	});

	return {
		props: {
			pokemons
		}
	};
};

export default HomePage;
