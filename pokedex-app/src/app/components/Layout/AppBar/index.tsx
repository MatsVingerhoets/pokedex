import { AppBar, Box, Toolbar, Typography } from "@mui/material"
import { ENV } from "config"

const Header = () => {
  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">{ENV.APP_NAME}</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
