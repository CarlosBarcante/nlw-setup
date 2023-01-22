import dayjs from 'dayjs';

// generate dates from the beginning of the year until now
function datesFromYear() {
    const firstDay = dayjs().startOf('year');
    const lastDay = dayjs().endOf('year');

    const dates = [];
    let compareDate = firstDay;

    while (compareDate.isBefore(lastDay)) {
        dates.push(compareDate.toDate());
        compareDate = compareDate.add(1, 'day');
    }

    while (dates.length % 7) {
        dates.push(compareDate.toDate());
        compareDate = compareDate.add(1, 'day');
    }

    return dates;
}

export default datesFromYear;