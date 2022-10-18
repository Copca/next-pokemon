import { useState, useEffect } from 'react';
import { NextPage } from 'next';

import { localFavorites } from '../../utils';
import { Layout } from '../../components/layouts/Layout';
import { NoFavorites } from '../../components/ui';
import { FavoritesPokemons } from '../../components/pokemon';

const Favorites: NextPage = () => {
	const [favoritesPokemon, setFavoritesPokemon] = useState<number[]>([]);

	useEffect(() => {
		setFavoritesPokemon(localFavorites.pokemons());
	}, []);

	return (
		<Layout titulo='Pokémons Favoritos'>
			{favoritesPokemon.length === 0 ? (
				<NoFavorites />
			) : (
				<FavoritesPokemons pokemons={favoritesPokemon} />
			)}
		</Layout>
	);
};

export default Favorites;
