import React from 'react'
import './Admin.css'
import SideBar from './sideBar/SideBar'
import { Outlet } from 'react-router-dom';


const Home = () => {


    return (
        <>
            <div class="container-fluid">
                <div class="row">
                    <SideBar />

                    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 class="h2">Admin</h1>
                            <div class="btn-toolbar mb-2 mb-md-0">
                                <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle">
                                    Logout
                                </button>
                            </div>
                        </div>
                        <div>
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default Home