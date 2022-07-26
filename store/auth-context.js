import AsyncStorage from '@react-native-async-storage/async-storage'

import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    authenticate: () => {},
    logout: () => {},
})

function AuthContextProvider({ children }) {
    const [authToken, setAuthToken] = useState()

    useEffect(() => {
        async function retrieveTokenFromStorage() {
            const token = await AsyncStorage.getItem('token')
            if (token) {
                setAuthToken(token)
            }
        }
        retrieveTokenFromStorage()
    }, [])

    function authenticate(token) {
        setAuthToken(token)
        // It should always be a string
        AsyncStorage.setItem('token', token)
    }

    function logout() {
        AsyncStorage.removeItem('token')
        setAuthToken(null)
    }

    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        logout: logout,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider
