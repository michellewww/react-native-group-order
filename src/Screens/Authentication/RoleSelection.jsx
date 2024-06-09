import { View, Text, TextInput,Dimensions, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import {useState} from "react";
import user from "../../../assets/Icons/user.png";
import provider from "../../../assets/Icons/provider.png";
import Authentication from "./Authentication";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation, useRoute} from "@react-navigation/native";
import { selectRole } from "../../../client";

const RoleSelection = () => {
    const { height, width } = Dimensions.get("screen");
    const Stack = createNativeStackNavigator();
    const navigation = useNavigation();
    const route = useRoute();
    const [selectedRole, setSelectedRole] = useState();
    const { email, password } = route.params;

    const handleRoleSelection = async(role) => {
        const userUid = email;
        try {
            const response = await selectRole(userUid, role, password);
            console.log(response);
            if (response.success) {
                navigation.navigate('signin');
            };
        } catch (error) {
            console.error('Failed to select role:', error);
        };
    }

    const RoleSreen = () => {
        return (
            <View
            style={{
                height,
                width,
                alignItems: "center",
                paddingHorizontal: 24,
                justifyContent: "space-evenly",
              }}
            >
            <View className="space-y-4">
                <Text className="text-center font-bold text-5xl text-gray-700 mt-8">
                One last step...
                </Text>
                <Text className="text-2xl font-semibold text-gray-700 text-center">
                Please select your role
                </Text>
            </View>

            <View className="flex flex-row w-full space-x-[5%]">
                {[{ img: user, role: 'user' }, { img: provider, role: 'provider' }].map((item, index) => (
                    <TouchableOpacity
                        className="flex-row items-center justify-between bg-gray-100 px-4 py-4 rounded-xl w-[30%]"
                        key={index}
                        onPress={() => handleRoleSelection(item.role)}
                        style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
                    >
                        <Image source={item.img} style={{ height: 140, width: 110 }} className="h-6 mx-auto" />
                    </TouchableOpacity>
                ))}
                </View>

            <View className="flex-row items-center">
                <View className="w-full flex-1 border-t border-gray-400" />
                <Text className="px-4 text-center text-gray-700 font-bold text-xl">
                </Text>
                <View className="w-full flex-1 border-t border-gray-400" />
            </View>
            </View>
        );
    };

    return (
        <Stack.Navigator initialRouteName="RoleSreen">
        <Stack.Screen
            name="RoleScreen"
            component={RoleSreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="signin"
            component={Authentication}
            options={{ headerShown: false}}
        />
        </Stack.Navigator>
    );

};

export default RoleSelection;
