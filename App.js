import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginRegistrationPage from './LoginRegistrationPage';
import PasswordResetPage from './PasswordResetPage';
import DashboardPage from './DashboardPage';
import LeadGenerationPage from './LeadGenerationPage ';
import LeadTable from './LeadTable';
import loginFiles from './LoginFiles';
import DisbursementTable from './Disbursment';
import SanctionFiles from './SanctionFiles';
import payout from './payout';
import Registration from './Registration';





import { LogBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
LogBox.ignoreAllLogs(true);

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginRegistrationPage"
          component={LoginRegistrationPage}
          options={{ title: 'Login/Registration' }}
        />
        <Stack.Screen
          name="PasswordResetPage"
          component={PasswordResetPage}
          options={{ title: 'Reset Password' }}
        />
        <Stack.Screen name="Dashboard" component={DashboardPage} options={{ headerShown: false }} />
        <Stack.Screen name="NewLead" component={LeadGenerationPage} />
        <Stack.Screen name="LeadMangement" component={LeadTable} />
        <Stack.Screen name="Login Files" component={loginFiles} />
        <Stack.Screen name="Disbursement" component={DisbursementTable} />
        <Stack.Screen name="Sanction Files" component={SanctionFiles} />
        <Stack.Screen name="Payout Details" component={payout} />
        <Stack.Screen name="Register" component={Registration} />







      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
