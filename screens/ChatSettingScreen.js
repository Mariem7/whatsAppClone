import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
const ChatSettingScreen = props => {
    return <View style={styles.container}>
        <Text>Chat setting screen</Text>
    </View>
};


const styles = StyleSheet.create({
    container:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });

export default ChatSettingScreen;