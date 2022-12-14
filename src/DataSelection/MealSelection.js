import * as React from "react"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Paper } from "@mui/material"
import { getDaysTillEndOfMonth, isAWeekDay, hasHourPassed } from "../utils/calendar"
import useLocalStorage from "../utils/localStorage"

const rows = [
    "Petit déjeuner",
    "Déjeuner",
    "Dîner"
]

export default function MealSelection({ handleChange, menuSelected, vacations, hours }) {
    const [selected, setSelected] = useLocalStorage("mealSelected", {
        "Petit déjeuner": [false, false, false],
        "Déjeuner": [false, false, false],
        "Dîner": [false, false, false]
    })

    const onSecondaryChange = (event, type, date) => {
        let sel = { ...selected }
        switch (date) {
            case 'all':
                const setAllTo = event.target.checked
                sel[type] = sel[type].map(x => setAllTo)
                break;
            case 'week':
                sel[type][1] = event.target.checked
                break;
            case 'we':
                sel[type][2] = event.target.checked
                break;
            default:
                console.error("Type not found : " + date)
                break;
        }
        if (sel[type][1] === sel[type][2]) {
            sel[type][0] = sel[type][1]
        }

        calculateMeals(sel, hours)
        setSelected(sel)
    }

    React.useEffect(() => {
        calculateMeals(selected, hours)
    }, [vacations, selected, hours])

    const calculateMeals = (sel, hours) => {
        let total = [0, 0]
        let weekDays = getDaysTillEndOfMonth('week', vacations)
        let weekEndDays = getDaysTillEndOfMonth('we', vacations)

        if (sel["Petit déjeuner"][1]) total[0] += weekDays
        if (sel["Petit déjeuner"][2]) total[0] += weekEndDays

        if (sel["Déjeuner"][1]) total[1] += weekDays
        if (sel["Déjeuner"][2]) total[1] += weekEndDays
        if (hours && !hours.disabled && !hasHourPassed(new Date(), hours.breakfast) 
            && ((isAWeekDay(new Date()) && sel["Déjeuner"][1]) 
                || (!isAWeekDay(new Date()) && sel["Déjeuner"][2])
               )) {
            total[1] += 1
        }

        if (sel["Dîner"][1]) total[1] += weekDays
        if (sel["Dîner"][2]) total[1] += weekEndDays / 2

        if (hours && !hours.disabled && !hasHourPassed(new Date(), hours.diner) 
            && ((isAWeekDay(new Date()) && sel["Dîner"][1]) 
            || (!isAWeekDay(new Date()) && sel["Dîner"][2])
            )) {
            total[1] += 1
        }
        handleChange(total)
    }

    return (<TableContainer component={Paper}>
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Semaine entière (7J)</TableCell>
                    <TableCell>Semaine de cours (5J)</TableCell>
                    <TableCell>Week-End (2J)</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map(x => (
                    <TableRow key={x}>
                        <TableCell>{x}</TableCell>
                        <TableCell><Checkbox checked={selected[x][0]} onChange={e => onSecondaryChange(e, x, 'all')} /></TableCell>
                        <TableCell><Checkbox checked={selected[x][1]} onChange={e => onSecondaryChange(e, x, 'week')} /></TableCell>
                        <TableCell><Checkbox checked={selected[x][2] && menuSelected !== '5'} disabled={menuSelected === '5'} onChange={e => onSecondaryChange(e, x, 'we')} /></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>)
}