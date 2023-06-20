import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Dimensions,
  StyleSheet,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import AntDesignIcons1 from 'react-native-vector-icons/FontAwesome';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
// import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Video from 'react-native-video';
export default Post = () => {
  const [image, setImage] = useState();
  const [pics, setPics] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [video, setVideo] = useState('');
  const [tkn, setTkn] = useState('');
  const [thumbnail, setThumbnail] = useState('');

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
        // console.log(photos);
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        setImage('');
        const source = {uri: res.assets[0].uri};
        console.log('response :', source);
        setImage(source);
      }
    });
  };

  const gallery = () => {
    const options = {
      title: 'select files',
      mediaType: 'Mixed',
      durationLimit: 60,
      videoQuality: 'low',
      // maxWidth: 2000,
      // maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      // console.log("kjwndfksnjdf     ",response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
        console.log(pics);
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        if (response.assets[0].type == 'image/jpeg') {
          const imageSource = {uri: response.assets[0].uri};
          console.log('image file :  ', response.assets[0].type);
          setImage(imageSource);
          console.log('image');
        } else {
          const videoSource = {uri: response.assets[0].uri};
          console.log('video file :  ', response.assets[0].type);
          setVideo(videoSource);
          setThumbnail(videoSource);
          console.log('video');
        }

        // console.log("file type:   ",response.assets[0].type);
        // if(response.assets.type=='image/jpeg'){
        //   setImage("")
        // const source = {uri: response.assets[0].uri};
        // console.log("image file :  ",source.uri);
        // setImage(source);
        // console.log("image");
        // }
        // else if(response.assets.type == 'video/mp4'){
        //   setImage('')
        //   const videoSource = {uri: response.assets[0].uri};
        //   console.log(videoSource);
        //   setThumbnail(videoSource);
        //   setVideo(videoSource);
        //   console.log("video");
        // }
      }
    });
  };

  useEffect(() => {
    hasPermission();
    GetAllPhotos();
    getData();
  }, []);

  const getData = async () => {
    try {
      var value = await AsyncStorage.getItem('@storage_Key');
      if (value !== null) {
        // value previously stored
        console.log('got token     :', value);
        setTkn(value);
      }
    } catch (e) {
      // error reading value
    }
  };

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
      first: 20,
      assetType: 'Photos',
    })

      .then(response => {
        // console.log(JSON.stringify(response.edges));
        setPics(response.edges);
        // setPhotos(JSON.stringify(response.edges[0].node.image.uri));
        setImage(response.edges[0].node.image);
      })

      .catch(err => {
        console.log(('error message :', err));
      });
  };

  const createPost = async () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${tkn}`);
    // "Bearer" + " " + tkn
    var formData = new FormData();
    formData.append('post_file', {
      uri: video.uri,
      type: 'video/mp4',
      name: 'video.mp4',
    });
    formData.append('post_type', 'video');
    formData.append('thumbnail', {
      uri: thumbnail.uri,
      type: 'image/jpeg',
      name: 'image.jpg',
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formData,
      redirect: 'follow',
    };

    // var myHeaders = new Headers();
    // myHeaders.append('Authorization', `Bearer ${tkn}`);
    // // "Bearer" + " " + tkn
    // var formData = new FormData();
    // formData.append('post_file', {
    //   uri: image.uri,
    //   type: 'image/jpeg',
    //   name: 'image.jpg',
    // });
    // formData.append('post_type', 'image');

    // var requestOptions ={
    //   method:'POST',
    //   headers:myHeaders,
    //   body:formData,
    // }

    await fetch('https://test.touchapp.in/api/createPost', requestOptions)
      .then(data => data.json())
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return (
    <View style={{flex: 1}}>
      <View style={{height: '70%'}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {/* {image ? (
            <Image source={image} style={{width: '100%', height: '100%'}} />
          ) : (
            <Image
              source={require('../assests/person.png')}
              style={{width: '100%', height: '100%'}}
            />
          )} */}
          {image && (
            <Image source={image} style={{width: '100%', height: '100%'}} />
          )}
          {video && (
            <Video source={video} style={{width: '100%', height: '100%'}} />
          )}
          {/* <Image source={image} style={{width: '100%', height: '100%'}} /> */}
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

      <View style={{flex: 1}}>
        <FlatList
          data={pics}
          numColumns={3}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  width: Dimensions.get('window').width / 2 - 100,
                  height: 150,
                  // margin: 5,
                  // borderRadius: 5,
                  marginLeft: 25,
                }}>
                <TouchableOpacity>
                  <Image
                    source={{uri: item.node.image.uri}}
                    style={{width: 100, height: 100}}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />
        {/* <GetAllPhotos /> */}
      </View>
      <TouchableOpacity
        onPress={createPost}
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
          // marginTop:260
        }}>
        <AntDesignIcon name="arrowright" size={30} style={{color: 'white'}} />
      </TouchableOpacity>
    </View>
  );
};

var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: 50,
    width: 50,
  },
});
