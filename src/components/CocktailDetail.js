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
        <View style={styles.overlay}>
          <Text style={styles.title}>{details.strDrink}</Text>
        </View>
        <TouchableOpacity onPress={handleToggleFavorite} style={styles.favoriteButton}>
          <Icon 
            name={isFavorite() ? "heart" : "heart-o"} 
            size={30} 
            color={isFavorite() ? "#f4511e" : "#fff"} 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="info-circle" size={24} color="#f4511e" />
            <Text style={styles.sectionTitle}>Instructions</Text>
          </View>
          <Text style={styles.instructions}>{details.strInstructions}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="list" size={24} color="#f4511e" />
            <Text style={styles.sectionTitle}>Ingrédients</Text>
          </View>
          {Object.keys(details).map((key) => {
            if (key.startsWith('strIngredient') && details[key]) {
              const measure = details[`strMeasure${key.slice(-1)}`] || '';
              return (
                <View key={key} style={styles.ingredientContainer}>
                  <Image 
                    source={{ uri: `https://www.thecocktaildb.com/images/ingredients/${details[key]}-Small.png` }} 
                    style={styles.ingredientImage} 
                  />
                  <View style={styles.ingredientInfo}>
                    <Text style={styles.ingredientName}>{details[key]}</Text>
                    <Text style={styles.measureText}>{measure}</Text>
                  </View>
                  <TouchableOpacity 
                    onPress={() => handleAddToCart(details[key])} 
                    style={styles.addButton}
                  >
                    <Icon name="plus" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              );
            }
            return null;
          })}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  imageContainer: {
    position: 'relative',
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  favoriteButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 12,
    borderRadius: 30,
  },
  contentContainer: {
    padding: 20,
  },
  section: {
    marginBottom: 25,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
  },
  instructions: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  ingredientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  ingredientImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
  },
  ingredientInfo: {
    flex: 1,
    marginLeft: 15,
  },
  ingredientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  measureText: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  addButton: {
    backgroundColor: '#f4511e',
    padding: 10,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CocktailDetail;