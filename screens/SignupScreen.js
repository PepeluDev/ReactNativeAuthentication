import { useState } from 'react'

import AuthContent from '../components/Auth/AuthContent'
import LoadingOverlay from '../components/ui/LoadingOverlay'

import { createUser } from '../util/auth'

function SignupScreen() {
    const [isAuthenticating, setisAuthenticating] = useState(false)

    async function signUpHandler({ email, password }) {
        try {
            setisAuthenticating(true)
            createUser(email, password)
            // Backend is really quick: use line below to test the LoadingOverlay
            // await new Promise((r) => setTimeout(r, 5000))
        } catch (error) {
            Alert.alert('SignUp failed', 'Please try again later')
        }
        setisAuthenticating(false)
    }

    if (isAuthenticating) {
        return <LoadingOverlay message="Creating user..." />
    }

    return <AuthContent isLogin={false} onAuthenticate={signUpHandler} />
}

export default SignupScreen
