import CnbDataParser from "../src/CnbDataParser";
import CurrencyData from "../src/types/CurrencyData";

describe('CnbParserData', () => {
    it('should parse Czech National Bank exchange rates data', () => {
        const exchangeRatesData = `04 Sep 2024 #172
            Country|Currency|Amount|Code|Rate
            Australia|dollar|1|AUD|15.247
            Brazil|real|1|BRL|4.013
            Bulgaria|lev|1|BGN|12.827
            Canada|dollar|1|CAD|16.748
        `.replace(/(\n)\s+/g, '$1');

        const expectedCurrenciesData = new Map<string, CurrencyData>();
        expectedCurrenciesData.set('AUD', {country: 'Australia', name: 'dollar', amount: 1, code: 'AUD', rate: 15.247});
        expectedCurrenciesData.set('BRL', {country: 'Brazil', name: 'real', amount: 1, code: 'BRL', rate: 4.013});
        expectedCurrenciesData.set('BGN', {country: 'Bulgaria', name: 'lev', amount: 1, code: 'BGN', rate: 12.827});
        expectedCurrenciesData.set('CAD', {country: 'Canada', name: 'dollar', amount: 1, code: 'CAD', rate: 16.748});

        expect(CnbDataParser.parse(exchangeRatesData)).toMatchObject(expectedCurrenciesData);
    });

    it('should NOT fail if empty data given', () => {
        const exchangeRatesData = '';
        const expectedParsedCurrenciesData = new Map<string, CurrencyData>();

        expect(CnbDataParser.parse(exchangeRatesData)).toMatchObject(expectedParsedCurrenciesData);
    });
})
