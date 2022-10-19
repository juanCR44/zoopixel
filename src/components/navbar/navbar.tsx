

const Navbar = ()=>{
    return(
        <div className="smooth-navbar">
            <img className="navbar-logo" src="images/logobe.png" alt="" />
            
            <div className="anchor-container">
                <ul className="anchor-row">
                    <li><a className="anchor-link" href="/">Seccion A</a></li>
                    <li><a className="anchor-link" href="/">Seccion B</a></li>
                    <li><a className="anchor-link" href="/">Seccion C</a></li>
                    <li><a className="anchor-link" href="/">Seccion D</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;