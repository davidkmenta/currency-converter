import tw from "tailwind-styled-components";

enum StyledFlashMessageType {
    INFO = 'bg-blue-500',
    ERROR = 'bg-red-500',
}

const StyledFlashMessage = tw.div<{$type: StyledFlashMessageType}>`
    rounded
    p-4
    ${(props) => props.$type}
`;

export {StyledFlashMessage, StyledFlashMessageType};
