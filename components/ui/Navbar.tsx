import Link from 'next/link';
import Image from 'next/image';

export const Navbar = () => {
	return (
		<nav className='flex items-center justify-between w-full bg-zinc-900 text-white py-2 px-10'>
			<Link href={'/'}>
				<div className='flex items-center cursor-pointer group'>
					<Image
						src={
							'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png'
						}
						width={70}
						height={70}
						alt='Icono de la App'
					/>

					<p className='text-2xl font-bold group-hover:text-gray-200 transition-colors'>
						<span className='text-4xl'>P</span>okémon
					</p>
				</div>
			</Link>

			<Link href={'/favorites'}>
				<a>Favoritos</a>
			</Link>
		</nav>
	);
};
