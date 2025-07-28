// server.js
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { count } = require('console');

const app = express();
const PORT = 5555;
const JWT_SECRET = 'DEMO_LOGIN'; 

app.use(bodyParser.json());
app.use(cors());

const users = [
    { email: 'user1@gmail.com', password: '123123123', name: 'Nguyen Van A' },
    { email: 'user2@gmail.com', password: '123123123', name: 'Tran Thi B' },
    { email: 'admin@gmail.com', password: '123123123', name: 'Admin User' }
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
    }, 5000);
});

const readTripData = () => {
    try {
        const filePath = path.join(__dirname, 'trips.json');
        const rawData = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(rawData);
        
        return jsonData.json.coreData.data;
    } catch(error) {
        console.log("Error reading trips data: ", error);
        return null;
    }
}

app.get('/api/trips', (req, res) => {
    try {
        const tripsData = readTripData();

        if(!tripsData) {
            return res.status(500).json({
                success: false,
                message: 'Can not fetch trips data',
                data: []
            });
        }

        // Lấy page và limit từ query params, có default values
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        
        // Validate page và limit
        if (page < 1) {
            return res.status(400).json({
                success: false,
                message: 'Page must be greater than 0'
            });
        }
        
        if (limit < 1 || limit > 100) {
            return res.status(400).json({
                success: false,
                message: 'Limit must be between 1 and 100'
            });
        }

        // Tính toán pagination
        const totalItems = tripsData.length;
        const totalPages = Math.ceil(totalItems / limit);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        
        // Slice data theo page
        const paginatedData = tripsData.slice(startIndex, endIndex);

        res.status(200).json({
            success: true,
            message: "Successfully get trips data",
            data: paginatedData,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalItems: totalItems,
                itemsPerPage: limit,
                hasNext: page < totalPages,
                hasPrev: page > 1,
                startIndex: startIndex + 1, // +1 để hiển thị cho user (1-based)
                endIndex: Math.min(endIndex, totalItems)
            }
        });

    } catch (error) {
        console.error('Error in /api/trips:', error);
        res.status(500).json({
            success: false,
            message: 'Server can not get the trips data',
            error: error.message
        });
    } 
})

app.get('/', (req, res) => {
    res.status(200).send('<h1>Server Express của bạn đang hoạt động!</h1>');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});