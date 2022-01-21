import { View } from '../components/Themed';
import { StyleSheet } from 'react-native';

export function ScreenWrapper(props: { children: React.ReactNode }) {
  return (
    <View style={styles.mainContainer}>
        {props.children} 
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 35,
    paddingHorizontal: 20,
    paddingBottom: 100,
    fontFamily: 'space-mono',
  }
});