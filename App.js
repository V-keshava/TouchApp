
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import 'react-native-gesture-handler';
const Stack = createNativeStackNavigator();

import RegisterScreen from "./Screens/RegisterScreen";
import SigninScreen from './Screens/SigninScreen';
import verificationScreen from './Screens/verificationScreen';
// import welcomepage from './Screens/welcomepage';
import MyTabs from './Screens/welcomepage';
import Create from './Screens/dummy';
import FeedScreen from './Screens/FeedScreen';


function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signin"  >
        <Stack.Screen name='Signin' component={SigninScreen} options={{headerShown:false}} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}} />
        <Stack.Screen name='Verify OTP' component={verificationScreen} options={{headerShown:false}} />
        {/* <Stack.Screen name='HomePage' component={welcomepage} options={{headerShown:false}}  /> */}
        <Stack.Screen name='MyTabs' component={MyTabs} options={{headerShown:false}}  />
        <Stack.Screen name='FeedScreen' component={FeedScreen} options={{headerShown:false}} />
        <Stack.Screen name='Dummy' component={Create} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App;