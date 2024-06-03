const constants = {
    dev: {
        API_URL: 'http://0.0.0.0:80',
        SIGNUP_URL: 'http://localhost:3000/login'
    }
}

const env = 'dev'

export default constants[env]
