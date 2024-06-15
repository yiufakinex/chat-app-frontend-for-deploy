import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios, { AxiosError, AxiosResponse } from 'axios';
import Navbar from './components/Navbar';
import ChatApp from './components/ChatApp';
import { User } from './types/User';

const App: React.FC<{}> = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = () => {
        axios
            .get('/api/login/user')
            .then((res: AxiosResponse) => {
                const data = res.data;
                if (data.newUser) {
                    window.location.href = "/new_user";
                } else if (data.loggedIn) {
                    const user: User = data.user;
                    setUser(user);
                    setLoggedIn(true);
                } else {
                    loggedOut();
                }
            })
            .catch(() => {
                loggedOut();
                alert("Error in login, refresh.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const loggedOut = () => {
        setUser(null);
        setLoggedIn(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <Navbar loggedIn={loggedIn} />
            <Routes>
                <Route path="/" element={loggedIn ? <ChatApp user={user} loggedIn={loggedIn} setUser={setUser} /> : <Navigate to="/login" />} />
                <Route path="/login" element={<h1>Login Page</h1>} />
                <Route path="/new_user" element={<h1>New User Page</h1>} />
            </Routes>
        </Router>
    );
};

export const checkRedirect = (res: AxiosResponse): void => {

    if (res.status === 302 || res.request.responseURL.endsWith("/login")) {
        window.location.href = "/login?error=Session expired, please log back in.";
    }
}

export const checkError = (err: AxiosError): void => {
    const status: number = err.response.status;
    switch (status) {
        case 401:
            window.location.href = "/login?error=Session expired, please log back in.";
            break;
        case 406:
            alert(`Invalid input: ${JSON.stringify((err.response.data as any).reason)}`);
            break;
        case 429:
            alert(`You have been rate limitted: ${JSON.stringify((err.response.data as any).reason)}`);
            break;
        default:
            alert("Server error, please create an GitHub issue if this persists.");
    }
}

export default App;
