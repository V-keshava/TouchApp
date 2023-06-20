import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default Flick = ({navigation, route}) => {
  const name = route.params;
  return (
    <View style={styles.main}>
      <Text>Flick Screen</Text>
    </View>
  );
};

const styles=StyleSheet.create({
    main:{
        alignItems:'center',
        justifyContent:'center',
        marginTop:'100%'
    }
})