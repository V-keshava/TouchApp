import React, {useState, useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PostScreen from './PostScreen';
import StoryScreen from './StoryScreen';
import FlickScreen from './FlickScreen';



const Tab = createMaterialTopTabNavigator();
const MyTabs = ({navigation}) => {
  return (
    <Tab.Navigator
      initialRouteName="Post"
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarLabelStyle: {fontSize: 20},
        tabBarStyle: {backgroundColor: 'black'},
      }}>
      <Tab.Screen
        name="Post"
        component={PostScreen}
        options={{tabBarLabel: 'post'}}
      />
      <Tab.Screen
        name="Story"
        component={StoryScreen}
        options={{tabBarLabel: 'story'}}
      />
      <Tab.Screen
        name="Flick"
        component={FlickScreen}
        options={{tabBarLabel: 'flick'}}
      />
    </Tab.Navigator>
  );
};
export default MyTabs;
