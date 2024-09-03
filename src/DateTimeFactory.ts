export default class DateTimeFactory {
    private now: Date;

    constructor(now: Date|null = null) {
        this.now = now ?? new Date(new Date().toLocaleString('en', {timeZone: 'Europe/Prague'}));
    }

    getDateFormatted(): string {
        return `${this.now.getDate()}.${this.now.getMonth() + 1}.${this.now.getFullYear()}`;
    }
}
