import { pokeApi } from '../axios';
import { IPokemon } from '../interfaces/pokemon-full';

export const getPokemonInfo = async (nameOrId: string) => {
	try {
		const { data } = await pokeApi.get<IPokemon>(`/pokemon/${nameOrId}`);

		return {
			id: data.id,
			name: data.name,
			sprites: data.sprites
		};
	} catch (error) {
		return null;
	}
};
