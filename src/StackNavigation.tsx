import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Home from './Home';
import Edit from './Edit';
import { onLoadAllDataFromLocal } from './provider/storage.local';


const AuthStack = createStackNavigator();

const StackNavigation = () => {
    onLoadAllDataFromLocal();

    return (
        <AuthStack.Navigator
            initialRouteName='Home'
            screenOptions={({ navigation, route }) => ({
                header: () => null,
                headerMode: "float",
            })}

        >
            <AuthStack.Screen
                name='HOME'
                component={Home}

            />
            <AuthStack.Screen
                name='EDIT'
                component={Edit}
            />
        </AuthStack.Navigator>
    );
};

export default StackNavigation;