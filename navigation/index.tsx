/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useContext } from 'react';
import { Button, ColorSchemeName, StyleSheet } from 'react-native';

import { AppContext, CurrentUser } from '../contexts/AppContext';
import firebase, { auth, signInWithGoogle } from '../helpers/firebase_auth';
import { RootScreen } from '../screens/RootScreen';
import { CheckoutScreen } from '../screens/CheckoutScreen';
import { NotFoundScreen } from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { PressableButton, Text, View } from '../components/Themed';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * "... provides a way for your app to transition between screens where each new screen is placed on top of a stack"
 * https://reactnavigation.org/docs/native-stack-navigator/
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const appCtx = useContext(AppContext);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authUser: any) => {
      if (authUser) {
        const { uid, displayName, email }: CurrentUser = authUser;
        const shapedUser: CurrentUser = { uid, displayName, email };
  
        appCtx.setState({...appCtx.state, currentUser: shapedUser});
      } else {
        appCtx.setState({...appCtx.state, currentUser: {uid: '', displayName: '', email: ''}});
      }
    })
  }, []);

  const HeaderRight = () => {
    return (
      <View style={styles.headerRight}>
        {appCtx.state.currentUser.displayName ?
        <View style={styles.greetingContainer}>
          <Text style={styles.displayName}>{appCtx.state.currentUser.displayName}</Text>
          <Button title='Sign out' onPress={() => auth.signOut()} />
        </View>
        : <PressableButton
          title='Sign in with Google'
          onPress={signInWithGoogle}
        />}
      </View>
    );
  };

  return (
    <Stack.Navigator
      screenOptions={{ headerTitleStyle: { fontWeight: 'bold' }, headerRight: () => <HeaderRight/> }}
      initialRouteName="Root"
    >
      <Stack.Screen name="Root" component={RootScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    marginRight: 15,
  },
  greetingContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  displayName: {
    marginRight: 10,
  }
});
