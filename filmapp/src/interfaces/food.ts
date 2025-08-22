export interface Food {
    id: string;
    name: string;
    images: string;
    price: number;
    description: string;
}

export interface FoodApiResponse {
    success: boolean;
    data: Food[];
}