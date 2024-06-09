import { View, Text, TextInput,Dimensions, TouchableOpacity, StyleSheet, Image } from "react-native";
import {useState} from "react";
import image from "../../../assets/Onboarding/confirmemail.png";
// import { 
//     verifyuser 
// } from "../../../client";

const ConfirmEmail = ({ navigation, route }) => {
  const { email } = route.params;
  const { height, width } = Dimensions.get("screen");
  const [ code, setCode] = useState("");
  const [ error, setError] = useState("");

  const handleEmailVerification = async() => {
    try {
        navigation.navigate('roleselection', {email});
    } catch (err){
        setError(err.message);
    }
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
            Verification
          </Text>
          <Text className="text-center text-[16px] text-gray-500 font-[500]">
            Please go to check your email for the verification code
          </Text>
           <View className="space-y-4">
                <TextInput
                placeholder="Enter the code ..."
                className="border-gray-200 rounded-lg border-2 py-2 px-4"
                value={code}
                onChangeText={setCode}
                />
            </View>
            {error && (
              <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
            )}
            <TouchableOpacity onPress={handleEmailVerification}>
                <Text className="text-white bg-primaryColor text-center py-3 font-semibold rounded-lg">
                    Sign up
                </Text>
            </TouchableOpacity>
            <View className="flex-row items-center">
            </View>
            <View className="flex-row items-center">
            </View>
            <View className="flex-row items-center">
            </View>
        </View>
      </View>
    </View>
  );
};

export default ConfirmEmail;
