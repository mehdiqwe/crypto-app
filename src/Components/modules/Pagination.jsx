import Styles from "./Pagination.module.css"

function Pagination({page, setPage}) {

    const previousHandler = () => {
        if(page <= 1) return
        setPage(page => page - 1)
    }

    const nextHandler = () => {
        if(page >= 10) return
        setPage(page => page + 1)
    }

  return (
    <div className={Styles.pagination}>
        <button className={page === 1 ? Styles.disabled : null} onClick={previousHandler}>previous</button>
        <p onClick={() => setPage(1)} className={page === 1 ? Styles.selected : null}>1</p>
        <p onClick={() => setPage(2)} className={page === 2 ? Styles.selected : null}>2</p>
        {page > 2 && page < 9 && (
            <>
                <span>...</span>
                <p className={Styles.selected}>{page}</p>
            </>
        )}
        <span>...</span>
        <p onClick={() => setPage(9)} className={page === 9 ? Styles.selected : null}>9</p>
        <p onClick={() => setPage(10)} className={page === 10 ? Styles.selected : null}>10</p>
        <button className={page === 10 ? Styles.disabled : null} onClick={nextHandler}>next</button>
    </div>
  )
}

export default Pagination