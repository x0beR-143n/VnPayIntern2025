import { View, Text } from "@vnxjs/components";

export default function PromotionNote() {
    return (
        <View className='payment-note'>
            <Text className='note-title'>
            <Text className='note-star'>*</Text> Lưu ý:
            </Text>

            <Text className='note-item'>
            • Phim cho khách hàng từ <Text className='note-bold'>13</Text> tuổi trở lên.
            </Text>

            <Text className='note-item'>
            • Vé đã mua không thể đổi hoặc trả lại.
            </Text>

            <Text className='note-item'>
            • Nếu không nhận được mã vé sau 30 phút kể từ thời điểm hoàn tất thanh toán,
            vui lòng liên hệ tổng đài CSKH <Text className='note-hotline'>*6789</Text> để được hỗ trợ.
            </Text>

            <Text className='note-item'>
            • Rạp phim không được phép phục vụ khách hàng dưới <Text className='note-bold'>13</Text> tuổi
            cho các suất chiếu kết thúc sau 22:00 và <Text className='note-bold'>16</Text> tuổi cho các
            suất chiếu kết thúc sau 23:00.
            </Text>
        </View>
    )
}