import { FC } from 'react';

import { FavoriteCardPokemon } from './FavoriteCardPokemon';

interface Props {
	pokemons: number[];
}

export const FavoritesPokemons: FC<Props> = ({ pokemons }) => {
	return (
		<div className='grid grid-cols-[repeat(auto-fit,_minmax(145px,_200px))] gap-3 mt-4'>
			{pokemons.map((id) => (
				<FavoriteCardPokemon key={id} pokemonId={id} />
			))}
		</div>
	);
};
