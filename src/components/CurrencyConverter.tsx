import "./../styles.css";
import React, {useState} from "react";
import CurrencyPickerList from "./CurrencyPickerList";
import CurrencyPickerDropdown from "./CurrencyPickerDropdown";
import AmountInput from "./AmountInput";
import CurrencyData from "./../types/CurrencyData";
import RateCalculator from "./../RateCalculator";
import NumberFormatter from "../NumberFormatter";
import {useQuery} from "@tanstack/react-query";
import DateTimeFactory from "../DateTimeFactory";
import CnbDataParser from "../CnbDataParser";
import {StyledFlashMessage, StyledFlashMessageType} from "../styled/StyledFlashMessage";
import {StyledContent} from "../styled/StyledContent";

const CurrencyConverter = () => {
    const dateTimeFactory = new DateTimeFactory();
    const [selectedCurrency, selectCurrency] = useState<CurrencyData|undefined>(undefined);
    const [currentAmount, setAmount] = useState<number>(0);
    const { isPending, error, data, isFetching } = useQuery({
        queryKey: ['cndRatesData', dateTimeFactory.getDateFormatted()],
        queryFn: async () => {
            const response = await fetch(
                'https://api.allorigins.win/raw?url=https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt?date='
                + dateTimeFactory.getDateFormatted(),
            );

            return await response.text();
        },
        staleTime: 1 * 60 * 60 * 1000, // 1 hour; yep, it could be done less often
    })

    if (isPending || isFetching) {
        return (<StyledFlashMessage $type={StyledFlashMessageType.INFO}>Loading...</StyledFlashMessage>);
    }

    if (error) {
        return (
            <StyledFlashMessage $type={StyledFlashMessageType.ERROR}>
                An error has occurred: {error.message}
            </StyledFlashMessage>
        );
    }

    const availableCurrencies = CnbDataParser.parse(data);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StyledContent>
                <AmountInput amount={currentAmount} onAmountChange={setAmount}/>
                <CurrencyPickerDropdown
                    onSelect={selectCurrency}
                    availableCurrencies={availableCurrencies}
                    selectedCurrency={selectedCurrency}
                />

                {selectedCurrency && currentAmount !== 0 &&
                    <div className="rounded-lg bg-orange-500/75 p-4 my-4 text-center text-white text-xl font-bold">
                        {NumberFormatter.formatPrice(
                            RateCalculator.calc(currentAmount, selectedCurrency),
                            selectedCurrency.code,
                        )}
                    </div>}
            </StyledContent>
            <StyledContent>
                <CurrencyPickerList
                    onSelect={selectCurrency}
                    availableCurrencies={availableCurrencies}
                    selectedCurrency={selectedCurrency}
                />
            </StyledContent>
        </div>
    );
}

export default CurrencyConverter;
