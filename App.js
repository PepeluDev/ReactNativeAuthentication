import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { useContext } from 'react'

import IconButton from './components/ui/IconButton'
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'
import WelcomeScreen from './screens/WelcomeScreen'
import { Colors } from './constants/styles'

import AuthContextProvider from './store/auth-context'
import { AuthContext } from './store/auth-context'

const Stack = createNativeStackNavigator()

function AuthStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: Colors.primary500 },
                headerTintColor: 'white',
                contentStyle: { backgroundColor: Colors.primary100 },
            }}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
    )
}

function AuthenticatedStack() {
    const authCxt = useContext(AuthContext)
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: Colors.primary500 },
                headerTintColor: 'white',
                contentStyle: { backgroundColor: Colors.primary100 },
            }}
        >
            <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{
                    headerRight: ({ tintColor }) => (
                        <IconButton
                            icon="exit"
                            color={tintColor}
                            size={24}
                            onPress={authCxt.logout}
                        />
                    ),
                }}
            />
        </Stack.Navigator>
    )
}

function Navigation() {
    const authCxt = useContext(AuthContext)

    return (
        <NavigationContainer>
            {authCxt.isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
        </NavigationContainer>
    )
}

export default function App() {
    return (
        <>
            <StatusBar style="light" />
            <AuthContextProvider>
                <Navigation />
            </AuthContextProvider>
        </>
    )
}
