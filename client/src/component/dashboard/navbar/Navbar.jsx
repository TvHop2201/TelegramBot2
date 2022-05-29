import React from 'react'

const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-light mx-5">
                <h1 className="navbar-brand mx-auto font-weight-bold ">
                    <img src="https://www.seekpng.com/png/detail/237-2372802_telegram-logo-png-transparent-telegram-logo-telegram-icon.png" className='navbar-brand' width='50px' />
                    Telegram ChatBot
                </h1>
            </nav>
            <hr className='shadow-lg mx-5' />
        </div>
    )
}

export default Navbar