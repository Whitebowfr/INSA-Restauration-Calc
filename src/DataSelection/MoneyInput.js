import * as React from "react"
import { TextField, Box, InputAdornment } from "@mui/material"

export default function MoneyInput({ handleChange }) {
    const [currentMenu, changeMenu] = React.useState('5*')

    const handleMenuChange = (e) => {
        changeMenu(e.target.value)
    }

    return (<Box 
    autoComplete="off" sx={{
        marginBottom: 1
    }}>
        <TextField 
            fullWidth
            label="Quantité d'argent restante" 
            variant="outlined" 
            required
            onChange={handleChange}
            type="number"
            InputProps={{
                endAdornment: <InputAdornment position="end">€</InputAdornment>
            }}/>
    </Box>)
}