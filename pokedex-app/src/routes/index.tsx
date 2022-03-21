import { RouteObject } from "./router"
import Home from "./Home"
import Layout from "app/components/Layout"

const routes: RouteObject[] = [
  {
    component: Home,
    layout: Layout,
    path: "/"
  }
]

export default routes
