import React, {useEffect, useRef, useState} from "react";
import {NumberFormatStyle, NumberInput} from "intl-number-input";

interface AmountInputProps {
    amount: number;
    onAmountChange: (amount: number) => void;
}

const AmountInput = ({amount, onAmountChange}: AmountInputProps) => {
    const [, setRefMounted] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    let numberInput: NumberInput | null = null;

    if (inputRef.current) {
        numberInput = new NumberInput({
            el: inputRef.current,
            options: {
                formatStyle: NumberFormatStyle.Currency,
                currency: 'CZK',
                precision: {
                    min: 0,
                    max: 3,
                },
            },
        });
    }

    useEffect(() => setRefMounted(true));

    return (
        <div>
            <h2 className="text-xl text-white font-bold">
                <label htmlFor="amount">How much CZK do you want to convert?</label>
            </h2>
            <input id="amount"
                   type="text"
                   ref={inputRef}
                   className={`text-white bg-neutral-800 rounded border-2 w-full text-lg p-3 text-center my-4 outline-none ${amount === 0 ? 'border-gray-500' : 'border-green-500'}`}
                   onInput={() => onAmountChange(numberInput?.getValue().number ?? 0)}/>
        </div>
    );
}

export default AmountInput;
