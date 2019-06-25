import * as storage from "../lib/storage";

const requireAuth = (to, from, next) => {
  var auth = storage.getFromStorage("authToken");
  if (auth === null) {
    next({
      path: "/login"
    });
  } else {
    // store.dispatch(FETCH_USER)
    next();
  }
};

const routes = [
  // Requires auth
  {
    path: "/",
    beforeEnter: requireAuth,
    component: () => import("layouts/MyLayout.vue"),
    children: [
      {
        path: "",
        name: "Home",
        beforeEnter: requireAuth,
        component: () => import("pages/Index.vue")
      },
      {
        path: "/matricula",
        name: "Matrícula",
        beforeEnter: requireAuth,
        component: () => import("pages/Enrollment.vue")
      },
      {
        path: "/gradehoraria",
        name: "Grade Horária",
        beforeEnter: requireAuth,
        component: () => import("pages/Schedule.vue")
      },
      {
        path: "/perfil",
        name: "Meu Perfil",
        beforeEnter: requireAuth,
        component: () => import("pages/Profile.vue")
      }
    ]
  },
  // Public routes
  {
    path: "/login",
    name: "Login",
    component: () => import("pages/Login.vue")
  },
  {
    path: "/professor/login",
    name: "Login de Professor",
    component: () => import("pages/Login.vue")
  },
  {
    path: "/cadastro",
    name: "Cadastro",
    component: () => import("pages/Signup.vue")
  },
  {
    path: "/professor/cadastro",
    name: "Cadastro de Professor",
    component: () => import("pages/Signup.vue")
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
