import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PayoutDetailsPage = () => {
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

      const calculateRate = (product, loanAmount) => {
        let payout = 0;
    
        switch (product) {
          case 'Home Loan':
            payout = loanAmount <= 10000000 ? 300 : 400;
            break;
          case 'Lap':
            payout = loanAmount < 20000000 ? 500 : 600;
            break;
          case 'Car Loan (New Car)':
            payout = 500 ;
            break;
          case 'Used Car Loan':
            payout = 1200 ;
            break;
          case 'Personal Loan':
            payout = 1000 ;
            break;
          case 'Business Loan':
            payout = 1000 ;
            break;
          case 'CC/OD Limit':
            payout = 400 ;
            break;
          case 'Health Insurance':
            payout = 1000;
            break;
          case 'Motor Insurance':
            payout = 500;
            break;
          default:
            payout = 0;
            break;
        }
    
        return payout;
      };
      const calculateTotalPayout = (product, loanAmount) => {
        let payout = 0;
    
        switch (product) {
          case 'Home Loan':
            rate = loanAmount <= 10000000 ? 300 : 400;
            payout = rate * loanAmount/100000;
            break;
          case 'Lap':
            rate = loanAmount < 20000000 ? 500 : 600;
            payout = rate * loanAmount/100000;

            break;
          case 'Car Loan (New Car)':
            rate = 500 ;
            payout = rate * loanAmount/100000;

            break;
          case 'Used Car Loan':
            rate = 1200 ;
            payout = rate * loanAmount/100000;

            break;
          case 'Personal Loan':
            rate = 1000 ;
            payout = rate * loanAmount/100000;

            break;
          case 'Business Loan':
            rate = 1000 ;
            payout = rate * loanAmount/100000;

            break;
          case 'CC/OD Limit':
            rate = 400 ;
            payout = rate * loanAmount/100000;

            break;
          case 'Health Insurance':
            payout = 1000;
            break;
          case 'Motor Insurance':
            payout = 500;
            break;
          default:
            payout = 0;
            break;
        }
    
        return payout;
      };


      return (
        <View style={styles.container}>
          <View style={styles.tableRow}>
            <Text style={styles.columnHeader}>Client Name</Text>
            <Text style={styles.columnHeader}>Product</Text>
            <Text style={styles.columnHeader}>Loan Amount</Text>
            <Text style={styles.columnHeader}>Rate</Text>
            <Text style={styles.columnHeader}>Total</Text>
          </View>
          {leads.map((lead) => (
            <View style={styles.tableRow} key={lead._id}>
              <Text style={styles.tableData}>{lead.clientName}</Text>
              <Text style={styles.tableData}>{lead.product}</Text>
              <Text style={styles.tableData}>{lead.loanAmount}</Text>
              <Text style={styles.tableData}>{calculateRate(lead.product, lead.loanAmount)}</Text>
              <Text style={styles.tableData}>
                {calculateTotalPayout(lead.product, lead.loanAmount)}
              </Text>
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

      export default PayoutDetailsPage;