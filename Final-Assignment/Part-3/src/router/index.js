import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue"
// import AddContact from "../views/AddContact.vue"
// import EditContact from "../views/EditContact.vue"
// import ViewContact from "../views/ViewContact.vue"
// import ContactManager from "../views/ContactManager.vue"
// import PageNotFound from "../views/PageNotFound.vue"

const routes = [
    {
        path: "/",
        name: "Home",
        // redirect: "/", 
        component: Home
    }
    // {
    //     path: "/contacts",
    //     name: "ContactManager",
    //     component: ContactManager
    // },
    // {
    //     path: "/contacts/add",
    //     name: "AddContact",
    //     component: AddContact
    // },
    // {
    //     path: "/contacts/edit/:contactId",
    //     name: "EditContact",
    //     component: EditContact
    // },
    // {
    //     path: "/contacts/view/:contactId",
    //     name: "ViewContact",
    //     component: ViewContact
    // },
    // {
    //     path: "/:pathMatch(.*)*",
    //     name: "PageNotFound",
    //     component: PageNotFound
    // },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;