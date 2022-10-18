import Image from 'next/image';

export const NoFavorites = () => {
	return (
		<div className='text-center mt-16'>
			<h1 className='text-5xl font-bold mb-10'>No hay favoritos</h1>
			<Image
				src={
					'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg'
				}
				width={250}
				height={250}
				alt='imagen pokemon'
				className='opacity-20'
			/>
		</div>
	);
};
