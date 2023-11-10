import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

const CollapsibleDrawer = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton
        color="inherit"
        onClick={handleDrawerOpen}
        edge="start"
        style={{ height: '40px' }}
      >
        {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
      <Drawer
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
        PaperProps={{
          style: {
            width: open ? '800px' : '300px', 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start', 
            alignItems: 'center', 
          },
        }}
      >
       
        <div style={{ marginTop: '20px', width: '80%' }}>
          
          <TextField
            label="Search Location"
            variant="outlined"
            margin="dense"
            fullWidth
            InputProps={{
              endAdornment: (
                <IconButton style={{ background: 'linear-gradient(90deg, #00B7D8, #00E54B)', borderRadius: '3px' }}>
                  <SearchIcon style={{ color: 'white', width: '30px', height: '20px' }} />
                </IconButton>
              ),
            }}
          />
        </div>
        
        <div>
          <IconButton onClick={handleDrawerClose} style={{ height: '40px' }}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
      </Drawer>
    </div>
  );
};

export default CollapsibleDrawer;
