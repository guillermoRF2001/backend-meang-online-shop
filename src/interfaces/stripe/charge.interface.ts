export interface IStripeCharge {
    id: string;
    amount: number;
    status: String;
    receiptEmail: String;
    receiptUrl: String;
    paid: boolean;
    created: String;
    typeOrder: String;
    description: String;
    card: string;
    customer: string;
}