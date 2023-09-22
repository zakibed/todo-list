import format from 'date-fns/format';
import addDays from 'date-fns/addDays';
import getYear from 'date-fns/getYear';
import differenceInYears from 'date-fns/differenceInYears';
import isValid from 'date-fns/isValid';
import isYesterday from 'date-fns/isYesterday';
import isToday from 'date-fns/isToday';
import isTomorrow from 'date-fns/isTomorrow';
import isSunday from 'date-fns/isSunday';
import isMonday from 'date-fns/isMonday';
import isTuesday from 'date-fns/isTuesday';
import isWednesday from 'date-fns/isWednesday';
import isThursday from 'date-fns/isThursday';
import isFriday from 'date-fns/isFriday';
import isSaturday from 'date-fns/isSaturday';

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
    if (isToday(dueDate)) return 'Today';
    if (isTomorrow(dueDate)) return 'Tomorrow';

    if (dueDate <= addDays(currentDate, 7) && dueDate >= currentDate) {
        if (isSunday(dueDate)) return 'Sunday';
        if (isMonday(dueDate)) return 'Monday';
        if (isTuesday(dueDate)) return 'Tuesday';
        if (isWednesday(dueDate)) return 'Wednesday';
        if (isThursday(dueDate)) return 'Thursday';
        if (isFriday(dueDate)) return 'Friday';
        if (isSaturday(dueDate)) return 'Saturday';
    }

    return format(dueDate, 'd MMM');
}

export default formatDueDate;
