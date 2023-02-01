import * as React from "react"
import { Divider, Paper, TextField, Checkbox, FormControlLabel } from "@mui/material"
import useLocalStorage from "../utils/localStorage"
export default function HoursSelection({ callback }) {
    const [breakfastVal, setBreakFastVal] = React.useState(JSON.parse(localStorage.getItem("hours"))?.breakfast ?? "12:15")
    const [dinerVal, setDinerVal] = React.useState(JSON.parse(localStorage.getItem("hours"))?.diner ?? "18:15")
    const [disabledTextField, setDisabled] = useLocalStorage("countToday", false)

    React.useEffect(() => {
        if (dinerVal && breakfastVal) {
            callback({
                diner: dinerVal,
                breakfast: breakfastVal,
                disabled: disabledTextField
            })
        }
    }, [breakfastVal, dinerVal, disabledTextField])

    return (<Paper elevation={12} sx={{padding: 1}}>
        <FormControlLabel label="Compter les repas d'aujourd'ui" control={<Checkbox onChange={e => {
            if (!e.target.checked) {
                setDisabled(true)
            } else {
                setDisabled(false)
            }
        }} checked={!disabledTextField} />}/>

        <TextField 
            type="time"
            label="Heure du déjeuner"
            InputLabelProps={{
                shrink: true
            }}
            inputProps={{
                step: 300
            }}
            value={breakfastVal}
            onChange={(e) => setBreakFastVal(e.target.value)}
            sx={{width: 150, display: "inline-flex"}}
            disabled={disabledTextField}
        />
        <Divider orientation="vertical" flexItem sx={{marginLeft: 1, marginRight: 1, display: "inline-flex"}} />
        <TextField 
            type="time"
            label="Heure du dîner"
            value={dinerVal}
            InputLabelProps={{
                shrink: true
            }}
            inputProps={{
                step: 300
            }}
            onChange={(e) => setDinerVal(e.target.value)}
            sx={{width: 150, display: "inline-flex"}}
            disabled={disabledTextField}
        />
    </Paper>)
}