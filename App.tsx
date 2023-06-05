
import React from 'react';
import StackNavigation from './src/StackNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/provider/store';

function App(): JSX.Element {
  return (
    <Provider store={store} key="provider">
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </Provider>
  )
}
export default App;
