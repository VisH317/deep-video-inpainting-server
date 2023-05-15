import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Record from './Record'
import BoxSelect from './BoxSelect/BoxSelect'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'

const Stack = createNativeStackNavigator()

export default function RecordStack() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Record" component={Record}/>
            <Stack.Screen name="Select" component={gestureHandlerRootHOC(BoxSelect)}/>
            
        </Stack.Navigator>
    )
}