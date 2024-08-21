import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const DisbursementTable = () => {
    const [leads, setLeads] = useState([]);

    useEffect(() => {
        fetchLeads();
      }, []);

  const fetchLeads = async () => {
    try {
      console.log("fetching");
      const token = await AsyncStorage.getItem('jwtToken'); // Retrieve the JWT token from AsyncStorage

      const response = await axios.get('http://192.168.1.10:3000/disbursement', {
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
    <View>
      <View style={styles.tableRow}>
        <Text style={styles.tableHeader}>Client Name</Text>
        <Text style={styles.tableHeader}>Bank Name</Text>
        <Text style={styles.tableHeader}>Loan Amount</Text>
        <Text style={styles.tableHeader}>Product</Text>
        <Text style={styles.tableHeader}>Month</Text>
      </View>
      {leads.map((lead) => (
        <View style={styles.tableRow} key={lead._id}>
          <Text style={styles.tableCell}>{lead.clientName}</Text>
          <Text style={styles.tableCell}>{lead.bankName}</Text>
          <Text style={styles.tableCell}>{lead.loanAmount}</Text>
          <Text style={styles.tableCell}>{lead.product}</Text>
          <Text style={styles.tableCell}>{lead.Month}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
    tableRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
    },
    tableHeader: {
      fontWeight: 'bold',
    },
    tableCell: {
      flex: 1,
      textAlign: 'center',
    },
  });
  

export default DisbursementTable;
