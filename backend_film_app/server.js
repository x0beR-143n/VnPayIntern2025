// server.js
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

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

// Hàm đọc dữ liệu từ file promotion.json
const readPromotionData = () => {
    try {
        const filePath = path.join(__dirname, 'promotion.json');
        const rawData = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(rawData);
        
        // Trả về phần dữ liệu promotions thực sự
        return jsonData.data.json.data.promotions;
    } catch(error) {
        console.error("Error reading promotion data: ", error);
        return null;
    }
}

// Hàm đọc dữ liệu từ file food.json
const readFoodData = () => {
    try {
        const filePath = path.join(__dirname, 'food.json');
        const rawData = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(rawData);
        
        // Trả về phần dữ liệu items thực sự
        return jsonData.coreData.data.items;
    } catch(error) {
        console.error("Error reading food data: ", error);
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

        const session = filmData.sessionInfo || {};
        const ticketTypes = filmData.ticketTypes || [];
        const seatsRaw = filmData.seats || [];

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

        const ticketTypesData = ticketTypes.map(tt => ({
            id: tt.id,
            name: tt.nameVi,
            colorCode: tt.colorCode,
            price: tt.price,
            originalPrice: tt.originalPrice,
            ishow_orgPrice: tt.ishow_orgPrice
        }));

        const seatsData = seatsRaw.flat().filter(s => s?.seatId).map(seat => ({
            seatId: seat.seatId,
            code: seat.code,
            status: seat.status,
            type: seat.type,
            price: Number(seat.price),
            ticketTypeId: seat.ticketTypeId || seat.type, 
            color: seat.color,
            isEnable: seat.isEnable
        }));

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

app.get('/api/films/promotion', (req, res) => {
    try {
        const promotions = readPromotionData();
        if (!promotions) {
            return res.status(500).json({
                success: false,
                message: 'Cannot fetch promotion data'
            });
        }
        res.status(200).json({
            success: true,
            data: promotions
        });
    } catch (error) {
        console.error('Error in /api/films/promotion:', error);
        res.status(500).json({
            success: false,
            message: 'Server cannot get the promotion data',
            error: error.message
        });
    }
});

app.get('/api/films/food', (req, res) => {
    try {
        const foods = readFoodData();
        const film = readFilmData();
        if (!foods || !film) {
            return res.status(500).json({
                success: false,
                message: 'Cannot fetch food data'
            });
        }
        res.status(200).json({
            success: true,
            data: foods,
            maxConcessions: film.maxConcessions,
        });
    } catch (error) {
        console.error('Error in /api/films/food:', error);
        res.status(500).json({
            success: false,
            message: 'Server cannot get the food data',
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