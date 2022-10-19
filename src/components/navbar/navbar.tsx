import { useEffect } from "react";
import $ from 'jquery';

const Navbar = ()=>{

    useEffect(() => {
        $(window).on('scroll', function (e) {
            if ($(this).scrollTop()! > 1) {
                $('.smooth-navbar').addClass('active')
            }
            else {
                $('.smooth-navbar').removeClass('active')
            }
        });
    }, [])

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