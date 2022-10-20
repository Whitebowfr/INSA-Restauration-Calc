import * as React from "react"
import { Paper } from "@mui/material"
import MenuSelect from "./MenuSelection"
import MoneyInput from "./MoneyInput"
import MealSelection from "./MealSelection"

export default function DataSelection({ menuChange, mealsChange, moneyChange}) {
    const [currentMenu, changeMenu] = React.useState('5*')
    const [vacations, setVacations] = React.useState(false)

    const handleMenuChange = (e) => {
        changeMenu(e.target.value)
        menuChange(e.target.value)
    }
    
    const handleMoneyChange = (e) => {
        moneyChange(e)
    }

    const handleMealChange = (e) => {
        mealsChange(e)
    }

    return (<Paper elevation={12} sx={{ padding: 1 }}>
        <MenuSelect handleChange={handleMenuChange} handleVacChange={e => setVacations(e)} />
        <MoneyInput handleChange={handleMoneyChange} menu={currentMenu}/>
        <MealSelection handleChange={handleMealChange} menuSelected={currentMenu} vacations={vacations}/>
    </Paper>)
}