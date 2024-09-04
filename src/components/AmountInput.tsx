import React, {useEffect, useRef, useState} from "react";
import {NumberFormatStyle, NumberInput} from "intl-number-input";
import {StyledInput} from "../styled/StyledInput";

interface AmountInputProps {
    amount: number;
    onAmountChange: (amount: number) => void;
}

const AmountInput = ({amount, onAmountChange}: AmountInputProps) => {
    const [, setRefMounted] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    if (inputRef.current) {
        new NumberInput({
            el: inputRef.current,
            options: {
                formatStyle: NumberFormatStyle.Currency,
                currency: 'CZK',
                precision: {
                    min: 0,
                    max: 3,
                },
            },
            onChange: (value) => onAmountChange(value.number ?? 0),
        });
    }

    useEffect(() => setRefMounted(true));

    return (
        <div>
            <h2 className="text-xl text-white font-bold">
                <label htmlFor="amount">How much CZK do you want to convert?</label>
            </h2>
            <StyledInput $isValid={amount > 0} id="amount" type="text" ref={inputRef} />
        </div>
    );
}

export default AmountInput;
