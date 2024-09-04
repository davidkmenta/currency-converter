import React, {ReactElement} from "react";
import CurrencyData from "../types/CurrencyData";
import NumberFormatter from "../NumberFormatter";
import tw from "tailwind-styled-components";

interface CurrencyPickerListProps {
    availableCurrencies: Map<string, CurrencyData>;
    onSelect: (currency: CurrencyData|undefined) => void;
    selectedCurrency: CurrencyData|undefined;
}

const StyledCurrencyPickerList = tw.div<{$isSelected: boolean}>`
    flex
    w-full
    items-center
    justify-between
    rounded-lg
    p-4
    my-4
    border-2
    ${(props) => props.$isSelected ? 'border-green-500' : 'border-gray-500'}
`

const CurrencyPickerList = ({availableCurrencies, onSelect, selectedCurrency}: CurrencyPickerListProps) => {
    const currencyPickerListItems: Array<ReactElement> = [];

    availableCurrencies.forEach((currency) => {
        const isSelected = selectedCurrency?.code === currency.code;

        currencyPickerListItems.push(
            <StyledCurrencyPickerList $isSelected={isSelected} onClick={() => onSelect(currency)}>
                <div className="text-md/6">
                    <p className="font-semibold text-white">{currency.country}</p>
                    <div className="flex gap-2 text-white/50">
                        <div>{currency.amount} {currency.code}</div>
                        <div aria-hidden="true">&middot;</div>
                        <div>{NumberFormatter.formatPrice(currency.rate)}</div>
                        <div aria-hidden="true">&middot;</div>
                        <div>{currency.name}</div>
                    </div>
                </div>
                <input type="radio" className="size-5 fill-white transition opacity-100" checked={isSelected}/>
            </StyledCurrencyPickerList>
        )
    });

    return (
        <div>
            <h2 className="text-xl text-white font-bold">Currencies list</h2>
            {currencyPickerListItems}
        </div>
    );
}

export default CurrencyPickerList;
