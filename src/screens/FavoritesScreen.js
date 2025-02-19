import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CocktailList from '../components/CocktailList';
import { addToCart, addToFavorites } from '../redux/actions';

const FavoritesScreen = ({ navigation }) => {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const handleSelectCocktail = (cocktail) => {
    navigation.navigate('CocktailDetail', { cocktail });
  };

  const handleAddToCart = (cocktail) => {
    dispatch(addToCart(cocktail));
  };

  const handleAddToFavorites = (cocktail) => {
    dispatch(addToFavorites(cocktail));
  };

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.message}>Aucun cocktail favori trouvé.</Text>
      ) : (
        <CocktailList 
          cocktails={favorites}
          favorites={favorites}
          onSelectCocktail={handleSelectCocktail}
          onAddToCart={handleAddToCart}
          onAddToFavorites={handleAddToFavorites}
          isFavoritesScreen={true}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  message: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
});

export default FavoritesScreen;