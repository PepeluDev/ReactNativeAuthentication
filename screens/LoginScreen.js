import { useState, useContext } from 'react'
import { Alert } from 'react-native'

import AuthContent from '../components/Auth/AuthContent'
import LoadingOverlay from '../components/ui/LoadingOverlay'

import { login } from '../util/auth'
import { AuthContext } from '../store/auth-context'

function LoginScreen() {
    const [isAuthenticating, setisAuthenticating] = useState(false)
    const authCtx = useContext(AuthContext)

    async function signInHandler({ email, password }) {
        try {
            setisAuthenticating(true)
            const token = await login(email, password)
            // Backend is really quick: use line below to test the LoadingOverlay
            // await new Promise((r) => setTimeout(r, 5000))
            authCtx.authenticate(token)
        } catch (error) {
            Alert.alert(
                'Authentication failed',
                'Please check your credentials or try again later'
            )
            setisAuthenticating(false)
        }
    }

    if (isAuthenticating) {
        return <LoadingOverlay message="Loging in..." />
    }

    return <AuthContent isLogin onAuthenticate={signInHandler} />
}

export default LoginScreen
