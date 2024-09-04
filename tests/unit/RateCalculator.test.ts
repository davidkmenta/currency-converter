import RateCalculator from "../../src/RateCalculator";

describe('RateCalculator', () => {
    it('should calculate amount for given currency', () => {
        expect(
            RateCalculator.calc(1200, {rate: 25.085, amount: 1, name: 'euro', code: 'EUR', country: 'EMU'}),
        ).toBe(47.837);
    });

    it('should calculate amount for currency amount larger than one', () => {
        expect(
            RateCalculator.calc(1200, {rate: 1.467, amount: 1000, name: 'rupiah', code: 'IDR', country: 'Indonesia'}),
        ).toBe(817995.91);
    });

    it('should return same amount with currency rate and amount are equal to one', () => {
        expect(
            RateCalculator.calc(42.895, {rate: 1, amount: 1, name: 'crown', code: 'CZK', country: 'Czechia'}),
        ).toBe(42.895);
    });

    it('should return same amount if invalid currency rate is given', () => {
        expect(
            RateCalculator.calc(1000, {rate: 1, amount: -1, name: 'crown', code: 'CZK', country: 'Czechia'}),
        ).toBe(1000);
    });

    it('should return same amount if invalid currency amount is given', () => {
        expect(
            RateCalculator.calc(500, {rate: 0, amount: 1, name: 'crown', code: 'CZK', country: 'Czechia'}),
        ).toBe(500);
    });
})
