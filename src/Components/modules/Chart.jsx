import { useState } from "react"
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { convertData } from "../../helpers/convertData"

import Styles from "./Chart.module.css"

function Chart({chart, setChart, currency}) {
    const [type, setType] = useState("prices")

    const typeHandler = (e) => {
        if(e.target.tagName === "BUTTON") {
            const type = e.target.innerText.toLowerCase().replace(" ", "_")
            setType(type)
        }
    }

  return (
    <div className={Styles.container}>
        <span className={Styles.cross} onClick={() => setChart(null)}>X</span>
        <div className={Styles.chart}>
            <div className={Styles.name}>
                <img src={chart.coin.image} alt={chart.coin.name}/>
                <p>{chart.coin.name}</p>
            </div>
            <div className={Styles.graph}>
                <ChartComponent data={convertData(chart, type)} type={type}/>
            </div>
            <div className={Styles.types} onClick={typeHandler}>
                <button className={type === "prices" ? Styles.selected : null}>Prices</button>
                <button className={type === "market_caps" ? Styles.selected : null}>Market Caps</button>
                <button className={type === "total_volumes" ? Styles.selected : null}>Total Volumes</button>
            </div>
            <div className={Styles.details}>
                <div>
                    <p>Prices:</p>
                    <span>{currency === "usd" && "$"}{currency === "eur" && "€"}{currency === "jpy" && "¥"}{chart.coin.current_price.toLocaleString()}</span>
                </div>
                <div>
                    <p>ATH:</p>
                    <span>{currency === "usd" && "$"}{currency === "eur" && "€"}{currency === "jpy" && "¥"}{chart.coin.ath.toLocaleString()}</span>
                </div>
                <div>
                    <p>Market Cap:</p>
                    <span>{currency === "usd" && "$"}{currency === "eur" && "€"}{currency === "jpy" && "¥"}{chart.coin.market_cap.toLocaleString()}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Chart

const ChartComponent = ({data, type}) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart width="400px" height="400px" data={data}>
                <Line Line type="monotone" dataKey={type} stroke="#3874ff" strokeWidth="2px"/>
                <CartesianGrid stroke="#404042"/>
                <YAxis dataKey={type} domain={["auto", "auto"]}/>
                <XAxis dataKey="date" hide/>
                <Legend />
                <Tooltip />
            </LineChart>
        </ResponsiveContainer>
    )
}