import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/actions';
import Icon from 'react-native-vector-icons/FontAwesome';

const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';

const fetchCocktailsByIngredient = async (ingredient) => {
  try {
    const response = await axios.get(`${API_URL}${ingredient}`);
    console.log('Réponse de l\'API:', response.data); // Afficher la réponse de l'API dans la console
    return response.data.drinks || []; // Retourne un tableau de cocktails
  } catch (error) {
    console.error('Erreur lors de la récupération des cocktails:', error);
    throw error; // Lance l'erreur pour qu'elle soit gérée dans le composant
  }
};

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cocktails, setCocktails] = useState([]);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  useEffect(() => {
    const fetchCocktails = async () => {
      if (searchTerm) {
        try {
          const results = await fetchCocktailsByIngredient(searchTerm);
          console.log('Cocktails trouvés:', results); // Afficher les cocktails trouvés
          if (results.length > 0) {
            setCocktails(results);
            setError(''); // Réinitialisez l'erreur si la recherche réussit
          } else {
            setCocktails([]);
            setError('Aucun cocktail trouvé.');
          }
        } catch (err) {
          console.error(err);
          setError('Erreur lors de la recherche des cocktails.');
        }
      } else {
        setCocktails([]);
        setError('');
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchCocktails();
    }, 300); // Délai de 300 ms

    return () => clearTimeout(delayDebounceFn); // Nettoyez le timeout
  }, [searchTerm]);

  const isFavorite = (cocktailId) => {
    return favorites.some(fav => fav.idDrink === cocktailId);
  };

  const handleToggleFavorite = (cocktail) => {
    if (isFavorite(cocktail.idDrink)) {
      dispatch(removeFavorite(cocktail.idDrink));
    } else {
      dispatch(addFavorite(cocktail));
    }
  };

  const handleAddToCart = (cocktail) => {
    // Logic to add cocktail to cart (to be implemented)
    console.log(`${cocktail.strDrink} ajouté au panier.`);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Rechercher par ingrédient..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <FlatList
        data={cocktails}
        keyExtractor={(item) => item.idDrink ? item.idDrink.toString() : Math.random().toString()} // Utilisez une clé unique
        renderItem={({ item }) => (
          item && item.idDrink ? ( // Vérifiez que item et idDrink existent
            <View style={styles.cocktailItem}>
              <Image source={{ uri: item.strDrinkThumb }} style={styles.cocktailImage} />
              <Text style={styles.cocktailName}>{item.strDrink}</Text>
              <TouchableOpacity onPress={() => handleToggleFavorite(item)}>
                <Icon 
                  name={isFavorite(item.idDrink) ? "heart" : "heart-o"} 
                  size={30} 
                  color="red" 
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleAddToCart(item)}>
                <Icon name="shopping-cart" size={30} color="blue" />
              </TouchableOpacity>
            </View>
          ) : null // Ne rien afficher si item est indéfini
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Aucun cocktail à afficher.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  cocktailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cocktailImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  cocktailName: {
    flex: 1,
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  emptyText: {
    textAlign: 'center',
    padding: 20,
    fontSize: 16,
    color: 'gray',
  },
});

export default SearchScreen;