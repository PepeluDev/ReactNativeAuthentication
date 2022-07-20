import { useState, useContext } from 'react'

import AuthContent from '../components/Auth/AuthContent'
import LoadingOverlay from '../components/ui/LoadingOverlay'

import { createUser } from '../util/auth'
import { AuthContext } from '../store/auth-context'

function SignupScreen() {
    const [isAuthenticating, setisAuthenticating] = useState(false)
    const authCtx = useContext(AuthContext)

    async function signUpHandler({ email, password }) {
        try {
            setisAuthenticating(true)
            const token = await createUser(email, password)
            // Backend is really quick: use line below to test the LoadingOverlay
            // await new Promise((r) => setTimeout(r, 5000))
            authCtx.authenticate(token)
        } catch (error) {
            Alert.alert('SignUp failed', 'Please try again later')
            setisAuthenticating(false)
        }
    }

    if (isAuthenticating) {
        return <LoadingOverlay message="Creating user..." />
    }

    return <AuthContent isLogin={false} onAuthenticate={signUpHandler} />
}

export default SignupScreen
