import * as React from "react"
import { Button, Dialog, Paper, DialogTitle, DialogContent, DialogContentText } from "@mui/material" 

export default function About() {
    const [open, setOpen] = React.useState(false)

    return (<React.Fragment>
        <Paper elevation={10} sx={{
            padding: 1
        }}>
            <Button variant="contained" onClick={() => setOpen(true)}>A propos</Button>
        </Paper>
        <Dialog open={open} onClose={() => setOpen(false)}>

        </Dialog>
    </React.Fragment>)
}