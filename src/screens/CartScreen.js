import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { incrementCartItem, decrementCartItem, removeFromCart } from '../redux/actions';
import Icon from 'react-native-vector-icons/FontAwesome';

const CartScreen = ({ navigation }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleIncrement = (cocktailId) => {
    dispatch(incrementCartItem(cocktailId));
  };

  const handleDecrement = (cocktailId, currentQuantity) => {
    if (currentQuantity === 1) {
      Alert.alert(
        "Retirer l'article",
        "Voulez-vous retirer cet article du panier ?",
        [
          {
            text: "Annuler",
            style: "cancel"
          },
          {
            text: "Retirer",
            onPress: () => dispatch(removeFromCart(cocktailId)),
            style: "destructive"
          }
        ]
      );
    } else {
      dispatch(decrementCartItem(cocktailId));
    }
  };

  const handleRemove = (cocktailId, cocktailName) => {
    Alert.alert(
      "Retirer l'article",
      `Voulez-vous retirer "${cocktailName}" du panier ?`,
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        {
          text: "Retirer",
          onPress: () => dispatch(removeFromCart(cocktailId)),
          style: "destructive"
        }
      ]
    );
  };

  if (cart.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="shopping-cart" size={50} color="#ccc" />
        <Text style={styles.emptyText}>Votre panier est vide</Text>
        <TouchableOpacity
          style={styles.browseButton}
          onPress={() => navigation.navigate('MainTabs')}
        >
          <Text style={styles.browseButtonText}>Parcourir les cocktails</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mon Panier</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.idDrink}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Image source={{ uri: item.strDrinkThumb }} style={styles.image} />
              <View style={styles.cardInfo}>
                <Text style={styles.cocktailName}>{item.strDrink}</Text>
                <Text style={styles.category}>{item.strCategory}</Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity 
                    style={styles.quantityButton}
                    onPress={() => handleDecrement(item.idDrink, item.quantity)}
                  >
                    <Text style={styles.buttonText}>
                      <Icon name="minus" size={16} color="#fff" />
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.quantityDisplay}>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.quantityButton}
                    onPress={() => handleIncrement(item.idDrink)}
                  >
                    <Text style={styles.buttonText}>
                      <Icon name="plus" size={16} color="#fff" />
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => handleRemove(item.idDrink, item.strDrink)}
              >
                <Text style={styles.buttonText}>
                  <Icon name="trash" size={20} color="#ff4444" />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  listContainer: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 10,
    marginBottom: 20,
  },
  browseButton: {
    backgroundColor: '#f4511e',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 2,
  },
  browseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign: 'center',
    color: '#2c3e50',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 16,
    padding: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  cardInfo: {
    flex: 1,
    marginLeft: 12,
  },
  cocktailName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#f4511e',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
  },
  quantityDisplay: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginHorizontal: 8,
    borderRadius: 12,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  removeButton: {
    padding: 8,
  }
});

export default CartScreen;