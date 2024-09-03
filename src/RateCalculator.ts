import CurrencyData from "./types/CurrencyData";

export default class RateCalculator {
    static calc(amount: number, currency: CurrencyData): number {
        return Math.round(amount.valueOf() / currency.rate * currency.amount * 1000) / 1000;
    }
}
