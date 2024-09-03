import "./../styles.css";
import {createRoot} from "react-dom/client";
import React, {useState} from "react";
import CurrencyPickerList from "./CurrencyPickerList";
import CurrencyPickerDropdown from "./CurrencyPickerDropdown";
import AmountInput from "./AmountInput";
import CurrencyData from "./../types/CurrencyData";
import RateCalculator from "./../RateCalculator";
import NumberFormatter from "../NumberFormatter";
import {QueryClient, useQuery} from "@tanstack/react-query";
import {createSyncStoragePersister} from "@tanstack/query-sync-storage-persister";
import {PersistQueryClientProvider} from "@tanstack/react-query-persist-client";
import DateTimeFactory from "../DateTimeFactory";
import CnbDataParser from "../CnbDataParser";

const dateTimeFactory = new DateTimeFactory();
const cnbQueryClient = new QueryClient();
const cndDataPersister = createSyncStoragePersister({
    storage: window.localStorage,
})

const CurrencyConverter = () => {
    const [selectedCurrency, selectCurrency] = useState<CurrencyData|undefined>(undefined);
    const [currentAmount, setAmount] = useState<number>(0);
    const { isPending, error, data, isFetching } = useQuery({
        queryKey: ['cndRatesData', dateTimeFactory.getDateFormatted()],
        queryFn: async () => {
            const response = await fetch(
                'https://api.allorigins.win/raw?url=https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt?date=' + dateTimeFactory.getDateFormatted(),
            )
            return await response.text()
        },
        staleTime: 1 * 60 * 60 * 1000 // 1 hour,
    })

    if (isPending || isFetching) {
        return (<div className="bg-blue-500 p-4 rounded">Loading...</div>);
    }

    if (error) {
        return (<div className="bg-red-500 p-4 rounded">An error has occurred: {error.message}</div>);
    }

    const availableCurrencies = CnbDataParser.parse(data);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-stone-800/75 rounded-lg p-6">
                <AmountInput amount={currentAmount} onAmountChange={setAmount}/>
                <CurrencyPickerDropdown
                    onSelect={selectCurrency}
                    availableCurrencies={availableCurrencies}
                    selectedCurrency={selectedCurrency}
                />

                {selectedCurrency && currentAmount !== 0 &&
                    <div className="bg-orange-500/75 rounded-lg p-4 text-center text-white text-xl my-4 font-bold">
                        {NumberFormatter.formatPrice(RateCalculator.calc(currentAmount, selectedCurrency), selectedCurrency.code)}
                    </div>}
            </div>
            <div className="bg-stone-800/75 rounded-lg p-6">
                <CurrencyPickerList
                    onSelect={selectCurrency}
                    availableCurrencies={availableCurrencies}
                    selectedCurrency={selectedCurrency}
                />
            </div>
        </div>
    );
}

document.body.innerHTML = '<div id="app" class="container mx-auto py-5"></div>';
createRoot(document.getElementById('app') as HTMLElement).render(
    <React.StrictMode>
        <PersistQueryClientProvider client={cnbQueryClient} persistOptions={{persister: cndDataPersister}}>
            <CurrencyConverter/>
        </PersistQueryClientProvider>
    </React.StrictMode>
);

