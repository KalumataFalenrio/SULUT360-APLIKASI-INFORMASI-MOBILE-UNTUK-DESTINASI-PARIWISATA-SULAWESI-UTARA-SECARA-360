import React,{Component} from 'react';
import { FlatList, ActivityIndicator, Text, View,StyleSheet,
    Dimensions, TouchableOpacity, TextInput} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Value } from 'react-native-reanimated';

const {width,height} = Dimensions.get('window')

// const TampilanDarat  =({navigation}) =>{

class DaratAPI extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    return fetch('http://api.mpdigital.id/kawanua360')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#ff6200" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
          <TextInput
            placeholder='search your destination'
            placeholderTextColor='#585757'
            style={{top:20,
                left : 85,
                marginTop: 16,
                backgroundColor:'#000000',
                paddingLeft: 24,
                padding : 12,
                borderTopLeftRadius : 30,
                borderBottomLeftRadius : 30,
                width: '80%',
                elevation: 5,}}
            />
        
            <Feather name='search' size={25} color='#585757'  style={
                {position:'absolute', top:50, left:380, elevation:5,}}
                />
        <FlatList 
          data={this.state.dataSource}
          renderItem={({ item }) => (
              <TouchableOpacity>
            <View style={styles.cardView}>
                <Text style={styles.sitename}>{item.site_name}</Text>
                <Text style={styles.thumbnail}>{item.thumbnail}</Text>
                <Text style={styles.link_360}>{item.link_360}</Text>
            </View>
            </TouchableOpacity>
          )}
          keyExtractor={({ id }) => id}
        />
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('MainMenu')}
        style={{position: 'absolute', left:20, top:40,
          backgroundColor:'#ff6200', padding:10, borderRadius:40, elevation:5}}>
        <Feather name="arrow-left" size={24} color='#fff'/>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
      },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardView: {
        top:30,
        backgroundColor: 'grey',
        margin: width * 0.03,
        borderRadius: width * 0.05,
        shadowColor: '#000',
        shadowOffset: { width:0.5, height: 0.5 },
        shadowOpacity: 0.5,
        shadowRadius: 3
    },
    sitename:{
        top:-20,
        width:width,
        margin:width*0.1,
        color:'black',
        fontSize:20,
        fontWeight:'bold'
    },
    thumbnail:{
        height: height / 9,
        marginLeft: width * 0.04,
        marginRight: width * 0.04,
        marginVertical: height * 0.03
    },
    link_360:{
        top: -20,
        marginBottom: width * 0.0,
        marginHorizontal: width * 0.02,
        fontSize: 15,
        color: 'black'
    },
});
export default DaratAPI;


// import React, { useEffect,useState } from "react";
// import { 
//     View,
//     Text,
//     StyleSheet,
//     Button,
//     TouchableOpacity,
// } from "react-native";
// import { Feather } from '@expo/vector-icons';

// //IMPORT CARD DAN API
// import DaratAPI from '../API/DaratAPI';

// const TampilanDarat  =({navigation}) =>{
//     const goToMainMenu = () =>{
//         navigation.navigate('MainMenu');

//     }
//     return(
//         <View>
//             <TouchableOpacity onPress={goToMainMenu}
//         style={{position: 'absolute', left:20, top:40,
//           backgroundColor:'#ff6200', padding:10, borderRadius:40,}}>
//         <Feather name="arrow-left" size={24} color='#fff'/>
//         </TouchableOpacity>
//         <DaratAPI></DaratAPI>
//         </View>
//     )
// }
// export default TampilanDarat;
