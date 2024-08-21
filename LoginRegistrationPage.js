import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginRegistrationPage = () => {
  const navigation = useNavigation();
  const [showRegistration, setShowRegistration] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    axios
      .post('http://192.168.1.10:3000/login', { email, password })
      .then(async (response) => {
        const { token } = response.data; // Extract the JWT token from the response
        AsyncStorage.setItem('jwtToken', token); // Store the JWT in AsyncStorage
        const token2 = await AsyncStorage.getItem('jwtToken'); // Retrieve the JWT token from AsyncStorage
        console.log(token2);

        console.log('Login successful');
        navigation.navigate('Dashboard');
      })
      .catch((error) => {
        console.error(error); // Handle login error
      });
    console.log('Logging in...');
  };

  const handleRegistration = () => {
    setShowRegistration(true);
  };

  const handleForgotPassword = () => {
    console.log('forgetting pass in...');
    navigation.navigate('PasswordResetPage');

    // axios
    //   .post('http://localhost:3000/forgot-password', { email })
    //   .then((response) => {
    //     console.log(response.data); // Handle forgot password success
    //     Alert.alert('Password Reset Email Sent', 'Please check your email for password reset instructions.');
    //   })
    //   .catch((error) => {
    //     console.error(error); // Handle forgot password error
    //     Alert.alert('Error', 'Failed to send password reset email. Please try again later.');
    //   });
  };

  const handleRegister = () => {
    console.log('forgetting pass in...');
    navigation.navigate('Register');

    // axios
    //   .post('http://localhost:3000/forgot-password', { email })
    //   .then((response) => {
    //     console.log(response.data); // Handle forgot password success
    //     Alert.alert('Password Reset Email Sent', 'Please check your email for password reset instructions.');
    //   })
    //   .catch((error) => {
    //     console.error(error); // Handle forgot password error
    //     Alert.alert('Error', 'Failed to send password reset email. Please try again later.');
    //   });
  };

  return (
    <View style={styles.container}>
        <>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
          />
          <Button title="Login" onPress={handleLogin} />
          <Button title="Register" onPress={handleRegister} />
          <Button title="Forgot Password" onPress={handleForgotPassword} />
        </>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default LoginRegistrationPage;
