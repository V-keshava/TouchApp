import React from "react";
import { View, Text, StyleSheet} from 'react-native'


export default Story = () => {
    return (
      <View style={styles.main}>
        <Text>Story Screen</Text>
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