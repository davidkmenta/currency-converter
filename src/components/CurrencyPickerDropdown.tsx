import React, {ReactElement} from "react";
import CurrencyData from "../types/CurrencyData";

interface CurrencyPickerDropdownProps {
    availableCurrencies: Map<string, CurrencyData>;
    onSelect: (currency: CurrencyData|undefined) => void;
    selectedCurrency: CurrencyData|undefined;
}

const CurrencyPickerDropdown = ({availableCurrencies, onSelect, selectedCurrency}: CurrencyPickerDropdownProps) => {
    const currencyPickerDropdownItems: Array<ReactElement> = [];

    availableCurrencies.forEach((currency) => {
        currencyPickerDropdownItems.push(
            <option value={currency.code} selected={selectedCurrency?.code === currency.code}>{currency.code} – {currency.country}</option>
        );
    });

    return (
        <div>
            <select
                className={`text-white bg-neutral-800 rounded border-2 w-full text-lg p-3 text-center ${selectedCurrency ? 'border-green-500' : 'border-gray-500'}`}
                onChange={(event) => onSelect(availableCurrencies.get(event.currentTarget.value))}
            >
                <option value=''>- choose currency -</option>
                {currencyPickerDropdownItems}
            </select>
        </div>
    );
}

export default CurrencyPickerDropdown;
