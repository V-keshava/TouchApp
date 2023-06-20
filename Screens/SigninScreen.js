import React, {useState} from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {Button, Image} from '@rneui/themed';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default SigninScreen = ({navigation}) => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  const fcmToken =
    'dn1j-4PXQWGjSGrRxKytJI:APA91bHHgsdhDkg2m2kzWvPQAevPqHKweaNtBEpIyaoR4-9p6uMxjcaYSeaZBbkDxEsmmkQ5ZMzBLkNuPDPcZWzrGBzJErHS_dArWNq8oeJaosZM4LlCKNfjL8TwpBp8wDK5RIk7Loo7';

  const udid = '864e4b6956f54267';

  

  const Signin = async () => {
    try {
      await fetch('https://test.touchapp.in/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          mobile: mobile,
          password: password,
          fcm_token: fcmToken,
          udid: udid,
        }),
      })
        .then(data => data.json())
        .then(data => {
          // console.log(data.data.token)
          storeData(data.data.token);
          if (data) {
            navigation.navigate('FeedScreen');
          }
        });
    }
    catch(err){
      console.log(err);
    } 
  };
  const storeData = async value => {
    // console.log("token got  :  ",value);
    try {
      await AsyncStorage.setItem('@storage_Key', value);
    } catch (e) {
      console.log(err);
    }
  };
  return (
    <ImageBackground
      style={styles.screen}
      source={require('../assests/mainbg.jpg')}>
      <View style={{marginTop: 0}}>
        <Image
          source={require('../assests/logo.png')}
          style={{width: 280, height: 60, marginTop: 0}}
        />
      </View>
      <View style={styles.content}>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={styles.title}>Welcome</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30,
          }}>
          <View style={styles.fields}>
            <Icon name="user" size={20} />
            <TextInput
              placeholder="Mobile No"
              onChangeText={setMobile}
              style={styles.input}
            />
          </View>
          <View style={styles.fields}>
            <Icon name="lock" size={20} />
            <TextInput
              placeholder="password"
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry
            />
          </View>
          <Text style={styles.forgot}>Forgot Password ?</Text>
        </View>
        <View style={styles.button}>
          <TouchableOpacity style={styles.icon}>
            <AntDesignIcon
              name="arrowright"
              size={30}
              onPress={Signin}
              style={{color: 'white'}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.create}>
        <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>
          Don't have an account?{' '}
          <Text
            style={{color: 'brown'}}
            onPress={() => {
              navigation.navigate('Register');
            }}>
            Sign Up
          </Text>
        </Text>
        <Text
          style={{
            textAlign: 'center',
            marginTop: 20,
            color: 'black',
            textDecorationLine: 'underline',
          }}>
          Data Policy
        </Text>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '80%',
    height: 350,
    backgroundColor: 'rgba(240,240,240,0.5)',
    borderRadius: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    padding: 10,
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
  },
  fields: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: 'white',
    width: 250,
    marginBottom: 20,
  },
  forgot: {
    marginLeft: '45%',
    textDecorationLine: 'underline',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'brown',
    width: 65,
    height: 65,
    borderRadius: 50,
    marginLeft: 230,
    marginTop: 10,
  },
  icon: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 100,
  },
  create: {
    marginTop: 20,
  },
});

