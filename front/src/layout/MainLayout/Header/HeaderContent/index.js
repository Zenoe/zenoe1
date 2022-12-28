import { useState } from 'react'

import { useNavigate, Link } from 'react-router-dom'
// material-ui
import { Box, IconButton, Tooltip, Typography, useMediaQuery } from '@mui/material'
import { GithubOutlined } from '@ant-design/icons'

import Avatar from '@mui/material/Avatar'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MenuIcon from '@mui/icons-material/Menu'

import defaultAvatar from '@/static/images/avatar/default.png'

// project import
import Search from './Search'
// import Profile from './Profile';
import Notification from './Notification'
// import MobileSection from './MobileSection';

// ==============================|| HEADER - CONTENT ||============================== //

const settings = [['Profile', '/profile'], ['Dashboard', '/dashboard'], ['Logout', '/logout']]
const HeaderContent = ({ userInfo }) => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'))

  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)

  const navigate = useNavigate()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    console.log('handleCloseUserMenu')
    setAnchorElUser(null)
  }

  return (
        <>
            {!matchesXs && <Search />}
            {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}

            {/* <IconButton */}
            {/*     component={Link} */}
            {/*     href="https://github.com/codedthemes/mantis-free-react-admin-template" */}
            {/*     target="_blank" */}
            {/*     disableRipple */}
            {/*     color="secondary" */}
            {/*     title="Download Free Version" */}
            {/*     sx={{ color: 'text.primary', bgcolor: 'grey.100' }} */}
            {/* > */}
            {/*     <GithubOutlined /> */}
            {/* </IconButton> */}

            {/* <Notification /> */}
          {userInfo
            ? <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={defaultAvatar}
                  sx={{ width: 16, height: 16 }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting[0]} onClick={handleCloseUserMenu}
                          component={Link} to={setting[1]}
                >
                  <Typography textAlign="center">{setting[0]}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
            : <IconButton
                component={Link}
                to="/login"
                disableRipple
                color="secondary"
                title="Login"
                sx={{ color: 'text.primary', bgcolor: 'grey.100' }}
            >
                <GithubOutlined />
            </IconButton>
          }
            {/* {!matchesXs && <Profile />} */}
            {/* {matchesXs && <MobileSection />} */}
        </>
  )
}

export default HeaderContent
