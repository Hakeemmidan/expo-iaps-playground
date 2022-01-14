import { useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { openBrowserAsync } from 'expo-web-browser';
import { doc, onSnapshot } from "firebase/firestore";

import { firestore } from '../helpers/firebase';
import { AppContext } from '../contexts/AppContext';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { ChargeList } from '../components/ChargeList';
import { SignInWithGoogle } from '../components/SignInWithGoogle';
import { RootStackScreenProps } from '../types';
import { View, Text, PressableButton } from '../components/Themed';

export function RootScreen({ navigation }: RootStackScreenProps<'Root'>) {
  const { state: { currentUser } } = useContext(AppContext);
  const [availableWeightInLbs, setAvailableWeightInLbs] = useState('🔄');
  const [deliveryDelayWarning, setDeliveryDelayWarning] = useState(''); // Used in case of negative available weight

  useEffect(() => {
    onSnapshot(doc(firestore, "grapes", "data_main"), (doc) => {
        const quantity_available_in_lbs = doc.data()?.quantity_available_in_lbs;
        if (quantity_available_in_lbs) {
          setAvailableWeightInLbs(String(quantity_available_in_lbs));
          if (quantity_available_in_lbs < 0) {
            setDeliveryDelayWarning('You can still order, but there will be a slight delay in delivery (1-2 extra business days) since the available quantity is negative.');
          }
        } else {
          setAvailableWeightInLbs('Database fetch error. You can still order but you will not be able to see the available weight.');
        }
    });
  }, []);

  return (
    <ScreenWrapper>
      <Text style={styles.titleText}>
        Buy Grapes
      </Text>
      <Text style={styles.weightText}>
        <Text style={styles.boldText}>Available weight:</Text> {availableWeightInLbs} lbs
      </Text>
      <Text>
        {deliveryDelayWarning}
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
        {currentUser.displayName ? <ChargeList currentUser={currentUser}/> : null}
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
  boldText: {
    fontWeight: "bold",
  },
  weightText: {
    fontSize: 20,
    paddingBottom: 20,
  },
  grapIcon: {
    fontSize: 100,
  },
  pageRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  kgTxt: {
    fontSize: 20,
  },
});
