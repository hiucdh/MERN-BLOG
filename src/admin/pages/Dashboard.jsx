import React, { useEffect } from 'react';
import { AuthContext } from "../../context/AuthContext.jsx";

const Dashboard = () => {
    const { user } = React.useContext(AuthContext);

    return (
        <div className="min-h-screen bg-gradient-to-br flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl shadow-xl p-10 max-w-xl text-center animate-fadeIn">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    Xin chào, {user?.username || 'Admin'}!
                </h1>
                <p className="text-gray-600 text-lg mb-6">
                    Chúc bạn một ngày làm việc thật vui vẻ và hiệu quả!
                </p>

            </div>
        </div>
    );
};

export default Dashboard;
