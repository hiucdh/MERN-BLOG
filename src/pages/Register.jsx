import React from 'react'

const Register = () => {
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [message, setMessage] = React.useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const role = "user"
            const res = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password, role }),
            });
            const data = await res.json();
            setMessage(data.message)
        } catch (err) {
            setMessage("đăng kí thất bại")
            console.log(err)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <label htmlFor="username">Username</label>
            <input type='text' value={username} onChange={e => setUsername(e.target.value)} />

            <label htmlFor="email">Email</label>
            <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

            <label htmlFor="password">Password</label>
            <input type='text' value={password} onChange={e => setPassword(e.target.value)} />


            <button type="submit">Register</button><br />
            {message && <p>{message}</p>}
        </form>
    )
}

export default Register