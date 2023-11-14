import React from 'react'

type Props = {}

const Login = (props: Props) => {
    return (
        <>
            <div>Login</div>
            <header className="App-header">
                Please login to your spotify account:
                <a href="http://localhost:8000/login">
                    <button>Log in</button>
                </a>
            </header>
        </>
    )
}

export default Login