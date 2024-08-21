import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const PasswordResetPage = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleVerifyOtp = () => {
    axios
      .post('http://localhost:3000/verify-otp', { email, otp })
      .then((response) => {
        console.log(response.data); // Handle OTP verification success
      })
      .catch((error) => {
        console.error(error); // Handle OTP verification error
      });
  };

  const handleResetPassword = () => {
    axios
      .post('http://localhost:3000/reset-password', { email, newPassword })
      .then((response) => {
        console.log(response.data); // Handle password reset success
      })
      .catch((error) => {
        console.error(error); // Handle password reset error
      });
  };

  const handleSendOtp= () => {
    console.log("handle otp...")
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <Button title="Send OTP" onPress={handleSendOtp} />
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        onChangeText={(text) => setOtp(text)}
        value={otp}
      />
      <Button title="Verify OTP" onPress={handleVerifyOtp} />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        onChangeText={(text) => setNewPassword(text)}
        value={newPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
        secureTextEntry
      />
      <Button title="Reset Password" onPress={handleResetPassword} />
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

export default PasswordResetPage;
