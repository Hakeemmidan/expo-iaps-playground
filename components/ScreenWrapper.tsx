import { View } from '../components/Themed';
import { StyleSheet } from 'react-native';

export function ScreenWrapper(props: { children: React.ReactNode }) {
  return (
    <View style={styles.mainContainer}>
      {[props.children]} 
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 35,
    fontFamily: 'sans-serif-light',
  }
});