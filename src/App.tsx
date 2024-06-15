import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ChatApp from './components/ChatApp';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { User } from './types/User';

const App: React.FC = () => {
    const [user, setUser] = React.useState<User | null>(null);
    const [loggedIn, setLoggedIn] = React.useState<boolean>(false);

    React.useEffect(() => {
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
                    setUser(data.user);
                    setLoggedIn(true);
                } else {
                    loggedOut();
                }
            })
            .catch(() => {
                loggedOut();
                alert("Error in login, refresh.");
            });
    };

    const loggedOut = () => {
        setUser(null);
        setLoggedIn(false);
    };

    return (
        <Router>
            <Navbar loggedIn={loggedIn} />
            <Routes>
                <Route path="/" element={loggedIn ? <ChatApp user={user} loggedIn={loggedIn} setUser={setUser} /> : <Navigate to="/login" />} />
                <Route path="/login" element={<div dangerouslySetInnerHTML={{ __html: require('../public/templates/login.html').default }} />} />
                <Route path="/new_user" element={<div dangerouslySetInnerHTML={{ __html: require('../public/templates/newUser.html').default }} />} />
                <Route path="*" element={<div dangerouslySetInnerHTML={{ __html: require('../public/templates/error.html').default }} />} />
            </Routes>
        </Router>
    );
};

export const checkRedirect = (res: AxiosResponse): void => {
    // hacky solution but axios has no better API for this.
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