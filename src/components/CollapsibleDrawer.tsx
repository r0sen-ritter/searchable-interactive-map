import { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios';
import './CollapsibleDrawer.css';

interface AutocompleteResult {
  id: number;
  longitude: number;
  latitude: number;
  address: string;
  address_bn: string;
  city: string;
  city_bn: string;
  area: string;
  area_bn: string;
  postCode: number;
  pType: string;
  uCode: string;
}

interface CollapsibleDrawerProps {
  setAutocompleteResults: React.Dispatch<React.SetStateAction<AutocompleteResult[]>>;
}

const CollapsibleDrawer: React.FC<CollapsibleDrawerProps> = ({ setAutocompleteResults }) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [autocompleteResults, setAutocompleteResultsLocal] = useState<AutocompleteResult[]>([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const fetchAutocompleteResults = async () => {
      try {
        const response = await axios.get(
          `https://barikoi.xyz/v2/api/search/autocomplete/place?api_key=bkoi_cee68a8de9b65f29e8f2b3c9155fde46a82979717d611630b93bf6aeeb182080&q=${searchQuery}&city=dhaka&bangla=true`
        );
        setAutocompleteResultsLocal(response.data.places);
        setAutocompleteResults(response.data.places);
      } catch (error) {
        console.error(error);
      }
    };

    if (searchQuery.trim() !== '') {
      fetchAutocompleteResults();
    } else {
      setAutocompleteResultsLocal([]);
      setAutocompleteResults([]);
    }
  }, [searchQuery, setAutocompleteResults]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1 }}>
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
          BackdropProps={{ invisible: true }}
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
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                endAdornment: (
                  <IconButton
                    style={{ background: 'linear-gradient(90deg, #00B7D8, #00E54B)', borderRadius: '3px' }}
                  >
                    <SearchIcon style={{ color: 'white', width: '30px', height: '20px' }} />
                  </IconButton>
                ),
              }}
            />
          </div>

          <div className="scroll-container" style={{ height: 'calc(100% - 60px)', overflowY: 'auto', marginTop: '20px', width: open ? 'calc(800px - 60px)' : 'calc(300px - 60px)' }}>
            {autocompleteResults.map((result) => {
              const addressParts = result.address.split(',');
              const firstPart = addressParts[0].trim();
              const restOfAddress = addressParts.slice(1).join(',').trim();
              const thana = result.area;
              const district = result.city;

              return (
                <Card
                  className="hover:brightness-90"
                  key={result.id}
                  onClick={() => {
                    
                  }}
                  style={{
                    marginTop: '10px',
                    width: '100%',
                    textAlign: 'left',
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <LocationOnIcon style={{ marginLeft: '10px', color: 'black' }} />
                  <CardContent>
                    <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{firstPart}</div>
                    <div>{restOfAddress}</div>
                    <div style={{ display: 'flex'}}>
                      <div style={{ marginRight: '16px' }}>Thana: {thana}</div>
                      <div>District: {district}</div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div>
            <IconButton onClick={handleDrawerClose} style={{ height: '40px' }}>
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default CollapsibleDrawer;
