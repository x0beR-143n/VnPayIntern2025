const API_BASE_URL = "http://localhost:3000"

const authService = {
    login: async (email, password) => {
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong during login.');
            }
            return data;
        } catch (error) {
            console.error('Login API error:', error);
            throw error; // Ném lỗi để Saga bắt và xử lý
        }
    },
}

export default authService;
