import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import CartScreen from '../screens/CartScreen';
import SearchScreen from '../screens/SearchScreen';
import CocktailDetail from '../components/CocktailDetail';
import CategoriesScreen from '../screens/FavoritesScreen'; // Assurez-vous d'avoir ce composant
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Stack Navigator pour l'écran Home et CocktailDetail
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Cocktail List" component={HomeScreen} />
      <Stack.Screen name="CocktailDetail" component={CocktailDetail} />
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

          if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-o';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'shopping-cart' : 'shopping-cart';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeStack} />
        <Drawer.Screen name="Categories" component={CategoriesScreen} />
        <Drawer.Screen name="More Options" component={TabNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;