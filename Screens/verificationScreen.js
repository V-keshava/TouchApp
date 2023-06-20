import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  StyleSheet,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Button, Image} from '@rneui/themed';
import axios from 'react-native-axios';

export default ConfirmOTP = ({navigation}) => {
  const [cinfirm, setConfirm] = useState(null);
  const [code, setCode] = useState("");

  const fcmToken =
    'dn1j-4PXQWGjSGrRxKytJI:APA91bHHgsdhDkg2m2kzWvPQAevPqHKweaNtBEpIyaoR4-9p6uMxjcaYSeaZBbkDxEsmmkQ5ZMzBLkNuPDPcZWzrGBzJErHS_dArWNq8oeJaosZM4LlCKNfjL8TwpBp8wDK5RIk7Loo7';

  const udid = '864e4b6956f54267';

  const verify = async () => {
    // try {
    
      
        // await axios
        //   .post('https://test.touchapp.in/auth/verifyOtp', {'otp': "184272"})
        //   .then(response => {
        //     if(response.ok == true){
        //         Alert.alert('otp verified')
        //     }else{
        //         Alert.alert('invalid otp')
        //     }
        //     // navigation.navigate('Signin');
        //   });
        // }

    //     await fetch('https://test.touchapp.in/auth/verifyOtp',{
    //         "otp":code
    //     },{
    //         Headers:{'Content-Type':'text/plain'}
    //     })
    //     // .then((data)=>data.json())
    //     .then((response)=>console.log(response))
    //     navigation.navigate('Signin')
      
    // } catch (err) {
    //   Alert.alert('OTP varification failed');
    //   console.log(err);
    // }
    
    const api = 'https://test.touchapp.in/auth/verifyOtp';
    try {
      await axios
        .post(api, {
          otp: code,
        })
        .then(data => console.log(data));
        navigation.navigate('Signin')
    } 
    catch(error) {
      console.log(error);
    }
  };

  return (
    <ImageBackground
      source={require('../assests/mainbg.jpg')}
      style={styles.page}>
      <View style={{marginTop: 0}}>
        <Image
          source={require('../assests/logo.png')}
          style={{width: 280, height: 60, marginTop: 0}}
        />
      </View>
      <View style={{marginLeft: '40%'}}>
        <Text style={styles.heading}>Verification</Text>
      </View>
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <FontAwesome
            name="lock"
            size={30}
            style={{marginTop: 15, marginLeft: -30}}
          />
          <TextInput
            placeholder="Enter OTP"
            onChangeText={setCode}
            style={styles.input}
            maxLength={6}
            keyboardType="numeric"
          />
        </View>
        <Button
          disabled={!code}
          title="Verify OTP"
          containerStyle={{borderRadius: 10}}
          onPress={() => verify()}
        />
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 100,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 20,
    color: 'white',
  },
  container: {
    width: 350,
    backgroundColor: 'rgba(240,240,240,0.5)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  heading: {
    fontSize: 30,
    alignItems: 'flex-end',
    fontWeight: 'bold',
    color: 'black',
  },
  submit: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
});
