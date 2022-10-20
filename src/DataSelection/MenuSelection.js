import * as React from "react"
import { Select, InputLabel, MenuItem, FormControl, Box } from "@mui/material"
import { Checkbox, FormControlLabel } from "@mui/material"

export default function MenuSelect({ handleChange, handleVacChange }) {
    return (<React.Fragment>
        <Box sx={{
            width: 0.4,
            marginBottom: 1,
            display: "inline-block"
        }}>
            <FormControl fullWidth>
                <InputLabel id="menu-selection-label">Menu</InputLabel>
                <Select
                    labelId="menu-selection-label"
                    id="menu-selection"
                    label="Menu"
                    onChange={handleChange}
                    defaultValue="5*"
                >
                    <MenuItem value={"5"}>5/7</MenuItem>
                    <MenuItem value={"5*"}>5/7 Liberté</MenuItem>
                    <MenuItem value={"7"}>7/7</MenuItem>
                </Select>
            </FormControl>
        </Box>
        <Box sx={{
            display: 'inline',
            marginLeft: 1
        }}>
            <FormControlLabel label="Inclure les vacances" control={<Checkbox onChange={e => handleVacChange(e.target.checked)} />}/>
            
        </Box>
    </React.Fragment>)
}