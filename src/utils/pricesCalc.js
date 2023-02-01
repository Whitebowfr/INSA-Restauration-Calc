export function getDejPrice(menu) {
    switch (menu) {
        case '5/7':
            return 2.14
        case '5/7*':
            return 2.25
        case '7/7':
            return 1.87
        default:
            return 2.43
    }
}

export function getMealPrice(menu) {
    switch (menu) {
        case '5/7':
            return 4.23
        case '5/7*':
            return 4.47
        case '7/7':
            return 3.74
        default:
            return 4.81
    }
}

const menuData = {
    "5": [233.20,159.00,243.80,106.00,190.80,180.20,0.00,0.00,159.00,212.00,180.20,127.20],
    "5*": [246.18,167.85,257.37,111.90,201.42,190.23,0.00,0.00,167.85,223.80,190.23,134.28],
    "7": [251.72,170.81,260.71,125.86,206.77,188.79,0.00,0.00,161.82,233.74,188.79,134.85]
}
export function getTotalMoney(menu) {
    let currentMonth = new Date().getMonth()
    menu = menu.replaceAll('"', '')
    return menuData[menu][currentMonth] ?? 0
}