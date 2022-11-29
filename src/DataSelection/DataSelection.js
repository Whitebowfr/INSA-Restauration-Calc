import * as React from "react"
import { Paper } from "@mui/material"
import MenuSelect from "./MenuSelection"
import MoneyInput from "./MoneyInput"
import MealSelection from "./MealSelection"
import useLocalStorage from "../utils/localStorage"

export default function DataSelection({ menuChange, mealsChange, moneyChange, hours }) {
    const [currentMenu, changeMenu] = React.useState(localStorage.getItem("menu") ?? "5*")
    const [vacations, setVacations] = useLocalStorage("vacations", false)

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
        <MealSelection handleChange={handleMealChange} menuSelected={currentMenu} vacations={vacations} hours={hours}/>
    </Paper>)
}