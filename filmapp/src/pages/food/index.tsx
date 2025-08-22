import { useState, useEffect } from 'react'
import { View, Text } from '@vnxjs/components'
//redux
import { Provider } from 'react-redux';
import { store } from '../../store/index';
//---------------
import FoodHeader from '../../components/FoodComponents/FoodHeader/FoodHeader'
import FoodItem from '../../components/FoodComponents/FoodItem/FoodItem'
import { Food } from '../../interfaces/food'
import { FilmService } from '../../services/films'
import Loading from '../../components/Loading/loading'
import './index.scss'

function FoodIndex() {
    const [foodData, setFoodData] = useState<Food[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchFood() {
            try {
                const data = await FilmService.getFoodSession();                
                setFoodData(data.data);
            } catch (err: any) {
                setError(err.message || 'Có lỗi xảy ra');
            } finally {
                setLoading(false);
            }
        }

        fetchFood();
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    return (
        <View>
            <FoodHeader />
            <FoodItem foodData={foodData} />
        </View>
    )
}

export default function Index() {
    return (
        <Provider store={store}>
            <FoodIndex />
        </Provider>
    )
}