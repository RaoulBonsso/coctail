import axios from 'axios';

const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

export const fetchRandomCocktails = async () => {
  const fetchedCocktails = [];
  for (let i = 0; i < 10; i++) {
    const response = await axios.get(`${API_URL}/random.php`);
    fetchedCocktails.push(response.data.drinks[0]);
  }
  return fetchedCocktails;
};

export const fetchCocktailsBySearch = async (query) => {
  const response = await axios.get(`${API_URL}/filter.php?i=${query}`);
  return response.data.drinks || [];
};

export const fetchCocktailDetails = async (id) => {
  const response = await axios.get(`${API_URL}/lookup.php?i=${id}`);
  return response.data.drinks[0];
};


export const fetchCocktailsByIngredient = async (ingredient) => {
  try {
    const response = await axios.get(`${API_URL}/filter.php?i=${ingredient}`);
    return response.data.drinks || []; // Retourne un tableau de cocktails
  } catch (error) {
    console.error('Erreur lors de la récupération des cocktails:', error);
    throw error; // Lance l'erreur pour qu'elle soit gérée dans le composant
  }
};