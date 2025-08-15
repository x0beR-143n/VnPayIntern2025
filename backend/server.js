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

        if (!tripsData) {
            return res.status(500).json({
                success: false,
                message: 'Cannot fetch trips data',
                data: []
            });
        }

        const pageParam = req.query.page;
        const limitParam = req.query.limit;

        // Nếu không có page hoặc limit thì trả về toàn bộ dữ liệu
        if (!pageParam || !limitParam) {
            return res.status(200).json({
                success: true,
                message: "Successfully get all trips data",
                data: tripsData,
                pagination: null
            });
        }

        // Parse và validate page và limit
        const page = parseInt(pageParam);
        const limit = parseInt(limitParam);

        if (isNaN(page) || page < 1) {
            return res.status(400).json({
                success: false,
                message: 'Page must be a number greater than 0'
            });
        }

        if (isNaN(limit) || limit < 1 || limit > 100) {
            return res.status(400).json({
                success: false,
                message: 'Limit must be a number between 1 and 100'
            });
        }

        // Tính toán pagination
        const totalItems = tripsData.length;
        const totalPages = Math.ceil(totalItems / limit);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        const paginatedData = tripsData.slice(startIndex, endIndex);

        res.status(200).json({
            success: true,
            message: "Successfully get paginated trips data",
            data: paginatedData,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalItems: totalItems,
                itemsPerPage: limit,
                hasNext: page < totalPages,
                hasPrev: page > 1,
                startIndex: startIndex + 1,
                endIndex: Math.min(endIndex, totalItems)
            }
        });

    } catch (error) {
        console.error('Error in /api/trips:', error);
        res.status(500).json({
            success: false,
            message: 'Server cannot get the trips data',
            error: error.message
        });
    }
});

// Helper function để parse time string thành minutes
const parseTimeToMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
};

// Helper function để check xem time có nằm trong khoảng không
const isTimeInRange = (timeString, startTime) => {
    const tripTimeInMinutes = parseTimeToMinutes(timeString);
    const startTimeInMinutes = startTime.start_time_hour * 60 + startTime.start_time_mins;
    const endTimeInMinutes = startTime.arrived_time_hour * 60 + startTime.arrived_time_mins;
    
    // Xử lý trường hợp qua ngày (ví dụ: 23:00 - 06:00)
    if (startTimeInMinutes > endTimeInMinutes) {
        return tripTimeInMinutes >= startTimeInMinutes || tripTimeInMinutes <= endTimeInMinutes;
    }
    
    return tripTimeInMinutes >= startTimeInMinutes && tripTimeInMinutes <= endTimeInMinutes;
};

// Function để filter trips theo các tiêu chí
const filterTrips = (trips, filters) => {
    return trips.filter(trip => {
        // Filter theo max_price
        if (filters.max_price && filters.min_price && (trip.fare_amount < filters.min_price || trip.fare_amount > filters.max_price)) {
            return false;
        }
        
        // Filter theo start_time
        if (filters.start_time && filters.start_time.length > 0) {
            const isTimeMatch = filters.start_time.some(timeRange => 
                isTimeInRange(trip.departure_time, timeRange)
            );
            if (!isTimeMatch) {
                return false;
            }
        }
        
        // Filter theo merchants (transport_information.id)
        if (filters.merchants && filters.merchants.length > 0) {
            if (!trip.transport_information || !filters.merchants.includes(trip.transport_information.id)) {
                return false;
            }
        }
        
        // Filter theo transports (vehicle_type)
        if (filters.transports && filters.transports.length > 0) {
            if (!filters.transports.includes(trip.vehicle_type)) {
                return false;
            }
        }
        
        return true;
    });
};

