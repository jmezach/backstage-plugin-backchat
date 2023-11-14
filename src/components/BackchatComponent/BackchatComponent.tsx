/*
 * Copyright 2023 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React, { useState } from 'react';
import { Header, Page, Content, HeaderLabel, ChatIcon, Table } from '@backstage/core-components';
import { configApiRef, useApi } from '@backstage/core-plugin-api';
import { FeatureFlagged } from '@backstage/core-app-api';
import { Box, Button, Drawer, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper, TextField, Theme, Typography, createStyles, makeStyles } from '@material-ui/core';
import { ListItemIcon, ListItemButton, Stack } from '@mui/material';
import { Android, Close, Delete, Edit, Person } from '@material-ui/icons';
import { ToggleButton } from '@material-ui/lab';

const useDrawerStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: '30%',
      justifyContent: 'space-between',
      padding: theme.spacing(2.5),
    },
  }),
);

export const BackchatComponent = () => {
  // Get config API
  const configApi = useApi(configApiRef);

  // // Read url from config
  const ai_server_url =
    configApi.getOptionalString('ai_server.url') || 'http://localhost:3001';

  const [isOpen, toggleDrawer] = useState(false);

  return (
    <Page themeId="tool">
      <Header
        title="Backchat AI"
        subtitle="Turbocharge Your Developer Productivity"
      >
        <HeaderLabel label="Owner" value="@benwilcock" />
        <HeaderLabel label="Lifecycle" value="Alpha" />
      </Header>
      <Content noPadding stretch>
        <FeatureFlagged with="use-builtin-ui">
          <Box>
            <List>
              <ListItem>
                <ListItemAvatar children={<Person />} />
                <ListItemText primary="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste error nihil, molestiae incidunt ad quod non numquam, porro laborum ab sunt accusamus pariatur. Deleniti dolore ipsam voluptatum, doloribus numquam nostrum?" />
              </ListItem>
              <ListItem>
                <ListItemAvatar children={<Android />} />
                <ListItemText primary="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, voluptate sequi! Reprehenderit harum, ad repellat aliquam ipsa nam aliquid iste, delectus ipsum, illo optio quo quia suscipit et facere non." />
              </ListItem>
              <ListItem>
                <ListItemAvatar children={<Person />} />
                <ListItemText primary="Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis ea soluta dolores, sint rem totam doloribus perferendis. Adipisci suscipit maxime placeat tempore odit. Odit facilis sapiente earum quae aspernatur omnis." />
              </ListItem>
            </List>
            <Paper style={{position: "fixed", bottom: 0, left: 72, right: 0 }} elevation={3}>
              <Stack direction="row" spacing={3}>
                <TextField label="Type a message" variant="outlined" fullWidth InputProps={
                  {
                    endAdornment: <Button variant="contained" color="primary">Send</Button>
                  }
                } />
                <ToggleButton value="check" selected={isOpen} onChange={() => {
                    toggleDrawer(!isOpen);
                  }}>
                  <ChatIcon />
                </ToggleButton>
              </Stack>
            </Paper>
          </Box>
          <Drawer
            classes={{
              paper: useDrawerStyles().paper
            }}
            variant="temporary"
            anchor="right"
            open={isOpen}>
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
                <Typography variant="h4" gutterBottom>Conversations</Typography>
                <IconButton
                  key="dismiss"
                  title="Close the drawer"
                  onClick={() => toggleDrawer(false)}
                  color="inherit"
                >
                  <Close style={{fontSize: 20}} />
                </IconButton>
              </div>
              <Box sx={{ flexGrow: 1 }}>
                <List>
                  <ListItemButton>
                    <ListItemIcon><ChatIcon /></ListItemIcon>
                    <ListItemText primary="Lorem ipsum dolor sit amet ..." />
                    <ListItemSecondaryAction>
                      <Button size="small" variant="text"><Edit /></Button>
                      <Button size="small" variant="text"><Delete/></Button>
                    </ListItemSecondaryAction>
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemIcon><ChatIcon /></ListItemIcon>
                    <ListItemText primary="Lorem ipsum dolor sit amet ..." />
                    <ListItemSecondaryAction>
                      <Button size="small" variant="text"><Edit /></Button>
                      <Button size="small" variant="text"><Delete/></Button>
                    </ListItemSecondaryAction>
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemIcon><ChatIcon /></ListItemIcon>
                    <ListItemText primary="Lorem ipsum dolor sit amet ..." />
                    <ListItemSecondaryAction>
                      <Button size="small" variant="text"><Edit /></Button>
                      <Button size="small" variant="text"><Delete/></Button>
                    </ListItemSecondaryAction>
                  </ListItemButton>
                </List>
              </Box>
          </Drawer>
        </FeatureFlagged>
        <FeatureFlagged without="use-builtin-ui">
          <iframe
            width="100%"
            height="100%"
            style={{ border: '0px', borderRadius: '0px', boxShadow: '0px' }}
            src={ai_server_url}
            title="Backchat AI"
            sandbox="allow-same-origin allow-scripts allow-popups"
          />
        </FeatureFlagged>
      </Content>
    </Page>
  );
};
