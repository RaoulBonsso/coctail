import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { incrementCartItem, decrementCartItem, removeFromCart } from '../redux/actions';

const CartScreen = ({ navigation }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleIncrement = (cocktailId) => {
    dispatch(incrementCartItem(cocktailId));
  };

  const handleDecrement = (cocktailId) => {
    dispatch(decrementCartItem(cocktailId));
  };

  const handleRemove = (cocktailId) => {
    dispatch(removeFromCart(cocktailId));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mon Panier</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.idDrink}
        renderItem={({ item }) => (
          <View style={styles.card}>
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
    color: 'red',
    marginLeft: 10,
    fontWeight: 'bold',
  },
});

export default CartScreen;