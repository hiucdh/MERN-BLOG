import React, { useEffect } from 'react'
import { AuthContext } from "../../context/AuthContext.jsx";
import { useNavigate } from 'react-router';
const Dashboard = () => {
    const { token } = React.useContext(AuthContext);
    const { role } = React.useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (token && role === 'admin') {
            navigate('/admin');
        } else {
            navigate('/');
        }
    }, [token, role, navigate])
    return (
        <div >Dashboard Component</div>
    )
}

export default Dashboard