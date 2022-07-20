import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'

import { AuthContext } from '../store/auth-context'

const MESSAGE_URL =
    'https://expenses-test-app-default-rtdb.firebaseio.com/message.json'

function WelcomeScreen() {
    const [serverMessage, setServerMessage] = useState()
    const authCtx = useContext(AuthContext)
    const token = authCtx.token

    useEffect(() => {
        async function getMessage() {
            try {
                const serverResponse = await axios.get(
                    MESSAGE_URL + '?auth=' + token
                )
                setServerMessage(serverResponse.data)
            } catch (error) {
                Alert.alert('Unauthenticated')
            }
        }
        getMessage()
    }, [token])

    return (
        <View style={styles.rootContainer}>
            <Text style={styles.title}>Welcome!</Text>
            <Text>You authenticated successfully!</Text>
            <Text>{serverMessage}</Text>
        </View>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
})
