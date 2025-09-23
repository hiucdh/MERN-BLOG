import React from 'react'

const Login = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [message, setMessage] = React.useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (res.ok) {
                setMessage(data.message)
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.user.role)
            } else setEmail(data.message)
        } catch (err) {
            setMessage("Lỗi server")
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label HtmlFor="email">Email:</label><br />
                <input type='text' value={email} onChange={e => setEmail(e.target.value)} /><br />
                <label HtmlFor="password">PassWord:</label><br />
                <input type="text" value={password} onChange={e => setPassword(e.target.value)} /><br />
                <input type="submit" value="Submit" />
                {message && <p>{message}</p>}
            </form>
        </div>
    )
}

export default Login