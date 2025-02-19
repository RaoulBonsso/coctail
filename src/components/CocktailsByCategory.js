import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
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

  const isFavorite = (cocktailId) => {
    return favorites.some(fav => fav.idDrink === cocktailId);
  };

  const renderCocktailItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => handleSelectCocktail(item)}>
        <Image source={{ uri: item.strDrinkThumb }} style={styles.image} />
        <Text style={styles.name}>{item.strDrink}</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={() => handleAddToFavorites(item)}
        >
          <Text style={styles.iconText}>
            <Icon 
              name={isFavorite(item.idDrink) ? "heart" : "heart-o"} 
              size={24} 
              color={isFavorite(item.idDrink) ? "#ff4444" : "#666"} 
            />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => handleAddToCart(item)}
        >
          <Text style={styles.addButtonText}>Ajouter au panier</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (!cocktails || cocktails.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Aucun cocktail trouvé dans cette catégorie</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category} Cocktails</Text>
      <FlatList
        data={cocktails}
        keyExtractor={(item) => item.idDrink.toString()}
        renderItem={renderCocktailItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
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
  list: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
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

export default CocktailsByCategory;