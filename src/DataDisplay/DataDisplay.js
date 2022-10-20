import * as React from "react"
import { Paper, Table, TableCell, TableBody, TableHead, TableContainer, TableRow } from "@mui/material"
import {Typography} from "@mui/material"
import { getOFPossibilitesAsList, getNEGPossibilitesAsList } from "../utils/overflowcalc"

export default function DataDisplay({ mealPrices, total, remaining, menu }) {
    return (<Paper elevation={12} sx={{padding: 1}}>
        <TableContainer component={Paper} sx={{marginBottom: 1}}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Coût</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {mealPrices.map(x => (
                        <TableRow key={x.label}>
                            <TableCell>{x.label}</TableCell>
                            <TableCell>{x.number}</TableCell>
                            <TableCell>{x.price} €</TableCell>
                        </TableRow>
                    ))}
                    <TableRow sx={{ backgroundColor: '#000' }}>
                        <TableCell>TOTAL</TableCell>
                        <TableCell>{total.number}</TableCell>
                        <TableCell>{total.price} €</TableCell>
                    </TableRow>
                    <TableRow sx={{ backgroundColor: (remaining >= 0 ? '#0a0' : '#a00') }}>
                        <TableCell>Restant</TableCell>
                        <TableCell></TableCell>
                        <TableCell>{remaining} €</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        { remaining === 0 ? <></> :
        <Paper elevation={20} sx={{
            padding: 1
        }}>
            {remaining >= 0 ? <Typography variant="body1" style={{whiteSpace: "pre-line"}}>
                Vous avez {remaining} € restant. Avec cela, vous pouvez (au choix) :
                {getOFPossibilitesAsList(remaining, menu, mealPrices[0].number > 0)}
            </Typography> : <Typography variant="body1" style={{whiteSpace: 'pre-line'}}>
                    Il vous manque {Math.abs(remaining)} €. Il vous faudra (au choix) :
                    {getNEGPossibilitesAsList(remaining, menu, mealPrices[0].number > 0)}
                </Typography>}
        </Paper>
        }
    </Paper>)
}