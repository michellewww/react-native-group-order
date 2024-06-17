import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PencilIcon,ArrowUturnLeftIcon } from "react-native-heroicons/solid";
import defaultavator from "../../../../assets/Authentication/goosecart.png";

const ProfileEditPage = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const { height, width } = Dimensions.get("screen");

  useEffect(() => {
    const fetchProfileData = async () => {
      const storedEmail = await AsyncStorage.getItem('email');
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedEmail) setEmail(storedEmail);
      if (storedUsername) setUsername(storedUsername);
      AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (error, stores) => {
          stores.map((result, i, store) => {
            console.log({ [store[i][0]]: store[i][1] });
            return true;
          });
        });
      });
    };

    fetchProfileData();
  }, []);

  const handleUsernameChange = async (newUsername) => {
    setUsername(newUsername);
    await AsyncStorage.setItem('username', newUsername);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowUturnLeftIcon style={styles.backButtonText}></ArrowUturnLeftIcon>
        </TouchableOpacity>
        < PencilIcon style={styles.headerTitle}></PencilIcon>
      </View>

      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={defaultavator}
        />
      </View>
      <Text style={styles.username}>{username}</Text>

      < View style={styles.content}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input}>{email}</TextInput>
          <Text style={styles.label}>Phone</Text>
          <TextInput style={styles.input}>{}</TextInput>
          <Text style={styles.label}>Location</Text>
          <TextInput style={styles.input}>{}</TextInput>
          <Text style={styles.label}>Role</Text>
          <Text style={styles.emailText}>{}</Text>
      </View>

      <Text onPress={()=>navigation.navigate("profilepage")} className="text-white bg-primaryColor text-center py-3 font-semibold rounded-lg">
            Save
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'orange', 
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'transparent',
  },
  backButtonText: {
    color: "#1E1D1C",
    fontWeight: 'bold',
  },
  headerTitle: {
    color: "#1E1D1C",
    fontWeight: 'bold',
    textAlign: "center",
  },
  content: {
    flex: 1,
    padding: 24,
    marginTop: 20,
    backgroundColor:"#FAF7F4",
    borderRadius: 20,
  },
  username: {
    fontSize: 18,
    color: 'black',
    marginTop: 8,
    textAlign: 'center',
    fontWeight: "bold"
  },
  label: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 4,
  },
  emailText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 20,
    // backgroundColor: "#EAE9E7",
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 20,
    borderRadius: 10,
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar:{
    width: 100,
    height: 100,
    borderRadius: 10,
    borderColor: '#000',

  }
});

export default ProfileEditPage;
