import { useState } from 'react';
import CollapsibleDrawer from './components/CollapsibleDrawer';
import DisplayMap from './components/DisplayMap';

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


const App = () => {
  const [autocompleteResults, setAutocompleteResults] = useState<AutocompleteResult[]>([]);

  return (
    <>
      <DisplayMap autocompleteResults={autocompleteResults} />
      <CollapsibleDrawer setAutocompleteResults={setAutocompleteResults} />
    </>
  );
};

export default App;
