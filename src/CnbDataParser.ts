import CurrencyData from "./types/CurrencyData";
import Papa from 'papaparse';

export default class CnbDataParser {
    static parse(data: string): Map<string, CurrencyData> {
        const currenciesData = new Map<string, CurrencyData>();
        const parsedCurrencyData = Papa.parse<Array<string>>(data, {
            header: false,
            delimiter: '|',
            dynamicTyping: true,
            skipEmptyLines: true,
        }).data;

        parsedCurrencyData.slice(2).forEach((currencyData): void => {
            currenciesData.set(currencyData[3], {
                country: currencyData[0],
                name: currencyData[1],
                amount: Number(currencyData[2]),
                code: currencyData[3],
                rate: Number(currencyData[4]),
            });
        });

        return currenciesData;
    }
}
