
import React, {useState, useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Button} from '@rneui/themed';
import {
  View,
  Text,
  Image,
  Platform,
  PermissionsAndroid,
  FlatList,
  Dimensions,
} from 'react-native';
import AntDesignIcons1 from 'react-native-vector-icons/FontAwesome';
import AntDesignIcons2 from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'react-native-image-picker';
// import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import axios from 'react-native-axios';
import {TouchableOpacity} from 'react-native-gesture-handler';




export default Create =()=>{
  const [image, setImage] = useState();
  const [photos, setPhotos] = useState([])



cameraLaunch = () => {
  let options = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  ImagePicker.launchCamera(options, res => {
    // console.log('Response = ', res);
    if (res.didCancel) {
      console.log('User cancelled image picker');
    } else if (res.error) {
      console.log('ImagePicker Error: ', res.error);
    } else if (res.customButton) {
      console.log('User tapped custom button: ', res.customButton);
      alert(res.customButton);
    } else {
      const source = {uri: res.assets[0].uri};
      console.log('response :', source);
      setImage(source);
    }
  });
};

const gallery = () => {
  const options = {
    title: 'select files',
    maxWidth: 2000,
    maxHeight: 2000,
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  ImagePicker.launchImageLibrary(options, response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      const source = {uri: response.assets[0].uri};
      // Use the selected image source as needed
      console.log(source);
      setImage(source);
    }
  });
};

useEffect(() => {
  hasPermission();
}, []);

const hasPermission = async () => {
  const permission =
    Platform.Version >= 33
      ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
      : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
};
const GetAllPhotos = () => {
  CameraRoll.getPhotos({
    first: 50,
    assetType: 'Photos',
  })
    .then(r => {
      // this.setState({ photos: r.edges });
      // console.log(JSON.stringify(r.edges));
      setPhotos(r.edges);
      // console.log(r.edges);
    })
    .catch(err => {
      //  Error Loading Images
      console.log(err);
    });
};

const createPost = async () => {
  await axios.post('https://test.touchapp.in/api/createPost', {
    post_file: image,
    post_type: 'image/jpeg',
  });
};

return (
  <View>
    <View style={{height: '80%'}}>
      <View
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {image ? (
          <Image source={image} style={{width: '100%', height: '100%'}} />
        ) : (
          <Image
            source={require('../assests/person.png')}
            style={{width: '100%', height: '100%'}}
          />
        )}
      </View>
      <View
      style={{
        flexDirection: 'row',
        //   justifyContent: 'space-evenly',
        marginTop: 0,
        backgroundColor: 'aqua',
      }}>
      <Text style={{fontSize: 35, marginLeft: 20}}>Gallery</Text>
      <AntDesignIcons1
        name="camera"
        size={30}
        style={{marginLeft: '45%', marginTop: 8}}
        onPress={cameraLaunch}
      />
      <AntDesignIcons1
        name="photo"
        size={30}
        style={{marginLeft: '7%', marginTop: 8}}
        onPress={gallery}
      />
    </View>
    </View>  
    <View style={{flex: 1,}}>
      <FlatList
        data={photos}
        numColumns={2}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                width: Dimensions.get('window').width / 2 - 20,
                height: 250,
                margin: 15,
                borderRadius: 15,
              }}>
              <TouchableOpacity>
                <Image
                  source={{uri: item.node.image.uri}}
                  style={{width: 200, height: 200}}
                /> 
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <GetAllPhotos />
    </View>
    {/* <TouchableOpacity
      style={{
        // position:'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white',
        width: 65,
        height: 65,
        borderRadius: 50,
        marginLeft: '45%',
        backgroundColor: 'orange',
        
      }}>
      <AntDesignIcon name="arrowright" size={30} style={{color: 'white'}} />
    </TouchableOpacity> */}
  </View>
);
}






