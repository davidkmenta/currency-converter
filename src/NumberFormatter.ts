export default class NumberFormatter {
    static formatPrice(number: number, currency: string = 'CZK'): string {
        return Intl.NumberFormat(undefined, {style: 'currency', currency, maximumFractionDigits: 3}).format(number);
    }
}
