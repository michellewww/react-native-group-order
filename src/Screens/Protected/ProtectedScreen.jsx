import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getToken } from '../../../client';

const ProtectedRoute = ({ children, route }) => {
    const { email } = route.params;
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const navigation = useNavigation();
  
    useEffect(() => {
      const checkAuth = async () => {
        if (email) {
          try {
            const response = await getToken(email);
            console.log(response.success);
            if (response.success) {
              console.log(response.success)
              await AsyncStorage.setItem('authToken', response.token);
              setIsAuthorized(true);
              navigation.navigate("location")
            } else {
              navigation.navigate('Login');
            }
          } catch (error) {
            navigation.navigate('Login');
          }
        } else {
          navigation.navigate('Login');
        }
        setIsLoading(false);
      };
  
      checkAuth();
    }, [navigation]);
  
    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  
    return isAuthorized ? children : null;
  };
  
  export default ProtectedRoute;