import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Keyboard,
  Animated,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/actions';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const fadeAnim = React.useRef(new Animated.Value(1)).current;

  const handleSearch = async (text) => {
    setSearchQuery(text);
    if (text.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${text}`
      );
      
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();

      setResults(response.data.drinks || []);
    } catch (err) {
      setError('Une erreur est survenue lors de la recherche');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCocktailPress = (cocktail) => {
    Keyboard.dismiss();
    navigation.navigate('CocktailDetail', { cocktail });
  };

  const toggleFavorite = (cocktail) => {
    const isFavorite = favorites.some((fav) => fav.idDrink === cocktail.idDrink);
    if (isFavorite) {
      dispatch(removeFavorite(cocktail.idDrink));
    } else {
      dispatch(addFavorite(cocktail));
    }
  };

  const renderSearchBar = () => (
    <View style={styles.searchBarContainer}>
      <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher un cocktail..."
        value={searchQuery}
        onChangeText={handleSearch}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {searchQuery.length > 0 && (
        <TouchableOpacity
          onPress={() => {
            setSearchQuery('');
            setResults([]);
          }}
          style={styles.clearButton}
        >
          <Icon name="times-circle" size={20} color="#666" />
        </TouchableOpacity>
      )}
    </View>
  );

  const renderItem = ({ item }) => {
    const isFavorite = favorites.some((fav) => fav.idDrink === item.idDrink);
    return (
      <TouchableOpacity
        style={styles.cocktailCard}
        onPress={() => handleCocktailPress(item)}
        activeOpacity={0.7}
      >
        <Image source={{ uri: item.strDrinkThumb }} style={styles.cocktailImage} />
        <View style={styles.cocktailInfo}>
          <Text style={styles.cocktailName}>{item.strDrink}</Text>
          <Text style={styles.cocktailCategory}>{item.strCategory}</Text>
        </View>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item)}
        >
          <Icon
            name={isFavorite ? 'heart' : 'heart-o'}
            size={24}
            color={isFavorite ? '#f4511e' : '#666'}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#f4511e" />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centerContainer}>
          <Icon name="exclamation-circle" size={50} color="#f4511e" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    }

    if (results.length === 0 && searchQuery.length >= 2) {
      return (
        <View style={styles.centerContainer}>
          <Icon name="search" size={50} color="#666" />
          <Text style={styles.noResultsText}>
            Aucun cocktail trouvé pour "{searchQuery}"
          </Text>
        </View>
      );
    }

    if (results.length === 0) {
      return (
        <View style={styles.centerContainer}>
          <Icon name="glass" size={50} color="#666" />
          <Text style={styles.placeholderText}>
            Recherchez parmi notre collection de cocktails
          </Text>
        </View>
      );
    }

    return (
      <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
        <FlatList
          data={results}
          renderItem={renderItem}
          keyExtractor={(item) => item.idDrink}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {renderSearchBar()}
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 15,
    paddingHorizontal: 15,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  clearButton: {
    padding: 8,
  },
  listContainer: {
    padding: 15,
  },
  cocktailCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  cocktailImage: {
    width: 100,
    height: 100,
  },
  cocktailInfo: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  cocktailName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  cocktailCategory: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  favoriteButton: {
    padding: 15,
    justifyContent: 'center',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: '#e74c3c',
    textAlign: 'center',
  },
  noResultsText: {
    marginTop: 10,
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  placeholderText: {
    marginTop: 10,
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
});

export default SearchScreen;