import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';

export function Root() {
  return (
    <View style={styles.container}>
      <Text>
        Hello world!
      </Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});