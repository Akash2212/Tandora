import React,{Component, Profiler} from 'react'
import {View} from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import Login from './Login';
import Profile from './Profile';
import Post from './Post';
import Trending from './Trending';
import SplashScreen from './SplashScreen';
import InsertDelete from './InsertDelete';
import MyPosts from './MyPosts';

const Tab = createMaterialBottomTabNavigator();

const More = () => {
  return(<View></View>)
}

const BuySell = () => {
  return(<View></View>)
}


export default class HomeScreen extends Component {
  render()
  {
    return(
      <Tab.Navigator 
        initialRouteName='Login'
        activeColor="#2ca7e0"
        barStyle={{ backgroundColor: '#fff' }}> 
        <Tab.Screen
          name="Location"
          component={Post}
          options={{
            tabBarLabel: 'Add Posts',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="publish" color={color} size={26} />
            ),
          }}
        />
        
        
        <Tab.Screen
          name='Profile'
          component={Profile}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => (
              <FontAwesome name="user-circle-o" color={color} size={26} style={{right:3}}/>
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}