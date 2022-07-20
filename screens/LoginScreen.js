import { useState } from 'react'

import AuthContent from '../components/Auth/AuthContent'
import LoadingOverlay from '../components/ui/LoadingOverlay'

import { login } from '../util/auth'

function LoginScreen() {
    const [isAuthenticating, setisAuthenticating] = useState(false)

    async function signInHandler({ email, password }) {
        setisAuthenticating(true)
        login(email, password)
        // Backend is really quick: use line below to test the LoadingOverlay
        // await new Promise((r) => setTimeout(r, 5000))
        setisAuthenticating(false)
    }

    if (isAuthenticating) {
        return <LoadingOverlay message="Loging in..." />
    }

    return <AuthContent isLogin onAuthenticate={signInHandler} />
}

export default LoginScreen
