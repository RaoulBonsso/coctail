import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import CartScreen from '../screens/CartScreen';
import SearchScreen from '../screens/SearchScreen';
import CocktailDetail from '../components/CocktailDetail';
import CocktailsByCategory from '../components/CocktailsByCategory';
import CategoriesScreen from '../screens/CategoryScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Composant pour le label du drawer avec emoji
const DrawerLabel = ({ label, emoji }) => (
  <View style={styles.drawerLabel}>
    <Text style={styles.drawerEmoji}>{emoji}</Text>
    <Text style={styles.drawerText}>{label}</Text>
  </View>
);

// Stack Navigator pour l'écran Home
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="Cocktail List" 
        component={HomeScreen}
      />
      <Stack.Screen 
        name="CocktailDetail" 
        component={CocktailDetail}
        options={{
          headerShown: true,
          headerTitle: () => <Text style={styles.headerTitle}>Détails du Cocktail</Text>,
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerBackTitle: ' ',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen 
        name="CocktailsByCategory" 
        component={CocktailsByCategory}
        options={{
          headerShown: true,
          headerTitle: () => <Text style={styles.headerTitle}>Cocktails par Catégorie</Text>,
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerBackTitle: ' ',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

// Stack Navigator pour les favoris
const FavoritesStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FavoritesList" component={FavoritesScreen} />
      <Stack.Screen 
        name="CocktailDetail" 
        component={CocktailDetail}
        options={{
          headerShown: true,
          headerTitle: () => <Text style={styles.headerTitle}>Détails du Cocktail</Text>,
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerBackTitle: ' ',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

// Stack Navigator pour la recherche
const SearchStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SearchList" component={SearchScreen} />
      <Stack.Screen 
        name="CocktailDetail" 
        component={CocktailDetail}
        options={{
          headerShown: true,
          headerTitle: () => <Text style={styles.headerTitle}>Détails du Cocktail</Text>,
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerBackTitle: ' ',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

// Stack Navigator pour les catégories
const CategoryStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="CategoriesList" 
        component={CategoriesScreen}
      />
      <Stack.Screen 
        name="CocktailsByCategory" 
        component={CocktailsByCategory}
        options={({ route }) => ({
          headerShown: true,
          headerTitle: () => <Text style={styles.headerTitle}>{route.params.category}</Text>,
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerBackTitle: ' ',
          headerBackTitleVisible: false,
        })}
      />
      <Stack.Screen 
        name="CocktailDetail" 
        component={CocktailDetail}
        options={{
          headerShown: true,
          headerTitle: () => <Text style={styles.headerTitle}>Détails du Cocktail</Text>,
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerBackTitle: ' ',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

// Tab Navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = 'home';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-o';
          } else if (route.name === 'Search') {
            iconName = 'search';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#f4511e',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeStack}
        options={{
          tabBarLabel: props => <Text style={[styles.tabBarLabel, { color: props.color }]}>Accueil</Text>
        }}
      />
      <Tab.Screen 
        name="Favorites" 
        component={FavoritesStack}
        options={{
          tabBarLabel: props => <Text style={[styles.tabBarLabel, { color: props.color }]}>Favoris</Text>
        }}
      />
      <Tab.Screen 
        name="Search" 
        component={SearchStack}
        options={{
          tabBarLabel: props => <Text style={[styles.tabBarLabel, { color: props.color }]}>Recherche</Text>
        }}
      />
    </Tab.Navigator>
  );
};

// App Navigator avec Drawer comme navigation principale
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerActiveTintColor: '#f4511e',
          drawerInactiveTintColor: 'gray',
          drawerLabelStyle: {
            marginLeft: -20,
          },
        }}
      >
        <Drawer.Screen 
          name="MainTabs" 
          component={TabNavigator}
          options={{
            headerTitle: () => <Text style={styles.headerTitle}>Nos Cocktails</Text>,
            drawerLabel: ({ focused, color }) => (
              <DrawerLabel label="Nos Cocktails" emoji="🏠" />
            ),
          }}
        />
        <Drawer.Screen 
          name="DrawerCategories" 
          component={CategoryStack}
          options={{
            headerTitle: () => <Text style={styles.headerTitle}>Catégories</Text>,
            drawerLabel: ({ focused, color }) => (
              <DrawerLabel label="Catégories" emoji="🗂️" />
            ),
          }}
        />
        <Drawer.Screen 
          name="DrawerCart" 
          component={CartScreen}
          options={{
            headerTitle: () => <Text style={styles.headerTitle}>Panier Ingrédients</Text>,
            drawerLabel: ({ focused, color }) => (
              <DrawerLabel label="Panier Ingrédients" emoji="🛒" />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  drawerLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  drawerEmoji: {
    fontSize: 20,
    marginRight: 12,
  },
  drawerText: {
    fontSize: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tabBarLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default AppNavigator;