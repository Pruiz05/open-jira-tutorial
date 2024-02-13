import { AppBar, IconButton, Link, Toolbar, Typography } from '@mui/material'
import React, { useContext } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { UIContext } from '@/context/ui';
import NextLink from 'next/link';


export const Navbar = () => {
  const { openSideMenu } = useContext(UIContext);
  return (
    <AppBar position='sticky' >
      <Toolbar>
        <IconButton size='large' edge='start' onClick={openSideMenu}>
          <MenuIcon />
        </IconButton>
        <NextLink href='/' passHref>
          <Link underline='none' color='white'>
            <Typography variant='h6'>
              OpenJira
            </Typography>
          </Link>
        </NextLink>
      </Toolbar>

    </AppBar>
  )
}
