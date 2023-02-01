import * as React from "react"
import { TextField, Box, InputAdornment, IconButton, Icon } from "@mui/material"
import CancelIcon from '@mui/icons-material/Cancel';
import { getTotalMoney } from "../utils/pricesCalc"
import useLocalStorage from "../utils/localStorage"

export default function MoneyInput({ handleChange, menu }) {
    const [money, setMoney] = useLocalStorage("money", 0)
    const [hasChanged, setChange] = React.useState(false)

    const handleMoneyChange = (e) => {
        setMoney(e.target.value)
        handleChange(e.target.value)
        setChange(true)
    }

    React.useEffect(() => {
        if ((!money && menu) || !hasChanged && !localStorage.getItem("money")) {
            setMoney(getTotalMoney(menu))
            handleChange(getTotalMoney(menu))
        }
        if (!money && menu) setChange(false)
    }, [menu])

    const clearMoney = () => {
        setMoney("")
        handleChange("")
    }

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
            placeholder={getTotalMoney(menu).toString()}
            value={money}
            type="number"
            InputProps={{
                endAdornment: <React.Fragment>
                                <InputAdornment position="end">€</InputAdornment>
                                <IconButton onClick={clearMoney}>
                                    <CancelIcon/>
                                </IconButton>
                            </React.Fragment>
            }}
            
            />
    </Box>)
}