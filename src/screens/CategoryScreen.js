import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const CATEGORIES_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

const CategoriesScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(CATEGORIES_URL);
        setCategories(response.data.drinks); // Assurez-vous que la structure de réponse est correcte
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryPress = (category) => {
    navigation.navigate('CocktailsByCategory', { category });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catégories de Cocktails</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.strCategory}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCategoryPress(item.strCategory)}>
            <Text style={styles.categoryItem}>{item.strCategory}</Text>
          </TouchableOpacity>
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
  categoryItem: {
    padding: 15,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default CategoriesScreen;