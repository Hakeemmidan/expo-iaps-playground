import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { openBrowserAsync } from 'expo-web-browser';

import { AppContext } from '../contexts/AppContext';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { SignInWithGoogle } from '../components/SignInWithGoogle';
import { RootStackScreenProps } from '../types';
import { View, Text, PressableButton } from '../components/Themed';

export function RootScreen({ navigation }: RootStackScreenProps<'Root'>) {
  const { state: { currentUser } } = useContext(AppContext);
  const availableWeightInKg: number = 50; // <= in a real world environment this would be coming from an API or database

  return (
    <ScreenWrapper>
      <Text style={styles.titleText}>
        Buy Grapes
      </Text>
      <Text style={styles.weightText}>
        Available weight: {availableWeightInKg} kg
      </Text>
      <Text style={styles.grapIcon}>
        🍇
      </Text>
      <View style={styles.pageRowContainer}>
        {currentUser.displayName
          ? <PressableButton
            title='Checkout'
            onPress={() => openBrowserAsync('https://buy.stripe.com/test_4gwdRb0uq0YCa6kfYY')}
          />
          : <SignInWithGoogle/>
        }
      </View>
      <View style={styles.pageRowContainer}>
      </View>
    </ ScreenWrapper>
  );
}


const styles = StyleSheet.create({
  titleText: {
    fontSize: 50,
    paddingBottom: 20,
    fontWeight: "bold",
  },
  weightText: {
    fontSize: 20,
    paddingBottom: 20,
  },
  quantityInput: {
    width: 100,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    marginRight: 15,
  },
  grapIcon: {
    fontSize: 100,
  },
  pageRowContainer: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  kgTxt: {
    fontSize: 20,
  },
});
