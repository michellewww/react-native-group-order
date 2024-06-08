import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import onboarding1 from "../../../assets/Onboarding/onb1.png";
import onboarding2 from "../../../assets/Onboarding/onb2.png";
import { ArrowSmallRightIcon } from "react-native-heroicons/solid";

const { height, width } = Dimensions.get("screen");

const Onboarding = () => {
  const navigation = useNavigation();
  const [active, setActive] = useState([0]);
  const sharedValues = useSharedValue(0);

  const screenOne = useAnimatedStyle(() => {
    return {
      opacity: withTiming(sharedValues.value === 0 ? 1 : 0, { duration: 1000 }),
    };
  });

  const screenTwo = useAnimatedStyle(() => {
    return {
      opacity: withTiming(sharedValues.value === 1 ? 1 : 0, { duration: 1000 }),
    };
  });

  const animatedStyles = [screenOne, screenTwo];

  const images = [onboarding1, onboarding2];
  const texts = [
    {
      title: "Enjoy your order",
      subTitle: "Take a moment with the hot, tasty, and healthy meal we made for you.",
    },
    {
      title: "Delivered with care",
      subTitle: "Restaurants deliver your order with care, love, and without service charges!",
    },

  ];

  return (
    <View className="relative" style={{ height, width }}>
      <Animated.Image
        style={[
          StyleSheet.absoluteFill,
          { height, width },
          animatedStyles[sharedValues.value],
        ]}
        source={images[sharedValues.value]}
      />

      <Animated.View
        style = {[
          StyleSheet.absoluteFill,
          { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
        ]}
      />

      <Pressable onPress={() => navigation.navigate("authentication")} className="mt-12 text-end px-6">
        <Text className="text-right text-gray-200 font-bold">SKIP</Text>
      </Pressable>
      <View className="z-50 h-full">
        <Text
          className="font-bold text-5xl text-white text-center"
          style={{ marginTop: height / 6 }}
        >
          GooseCart
        </Text>
      </View>

      <View className="absolute w-full z-50 bottom-10">
        <View className="mb-10 space-y-1 px-6">
          <Animated.Text
            style={[
              {
                textAlign: "center",
                fontSize: 18,
                fontWeight: 900,
                color: "white",
              },
              animatedStyles[sharedValues.value],
            ]}
          >
            {texts[sharedValues.value].title}
          </Animated.Text>
          <Animated.Text
            style={[
              {
                textAlign: "center",
                fontSize: 16,
                color: "white",
              },
              animatedStyles[sharedValues.value],
            ]}
          >
            {texts[sharedValues.value].subTitle}
          </Animated.Text>
        </View>
        <View className="flex-row items-center">
          <View
            className={`${
              active.includes(0) ? `bg-primaryColor` : `bg-gray-100`
            } w-[50%] py-1`}
          />
          <View
            className={`${
              active.includes(1) ? `border-primaryColor` : `border-gray-100`
            } border-[6px] p-2 rounded-full`}
          >
            <TouchableOpacity
              onPress={() => {
                if (sharedValues.value === 1) {
                  navigation.navigate("authentication");
                } else {
                  setActive((prev) => [...prev, prev[prev.length - 1] + 1]);
                  sharedValues.value = sharedValues.value + 1;
                }
              }}
              className="h-16 w-16 bg-primaryColor rounded-full flex-row items-center justify-center"
            >
              <ArrowSmallRightIcon size={34} color="black" />
            </TouchableOpacity>
          </View>
          <View
            className={`${
              active.includes(1) ? `bg-primaryColor` : `bg-gray-100`
            } w-[50%] py-1`}
          />
        </View>
      </View>
    </View>
  );
};

export default Onboarding;
