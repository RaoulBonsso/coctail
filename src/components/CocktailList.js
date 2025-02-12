import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CocktailList = ({ cocktails, onSelectCocktail, onAddToFavorites, onAddToCart, favorites = [] }) => {
  const isFavorite = (cocktailId) => {
    return favorites.some(fav => fav.idDrink === cocktailId);
  };

  return (
    <FlatList
      data={cocktails}
      keyExtractor={(item) => item.idDrink.toString()} // Assurez-vous que la clé est une chaîne
      renderItem={({ item }) => (
        <View style={styles.card}>
          <TouchableOpacity onPress={() => onSelectCocktail(item)}>
            <Image source={{ uri: item.strDrinkThumb }} style={styles.image} />
            <Text style={styles.title}>{item.strDrink}</Text>
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => onAddToFavorites(item)}>
              <Icon name={isFavorite(item.idDrink) ? "heart" : "heart-o"} size={30} color="red" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onAddToCart(item)}>
              <Text style={styles.addToCartButton}>Ajouter au panier</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    padding: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  addToCartButton: {
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
  },
});

export default CocktailList;