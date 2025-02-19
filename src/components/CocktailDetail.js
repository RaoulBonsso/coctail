import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { fetchCocktailDetails } from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite, addToCart } from '../redux/actions';
import Icon from 'react-native-vector-icons/FontAwesome';

const CocktailDetail = ({ route }) => {
  const { cocktail } = route.params;
  const [details, setDetails] = useState(null);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  useEffect(() => {
    const loadDetails = async () => {
      const data = await fetchCocktailDetails(cocktail.idDrink);
      setDetails(data);
    };
    loadDetails();
  }, [cocktail]);

  const isFavorite = () => {
    return favorites.some(fav => fav.idDrink === cocktail.idDrink);
  };

  const handleToggleFavorite = () => {
    if (isFavorite()) {
      dispatch(removeFavorite(cocktail.idDrink));
    } else {
      dispatch(addFavorite(details));
    }
  };

  const handleAddToCart = (ingredient) => {
    dispatch(addToCart(ingredient));
  };

  if (!details) {
    return null; // ou un indicateur de chargement
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: details.strDrinkThumb }} style={styles.image} />
        <TouchableOpacity onPress={handleToggleFavorite} style={styles.favoriteButton}>
          <Icon 
            name={isFavorite() ? "heart" : "heart-o"} 
            size={30} 
            color="red" 
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{details.strDrink}</Text>
      <Text style={styles.instructions}>Instructions:</Text>
      <Text>{details.strInstructions}</Text>
      <Text style={styles.ingredientsTitle}>Ingrédients:</Text>
      {Object.keys(details).map((key) => {
        if (key.startsWith('strIngredient') && details[key]) {
          const ingredientImage = getIngredientImage(details[key]); // Fonction pour obtenir l'image de l'ingrédient
          return (
            <View key={key} style={styles.ingredientContainer}>
              <Image source={{ uri: ingredientImage }} style={styles.ingredientImage} />
              <Text style={styles.ingredientText}>
                {details[key]} - {details[`strMeasure${key.slice(-1)}`]}
              </Text>
              <TouchableOpacity onPress={() => handleAddToCart(details[key])} style={styles.addButton}>
                <Icon name="shopping-cart" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          );
        }
        return null;
      })}
    </ScrollView>
  );
};

// Fonction fictive pour obtenir des images d'ingrédients
const getIngredientImage = (ingredient) => {
  // Remplacez cette logique par une API ou des images locales
  return `https://www.thecocktaildb.com/images/ingredients/${ingredient}.png`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginVertical: 10,
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    padding: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  instructions: {
    fontSize: 16,
    marginVertical: 10,
    color: '#555',
  },
  ingredientsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#007BFF',
  },
  ingredientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  ingredientImage: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginRight: 10,
  },
  ingredientText: {
    fontSize: 16,
    flex: 1,
  },
  addButton: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CocktailDetail;