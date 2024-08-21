import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const LoginRegistrationPage = () => {
  const [showRegistration, setShowRegistration] = useState(false);
  const [name, setName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [address, setAddress] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [panCardNo, setPanCardNo] = useState('');
  const [aadhaarCardNo, setAadhaarCardNo] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNo, setAccountNo] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [gstNo, setGstNo] = useState('');
  const [relationshipManagerCode, setRelationshipManagerCode] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform login logic here
    axios
    .post('http://192.168.1.10:3000/login', { email, password })
    .then((response) => {
      console.log(response.data); // Handle login success
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
    axios
      .post('http://localhost:3000/forgot-password', { email })
      .then((response) => {
        console.log(response.data); // Handle forgot password success
        Alert.alert('Password Reset Email Sent', 'Please check your email for password reset instructions.');
      })
      .catch((error) => {
        console.error(error); // Handle forgot password error
        Alert.alert('Error', 'Failed to send password reset email. Please try again later.');
      });
  };

  const handleRegister = () => {
    // Create the user object
    const user = {
      name,
      fatherName,
      dateOfBirth,
      address,
      mobileNo,
      email,
      panCardNo,
      aadhaarCardNo,
      bankName,
      accountNo,
      ifscCode,
      gstNo,
      relationshipManagerCode,
      password
    };
    // Send the user data to the backend API
    const response = axios
      .post('http://192.168.1.10:3000/register', user)
      .then((response) => {
        console.log(response.data);
        setShowRegistration(false);
      })
      .catch((error) => {
        console.error(error);
      });
      console.log(response);

  };

  return (
    <View style={styles.container}>
      {!showRegistration ? (
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
          <Button title="Register" onPress={handleRegistration} />
          <Button title="Forgot Password" onPress={handleForgotPassword} />
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={(text) => setName(text)}
            value={name}
          />
          <TextInput
            style={styles.input}
            placeholder="Father Name"
            onChangeText={(text) => setFatherName(text)}
            value={fatherName}
          />
          <TextInput
            style={styles.input}
            placeholder="Date of Birth"
            onChangeText={(text) => setDateOfBirth(text)}
            value={dateOfBirth}
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            onChangeText={(text) => setAddress(text)}
            value={address}
          />
          <TextInput
            style={styles.input}
            placeholder="Mobile No."
            onChangeText={(text) => setMobileNo(text)}
            value={mobileNo}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
            />
            <TextInput
            style={styles.input}
            placeholder="PAN Card No."
            onChangeText={(text) => setPanCardNo(text)}
            value={panCardNo}
            />
            <TextInput
            style={styles.input}
            placeholder="Aadhaar Card No."
            onChangeText={(text) => setAadhaarCardNo(text)}
            value={aadhaarCardNo}
            />
            <TextInput
            style={styles.input}
            placeholder="Bank Name"
            onChangeText={(text) => setBankName(text)}
            value={bankName}
            />
            <TextInput
            style={styles.input}
            placeholder="Account No."
            onChangeText={(text) => setAccountNo(text)}
            value={accountNo}
            />
            <TextInput
            style={styles.input}
            placeholder="IFSC Code"
            onChangeText={(text) => setIfscCode(text)}
            value={ifscCode}
            />
            <TextInput
            style={styles.input}
            placeholder="GST No."
            onChangeText={(text) => setGstNo(text)}
            value={gstNo}
            />
            <TextInput
            style={styles.input}
            placeholder="Relationship Manager Code"
            onChangeText={(text) => setRelationshipManagerCode(text)}
            value={relationshipManagerCode}
            />
            <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
            />
            <Button title="Register" onPress={handleRegister} />
            </>
            )}
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
