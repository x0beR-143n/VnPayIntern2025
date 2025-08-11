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

app.use(bodyParser.json());
app.use(cors());

const readFilmData = () => {
    try {
        const filePath = path.join(__dirname, 'seatmap.json');
        const rawData = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(rawData);
        
        return jsonData;
    } catch(error) {
        console.log("Error reading trips data: ", error);
        return null;
    }
}

app.get('/api/films', (req, res) => {
    try {
        const filmData = readFilmData();

        if (!filmData) {
            return res.status(500).json({
                success: false,
                message: 'Cannot fetch films data',
                data: []
            });
        }

        // Giả sử dữ liệu seatmap.json là 1 object duy nhất
        // Nếu là mảng phim thì cần map qua từng phim
        const session = filmData.sessionInfo || {};
        const ticketTypes = filmData.ticketTypes || [];
        const seatsRaw = filmData.seats || [];

        // Gọn hóa thông tin suất chiếu
        const sessionInfo = {
            roomName: session.roomName,
            maxSeats: filmData.maxSeats,
            cinemaName: session.cinemaName,
            cinemaGroupName: session.cinemaGroupName,
            filmName: session.filmName,
            filmNameEn: session.filmNameEn,
            version: session.version,
            filmAge: session.filmAge,
            sessionTime: session.sessionTime,
            duration: session.duration,
            category: session.category,
            poster: session.poster
        };

        // Gọn hóa loại vé
        const ticketTypesData = ticketTypes.map(tt => ({
            id: tt.id,
            name: tt.nameVi,
            colorCode: tt.colorCode,
            price: tt.price,
            originalPrice: tt.originalPrice,
            ishow_orgPrice: tt.ishow_orgPrice
        }));

        // Gọn hóa danh sách ghế
        // seatsRaw trong dữ liệu gốc là 2D array => cần flatten
        const seatsData = seatsRaw.flat().filter(s => s?.seatId).map(seat => ({
            seatId: seat.seatId,
            code: seat.code,
            status: seat.status,
            type: seat.type,
            price: Number(seat.price),
            ticketTypeId: seat.ticketTypeId || seat.type, // Nếu chưa có thì tạm map theo type
            color: seat.color,
            isEnable: seat.isEnable
        }));

        // Gọn hóa lưu ý thanh toán
        const paymentNote = filmData.paymentInitNote || '';

        res.status(200).json({
            success: true,
            session: sessionInfo,
            ticketTypes: ticketTypesData,
            seats: seatsData,
            paymentNote
        });

    } catch (error) {
        console.error('Error in /api/films:', error);
        res.status(500).json({
            success: false,
            message: 'Server cannot get the films data',
            error: error.message
        });
    }
});

app.get('/', (req, res) => {
    res.status(200).send('<h1>Server Express của bạn đang hoạt động!</h1>');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});