import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Login: React.FC = () => {
    const [htmlContent, setHtmlContent] = useState<string>('');

    useEffect(() => {
        const fetchLoginHtml = async () => {
            try {
                const response = await axios.get('/templates/login.html'); // Adjust the URL as per your server setup
                setHtmlContent(response.data);
            } catch (error) {
                console.error('Error fetching login HTML:', error);
                // Handle error fetching HTML content
            }
        };

        fetchLoginHtml();
    }, []);

    return (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
};

export default Login;
