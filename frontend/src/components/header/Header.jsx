import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header>
        <div className="container">
            <nav className="menu">
                <ul className="links">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/gameList">Games</NavLink></li>
                    <li><NavLink to="/developers">Developers</NavLink></li>
                    <li><NavLink to="/categories">Categories</NavLink></li>
                </ul>
            </nav>
        </div>
    </header>
  )
}

export default Header