export function getDate(date_str: string): string {
    let date = new Date(date_str); //Из базы данных мы получаем дату как string, поэтому не можем напрямую читать из нее, необходимо преобразовать в Date.
    let day: number | string,
        month: number | string,
        year: number | string,
        hours: number | string,
        minutes: number | string,
        seconds: number | string;
        
    [day, month, year, hours, minutes, seconds] = [
        date.getDate(), date.getMonth() + 1, date.getFullYear(),
        date.getHours(), date.getMinutes(), date.getSeconds()
    ];

    day = (day < 10) ? "0" + day : day;
    month = ((month < 10) ? "0" + month : month);
    hours = ((hours < 10) ? "0" + hours : hours);
    minutes = ((minutes < 10) ? "0" + minutes : minutes);
    seconds = ((seconds < 10) ? "0" + seconds : seconds);

    return `${day}.${month}.${year}`;
}