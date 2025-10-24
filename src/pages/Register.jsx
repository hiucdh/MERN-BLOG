import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
const Register = () => {
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const navigate = useNavigate();
    const { register } = React.useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const result = await register({ username, email, password });
        setLoading(false);

        if (result?.success) {
            setMessage("Đăng ký thành công!");
            setTimeout(() => navigate("/login"), 1500);
        } else {
            setMessage(result?.message || "Đăng ký thất bại. Vui lòng thử lại.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-100">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Đăng ký tài khoản
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Tên người dùng:
                        </label>
                        <input
                            id="username"
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Nhập tên người dùng..."
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email:
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Nhập email của bạn..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Mật khẩu:
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Nhập mật khẩu..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 mt-3 text-white font-semibold rounded-xl transition duration-200 
              ${loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-indigo-600 hover:bg-indigo-700 shadow-md"
                            }`}
                    >
                        {loading ? "Đang đăng ký..." : "Đăng ký"}
                    </button>
                </form>

                {message && (
                    <p
                        className={`mt-4 text-center text-sm font-medium ${message.includes("thành công")
                            ? "text-green-600"
                            : "text-red-500"
                            }`}
                    >
                        {message}
                    </p>
                )}

                <p className="text-center text-sm text-gray-500 mt-6">
                    Đã có tài khoản?{" "}
                    <Link
                        to="/login"
                        className="text-indigo-600 hover:underline font-medium"
                    >
                        Đăng nhập
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
