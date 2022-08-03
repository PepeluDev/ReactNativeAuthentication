import axios from 'axios'

const API_KEY = 'AIzaSyAcfG_pNl_WFIdui_YM_Xp9p04inVCXsio'

function getBackendUrlWithAction(action) {
    return (
        `https://identitytoolkit.googleapis.com/v1/accounts:${action}?key=` +
        API_KEY
    )
}

async function authenticate(mode, email, password) {
    let action = mode === 'signUp' ? 'signUp' : 'signInWithPassword'
    const response = await axios.post(getBackendUrlWithAction(action), {
        email: email,
        password: password,
        returnSecureToken: true,
    })
    // It would be good to also store the refreshToken
    const token = response.data.idToken
    return token
}

export function createUser(email, password) {
    return authenticate('signUp', email, password)
}

export function login(email, password) {
    return authenticate('logIn', email, password)
}
