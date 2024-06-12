import React from "react";
import { View, Text, Dimensions, StyleSheet, Image, Alert, TouchableOpacity } from "react-native";
import * as Location from 'expo-location';
import { useDispatch } from 'react-redux';
import { setLocation } from '../../Features/Location/LocationSlice';
import image from "../../../assets/Onboarding/location.png";

const ShareLocation = ({ navigation }) => {
  const { height, width } = Dimensions.get("screen");
  const dispatch = useDispatch();

  const handleShareLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    // Dispatch the location to the redux store
    dispatch(setLocation({ latitude, longitude }));
    navigation.navigate("home");
  };

  return (
    <View style={{ height, width, position: "relative" }}>
      <Image
        source={image}
        style={[StyleSheet.absoluteFill, { height, width }]}
      />

      <View className="flex-row items-end h-full">
        <View className="px-6 py-8 bg-white w-full space-y-3 rounded-t-3xl">
          <Text className="text-center font-semibold text-2xl">
            Share your location
          </Text>
          <Text className="text-center text-[16px] text-gray-500 font-[500]">
            If we have your location, we can do better job finding you want and
            deliver it.
          </Text>
          <View className="space-y-4 w-full">
            <TouchableOpacity
              onPress={handleShareLocation}
              className="w-full py-3 text-center rounded-lg font-semibold bg-primaryColor text-white"
            >
              <Text>YES, SHARE MY LOCATION</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("home")}
              className="w-full py-3 text-center rounded-lg font-semibold text-primaryColor border border-primaryColor"
            >
              <Text>NO, CHOOSE MANUALLY</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ShareLocation;
