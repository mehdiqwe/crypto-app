import TableRow from "./TableRow"

import { RotatingLines } from  'react-loader-spinner'

import Styles from "./TableCoin.module.css"

function TableCoin({coins, isLoading, currency, setChart}) {
  return (
   <div className={Styles.container}>
    {isLoading ? (
      <RotatingLines 
      strokeColor="grey"
      strokeWidth="5"
      animationDuration="0.75"
      width="96"
      visible={true}/>
    ) : (
    <table className={Styles.table}>
      <thead>
        <tr>
          <th>Coin</th>
          <th>Name</th>
          <th>Price</th>
          <th>24h</th>
          <th>Total Volume</th>
        </tr>
      </thead>
      <tbody>
        {coins.map(coin => <TableRow key={coin.id} coin={coin} currency={currency} setChart={setChart}/>)}
      </tbody>
    </table>
   )}
   </div>
  )
}

export default TableCoin