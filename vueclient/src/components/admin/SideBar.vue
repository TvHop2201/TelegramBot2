<template>
    <div class='sidebar_ok'>
        <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div class="position-sticky pt-3">
                <img src="../../assets/gip.gif" width='85%' class='mx-3 shadow avatar' />
                <div class='admin_name shadow mx-4 font-bold mt-4 text-center shadow py-1'><h4>ADMIN</h4></div>
                <ul class="nav flex-column my-4 sidebar_customer mx-4 py-4 shadow">
                    <li class="nav-item">
                        <router-link to='/admin' class="nav-link active text_nav" aria-current="page">
                            <span data-feather="home" class="align-text-bottom"></span>
                                Dashboard
                            </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to='/admin/user' class="nav-link" href="#">
                            <span data-feather="file" class="align-text-bottom"></span>
                                User
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to='/admin/point' class="nav-link" href="#">
                            <span data-feather="shopping-cart" class="align-text-bottom "></span>
                                Point
                        </router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>

.sidebar_customer {
    background-color: #d1d5db;
    border-radius: 1em;
}

.sidebar_ok {
    background-color: #fef08a;
}

.avatar {
    border-radius: 1em;
}

.admin_name {
    background-color: #d1d5db;
    border-radius: 1em;
}

.nav-link:hover {
    background-color: black;
    text-shadow: #d1d5db;
    color: white;
    border-radius: 1em;
}

</style>