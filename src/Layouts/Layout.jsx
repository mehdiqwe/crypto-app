import Styles from "./Layout.module.css"

function Layout({children}) {
  return (
    <>
        <header className={Styles.header}>
            <h1>Crypto App</h1>
            <a href="https://botostart.ir">Botostart</a>
        </header>
        {children}
        <footer className={Styles.footer}>
            <p>Developed By Mhd with love</p>
        </footer>
    </>
  )
}

export default Layout