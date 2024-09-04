import CurrencyData from "./types/CurrencyData";

export default class RateCalculator {
    static calc(amount: number, currency: CurrencyData): number {
        if (currency.rate <= 0 || currency.amount <= 0) {
            console.warn('Invalid currency data given!');

            return amount;
        }

        return Math.round(amount.valueOf() / currency.rate * currency.amount * 1000) / 1000;
    }
}
