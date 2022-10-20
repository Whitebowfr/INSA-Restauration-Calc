import * as React from "react"
import DataSelection from "./DataSelection/DataSelection";
import DataDisplay from "./DataDisplay/DataDisplay";
import { createTheme, ThemeProvider, Divider } from '@mui/material';
import { getDejPrice, getMealPrice } from "./utils/pricesCalc";
import About from "./About/about";

function App() {
  const darktheme = createTheme({
    palette: {
      mode: "dark",
    }
  })

  const [menu, setMenu] = React.useState('5*')
  const [money, setMoney] = React.useState(0)
  const [meals, setMeals] = React.useState([0, 0])
  
  const [mealPrices, setMealPrices] = React.useState([])

  const [total, setTotal] = React.useState({
    price: 0,
    number: 0
  })
  const [remaining, setRemaining] = React.useState(0)


  React.useEffect(() => {
    let dej = {
      label: "Petit déjeuners",
      number: meals[0],
      price: Math.round(meals[0] * getDejPrice(menu) * 100) / 100
    }

    let midi = {
      label: "Déjeuners/Dîners",
      number: meals[1],
      price: Math.round(meals[1] * getMealPrice(menu) * 100) / 100
    }

    setMealPrices([dej, midi])

    let total = {
      price: Math.round((midi.price + dej.price) * 100) / 100,
      number: midi.number + dej.number
    }

    setTotal(total)
    setRemaining((Math.round((money - total.price) * 100) / 100) || 0)
  }, [menu, money, meals])

  return (
    <ThemeProvider theme={darktheme}>
      <DataSelection menuChange={setMenu} moneyChange={setMoney} mealsChange={setMeals} />
      <Divider sx={{margin: 1}} />
      <DataDisplay mealPrices={mealPrices} total={total} remaining={remaining} menu={menu}/>
      <Divider sx={{margin: 1}} />
      <About />
    </ThemeProvider>

    );
}

export default App;
