import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const LoginRegistrationPage = () => {
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
    console.log('Logging in...');
  };

  const handleRegistration = () => {
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
    console.error(user);

    // Send the user data to the backend API
    axios
      .post('http://localhost:3000/register', user)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
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
        <Button title="Register" onPress={handleRegistration} />
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
