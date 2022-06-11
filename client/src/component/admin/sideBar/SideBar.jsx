import React from 'react'
import { Link } from 'react-router-dom'
import gip from './gip.gif'
import './sidebar.css'

const SideBar = () => {
    return (
        <>
            <div className='sidebar_ok'>
                <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                    <div class="position-sticky pt-3">
                        <img src={gip} width='85%' className='mx-4 shadow avatar' />
                        <div className='admin_name shadow mx-4 font-bold mt-4 text-center shadow py-1'><h4>ADMIN</h4></div>
                        <ul class="nav flex-column my-4 sidebar_customer mx-4 py-4 shadow">
                            <li class="nav-item">
                                <Link to='' class="nav-link active text_nav" aria-current="page">
                                    <span data-feather="home" class="align-text-bottom"></span>
                                    Dashboard
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link to='user' class="nav-link" href="#">
                                    <span data-feather="file" class="align-text-bottom"></span>
                                    User
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link to='point' class="nav-link" href="#">
                                    <span data-feather="shopping-cart" class="align-text-bottom "></span>
                                    Point
                                </Link>
                            </li>

                        </ul>
                    </div>
                </nav>
            </div>

        </>
    )
}

export default SideBar