import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Button, Image, Input} from '@rneui/themed';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Octicons';
import Icon2 from 'react-native-vector-icons';
import auth from '@react-native-firebase/auth';
import DeviceInfo from 'react-native-device-info';
import app from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'react-native-axios';

export default RegisterScreen = ({navigation}) => {
  const [mobile, setMobile] = useState('');
  const [full_name, setFullname] = useState('');
  const [user_name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDOB] = useState('');
  const [gender, setGender] = useState('');
  // const [confirm, setConfirm] = useState(null);
  // const [code, setCode] = useState('');
  const [image, setImage] = useState('');
  // const [udid, setUdid] = useState('');
  const [fcm_token, setFcmToken] = useState('');

  const fcmToken =
    'dn1j-4PXQWGjSGrRxKytJI:APA91bHHgsdhDkg2m2kzWvPQAevPqHKweaNtBEpIyaoR4-9p6uMxjcaYSeaZBbkDxEsmmkQ5ZMzBLkNuPDPcZWzrGBzJErHS_dArWNq8oeJaosZM4LlCKNfjL8TwpBp8wDK5RIk7Loo7';

  const udid = '864e4b6956f54267';

  const pickImage = async () => {
    options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, Response => {
      if (Response.didCancel) {
        console.log('user canceled image selection');
      } else if (Response.error) {
        console.log('ImagePicker error :', Response.error);
      } else if (Response.customebutton) {
        console.log('user tapped custom button :', Response.customebutton);
      } else {
        const source = {uri: Response.assets[0].uri};
        console.log(source.uri);
        setImage(source);
      }
    });
  };

  let fetchData = async () => {
    try {
      let formData = new FormData();
      formData.append('mobile', mobile);
      formData.append('password', password);
      formData.append('user_name', user_name);
      formData.append('full_name', full_name);
      formData.append('gender', gender);
      formData.append('udid', udid);
      formData.append('fcm_token', fcm_token);
      formData.append('dob', dob);
      formData.append('image', {
        uri: image.uri,
        type: 'image/jpeg',
        name: 'image.jpg',
      });
      await fetch('https://test.touchapp.in/auth/register', {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data'},
        body: formData,
      })
        .then(response => response.json())
        .then(data => console.log(data, '1st then'));
      navigation.navigate('Verify OTP').catch(err => {
        console.log(err, 'catch');
      });
      console.log('keshav 2nd then');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ImageBackground
      source={require('../assests/mainbg.jpg')}
      style={styles.mainContainer}>
      <View style={{marginTop: 0}}>
        <Image
          source={require('../assests/logo.png')}
          style={{width: 280, height: 60, marginTop: 20}}
        />
      </View>
      <View style={{marginLeft: '40%'}}>
        <Text
          style={{fontSize: 20, marginLeft: 30, color: 'white', marginTop: 10}}>
          Create
        </Text>
        <Text style={styles.heading}>Account</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.contentView}>
            {image ? (
              <Image
                source={image}
                style={{width: 90, height: 90, borderRadius: 50}}
              />
            ) : (
              <TouchableOpacity>
                <Image
                  source={require('../assests/person.png')}
                  style={{height: 120, width: 120}}
                />
              </TouchableOpacity>
            )}
            <Text onPress={pickImage} style={{marginTop: 10}}>
              Upload profile photo
            </Text>

            <View style={{flexDirection: 'row', marginLeft: 20, marginTop: 20}}>
              <MaterialCommunityIcons
                name="phone"
                size={25}
                color="#000"
                style={{marginTop: 10}}
              />
              <Input
                placeholder="Mobile No"
                autoFocus
                onChangeText={setMobile}
                value={mobile}
                containerStyle={styles.input}
                keyboardType="numeric"
              />
            </View>
            <View style={{flexDirection: 'row', marginLeft: 20}}>
              <Icon1
                name="key"
                size={25}
                color="#000"
                style={{marginTop: 15}}
              />
              <Input
                placeholder="password"
                type="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                autoFocus
                containerStyle={styles.input}
              />
            </View>
            <View style={{flexDirection: 'row', marginLeft: 20}}>
              <MaterialCommunityIcons
                name="account"
                size={25}
                color="#000"
                style={{marginTop: 10}}
              />
              <Input
                placeholder="Full Name"
                type="Text"
                value={full_name}
                onChangeText={setFullname}
                autoFocus
                containerStyle={styles.input}
              />
            </View>
            <View style={{flexDirection: 'row', marginLeft: 20}}>
              <MaterialCommunityIcons
                name="account"
                size={25}
                color="#000"
                style={{marginTop: 10}}
              />
              <Input
                placeholder="User Name"
                type="Text"
                value={user_name}
                onChangeText={setUsername}
                autoFocus
                containerStyle={styles.input}
              />
            </View>

            <View style={{flexDirection: 'row', marginLeft: 20}}>
              <MaterialCommunityIcons
                name="calendar"
                size={25}
                color="#000"
                style={{marginTop: 10}}
              />

              <Input
                placeholder="Select D.O.B"
                type="Text"
                value={dob}
                onChangeText={setDOB}
                autoFocus
                containerStyle={styles.input}
              />
            </View>
            <View style={{flexDirection: 'row', marginLeft: 20}}>
              <MaterialCommunityIcons
                name="gender-male-female"
                size={25}
                color="#000"
                style={{marginTop: 10}}
              />
              <Input
                placeholder="Gender"
                type="text"
                value={gender}
                onChangeText={setGender}
                autoFocus
                containerStyle={styles.input}
              />
            </View>
          </View>

          <View style={styles.submit}>
            <TouchableOpacity style={styles.icon} onPress={() => fetchData()}>
              <AntDesignIcon name="arrowright" size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: 350,
    backgroundColor: 'rgba(240, 240, 240, 0.5)',

    borderRadius: 20,
  },
  contentView: {
    alignItems: 'center',
    marginRight: 10,
    marginTop: 10,
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    alignItems: 'flex-end',
    color: 'white',
  },
  input: {
    width: 250,
  },
  headerView: {
    alignItems: 'flex-end',
  },
  submit: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 50,
    marginLeft: 250,
    marginBottom: 20,
    height: 60,
    width: 60,
  },
  icon: {
    backgroundColor: 'orange',
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    margin: 5,
  },
});
