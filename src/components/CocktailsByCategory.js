import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, addToCart } from '../redux/actions'; // Ajustez le chemin si nécessaire

const CocktailsByCategory = ({ route, navigation }) => {
  const { category } = route.params; // Récupère la catégorie de la navigation
  const [cocktails, setCocktails] = useState([]);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  useEffect(() => {
    const fetchCocktails = async () => {
      try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
        setCocktails(response.data.drinks);
      } catch (error) {
        console.error('Erreur lors de la récupération des cocktails:', error);
      }
    };

    fetchCocktails();
  }, [category]);

  const handleSelectCocktail = (cocktail) => {
    navigation.navigate('CocktailDetail', { cocktail });
  };

  const handleAddToFavorites = (cocktail) => {
    dispatch(addFavorite(cocktail)); // Utilisez l'action Redux
  };

  const handleAddToCart = (cocktail) => {
    dispatch(addToCart(cocktail)); // Utilisez l'action Redux
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category} Cocktails</Text>
      <FlatList
        data={cocktails}
        keyExtractor={(item) => item.idDrink.toString()} // Assurez-vous que la clé est une chaîne
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity onPress={() => handleSelectCocktail(item)}>
              <Image source={{ uri: item.strDrinkThumb }} style={styles.image} />
              <Text style={styles.cocktailName}>{item.strDrink}</Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => handleAddToFavorites(item)}>
                <Icon name={favorites.some(fav => fav.idDrink === item.idDrink) ? "heart" : "heart-o"} size={30} color="red" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleAddToCart(item)}>
                <Text style={styles.addToCartButton}>Ajouter au panier</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  cocktailName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
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

export default CocktailsByCategory;