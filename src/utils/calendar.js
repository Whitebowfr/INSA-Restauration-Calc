/**
 * @param {"week"|"we"} type Permet de choisir si l'on veut le nombre de jours de semaine ou de week-end
 * @param {Boolean} includesVacations 
 * @returns {Number} (In)
 */
export function getDaysTillEndOfMonth(type, includesVacations) {
    let dateToday = new Date()
    dateToday.setDate(dateToday.getDate() + 1)
    let endDate = new Date(dateToday.getFullYear(), dateToday.getMonth() + 1, 0)
    endDate.setDate(endDate.getDate() + 1)
    let total = 0
    while (dateToday <= endDate) {
        if (dateToday.getDay() !== 0 && dateToday.getDay() !== 6) {
            if (type === "week") {
                total += (includesVacations ? 1 : !checkForVacation(dateToday))
            }
        } else if (type === "we") {
            total += (includesVacations ? 1 : !checkForVacation(dateToday))
        }
        dateToday.setDate(dateToday.getDate() + 1)
    }
    return total
}

// Les journées sont exclusives (ex. pour les vacances du 16 décembre, la journée du 16 est comptée comme ouvrée)
const vacations = [
    // Automne
    [1666994400000, 1667689200000],
    // Noel
    [1671231600000, 1672614000000],
    // Hiver
    [1676070000000, 1676761200000],
    // Printemps
    [1680904800000, 1682200800000],
    // Grandes vacances
    [1684533600000, 1694988000000]
]

/**
 * @param {Date} date La date à vérifier
 * @returns {Boolean} Si cette date est dans les vacances de l'INSA.
 */
export function checkForVacation(date) {
    let dateTimeStamp = date.getTime()
    let flag = false
    vacations.forEach(arr => {
        if (dateTimeStamp > arr[0] && dateTimeStamp < arr[1]) flag = true
    })
    return flag
}

/**
 * @param {Date} date Le jour à vérifier
 * @returns {Boolean} False si c'est un dimanche ou un samedi, True sinon.
 */
export function isAWeekDay(date) {
    return !(date.getDay() === 6 || date.getDay() === 1)
}

/**
 * @param {Date|String} date La date actuelle, à comparer avec l'heure
 * @param {String} hour L'heure de référence, au format HH:mm
 * @returns {Boolean}
 */
export function hasHourPassed(date, hour) {
    let datee = new Date(date)
    if (datee.getHours() > parseInt(hour.split(":")[0])) {
        return true
    } else if (datee.getHours() === parseInt(hour.split(":")[0]) && datee.getMinutes() > parseInt(hour.split(":")[1])) {
       return true
   } else {
       return false
   }
}