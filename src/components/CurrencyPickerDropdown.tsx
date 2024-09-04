import React, {ReactElement} from "react";
import CurrencyData from "../types/CurrencyData";
import {StyledInput} from "../styled/StyledInput";

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
            <StyledInput
                $as="select"
                $isValid={selectedCurrency !== undefined}
                onChange={(event) => onSelect(availableCurrencies.get(event.currentTarget.value))}
            >
                <option value="">- choose currency -</option>
                {currencyPickerDropdownItems}
            </StyledInput>
        </div>
    );
}

export default CurrencyPickerDropdown;
