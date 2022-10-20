import { getDejPrice, getMealPrice } from "./pricesCalc"

const data = [
    {
        price: 1.87,
        label: "Acheter X cookies"
    },
    {
        price: 1.40,
        label: "Acheter X cannettes"
    },
    {
        price: 4,
        label: "Acheter X croque-monsieurs/paninis"
    },
    {
        price: "dej",
        label: "Aller X fois au point A"
    },
    {
        price: "meal",
        label: "Doubler X fois au RI"
    }
]

export function getOFPossibilitesAsList(remaining, menu, isGoingToPtA) {
    let returnString = "\n"
    data.forEach(x => {
        let amount = 0
        if (typeof(x.price) === "number") {
            amount = Math.floor(remaining / x.price)
        } else {
            amount = Math.floor(remaining / (x.price === "dej" ? getDejPrice(menu) : getMealPrice(menu)))
        }
        if (amount > 0 && (!isGoingToPtA || x.price !== "dej")) {
            returnString += "- " + x.label.replace('X', amount) + "\n"
        }
    })
    return returnString
}


export function getNEGPossibilitesAsList(remaining, menu, dejNumber) {
    let returnString = "\n"
    let missing = Math.abs(remaining)
    if (dejNumber > 0) {
        let dejAmount = Math.ceil(missing / getDejPrice(menu))
        if (dejAmount > dejNumber) {
            let stillMissing = (dejAmount - dejNumber) * getDejPrice(menu)
            let mealAmount = Math.ceil(stillMissing / getMealPrice(menu))
            returnString += " - Ne pas aller au point A du tout et ne pas aller au RI " + mealAmount + " fois (F)\n" 
        } else {
            returnString += "- Ne pas aller au point A " + dejAmount + " fois\n"
        }
    }
    let mealAmountB = Math.ceil(missing / getMealPrice(menu))
    returnString += "- Ne pas aller au RI " + mealAmountB + " fois"
    return returnString
}