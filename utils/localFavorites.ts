// Actualiza el LocalStorage
const toggleFavorite = (id: number) => {
	let favorites: number[] = JSON.parse(localStorage.getItem('favorites') ?? '[]');

	if (favorites.includes(id)) {
		// si esta en el arreglo lo quitamos
		favorites = favorites.filter((pokeId) => pokeId !== id);
	} else {
		// si no esta en el arreglo lo metemos
		favorites.push(id);
	}

	// Guardamos en LS (solo se pueden gragar strings)
	localStorage.setItem('favorites', JSON.stringify(favorites));
};

// Verifica si el pokemon existe en favorito
const existInFavorites = (id: number): boolean => {
	// evita que se ejecute en el servidor
	if (typeof window === 'undefined') return false;

	const favorites: number[] = JSON.parse(localStorage.getItem('favorites') ?? '[]');

	return favorites.includes(id); // retorna true o false
};

// Obtiene los pokemons favoritos almacenados en LocalStorage
const pokemons = (): number[] => {
	return JSON.parse(localStorage.getItem('favorites') ?? '[]');
};

export { toggleFavorite, existInFavorites, pokemons };
