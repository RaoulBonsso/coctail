import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CocktailList = ({ cocktails, favorites, onSelectCocktail, onAddToFavorites, onAddToCart, isFavoritesScreen }) => {
  const isFavorite = (cocktailId) => {
    return favorites.some(fav => fav.idDrink === cocktailId);
  };

  const handleAddToCart = (cocktail) => {
    onAddToCart(cocktail);
    Alert.alert(
      "Ajouté au panier !",
      `${cocktail.strDrink} a été ajouté à votre panier`,
      [
        {
          text: "OK",
          style: "default"
        }
      ],
      { cancelable: true }
    );
  };

  const renderCocktailItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => onSelectCocktail(item)}>
        <Image source={{ uri: item.strDrinkThumb }} style={styles.image} />
        <Text style={styles.name}>{item.strDrink}</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={() => onAddToFavorites(item)}
        >
          <Text style={styles.iconText}>
            <Icon 
              name={isFavorite(item.idDrink) ? "heart" : "heart-o"} 
              size={24} 
              color={isFavorite(item.idDrink) ? "#ff4444" : "#666"} 
            />
          </Text>
        </TouchableOpacity>
        {!isFavoritesScreen && (
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => handleAddToCart(item)}
          >
            <Text style={styles.addButtonText}>Ajouter au panier</Text>
          </TouchableOpacity>
        )}
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
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    padding: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  iconButton: {
    padding: 8,
  },
  iconText: {
    color: '#666',
  },
  addButton: {
    backgroundColor: '#f4511e',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 2,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default CocktailList;