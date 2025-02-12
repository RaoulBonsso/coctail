import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import CocktailList from '../components/CocktailList';
import LoadingIndicator from '../components/LoadingIndicator';
import SearchBar from '../components/SearchBar';
import { fetchRandomCocktails } from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, addToCart } from '../redux/actions';

const HomeScreen = ({ navigation }) => {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  useEffect(() => {
    const loadCocktails = async () => {
      const data = await fetchRandomCocktails();
      setCocktails(data);
      setLoading(false);
    };
    loadCocktails();
  }, []);

  const filteredCocktails = cocktails.filter(cocktail =>
    cocktail.strDrink.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectCocktail = (cocktail) => {
    navigation.navigate('CocktailDetail', { cocktail });
  };

  const handleAddToFavorites = (cocktail) => {
    if (!favorites.some(fav => fav.idDrink === cocktail.idDrink)) {
      dispatch(addFavorite(cocktail));
    }
  };

  const handleAddToCart = (cocktail) => {
    dispatch(addToCart(cocktail));
  };

  return (
    <View style={{ flex: 1 }}>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {loading ? (
        <LoadingIndicator />
      ) : (
        <CocktailList 
          cocktails={filteredCocktails} 
          onSelectCocktail={handleSelectCocktail} 
          onAddToFavorites={handleAddToFavorites} 
          onAddToCart={handleAddToCart} 
          favorites={favorites} 
        />
      )}
    </View>
  );
};

export default HomeScreen;