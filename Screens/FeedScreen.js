import React from "react";
import { View, Text, Image} from 'react-native'
import AntdesignIcon from'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default FeedScreen =({navigation})=>{

    const nav =()=>{
        navigation.navigate('MyTabs')
    }
    const GetFeeds=async()=>{
        await fetch('https://test.touchapp.in/api/getFeeds',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                offset:0,
                limit:20
            })
        }).then(data=>data.json()).then(data=>console.log(data)).catch((err)=>console.log(err))
    }
    return(
        <View>
            <View style={{flexDirection:'row', height:60, backgroundColor:'black', alignItems:'center', justifyContent:'space-around'}}>
                <AntdesignIcon name="camera" size={30} style={{color:'white', marginLeft:-30}} onPress={nav} />
                <Image source={require('../assests/logo.png')} style={{width:150, height:35}} />
                <MaterialCommunityIcons name="bell" size={30} style={{color:'white'}} onPress={GetFeeds} />
            </View>
            
        </View>
    )
}