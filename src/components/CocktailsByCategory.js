import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const CocktailsByCategory = ({ route }) => {
  const { category } = route.params; // Récupère la catégorie de la navigation
  const [cocktails, setCocktails] = useState([]);

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category} Cocktails</Text>
      <FlatList
        data={cocktails}
        keyExtractor={(item) => item.idDrink}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.strDrinkThumb }} style={styles.image} />
            <Text style={styles.cocktailName}>{item.strDrink}</Text>
            <TouchableOpacity>
              <Text style={styles.addButton}>Ajouter au Panier</Text>
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
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
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
  addButton: {
    color: 'blue',
    textAlign: 'center',
  },
});

export default CocktailsByCategory;