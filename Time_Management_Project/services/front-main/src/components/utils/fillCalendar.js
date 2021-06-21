function getAllDatesOnCalendar() {
    return document.querySelectorAll('.react-calendar__month-view__days__day')
}

function takeValidDateFromCalendarString(calString) {
    const [day, month, year] = calString.split(' ')

    let monthNumber

    if(/январ/.test(month))
        monthNumber = '1'
    if(/февр/.test(month))
        monthNumber = '2'
    if(/март/.test(month))
        monthNumber = '3'
    if(/апрел/.test(month))
        monthNumber = '4'
    if(/ма[йя]/.test(month))
        monthNumber = '5'
    if(/июн/.test(month))
        monthNumber = '6'
    if(/июл/.test(month))
        monthNumber = '7'
    if(/август/.test(month))
        monthNumber = '8'
    if(/сентяб/.test(month))
        monthNumber = '9'
    if(/октябр/.test(month))
        monthNumber = '10'
    if(/ноябр/.test(month))
        monthNumber = '11'
    if(/декабр/.test(month))
        monthNumber = '12'

    return `${year}-${monthNumber}-${day}`
}

export function fillCalendarStyles(remoteArray) {
    const dates = getAllDatesOnCalendar()

    for(let d of dates) {
        const elementDateData = d.querySelector('abbr').ariaLabel
        const normalDateString = takeValidDateFromCalendarString(elementDateData)

        const elementsWithTheSameData = remoteArray.filter(elem => elem.date === normalDateString)
        let classes = new Set()

        for(let elem of elementsWithTheSameData) {
            for(let fl of elem.flags) {
                if(fl === 0)
                    classes.add('gray_date')
                if(fl === 1)
                    classes.add('green_date')
                if(fl === 2)
                    classes.add('red_date')
            }
        }

        for(let cl of classes.values()) {
            d.classList.add(cl)
        }
    }
}

export function clearCalendarStyles() {
    const dates = getAllDatesOnCalendar()
    for(let d of dates) {
        d.classList.remove('gray_date')
        d.classList.remove('green_date')
        d.classList.remove('red_date')
    }
}