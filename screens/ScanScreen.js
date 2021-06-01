import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';


export default class ScanScreen extends React.Component
{
    constructor()
    {
        super();
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal',
        }
    }
    getCameraPermissions=async()=>{
        const {status}=await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions:status==="granted",
            buttonState:'clicked',
            scanned:false,
        })

    }
    handleBarCodeScanned=async({type,data})=>
    {
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState:'normal',
        })
    }
    render(){
        const hasCameraPermissions=this.state.hasCameraPermissions
        const scanned=this.state.scanned
        const buttonState=this.state.buttonState
        if(buttonState==="clicked" && hasCameraPermissions)
        {
            return(
                <BarCodeScanner
                onBarCodeScanned={scanned ? undefined:this.handleBarCodeScanned}
             />
            )
        }
        else if(buttonState==="normal")
        {

        
        return(
                <View style={styles.container}>
                    <Image
                    source={require('../assets/BS.jpg')} style={{width:400,height:400}}
                    />
                    <TouchableOpacity style={styles.scanButton}
                    onPress={this.getCameraPermissions}>
                        <Text stye={styles.buttonText}>SCAN</Text>
                    </TouchableOpacity>

                </View>
        )
    }
}

}
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:'pink'
    },
    displayText:{
        fontSize:30,
    
    },
    scanButton:{
        backgroundColor:'turquoise',
        margin:30,
        padding:20,
        width:150,
        height:40,
        borderWidth:1.5,
        
        fontSize:20,

    },
    buttonText:{
        fontSize:50,
    },

})