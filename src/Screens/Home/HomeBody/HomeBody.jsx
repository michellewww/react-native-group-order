import {
  Text,
  StatusBar,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import {
  ChevronDownIcon,
  MapPinIcon,
  BellAlertIcon,
} from "react-native-heroicons/solid";
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import CategoryCard from "../../../Components/CategoryCard/CategoryCard";
import MainAvator from "../../../../assets/Icons/defaultusericon.png"
import AsyncStorage from '@react-native-async-storage/async-storage';
import ResIcon from "../../../../assets/Icons/restaurant.jpeg";

const HomeBody = () => {
  const [active, setActive] = useState(0);
  const locationName = useSelector((state) => state.location.locationName);
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  var today = new Date()
  var currentHour = today.getHours()
  let greeting;

  if (currentHour < 12) {
    greeting = 'Good Morning,';
  } else if (currentHour < 18) {
    greeting = 'Good Afternoon,';
  } else {
    greeting = 'Good Evening,';
  }

  useEffect(() => {
    const fetchProfileData = async () => {
      const storedEmail = await AsyncStorage.getItem('email');
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedEmail) setEmail(storedEmail);
      if (storedUsername) setUsername(storedUsername);
    };
    fetchProfileData();
  }, []);

  const data = [
    {
      name: "Food Group Order",
      icon: ResIcon,
    },
  ]

  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      <ScrollView>
        <View className="flex-row items-center justify-between py-8 px-6">
          <Text></Text>
          <View className="flex-row items-center space-x-2">
            <MapPinIcon color="#0BCE83" size={20} />
            <Text className="font-bold text-lg">{locationName || "Atlanta, GA"}</Text>
            <ChevronDownIcon color="#0BCE83" size={15} />
          </View>
          <TouchableOpacity onPress={()=>navigation.navigate("profile")} className="h-10 w-10 bg-white p-1 rounded-xl flex-row items-center justify-center">
            <Image
              className="h-12 w-12 rounded-full"
              source={MainAvator}
            ></Image>
          </TouchableOpacity>
        </View>
        
        <View style={styles.container}>
          <Text className="font-semibold text-[18px]">{greeting} {username || email} !</Text>
        </View>

        <View className="space-y-4 mt-8">
          <ScrollView
            vertical={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 16, paddingHorizontal: 26 }}
          >
            {data.map((item, index) => (
              <CategoryCard
                data={item}
                key={index}
                active={active}
                index={index}
                pressFunction={() => navigation.navigate('homerestaurant')}
              />
            ))}
          </ScrollView>
        </View>

      </ScrollView>
    </SafeAreaView>
  );

};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EAE9E7',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 20,
  },

});

export default HomeBody;
