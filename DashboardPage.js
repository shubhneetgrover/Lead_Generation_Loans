import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation, StackActions  } from '@react-navigation/native';
// import { ScrollView } from 'react-native-gesture-handler';

const handleTilePress = (tileText) => {
    const navigation = useNavigation();
    if (tileText === 'LEAD GENERATION') {
      navigation.navigate('NewLead');
    } else {
      // Handle other tile presses or navigation logic
    }
  };


const DashboardPage = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const handleBeforeRemove = (e) => {
          e.preventDefault();
          // Handle any necessary logic before the screen is removed
        };
      
        navigation.addListener('beforeRemove', handleBeforeRemove);
      
        return () => {
          navigation.removeListener('beforeRemove', handleBeforeRemove);
        };
      }, [navigation]);

  const handleTilePress = (tileText) => {
    if (tileText === 'LEAD GENERATION') {
        navigation.navigate('NewLead');
      }else if (tileText === 'LEAD STATUS') {
        navigation.navigate('LeadMangement');
      }else if (tileText === 'LOGIN FILES') {
        navigation.navigate('Login Files');
      }
      else if (tileText === 'DISBURSEMENTS') {
        navigation.navigate('Disbursement');
      }  
      else if (tileText === 'SANCTIONED FILES') {
        navigation.navigate('Sanction Files');
      }
       
      else if (tileText === 'PAYOUT DETAILS') {
        navigation.navigate('Payout Details');
      }
       else {
        // Handle other tile presses or navigation logic
      }
  };

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView  contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.tile}
        onPress={() => handleTilePress('LEAD GENERATION')}
      >
        <Text style={styles.tileText}>LEAD GENERATION</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tile}
        onPress={() => handleTilePress('LEAD STATUS')}
      >
        <Text style={styles.tileText}>LEAD STATUS</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tile}
        onPress={() => handleTilePress('LOGIN FILES')}
      >
        <Text style={styles.tileText}>LOGIN FILES</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tile}
        onPress={() => handleTilePress('SANCTIONED FILES')}
      >
        <Text style={styles.tileText}>SANCTIONED FILES</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tile}
        onPress={() => handleTilePress('DISBURSEMENTS')}
      >
        <Text style={styles.tileText}>DISBURSEMENTS</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tile}
        onPress={() => handleTilePress('PAYOUT DETAILS')}
      >
        <Text style={styles.tileText}>PAYOUT DETAILS</Text>
      </TouchableOpacity>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  tile: {
    width: '45%',
    height: 150,
    backgroundColor: 'lightblue',
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tileText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DashboardPage;
