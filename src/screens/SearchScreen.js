import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { fetchCocktailsByIngredient } from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/actions';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cocktails, setCocktails] = useState([]);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  useEffect(() => {
    const fetchCocktails = async () => {
      if (searchTerm) {
        const results = await fetchCocktailsByIngredient(searchTerm);
        setCocktails(results);
      } else {
        setCocktails([]);
      }
    };
    fetchCocktails();
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

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Rechercher par ingrédient..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <FlatList
        data={cocktails}
        keyExtractor={(item) => item.idDrink}
        renderItem={({ item }) => (
          <View style={styles.cocktailItem}>
            <Text>{item.strDrink}</Text>
            <TouchableOpacity onPress={() => handleToggleFavorite(item)}>
              <Icon 
                name={isFavorite(item.idDrink) ? "heart" : "heart-o"} 
                size={30} 
                color="red" 
              />
            </TouchableOpacity>
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
    padding: 10,
    fontSize: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default SearchScreen;