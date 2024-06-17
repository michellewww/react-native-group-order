import React, { useState, useEffect } from "react";
import { View, Text, Image, StatusBar, TouchableOpacity, SafeAreaView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import {
  TagIcon,
  UserIcon,
  CreditCardIcon,
  Cog8ToothIcon,
  ExclamationCircleIcon,
  QuestionMarkCircleIcon,
  SunIcon,
  UserMinusIcon
} from "react-native-heroicons/outline";
import { signout } from "../../../../client";
import Avator from "../../../../assets/Icons/defaultusericon.png"

const Profile = () => {
  const navigation = useNavigation();
  const [error, setError] = useState();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      const storedEmail = await AsyncStorage.getItem('email');
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedEmail) setEmail(storedEmail);
      if (storedUsername) setUsername(storedUsername);
    };

    fetchProfileData();
  }, []);

  const handleSignout = async () => {
    const email = await AsyncStorage.getItem('email');
    if (email) {
      try {
        const response = await signout(email);
        if (response.success) {
          await AsyncStorage.removeItem('authToken');
          await AsyncStorage.removeItem('email');
          navigation.navigate('authentication');
        }
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const data = [
    {
      name: "Profile",
      icon: UserIcon,
      action: () => navigation.navigate('profilepage'),
    },
    // {
    //   name: "Payment",
    //   icon: CreditCardIcon,
    // },
    // { name: "Promo codes", icon: TagIcon },
    // {
    //   name: "Settings",
    //   icon: Cog8ToothIcon,
    // },
    // {
    //   name: "About",
    //   icon: ExclamationCircleIcon,
    // },
    // {
    //   name: "Help",
    //   icon: QuestionMarkCircleIcon,
    // },
    // {
    //   name: "Theme",
    //   icon: SunIcon,
    // },
    {
      name: "Sign Out",
      icon: UserMinusIcon,
      action: handleSignout,
    },
  ];


  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 24,
        margin: 24,
        marginTop: StatusBar.currentHeight,
      }}
    >
      <View className="flex-row mt-8">
        <Image
          className="h-12 w-12 rounded-full"
          source={Avator}
        />
        <View className="ml-4">
          <Text className="text-[16px] font-semibold text-gray-600">{username}</Text>
          <Text className="text-[12px] text-gray-500">{email}</Text>
        </View>
      </View>

      <View className="mt-8">
        {data.map((item, index) => (
          <View className="flex-row items-center mb-8" key={index}>
            <item.icon color="black" size={24} />
            <TouchableOpacity onPress={item.action}>
              <Text className="ml-4 font-semibold text-[18px]">{item.name}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      {error && (
        <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
      )}
    </SafeAreaView>
  );
};

export default Profile;
