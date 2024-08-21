import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation  } from '@react-navigation/native';


const LeadGenerationPage = () => {
  const navigation = useNavigation();

  const [clientName, setClientName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [address, setAddress] = useState('');
  const [product, setProduct] = useState('Home Loan');
  const [loanAmount, setLoanAmount] = useState('');
  const [contactDate, setContactDate] = useState('');
  const [contactTime, setContactTime] = useState('');

  const handleLeadGeneration = async () => {
    console.log("in");
    try {
      const leadData = {
        clientName,
        mobileNo,
        address,
        product,
        loanAmount,
        contactDate,
        contactTime,
      };
      
    const token = await AsyncStorage.getItem('jwtToken'); // Retrieve the JWT token from AsyncStorage
      console.log(leadData);
      const response = await axios.post('http://192.168.1.10:3000/save-lead', {leadData}, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the JWT token in the request headers
        },
      });
      console.log(token);
  
      console.log(response.data); // Handle the response
  
      // Clear the input fields after successfully creating the lead
      navigation.navigate('Dashboard');
      setClientName('');
      setMobileNo('');
      setAddress('');
      setLoanAmount('');
      setContactDate('');
      setContactTime('');

    } catch (error) {
      console.error(error); // Handle error
    }
  };

  return (
    
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name of Client"
        onChangeText={(text) => setClientName(text)}
        value={clientName}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile No."
        onChangeText={(text) => setMobileNo(text)}
        value={mobileNo}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        onChangeText={(text) => setAddress(text)}
        value={address}
      />
      <Picker
        style={styles.input}
        selectedValue={product}
        onValueChange={(itemValue) => setProduct(itemValue)}
      >
        <Picker.Item label="Home Loan" value="Home Loan" />
        <Picker.Item label="Lap (loan against Property)/Commercial Purchase/ School/ Industrial /Godown etc." value="Lap" />
        <Picker.Item label="Car Loan (New)" value="Car Loan (New Car)" />
        <Picker.Item label="Car Loan (Used)" value="Used Car Loan" />
        <Picker.Item label="Personal Loan" value="Personal Loan" />
        <Picker.Item label="Business Loan" value="Business Loan" />
        <Picker.Item label="CC/OD Limit" value="CC/OD Limit" />
        <Picker.Item label="Health Insurance" value="Health Insurance" />
        


        <Picker.Item label="Motor Insurance" value="Motor Insurance" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Loan Amount"
        onChangeText={(text) => setLoanAmount(text)}
        value={loanAmount}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Date (if any)"
        onChangeText={(text) => setContactDate(text)}
        value={contactDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Time (if any)"
        onChangeText={(text) => setContactTime(text)}
        value={contactTime}
      />
      <Button title="Generate Lead" onPress={handleLeadGeneration} />
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

export default LeadGenerationPage;
