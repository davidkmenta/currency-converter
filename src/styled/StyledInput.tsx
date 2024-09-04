import tw from "tailwind-styled-components";

const StyledInput = tw.input<{$isValid: boolean}>`
    w-full
    rounded
    p-3
    mt-4
    bg-neutral-800
    text-lg
    text-white
    text-center
    outline-none
    border-2
    ${(props) => props.$isValid ? 'border-green-500' : 'border-gray-500'}
`;

export { StyledInput };
