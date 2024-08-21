import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LeadTable = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      console.log("fetching loggin ");
      const token = await AsyncStorage.getItem('jwtToken'); // Retrieve the JWT token from AsyncStorage

      const response = await axios.get('http://192.168.1.10:3000/loginFiles', {
        headers: {
          Authorization: `Bearer ${token}`, // Include the JWT token in the request headers
        },
      });
      
      setLeads(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Text style={styles.heading}>Client Name</Text>
        {leads.map((lead) => (
          <Text key={lead._id} style={styles.text}>{lead.clientName}</Text>
        ))}
      </View>
      <View style={styles.column}>
        <Text style={styles.heading}>Remarks</Text>
        {leads.map((lead) => (
          <Text key={lead._id} style={styles.text}>{lead.remarks}</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: 16,
    },
    column: {
      flex: 1,
      padding: 8,
    },
    heading: {
      fontWeight: 'bold',
      marginBottom: 8,
    },
    text: {
      marginBottom: 4,
    },
  });
  

export default LeadTable;
