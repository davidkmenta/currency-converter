import DateTimeFactory from "../../src/DateTimeFactory";

describe('DateTimeFactory', () => {
    it('should get formatted date', () => {
        const dateTimeFactory = new DateTimeFactory(new Date('2023-11-25T23:48:59+0200'));

        expect(dateTimeFactory.getDateFormatted()).toBe('25.11.2023');
    });

    it('should get formatted date with single digit numbers', () => {
        const dateTimeFactory = new DateTimeFactory(new Date('2024-01-01T01:01:01+0000'));

        expect(dateTimeFactory.getDateFormatted()).toBe('1.1.2024');
    });

    it('should get formatted now date', () => {
        const now = new Date();
        const dateTimeFactory = new DateTimeFactory();

        expect(dateTimeFactory.getDateFormatted()).toBe(`${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()}`);
    });
})
