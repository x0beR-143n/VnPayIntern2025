import { useState, useEffect, useRef, useMemo } from "react"
import { useDispatch } from "react-redux"
import { View, Text, Input, Image, ScrollView } from "@vnxjs/components"
import debounce from "lodash/debounce"
import voucher from '../../../assets/icon/ic_voucher_none.svg'
import { FilmService } from "../../../services/films"
import { PromotionType } from "../../../interfaces/promotion"
import { setDiscountValue } from "../../../store/slices/filmSlice"
import { formatDateTimeNoHour } from "../../../utils/format"
import cancel from '../../../assets/icon/ic_clear_voucher.svg'
import PromotionNote from "./PromotionNote"
import './index.scss'

export default function Promotion() {
  const [originalPromotionData, setOriginalPromotionData] = useState<PromotionType[]>([]);
  const [promotionData, setPromotionData] = useState<PromotionType[]>([]);
  const [selectedPromotion, setSelectedPromotion] = useState<PromotionType | null>(null);
  const [selectedPromotionIndex, setSelectedPromotionIndex] = useState(-1);
  const dispatch = useDispatch();
  const scrollRef = useRef<any>(null);
  const [code, setCode] = useState("")

  useEffect(() => {
        async function fetchData() {
            try {
                const data = await FilmService.getPromotion();  
                setOriginalPromotionData(data.data);              
                setPromotionData(data.data);
            } catch (err: any) {
                console.log(err);
            }
        }
        fetchData();
  }, []);

  const selectDiscountItem = (index) => {
    setSelectedPromotion(promotionData[index]);
    setSelectedPromotionIndex(index);
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
    dispatch(setDiscountValue(promotionData[index].discountValue));
  } 

  const cancelChoosePromotion = () => {
    setSelectedPromotion(null);
    setSelectedPromotionIndex(-1);
    dispatch(setDiscountValue(0));
  }

  const filterVoucher = (value: string) => {
    const keyword = value.trim().toLowerCase();
    if (keyword === "") {
      setPromotionData(originalPromotionData);
    } else {
      const filtered = originalPromotionData.filter(promotion =>
        promotion.voucherCode.toLowerCase().includes(keyword) ||
        promotion.promotionTitle.toLowerCase().includes(keyword)
      );
      setPromotionData(filtered);
    }
  };

  // Tạo hàm debounce 300ms
  const debouncedFilter = useMemo(
    () => debounce((value: string) => filterVoucher(value), 300),
    [originalPromotionData]
  );

  const handleInputChange = (e) => {
    const value = e.detail.value;
    setCode(value);
    debouncedFilter(value); 
  };

  const clearCodeText = () => {
    setCode('');
    setPromotionData(originalPromotionData);
  }
  
  return (
    <View className='payment-item-container'>
      <View className='item-header'>
        <Text>Mã giảm giá</Text>
        {selectedPromotion !== null ? (
          <View className='voucher-code'>
            <Text>{selectedPromotion.voucherCode}</Text>
            <View className='voucher-code-separator'></View>
            <Image src={cancel} onClick={cancelChoosePromotion} />
          </View>
        ) : (
          <View className='input-container'>
            <Input type='text' placeholder='Nhập hoặc chọn mã' className='input-promotion' value={code}
              onInput={handleInputChange} 
            />
            <Image src={voucher} className='voucher-img' />
            {code !== "" && (
              <Image src={cancel} className='clear-code' onClick={clearCodeText} />
            )}
          </View>
        )}
      </View> 
      <ScrollView className='promotion-container' scrollX scrollWithAnimation ref={scrollRef}>
        {selectedPromotion !== null && (
          <View className='promotion-card border-green'>
            <p className='p-description' > {selectedPromotion.description}</p>
            <Text className='p-information'>{selectedPromotion.information}</Text>
            <Text className='p-expiry'>HSD: {formatDateTimeNoHour(selectedPromotion.promotionExpiry)}</Text>
            <Text className='apply-text' onClick={cancelChoosePromotion}>Hủy bỏ</Text>
          </View>
        )}
        {promotionData.map((promotion, index) => {
          if(index !== selectedPromotionIndex) {
            return (
              <View key={index} className='promotion-card'>
                <p className='p-description' > {promotion.description}</p>
                {promotion.canApply ? (
                  <Text className='p-information'>{promotion.information}</Text>
                ) : (
                  <Text className='error-text'>Chưa thỏa mãn điều kiện</Text>
                )}
                <Text className='p-expiry'>HSD: {formatDateTimeNoHour(promotion.promotionExpiry)}</Text>
                {promotion.canApply ? (
                  <Text className='apply-text' onClick={() => {selectDiscountItem(index)}}>Áp dụng</Text>
                ) : (
                  <Text className='apply-text'>Chi tiết</Text>
                )}
              </View>
            )
          }
        })}
      </ScrollView>
      <View className='payment-note-separator'></View>
      <PromotionNote />
    </View>
  )  
}