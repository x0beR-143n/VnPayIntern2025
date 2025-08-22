export interface PromotionType {
  description: string;
  discountMaxValue: number;
  canApply: boolean;
  discountValue: number;
  promotionExpiry: string;
  maxTicket: number;
  applyTo: string;
  discountType: number;
  voucherCode: string;
  toHour: string;
  minTranxAmount: string;
  information: string;
  minTicket: number;
  applyFrom: string;
  fromHour: string;
  promotionTitle: string;
}

export interface PromotionApiResponse {
    success: boolean;
    data: PromotionType[];
}