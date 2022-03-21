import AppBar from "./AppBar"

type Props = {
  children: JSX.Element
}

const Layout = ({ children }: Props): JSX.Element => {
  return (
    <main>
      <AppBar />
      {children}
    </main>
  )
}
export default Layout
