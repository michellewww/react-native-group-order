import {
    View,
    Text,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
  } from "react-native";
import { EyeIcon } from "react-native-heroicons/solid";
import {useState} from "react";
import { 
    checkEmailValidity, signup
} from "../../../../client";


const Signup = ({navigation}) => {
    const { height, width } = Dimensions.get("screen");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState(null);

    const onSignupPressed = async() => {
        try {
            const isValidEmail = await checkEmailValidity(email);
            if (!isValidEmail) {
              setError("Email is not valid.\nExample form: abc@goosecart.com");
              return;
            } else {
              setError(null);
            }
        } catch (err) {
            setError("Failed to check email validity.");
        }
        if (password !== confirm) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const data = await signup(email, password);
            navigation.navigate("confirmemail", { email });
        } catch (err) {
            setError(err.message);
        }

    };


    return (
        <ScrollView
            contentContainerStyle={{
            justifyContent: "space-between",
            minHeight: height - 10,
            width,
            paddingBottom: 14,
            paddingHorizontal: 24,
            backgroundColor: "white",
            }}
        >
            <View className="space-y-4">
                <Text className="text-center font-bold text-5xl text-gray-700 mt-8">
                    GooseCart
                </Text>
                <Text className="text-2xl font-semibold text-gray-700 text-center">
                    New Customer? Please select your role
                </Text>
            </View>

            <View className="space-y-4">
                <TextInput
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                className="border-gray-200 rounded-lg border-2 py-2 px-4"
                />
            <View className="flex-row items-center px-4 border-2 border-gray-200 rounded-lg">
                <TextInput
                    className="flex-1 py-2"
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    autoCapitalize="none"
                />
                <EyeIcon color="gray" size={24} />
            </View>

            <View className="flex-row items-center px-4 border-2 border-gray-200 rounded-lg">
            <TextInput
                className="flex-1 py-2"
                value={confirm}
                onChangeText={setConfirm}
                autoCapitalize="none"
                placeholder="Re-enter your password"
            />
            <EyeIcon color="gray" size={24} />
            </View>
            {error && (
                <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
            )}

            </View>

            <Text onPress={onSignupPressed} className="text-white bg-primaryColor text-center py-3 font-semibold rounded-lg">
                Sign up
            </Text>



            <View className="flex flex-row w-full space-x-[5%]">
            </View>
  
  
            <View className="flex-row items-center">
            <View className="w-full flex-1 border-t border-gray-400" />
            <View className="w-full flex-1 border-t border-gray-400" />
            </View>
            <Text className="text-center font-semibold text-gray-500">
            </Text>
  
  
      </ScrollView>
    );
};
  
export default Signup;
  