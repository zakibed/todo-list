import {
    format,
    addDays,
    getYear,
    differenceInYears,
    isValid,
    isYesterday,
    isToday,
    isTomorrow
} from 'date-fns';

function formatDueDate(dueDate) {
    if (!isValid(dueDate)) return '';

    const currentDate = new Date();

    if (getYear(dueDate) > getYear(currentDate)) {
        const diff = differenceInYears(dueDate, currentDate);

        return diff <= 1 ? 'Next Year' : `In ${diff} Years`;
    }

    if (getYear(dueDate) < getYear(currentDate)) {
        const diff = differenceInYears(currentDate, dueDate);

        return diff <= 1 ? 'Last Year' : `${diff} Years Ago`;
    }

    if (isYesterday(dueDate)) return 'Yesterday';
    if (isTomorrow(dueDate)) return 'Tomorrow';
    if (isToday(dueDate)) return 'Today';

    if (dueDate <= addDays(currentDate, 7) && dueDate >= currentDate) {
        return format(dueDate, 'EEEE');
    }

    return format(dueDate, 'd MMM');
}

export default formatDueDate;
