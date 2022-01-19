import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { openBrowserAsync } from 'expo-web-browser';
import { AppContext } from '../contexts/AppContext';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { ChargeList } from '../components/ChargeList';
import { SignInWithGoogle } from '../components/SignInWithGoogle';
import { RootStackScreenProps } from '../types';
import { View, Text, PressableButton } from '../components/Themed';

export function RootScreen({ navigation }: RootStackScreenProps<'Root'>) {
  const { state: { currentUser } } = useContext(AppContext);

  return (
    <ScreenWrapper>
      <Text style={styles.titleText}>
        Buy Grapes
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
