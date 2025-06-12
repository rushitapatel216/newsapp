import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import DetailsScreen from '../screens/DetailsScreen';
import BookmarkScreen from '../screens/BookmarkScreen';
import { Image, Text, View, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import NewsScreen from '../screens/NewsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabStack() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const isNews = route.name === 'News';
          const icon = isNews
            ? require('../Assets/Images/news.png')
            : require('../Assets/Images/bookmark.png');

          return (
            <View style={styles.tabContainer}>
              <Image
                source={icon}
                style={[
                  styles.icon,
                  { tintColor: focused ? '#673ab7' : '#999' },
                ]}
              />
              <Text style={[styles.label, focused && styles.focusedLabel]}>
                {route.name}
              </Text>
            </View>
          );
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          elevation: 5,
        },
      })}
    >
      <Tab.Screen name="News" component={NewsScreen} />
      <Tab.Screen name="Bookmarks" component={BookmarkScreen} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={TabStack} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{headerShown:true}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(2),
  },
  icon: {
    height: wp(6),
    width: wp(6),
    marginBottom: 2,
  },
  label: {
    fontSize: wp(3),
    color: '#999',
    width: wp(30),
    textAlign: 'center',
  },
  focusedLabel: {
    color: '#673ab7',
    fontWeight: 'bold',
  },
});
