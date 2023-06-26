const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("src/pages/Home.vue") }],
  },

  {
    path: "/login",
    component: () => import("layouts/PageLayout.vue"),
    children: [{ path: "", component: () => import("pages/Login.vue") }],
  },
  {
    path: "/signup",
    component: () => import("layouts/PageLayout.vue"),
    children: [{ path: "", component: () => import("pages/Signup.vue") }],
  },
  {
    path: "/products",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Products.vue") },
      { path: ":id", component: () => import("pages/ProductDetail.vue") },
      { path: "create", component: () => import("pages/ProductForm.vue") },
      { path: "my", component: () => import("pages/MyProductList.vue") },
    ],
  },
  {
    path: "/users",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "update", component: () => import("pages/UserForm.vue") },
    ],
  },

  {
    path: "/redirect",
    component: () => import("layouts/PageLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Redirect.vue"),
      },
      {
        path: "to/:nextRedirect",
        component: () => import("pages/Redirect.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
