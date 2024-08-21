import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SanctionedFilesPage = () => {
    const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      console.log("fetching");
      const token = await AsyncStorage.getItem('jwtToken'); // Retrieve the JWT token from AsyncStorage

      const response = await axios.get('http://192.168.1.10:3000/sanction', {
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
      <View style={styles.tableRow}>
        <Text style={styles.columnHeader}>Client Name</Text>
        <Text style={styles.columnHeader}>Bank Name</Text>
        <Text style={styles.columnHeader}>Loan Amount</Text>
        <Text style={styles.columnHeader}>Product</Text>
      </View>
      {leads.map((lead) => (
        <View style={styles.tableRow} key={lead._id}>
          <Text style={styles.tableData}>{lead.clientName}</Text>
          <Text style={styles.tableData}>{lead.bankName}</Text>
          <Text style={styles.tableData}>{lead.loanAmount}</Text>
          <Text style={styles.tableData}>{lead.product}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    tableRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    columnHeader: {
      flex: 1,
      fontWeight: 'bold',
    },
    tableData: {
      flex: 1,
    },
  });
  

export default SanctionedFilesPage;
