import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import CocktailList from '../components/CocktailList';

const FavoritesScreen = ({ navigation }) => {
  const favorites = useSelector((state) => state.favorites);

  const handleSelectCocktail = (cocktail) => {
    navigation.navigate('CocktailDetail', { cocktail });
  };

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.message}>Aucun cocktail favori trouvé.</Text>
      ) : (
        <CocktailList cocktails={favorites} onSelectCocktail={handleSelectCocktail} />
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