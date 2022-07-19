// @ts-ignore
import { User } from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTheme } from 'react-native-paper';
import ChangeLanguageScreen from '../components/screens/ChangeLanguageScreen/ChangeLanguageScreen';
import ChangeThemeScreen from '../components/screens/ChangeThemeScreen/ChangeThemeScreen';
import ChatDetailsScreen from '../components/screens/ChatDetailsScreen/ChatDetailsScreen';
import ChatScreen from '../components/screens/ChatScreen/ChatScreen';
import CreateRoomScreen from '../components/screens/CreateRoomScreen/CreateRoomScreen';
import EditRoomScreen from '../components/screens/EditRoomScreen/EditRoomScreen';
import HomeScreen from '../components/screens/HomeScreen/HomeScreen';
import LoginScreen from '../components/screens/LoginScreen/LoginScreen';
import RegisterScreen from '../components/screens/RegisterScreen/RegisterScreen';
import ResetPasswordScreen from '../components/screens/ResetPasswordScreen/ResetPasswordScreen';
import SettingsScreen from '../components/screens/SettingsScreen/SettingsScreen';
import SetupMfaScreen from '../components/screens/SetupMfaScreen/SetupMfaScreen';
import VerifyMfaScreen from '../components/screens/VerifyMfaScreen/VerifyMfaScreen';
import WelcomeScreen from '../components/screens/WelcomeScreen/WelcomeScreen';
import { useMst } from '../mobx/useMst';

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  ResetPassword: {
    email?: string;
  };
  SetupMfa: undefined;
  VerifyMfa: undefined;
};
export type AppStackParamList = {
  Home: undefined;
  Settings: undefined;
  ChangeLanguage: undefined;
  ChangeTheme: undefined;
  Chat: undefined;
  CreateRoom: undefined;
  ChatDetails: {
    roomId: string;
  };
  EditRoom: {
    chatRoom: {
      id: string;
      name: string;
      members: User[];
    };
  };
};

const AuthStack = createStackNavigator<AuthStackParamList>();
const AppStack = createStackNavigator<AppStackParamList>();

const Navigator = observer(() => {
  const { user } = useMst();
  const theme = useTheme();
  const defaultNavigationOptions = {
    headerTitleStyle: theme.fonts.medium,
    headerBackTitleStyle: theme.fonts.regular,
  };

  const auth = (
    <>
      <AuthStack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={defaultNavigationOptions}
      />
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={defaultNavigationOptions}
      />
      <AuthStack.Screen
        name="Register"
        component={RegisterScreen}
        options={defaultNavigationOptions}
      />
      <AuthStack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={defaultNavigationOptions}
      />
      <AuthStack.Screen
        name="SetupMfa"
        component={SetupMfaScreen}
        options={defaultNavigationOptions}
      />
      <AuthStack.Screen
        name="VerifyMfa"
        component={VerifyMfaScreen}
        options={defaultNavigationOptions}
      />
    </>
  );

  const app = (
    <>
      <AppStack.Screen
        name="Home"
        component={HomeScreen}
        options={defaultNavigationOptions}
      />
      <AppStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={defaultNavigationOptions}
      />
      <AppStack.Screen
        name="ChangeLanguage"
        component={ChangeLanguageScreen}
        options={defaultNavigationOptions}
      />
      <AppStack.Screen
        name="ChangeTheme"
        component={ChangeThemeScreen}
        options={defaultNavigationOptions}
      />
      <AppStack.Screen
        name="Chat"
        component={ChatScreen}
        options={defaultNavigationOptions}
      />
      <AppStack.Screen
        name="CreateRoom"
        component={CreateRoomScreen}
        options={defaultNavigationOptions}
      />
      <AppStack.Screen
        name="EditRoom"
        component={EditRoomScreen}
        options={defaultNavigationOptions}
      />
      <AppStack.Screen
        name="ChatDetails"
        component={ChatDetailsScreen}
        options={defaultNavigationOptions}
      />
    </>
  );

  const navigationTheme = {
    dark: theme.dark,
    colors: {
      primary: theme.colors.headerText,
      text: theme.colors.headerText,
      background: theme.colors.background,
      card: theme.colors.primary,
      border: theme.colors.primary,
      notification: theme.colors.accent,
    },
  };

  const getActiveStack = () => {
    const isLoggedIn = !!user.token;
    return isLoggedIn ? app : auth;
  };

  const activeStack = getActiveStack();

  return (
    <NavigationContainer theme={navigationTheme}>
      <AuthStack.Navigator
        detachInactiveScreens={false}
        screenOptions={{ headerShown: false }}>
        {activeStack}
      </AuthStack.Navigator>
    </NavigationContainer>
  );
});

export default Navigator;
