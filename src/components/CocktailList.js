import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CocktailList = ({ cocktails, onSelectCocktail, onAddToFavorites, onAddToCart, favorites = [] }) => {
  const isFavorite = (cocktailId) => {
    return favorites.some(fav => fav.idDrink === cocktailId);
  };

  const renderCocktailItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => onSelectCocktail(item)}>
        <Image source={{ uri: item.strDrinkThumb }} style={styles.image} />
        <Text style={styles.title}>{item.strDrink}</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          onPress={() => onAddToFavorites(item)}
          style={styles.iconButton}
        >
          <Icon 
            name={isFavorite(item.idDrink) ? "heart" : "heart-o"} 
            size={30} 
            color="#f4511e" 
          />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => onAddToCart(item)}
          style={styles.addButton}
        >
          <Icon name="shopping-cart" size={20} color="#fff" style={styles.cartIcon} />
          <Text style={styles.addButtonText}>Ajouter au panier</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={cocktails}
      keyExtractor={(item) => item.idDrink.toString()}
      renderItem={renderCocktailItem}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: '#2C3E50',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  iconButton: {
    padding: 5,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4511e',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  cartIcon: {
    marginRight: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default CocktailList;