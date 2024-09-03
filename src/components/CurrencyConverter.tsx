import "./../styles.css";
import {createRoot} from "react-dom/client";
import React, {useState} from "react";
import CurrencyPickerList from "./CurrencyPickerList";
import CurrencyPickerDropdown from "./CurrencyPickerDropdown";
import AmountInput from "./AmountInput";
import CurrencyData from "./../types/CurrencyData";
import RateCalculator from "./../RateCalculator";
import NumberFormatter from "../NumberFormatter";

const availableCurrencies = new Map<string, CurrencyData>();
availableCurrencies.set('USD', {country: 'USA', amount: 1, rate: 22.123, code: 'USD', name: 'dollar'});
availableCurrencies.set('EUR', {country: 'EMU', amount: 1, rate: 25.05, code: 'EUR', name: 'euro'});
availableCurrencies.set('IDR', {country: 'Indonesia', amount: 1000, rate: 1.467, code: 'IDR', name: 'rupiah'});

const CurrencyConverter = () => {
    const [selectedCurrency, selectCurrency] = useState<CurrencyData|undefined>(undefined);
    const [currentAmount, setAmount] = useState<number>(0);

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
        <CurrencyConverter/>
    </React.StrictMode>
);

