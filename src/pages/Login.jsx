import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { Link } from "react-router";
const Login = () => {
    const { login } = React.useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const result = await login({ email, password });
        setLoading(false);

        if (result?.success) {
            setMessage("Đăng nhập thành công!");
            navigate("/");
        } else {
            setMessage("Đăng nhập thất bại. Kiểm tra lại email hoặc mật khẩu.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-100">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Đăng nhập
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
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
                        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
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
                    Chưa có tài khoản?{" "}
                    <span className="text-indigo-600 hover:underline cursor-pointer">
                        <Link to="/register">Đăng ký ngay</Link>
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
