import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Record from './Record'
import BoxSelect from './BoxSelect/BoxSelect'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'


const Stack = createNativeStackNavigator()

export default function RecordStack() {
    return (
        <GestureHandlerRootView style={{flex:1}}>
            <NavigationContainer independent>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen name="Record" component={Record}/>
                    <Stack.Screen name="Select" component={BoxSelect}/>
                </Stack.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    )
}