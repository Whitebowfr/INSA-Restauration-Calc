import * as React from "react"
import DataSelection from "./DataSelection/DataSelection";
import DataDisplay from "./DataDisplay/DataDisplay";
import { createTheme, ThemeProvider, Divider } from '@mui/material';
import { getDejPrice, getMealPrice } from "./utils/pricesCalc";
import About from "./About/about";
import useLocalStorage from "./utils/localStorage";
import HoursSelection from "./DataSelection/HoursSelection";

function App() {
  const darktheme = createTheme({
    palette: {
      mode: "dark",
    }
  })

  const [menu, setMenu] = useLocalStorage("menu", "5*")
  const [money, setMoney] = useLocalStorage("money", 0)
  const [meals, setMeals] = useLocalStorage("meals", [0, 0])
  
  const [mealPrices, setMealPrices] = useLocalStorage("mealPrices", [])

  const [total, setTotal] = useLocalStorage("total", {
    price: 0,
    number: 0
  })
  const [remaining, setRemaining] = useLocalStorage("remaining", 0)

  const [hours, setHours] = useLocalStorage("hours", {diner: "18:15", breakfast: "12:15", disabled: false})

  React.useEffect(() => {
    setHours(hours)
  }, [])


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
      <DataSelection menuChange={setMenu} moneyChange={setMoney} mealsChange={setMeals} hours={hours} />
      <Divider sx={{margin: 1}} />
      <HoursSelection callback={setHours}/>
      <Divider sx={{margin: 1}} />
      <DataDisplay mealPrices={mealPrices} total={total} remaining={remaining} menu={menu}/>
      <Divider sx={{margin: 1}} />
      <About />
    </ThemeProvider>

    );
}

export default App;
