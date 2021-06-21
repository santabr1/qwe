// Форматирование даты
export function dateStringFormat(stringDate) {
    const date = new Date(stringDate)

    const formatter = new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "long",
        day: "numeric"
    })

    return formatter.format(date)
}

export function timeStringFormat(stringDate) {
    const date = new Date(stringDate)

    const formatter = new Intl.DateTimeFormat("en", {
        hour: "numeric",
        minute: "numeric"
    })
    return formatter.format(date)
}

// Форматирование даты и времени
export function dateTimeStringFormat(stringDateTime) {
    const date = new Date(stringDateTime)

    const formatter = new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour12: false,
        hour: "numeric",
        minute: "numeric"
    })

    return formatter.format(date)
}

export function dateToDateString(date) {
    const formatYear = date.getFullYear()
    const formatMonth = `${date.getMonth() + 1}`.length < 2
        ? `0${date.getMonth() + 1}`
        : `${date.getMonth() + 1}`
    const formatDay = `${date.getUTCDate() + 1}`.length < 2
        ? `0${date.getUTCDate() + 1}`
        : `${date.getUTCDate() + 1}`

    return `${formatYear}-${formatMonth}-${formatDay}`
}

export function dateToDateStringWithoutPlus(date) {
    const formatYear = date.getFullYear()
    const formatMonth = `${date.getMonth() + 1}`.length < 2
        ? `0${date.getMonth() + 1}`
        : `${date.getMonth() + 1}`
    const formatDay = `${date.getUTCDate()}`.length < 2
        ? `0${date.getUTCDate()}`
        : `${date.getUTCDate()}`

    return `${formatYear}-${formatMonth}-${formatDay}`
}