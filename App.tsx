import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigation from './src/navigation/AppNavigation';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

if (__DEV__) {
  import('./reactotron').then(() => console.log('Reactotron Configured'));
}

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SafeAreaProvider>
          <AppNavigation />
        </SafeAreaProvider>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