// API endpoint để lọc trips
app.post('/api/trips/filter', (req, res) => {
    try {
        const tripsData = readTripData();

        if (!tripsData) {
            return res.status(500).json({
                success: false,
                message: 'Can not fetch trips data',
                data: []
            });
        }

        // Lấy filters từ body
        const filters = req.body || {};

        // Lấy sort criteria & direction từ query params
        const criteria = req.query.criteria;
        const ascending = req.query.ascending === 'true';

        // Validate filters
        if (filters.max_price && (typeof filters.max_price !== 'number' || filters.max_price < 0)) {
            return res.status(400).json({
                success: false,
                message: 'max_price must be a positive number'
            });
        }

        if (filters.start_time && !Array.isArray(filters.start_time)) {
            return res.status(400).json({
                success: false,
                message: 'start_time must be an array'
            });
        }

        if (filters.merchants && !Array.isArray(filters.merchants)) {
            return res.status(400).json({
                success: false,
                message: 'merchants must be an array'
            });
        }

        if (filters.transports && !Array.isArray(filters.transports)) {
            return res.status(400).json({
                success: false,
                message: 'transports must be an array'
            });
        }

        // Filter trước
        let filteredTrips = filterTrips(tripsData, filters);

        // Sort nếu có criteria hợp lệ
        if (['time', 'price', 'rating'].includes(criteria)) {
            filteredTrips.sort((a, b) => {
                let valA, valB;

                if (criteria === 'time') {
                    // time là chuỗi giờ phút, ví dụ "22:30" → chuyển về phút
                    const toMinutes = (str) => {
                        const [h, m] = str.split(':').map(Number);
                        return h * 60 + m;
                    };
                    valA = toMinutes(a.departure_time);
                    valB = toMinutes(b.departure_time);
                } else if (criteria === 'price') {
                    valA = a.fare_amount;
                    valB = b.fare_amount;
                } else if (criteria === 'rating') {
                    valA = a.transport_information.rating;
                    valB = b.transport_information.rating;
                }
                return ascending ? valA - valB : valB - valA;
            });
        }

        // Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

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

        const totalItems = filteredTrips.length;
        const totalPages = Math.ceil(totalItems / limit);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        const paginatedData = filteredTrips.slice(startIndex, endIndex);

        res.status(200).json({
            success: true,
            message: "Successfully filtered and sorted trips data",
            data: paginatedData,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalItems: totalItems,
                itemsPerPage: limit,
                hasNext: page < totalPages,
                hasPrev: page > 1,
                startIndex: startIndex + 1,
                endIndex: Math.min(endIndex, totalItems)
            },
            filters: filters,
            sort: {
                criteria: criteria || null,
                ascending: criteria ? ascending : null
            }
        });

    } catch (error) {
        console.error('Error in /api/trips/filter:', error);
        res.status(500).json({
            success: false,
            message: 'Server can not filter the trips data',
            error: error.message
        });
    }
});

app.post('/api/filter', (req, res) => {
try {
        const tripsData = readTripData();

        if (!tripsData) {
            return res.status(500).json({
                success: false,
                message: 'Can not fetch trips data',
                data: []
            });
        }

        // Lấy filters từ body
        const filters = req.body || {};

        // Validate filters
        if (filters.max_price && (typeof filters.max_price !== 'number' || filters.max_price < 0)) {
            return res.status(400).json({
                success: false,
                message: 'max_price must be a positive number'
            });
        }

        if (filters.start_time && !Array.isArray(filters.start_time)) {
            return res.status(400).json({
                success: false,
                message: 'start_time must be an array'
            });
        }

        if (filters.merchants && !Array.isArray(filters.merchants)) {
            return res.status(400).json({
                success: false,
                message: 'merchants must be an array'
            });
        }

        if (filters.transports && !Array.isArray(filters.transports)) {
            return res.status(400).json({
                success: false,
                message: 'transports must be an array'
            });
        }

        // Filter trước
        let filteredTrips = filterTrips(tripsData, filters);

        const totalItems = filteredTrips.length;
       
        res.status(200).json(totalItems);

    } catch (error) {
        console.error('Error in /api/filter:', error);
        res.status(500).json({
            success: false,
            message: 'Server can not filter the trips data',
            error: error.message
        });
    }
}) 

app.get('/api/summary', (req, res) => {
    const trips = readTripData();

    if (!trips) {
        return res.status(500).json({ message: 'Không thể đọc dữ liệu chuyến đi' });
    }

    // Lấy danh sách name và id từ transport_information
    const transportMap = new Map();
    const vehicleTypes = new Set();

    trips.forEach((trip) => {
        const info = trip.transport_information;
        if (info && info.name && info.id) {
            transportMap.set(info.name, info.id);
        }

        if (trip.vehicle_type) {
            vehicleTypes.add(trip.vehicle_type);
        }
    });

    // Convert Map và Set sang Array
    const transportList = Array.from(transportMap.entries()).map(([name, id]) => ({ name, id }));
    const vehicleTypeList = Array.from(vehicleTypes);

    res.status(200).json({
        success: true,
        transportProviders: transportList,
        vehicleTypes: vehicleTypeList
    });
});



app.get('/api/provinces', (req, res) => {
    const filePath = path.join(__dirname, 'provinces.json');
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading provinces.json:', err);
            return res.status(500).json({
                success: false,
                message: 'Server error when reading provinces data'
            });
        }

        try {
            const provinces = JSON.parse(data);
            res.status(200).json(provinces);
        } catch (parseError) {
            console.error('Error parsing provinces.json:', parseError);
            res.status(500).json({
                success: false,
                message: 'Invalid JSON format in provinces.json'
            });
        }
    });
});

app.get('/', (req, res) => {
    res.status(200).send('<h1>Server Express của bạn đang hoạt động!</h1>');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});