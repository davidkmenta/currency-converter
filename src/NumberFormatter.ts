export default class NumberFormatter {
    static formatPrice(number: number, currency: string = 'CZK', locale: string|undefined = undefined): string {
        return Intl.NumberFormat(locale, {style: 'currency', currency, maximumFractionDigits: 3}).format(number);
    }
}
