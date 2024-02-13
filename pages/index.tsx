import { Layout } from '@/components/layouts'
import { NewEntry } from '@/components/ui'
import EntryList from '@/components/ui/EntryList'
import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'
import { NextPage } from 'next'

const HomePage: NextPage = () => {
  return (
    <>
      <Layout title='Home - OpenJira'>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Card sx={{
              height: 'calc(100vh - 100px)'
            }}>
              <CardHeader title='Pending' />
              <NewEntry />
              <EntryList status='pending' />
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{
              height: 'calc(100vh - 100px)'
            }}>
              <CardHeader title='Progress' />
              <EntryList status='in-progress' />
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{
              height: 'calc(100vh - 100px)'
            }}>
              <CardHeader title='Complete' />
              <EntryList status='finished' />
            </Card>
          </Grid>
        </Grid>
      </Layout>
    </>
  )
}

export default HomePage