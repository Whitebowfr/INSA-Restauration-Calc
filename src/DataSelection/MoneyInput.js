import * as React from "react"
import { TextField, Box, InputAdornment } from "@mui/material"
import { getTotalMoney } from "../utils/pricesCalc"

export default function MoneyInput({ handleChange, menu }) {
    const [money, setMoney] = React.useState(0)
    const [hasChanged, setChange] = React.useState(false)

    const handleMoneyChange = (e) => {
        setMoney(e.target.value)
        handleChange(e.target.value)
        setChange(true)
    }

    React.useEffect(() => {
        if ((!money && menu) || !hasChanged) {
            setMoney(getTotalMoney(menu))
            handleChange(getTotalMoney(menu))
        }
        if (!money && menu) setChange(false)
    }, [menu])

    return (<Box 
    autoComplete="off" 
    component="form"
    noValidate
    sx={{
        marginBottom: 1
    }}>
        <TextField 
            fullWidth
            label="Quantité d'argent restante" 
            onChange={handleMoneyChange}
            value={money}
            type="number"
            InputProps={{
                 endAdornment: <InputAdornment position="end">€</InputAdornment>
            }}
            />
    </Box>)
}