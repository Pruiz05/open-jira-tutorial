import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React, { useContext } from 'react'
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { UIContext } from '@/context/ui';

const menuItems: string[] = ['Inbox', 'Starred', 'Send Email', 'Drafts']


export const Sidebar = () => {
    const { sideMenuOpen, closeSideMenu } = useContext(UIContext);


    return (
        <Drawer anchor="left"
            open={sideMenuOpen}
            onClose={closeSideMenu}>
            <Box sx={{
                width: 250
            }}>
                <Box sx={{ padding: '5px 10px' }}>
                    <Typography variant='h4'>
                        Menu
                    </Typography>
                </Box>
                <List>
                    {
                        menuItems.map((text, index) => (
                            <ListItemButton key={text}>
                                <ListItemIcon>
                                    {index % 2 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        ))
                    }
                </List>
                <Divider />

                <List>
                    {
                        menuItems.map((text, index) => (
                            <ListItemButton key={text}>
                                <ListItemIcon>
                                    {index % 2 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        ))
                    }
                </List>
            </Box>
        </Drawer>
    )
}
