// server.js
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'DEMO_LOGIN'; 

app.use(bodyParser.json());
app.use(cors());

const users = [
    { email: 'user1@example.com', password: 'password123', name: 'Nguyen Van A' },
    { email: 'user2@example.com', password: 'password456', name: 'Tran Thi B' },
    { email: 'admin@example.com', password: 'adminpassword', name: 'Admin User' }
];

// --- Route POST /login ---
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = users.find(u => u.email === email && u.password === password);

    setTimeout(() => {
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials (email or password).' });
        }

        // Nếu thông tin đăng nhập đúng:
        // Tạo JWT token
        // Payload của token chứa thông tin không nhạy cảm mà bạn muốn mã hóa
        const token = jwt.sign(
            { userId: user.email, userName: user.name }, 
            JWT_SECRET, 
            { expiresIn: '1h' } 
        );

        // Trả về token, email và tên người dùng
        res.status(200).json({
            message: 'Login successful!',
            token: token,
            email: user.email,
            username: user.name
        });
    }, 2000);
});



app.get('/', (req, res) => {
    res.status(200).send('<h1>Server Express của bạn đang hoạt động!</h1><p>Thử POST đến /login để đăng nhập.</p>');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});