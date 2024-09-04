import NumberFormatter from "../src/NumberFormatter";

describe('NumberFormatter', () => {
    it('should format price in crowns in Czech way', () => {
        expect(NumberFormatter.formatPrice(1200001.8543, 'CZK', 'cs')).toBe('1 200 001,854 Kč');
    });

    it('should format price in crowns in US way', () => {
        expect(NumberFormatter.formatPrice(983456.987, 'CZK', 'us')).toBe('CZK 983,456.987');
    });

    it('should format price in dollars in Czech way', () => {
        expect(NumberFormatter.formatPrice(1200001.8543, 'USD', 'cs')).toBe('1 200 001,854 US$');
    });

    it('should format price in dollars in US way', () => {
        expect(NumberFormatter.formatPrice(983456.987, 'USD', 'us')).toBe('$983,456.987');
    });
})
