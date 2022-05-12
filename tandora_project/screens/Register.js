import React,{Component} from "react";
import {View,Text,StyleSheet,Image,TextInput,TouchableOpacity} from 'react-native'
import axios from 'axios'
import AsyncStorage from "@react-native-community/async-storage";

export default class Register extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            email: '',
            passw: '',
            button: true,
            buttonFade: false
        };
    }

   
    



    render(){
/*
        const authenticateUser = async () => {
         
            if(this.state.email != '' && this.state.passw != ''){
              const user = new UserModel(this.state.email, this.state.passw);
      
              try {
                await user.login().then(() => this.props.navigation.navigate('HomeScreen'));
              } catch (err) {
                  alert(err.message)
              }
            }
          
        }; 
*/

const _storeData = async (token,emailID,name) => {
    try {
        let userCredentials = {
            jwt: token,
            email: emailID,
            username: name
        }
        await AsyncStorage.setItem('user',JSON.stringify(userCredentials))
        .then(() => this.props.navigation.navigate('HomeScreen'));
        
    }
    catch(err) {
        alert(err)
        console.log(err)
    }

}

const login = async () => {
    if(this.state.username == '') {
        alert('Enter valid user name')
    }
    if(this.state.email == '') {
        alert('Enter valid email')
    }
    if(this.state.passw == '') {
        alert('Enter valid password')
    }
    if(this.state.username != '' && this.state.email != '' && this.state.passw != '') {
        this.setState({button: false,buttonFade: true});
    const url = 'https://tandora.herokuapp.com';
    const requestConfig = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({   
            "username": this.state.username,
            "email": this.state.email,
            "password": this.state.passw,
        }),
      };

      try {
      const res = await fetch(`${url}/api/auth/local/register`, requestConfig).catch((e) => alert(e));
      const json = await res.json();
      if(json.error) {
          alert(json.error.message)
          console.log(json.error.message)
          this.setState({button: true, buttonFade: false})
      }
      else {
        console.log(json)
        _storeData(json.jwt,json.user.email,json.user.username);
      }

      }
      catch(err) {
          alert(err);
          console.log(err);
      }
    }
      
}

        return(
            <View style={styles.container}>
                <View style={{padding: 20, alignItems:'center',top:40}}>
                    <Image source={require('../Images/logo.jpeg')} style={{width:80,height:80}}/>
                    <Text style={styles.loginText}>Signup to Tandora</Text>
                    <View style={{flexDirection:'row'}}><Text style={{top:20,fontSize:18}}>Already have an account? </Text><TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}><Text style={{color:'#007aff',top:20,fontSize:18}}>Login</Text></TouchableOpacity></View>
                    <View style={{top: 60,flexDirection:'row'}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Image source={require('../Images/googleLogo.png')} style={{width: 30,height:30}}/>
                            <Text style={{left: 20,fontSize:18}}>Sign in with Google</Text>
                        </View>
                        <View style={{left: 40}}>
                            <Image source={require('../Images/facebookLogo.jpeg')} style={{width:60,height:60}}/>
                        </View>
                    </View>
                    <Text style={{top: 80}}>OR</Text>
                </View>
                <View style={{top: 120,left: 30}}>

                        <TextInput
                            placeholder="Enter username"
                            style={styles.username}
                            onChangeText={(u) => this.setState({username: u})}
                        />
                        
                        <TextInput
                           placeholder="Enter email"
                           style={styles.email}
                           onChangeText={(e) => this.setState({email: e})}
                        />
                        <TextInput
                           placeholder="Enter password"
                           style={styles.passw}
                           secureTextEntry={true}
                           onChangeText={(p) => this.setState({passw: p})}
                        />
                </View>
                <View style={{alignItems:'center'}}>
                {this.state.buttonFade && 
                    <View style={styles.buttonFade} >
                        <Text style={styles.buttonText}>Login</Text>
                    </View>
                }
                {this.state.button &&
                    <TouchableOpacity onPress={() => login()} style={styles.button} >
                        <Text style={styles.buttonText}>Signup</Text>
                    </TouchableOpacity>
                }
                
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#fff'
    },
    loginText: {
        fontWeight: '700',
        fontSize: 30,
        color: '#000',
        top: 10
    },
    username: {
        color: '#000',
        width: '80%',
        backgroundColor:'#d6d6d4',
        top: 20,
        borderRadius: 10
    },
    email: {
        color: '#000',
        width: '80%',
        backgroundColor:'#d6d6d4',
        top: 30,
        borderRadius: 10
    },
    passw: {
        color: '#000',
        width: '80%',
        backgroundColor:'#d6d6d4',
        top: 40,
        borderRadius: 10
    },
    button: {
        borderRadius: 5,
        backgroundColor:'#007aff',
        width: '80%',
        height: 60,
        top: 170,
        justifyContent: 'center',
        alignItems:'center'
    },
    buttonFade: {
        borderRadius: 5,
        backgroundColor:'#599feb',
        width: '80%',
        height: 60,
        top: 170,
        justifyContent: 'center',
        alignItems:'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight:'700'
    }
})