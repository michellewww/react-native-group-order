import "react-native-gesture-handler";
import Onboarding from "./src/Screens/Onboarding/Onboarding";
import Authentication from "./src/Screens/Authentication/Authentication";
import Signup from "./src/Screens/Authentication/Login/Signup";
import ShareLocation from "./src/Screens/ShareLocation/ShareLocation";
import Home from "./src/Screens/Home/Home";
import Order from "./src/Screens/Order/Order";
import CheckOut from "./src/Screens/CheckOut/CheckOut";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { persistor, store } from "./Store";
import { PersistGate } from "redux-persist/integration/react";
import OrderSuccess from "./src/Screens/OrderSuccess/OrderSuccess";
import OrderDetails from "./src/Screens/OrderDetails/OrderDetails";
import CreditCardDetails from "./src/Screens/CreditCard/CreditCardDetails";
import ConfirmEmail from "./src/Screens/Authentication/confirmEmail";
import RoleSelection from "./src/Screens/Authentication/RoleSelection";
import ProtectedRoute from "./src/Screens/Protected/ProtectedScreen";
import Login from "./src/Screens/Authentication/Login/Login";
import ProfilePage from "./src/Screens/Home/Profile/ProfilePage";
import Profile from "./src/Screens/Home/Profile/Profile";
import ProfileEditPage from "./src/Screens/Home/Profile/ProfileEditPage";
import HomeRestaurant from "./src/Screens/Home/HomeBody/HomeRestaurant";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                component={Onboarding}
                name="onboarding"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                component={Signup}
                name="signup"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                component={Authentication}
                name="authentication"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                component={Home}
                name="home"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                component={Profile}
                name="profile"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                component={ConfirmEmail}
                name="confirmemail"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                component={RoleSelection}
                name="roleselection"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                component={Login}
                name="Login"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                component={ProtectedRoute}
                name="ProtectedRoute"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                component={ShareLocation}
                name="location"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                component={Order}
                name="order"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                component={CheckOut}
                name="checkout"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                component={OrderSuccess}
                name="ordersuccess"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                component={OrderDetails}
                name="orderdetails"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                component={CreditCardDetails}
                name="creditcard"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                component={ProfilePage}
                name="profilepage"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                component={ProfileEditPage}
                name="profileeditpage"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                component={HomeRestaurant}
                name="homerestaurant"
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}
