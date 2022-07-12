import React,{Component} from 'react';
import { View,Text,TouchableOpacity,StyleSheet,Image, TextInput,BackHandler,Alert } from 'react-native';
import axios from 'axios';

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            buttonFade: false,
            button: true,
            emailSent: false,
        }
    }

    render() {

        const reset = async () => {
            if(this.state.email != '') {
                this.setState({buttonFade: true, button: false});
                console.log('Inside reset func')
                await axios.post('https://spreadora2.herokuapp.com/api/auth/forgot-password',{
                    email: this.state.email
                })
                .then((res) => {
                    console.log(res)
                    this.setState({emailSent: true});                    
                })
                .catch((e) => {
                    console.log(e)
                    alert(e)
                    this.setState({buttonFade: false, button: true})
                })
                
            }
            else {
                alert("Enter valid email")
            }
        }

        const CheckEmail = () => {
            if(this.state.emailSent) {
                return (
                    <View style={{top:320}}>
                        <Text style={{color: '#000',fontSize:17}}>Please check your email to reset password</Text>
                    </View>
                );
            }
            else {
                return(
                    <View></View>
                );
            }
                        
        }

        return(
            <View style={styles.container}>
               
                <Image source={require('../Images/logo.jpeg')} style={{width:70,height:70,top:100}}/>
                <Text style={styles.resetText}>Forgot Password</Text>
                <View style={{top: 200}}>
                    <View style={{flexDirection:'row'}}><Text style={{fontSize:17}}>Enter address</Text><Text style={{color: 'red'}}>*</Text></View>
                    <TextInput
                        placeholder="Enter email"
                        style={styles.email}
                        onChangeText={(e) => this.setState({email: e})}
                    />
                </View>
                <View style={{alignItems:'center'}}>
                {this.state.buttonFade && 
                    <View style={styles.buttonFade} >
                        <Text style={styles.buttonText}>Submit</Text>
                    </View>
                }
                {this.state.button &&
                    <TouchableOpacity onPress={() => reset()} style={styles.button} >
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                }
                <CheckEmail/>
                
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff',
        alignItems:'center'
    },
    resetText: {
        fontSize: 30,
        fontWeight: '800',
        color:'#000',
        top: 120
    },
    email: {
        color: '#000',
        width: 300,
        backgroundColor:'#d6d6d4',
        top: 20,
        borderRadius: 10
    },
    button: {
        borderRadius: 5,
        backgroundColor:'#007aff',
        width: 300,
        height: 60,
        top: 250,
        justifyContent: 'center',
        alignItems:'center'
    },
    buttonFade: {
        borderRadius: 5,
        backgroundColor:'#599feb',
        width: 300,
        height: 60,
        top: 250,
        justifyContent: 'center',
        alignItems:'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight:'700'
    }
})