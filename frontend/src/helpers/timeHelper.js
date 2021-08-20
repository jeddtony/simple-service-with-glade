import moment from 'moment';

export function getCurrentDate() {
    return moment.now();
}

export function formatDate(date) {
    return moment(date).format('MMM-Do-YY');
}

export function formatDateAndTime(date) {
    return moment(date).format(" MMMM Do YYYY HH:mm:ss");
}

export function getDuration(date) {
    return moment(date).fromNow();
}