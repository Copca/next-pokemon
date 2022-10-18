import { FC } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface Props {
	pokemonId: number;
}

export const FavoriteCardPokemon: FC<Props> = ({ pokemonId }) => {
	const router = useRouter();

	const handleClick = () => {
		router.push(`/pokemon/${pokemonId}`);
	};

	return (
		<div
			data-mdb-ripple='true'
			data-mdb-ripple-color='orange'
			key={pokemonId}
			className='bg-zinc-900 rounded-md p-4 text-center cursor-pointer'
			onClick={handleClick}
		>
			<Image
				src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
				alt={`Imagen de pokemon`}
				width={140}
				height={140}
			/>
		</div>
	);
};
