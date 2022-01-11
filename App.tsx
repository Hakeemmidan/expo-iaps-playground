import Toast from 'react-native-toast-message';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as WebBrowser from 'expo-web-browser';

import { AppContextProvider } from './contexts/AppContext';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AppContextProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
          <Toast />
        </AppContextProvider>
      </SafeAreaProvider>
    );
  }
}
