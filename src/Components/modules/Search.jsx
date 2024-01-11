import { useEffect, useState } from "react"
import { RotatingLines } from  'react-loader-spinner'

import {searchCoin} from "../../services/cryptoApi"

import Styles from "./Search.module.css"

function Search({currency, setCurrency}) {
  const [text, setText] = useState("")
  const [coins, setCoins] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    const controller = new AbortController()
    
    setCoins([])
    if(!text) {
      setIsLoading(false)
      return
    }
    
    const getSearchData = async () => {
      try {
        const res = await fetch(searchCoin(text), {signal: controller.signal})
        const json = await res.json()
        if(json.coins) {
          setCoins(json.coins)
          setIsLoading(false) 
        } else {
          alert(json.status.error.message)
        }
      } catch (error) {
        if(error.name !== "AbortError") {
          alert(error.message)
        }
      }
    }
    
    setIsLoading(true)
    getSearchData()

    return () => {
      controller.abort()
    }
  }, [text])

  return (
    <div className={Styles.searchBox}>
        <input type="text" value={text} placeholder="Search" onChange={e => setText(e.target.value)}/>
        <select value={currency} onChange={e => setCurrency(e.target.value)}>
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="jpy">JPY</option>
        </select>
        {(!!coins.length || isLoading) && (
        <div className={Styles.searchResult}>
          {isLoading && <RotatingLines 
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="50"
            visible={true}/>
          }
          <ul>
            {coins.map(coin => 
              <li key={coin.id}>
                <img src={coin.thumb} alt={coin.name} />
                <p>{coin.name}</p>
              </li>
            )}
          </ul>
        </div>)}
    </div>
  )
}

export default Search