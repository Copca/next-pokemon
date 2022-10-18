import { FC } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { SmallPokemon } from '../../interfaces';

interface Props {
	pokemon: SmallPokemon;
}

export const PokemonCard: FC<Props> = ({ pokemon }) => {
	const router = useRouter();
	const { id, img, name } = pokemon;

	const handleClick = () => {
		router.push(`/name/${name}`);
	};

	return (
		<div
			data-mdb-ripple='true'
			data-mdb-ripple-color='orange'
			className='bg-zinc-900 rounded-md p-4 cursor-pointer relative hover:-translate-y-1 duration-300'
			onClick={handleClick}
		>
			<Image src={img} alt={`Imagen de ${name}`} width={150} height={150} />

			<div className='flex justify-between'>
				<p>#{id}</p>
				<h3 className='capitalize'>{name}</h3>
			</div>
		</div>
	);
};
