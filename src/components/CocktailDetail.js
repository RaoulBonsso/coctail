import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { fetchCocktailDetails } from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/actions';
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

  if (!details) {
    return null; // ou un indicateur de chargement
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{details.strDrink}</Text>
      <Image source={{ uri: details.strDrinkThumb }} style={styles.image} />
      <Text style={styles.instructions}>Instructions:</Text>
      <Text>{details.strInstructions}</Text>
      <Text style={styles.ingredientsTitle}>Ingrédients:</Text>
      {Object.keys(details).map((key) => {
        if (key.startsWith('strIngredient') && details[key]) {
          return (
            <Text key={key}>
              {details[key]} - {details[`strMeasure${key.slice(-1)}`]}
            </Text>
          );
        }
        return null;
      })}
      <TouchableOpacity onPress={handleToggleFavorite}>
        <Icon 
          name={isFavorite() ? "heart" : "heart-o"} 
          size={30} 
          color="red" 
          style={styles.favoriteIcon} 
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginVertical: 10,
  },
  instructions: {
    fontSize: 16,
    marginVertical: 10,
  },
  ingredientsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  favoriteIcon: {
    alignSelf: 'center',
    marginTop: 10,
  },
});

export default CocktailDetail;