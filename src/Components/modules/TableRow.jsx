import chartUp from "../../assets/chart-up.svg"
import chartDown from "../../assets/chart-down.svg"

import { marketChart } from "../../services/cryptoApi"

import Styles from "./TableRow.module.css"


function TableRow({coin, currency, setChart}) {
  const {id, image, name, symbol, current_price, price_change_percentage_24h, total_volume} = coin

  const showHandler = async () => {
    try {
      const res = await fetch(marketChart(id, currency))
      const json = await res.json()
      setChart({...json, coin})
    } catch (error) {
      setChart(null)
    }
  }

  return (
    <tr>
        <td>
        <div className={Styles.symbol} onClick={showHandler}>
            <img src={image} alt={name} />
            <span>{symbol.toUpperCase()}</span>
        </div>
        </td>
        <td>{name}</td>
        <td>{currency === "usd" && "$" }{currency === "eur" && "€"}{currency === "jpy" && "¥"}{current_price.toLocaleString()}</td>
        <td className={price_change_percentage_24h > 0 ? Styles.success : Styles.error}>{price_change_percentage_24h.toFixed(2)}%</td>
        <td>{total_volume.toLocaleString()}</td>
        <td><img src={price_change_percentage_24h > 0 ? chartUp : chartDown} /></td>
    </tr>
  )
}

export default TableRow