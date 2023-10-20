import { StatusBar } from 'expo-status-bar';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import List from './screens/List';
import AddScreen from './screens/AddScreen';
import Details from './screens/Details';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name='Todo List'
          component={List}>

        </Stack.Screen>
        <Stack.Screen
          name='Add Todo'
          component={AddScreen}
          options={{presentation: 'modal',}}>

        </Stack.Screen>
        <Stack.Screen
          name='Details'
          component={Details}
          options={{presentation: 'modal',}}>

        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
