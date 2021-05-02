import React, { Component, useEffect, useState} from "react";
import { 
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Image,
    Dimensions,
    TextInput,
    Button,
} from "react-native";
// import * as Linking from 'expo-linking';
import { Feather,Entypo } from '@expo/vector-icons';
const {width,height} = Dimensions.get('window')

const TempatWisata=({route ,navigation})=>{
    const [filterData, setfilterData] = useState([]);
    const [masterData, setmasterData] = useState([]);
    const [search, setsearch] = useState('');

    useEffect(() =>{
        fetchData360();
        return()=>{

        }
    },[])
    // const goToabout = () =>{
    //     navigation.navigate('about',item);
    //   }

    const fetchData360 =()=>{
        const apiURL='http://api.mpdigital.id/kawanua360'
        fetch(apiURL)
        .then((response) => response.json())
        .then((responseJson) =>{
            setfilterData(responseJson);
            setmasterData(responseJson);
        }).catch((error) =>{
            console.error(error);
        })
    }
    const searchFilter = (text)=>{
        if(text){
            const newData= masterData.filter((item)=>{
                const itemData=item.site_name ?   item.site_name.toUpperCase()
                                :''.toUpperCase();
                const textData=text.toUpperCase();
                return itemData.indexOf(textData)>-1;
            });
            setfilterData(newData);
            setsearch(text);
        }else{
            setfilterData(masterData);
            setsearch(text);
        }
    }

    const ItemView=({item})=>{
        return(
            <View style={styles.cardView}>
                  <Text style={styles.sitename}>{item.site_name}
                  </Text>
                  <TouchableOpacity onPress={()=>navigation.navigate('about',item)}>
                  <Image style={styles.image} source={item.thumbnail ? {uri: item.thumbnail } : null}/>
                  </TouchableOpacity>
              </View>
        )
    }
    return(
        <SafeAreaView >
            <View style={styles.container}>
                <TextInput
                style={styles.TextInputStyle}
                value={search}
                placeholder="search your destination here"
                placeholderTextColor="black"
                onChangeText={(text)=>searchFilter(text)}
                />
                <FlatList
                    data={filterData}
                    keyExtractor={({id}) => id }
                    renderItem={ItemView}
                />
            </View>
            <TouchableOpacity onPress={()=>navigation.navigate('MainMenu')}
        style={{position: 'absolute', left:20, top:45,
          backgroundColor:'#ff6200', padding:10, borderRadius:40, elevation:5}}>
        <Feather name="arrow-left" size={24} color='#fff'/>
        </TouchableOpacity>
        </SafeAreaView>
    )
}
export default TempatWisata;
const styles = StyleSheet.create({
    container: {
        backgroundColor:'#E8E8E8'
    },
    TextInputStyle:{
        top:30,
        left : 85,
        marginTop: 16,
        backgroundColor:'white',
        paddingLeft: 24,
        padding : 12,
        borderWidth: 1,
        borderColor: 'black',
        borderTopLeftRadius : 30,
        borderBottomLeftRadius : 30,
        width: '80%',
        elevation: 1,
    },
    cardView: {
        // top:-160,
        marginTop:40,
        backgroundColor: 'white',
        margin: width * 0.03,
        borderRadius: width * 0.04,
        shadowRadius: 3
    },
    image:{
        top:-50,
        height: 190,
        marginLeft:20,
        marginRight:20,
    },
   
    sitename:{
      top:-20,
      width:width,
      margin:width*0.1,
      marginHorizontal:10 ,
      color:'black',
      fontSize:16,
      fontWeight:'bold'
    },
});
