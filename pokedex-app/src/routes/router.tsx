import routes from "../routes"
import { Route, Routes } from "react-router-dom"
import { ComponentType } from "react"

type ComponentTypeLayout = ComponentType<{ children: JSX.Element }>
export type RouteObject = {
  path: string
  component: ComponentType
  layout?: ComponentTypeLayout
  hasAuthentication?: boolean
}

function withLayout(
  Component: ComponentType,
  Layout?: ComponentTypeLayout
): ComponentType {
  if (Layout)
    return () => (
      <Layout>
        <Component />
      </Layout>
    )
  return Component
}

function createRoute({ path, component, layout }: RouteObject) {
  const WithLayout = withLayout(component, layout)
  return <Route path={path} key={path} element={<WithLayout />} />
}

const Router = (): JSX.Element => {
  return (
    <Routes>
      {routes.map((routeObject: RouteObject) => createRoute(routeObject))}
    </Routes>
  )
}

export default Router
