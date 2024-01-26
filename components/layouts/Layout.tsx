import { Box } from '@mui/material'
import Head from 'next/head'
import React, { FC } from 'react'
import { Navbar, Sidebar } from '../ui';

interface Props {
    children?: React.ReactNode;
    title?: string
}


export const Layout: FC<Props> = ({ title = 'Open Jira - Tutorial', children }) => {
    return (
        <Box sx={{
            flexFlow: 1
        }}>
            <Head>
                <title>{title}</title>
            </Head>
            <Navbar />
            <Sidebar />
            <Box>
                { children }
            </Box>
        </Box>
    )
}
