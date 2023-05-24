import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigation from './src/navigation/AppNavigation';

if (__DEV__) {
  import('./reactotron').then(() => console.log('Reactotron Configured'));
}

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppNavigation />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
