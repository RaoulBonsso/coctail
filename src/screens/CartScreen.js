import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { incrementCartItem, decrementCartItem, removeFromCart } from '../redux/actions';

const CartScreen = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleIncrement = (itemId) => {
    dispatch(incrementCartItem(itemId));
  };

  const handleDecrement = (itemId) => {
    dispatch(decrementCartItem(itemId));
  };

  const handleRemove = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  // Séparez les cocktails et les ingrédients
  const cocktails = cart.filter(item => item.type === 'cocktail');
  const ingredients = cart.filter(item => item.type === 'ingredient');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mon Panier</Text>

      {cocktails.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Cocktails</Text>
          <FlatList
            data={cocktails}
            keyExtractor={(item) => item.idDrink.toString()} // Assurez-vous d'utiliser une clé unique
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image source={{ uri: item.strDrinkThumb }} style={styles.image} />
                <Text style={styles.cocktailName}>{item.strDrink}</Text>
                <Text style={styles.quantity}>Quantité: {item.quantity}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={() => handleIncrement(item.idDrink)}>
                    <Text style={styles.button}>+</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDecrement(item.idDrink)}>
                    <Text style={styles.button}>-</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleRemove(item.idDrink)}>
                    <Text style={styles.removeButton}>Retirer</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      )}

      {ingredients.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Ingrédients</Text>
          <FlatList
            data={ingredients}
            keyExtractor={(item) => item.idIngredient.toString()} // Assurez-vous d'utiliser une clé unique
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.cocktailName}>{item.strIngredient}</Text>
                <Text style={styles.quantity}>Quantité: {item.quantity}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={() => handleIncrement(item.idIngredient)}>
                    <Text style={styles.button}>+</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDecrement(item.idIngredient)}>
                    <Text style={styles.button}>-</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleRemove(item.idIngredient)}>
                    <Text style={styles.removeButton}>Retirer</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      )}
      
      {cocktails.length === 0 && ingredients.length === 0 && (
        <Text style={styles.emptyText}>Votre panier est vide.</Text>
      )}
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
    color: '#343a40',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#007BFF',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  cocktailName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  quantity: {
    fontSize: 16,
    marginVertical: 5,
    color: '#6c757d',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    fontSize: 20,
    padding: 10,
    backgroundColor: '#007BFF',
    color: '#fff',
    borderRadius: 5,
    width: 40,
    textAlign: 'center',
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    width: 80,
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    padding: 20,
    fontSize: 16,
    color: 'gray',
  },
});

export default CartScreen;