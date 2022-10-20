import * as React from "react"
import { Button, Dialog, Paper, DialogTitle, DialogContent, DialogContentText, Link } from "@mui/material" 

export default function About() {
    const [open, setOpen] = React.useState(false)

    return (<React.Fragment>
        <Paper elevation={10} sx={{
            padding: 1
        }}>
            <Button variant="contained" onClick={() => setOpen(true)}>A propos</Button>
        </Paper>
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>A Propos</DialogTitle>
            <DialogContent>
                <DialogContentText style={{whiteSpace: 'pre-line'}}>
                    Salut !<br/>
                    Si tu veux voir comment j'ai fait ce site, le code est ici : <Link target="_blank" rel="noopener" href="https://github.com/Whitebowfr/INSA-Restauration-Calc">INSA Restauration Calc (Github)</Link> <br/>
                    Hésite pas à faire une pull request si tu l'améliore (j'ai fait le site en 1 aprem pré-IE donc c'est bancal un peu)<br/>
                    <br/>
                    Si tu veux me poser une question ou juste discuter, contacte-moi via discord : Whitebow#0749<br/>
                    Pour des discussions plus sérieuses, mon mail insa est ouvert : <Link href="mailto:clementin.granier@insa-lyon.fr">clementin.granier@insa-lyon.fr</Link><br/>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    </React.Fragment>)
}