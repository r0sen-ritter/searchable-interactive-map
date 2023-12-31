import { useEffect } from 'react';

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

interface DisplayMapProps {
  autocompleteResults: AutocompleteResult[];
}

const DisplayMap: React.FC<DisplayMapProps> = ({ autocompleteResults }) => {
  useEffect(() => {
    
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.barikoi.com/bkoi-gl-js/dist/bkoi-gl.css';
    document.head.appendChild(link);

    
    const script = document.createElement('script');
    script.src = 'https://cdn.barikoi.com/bkoi-gl-js/dist/bkoi-gl.js';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      
      const accessToken = 'bkoi_cee68a8de9b65f29e8f2b3c9155fde46a82979717d611630b93bf6aeeb182080';
      (window as any).bkoigl.accessToken = accessToken;

      const map = new (window as any).bkoigl.Map({
        container: 'map',
        center: [90.3938010872331, 23.821600277500405],
        zoom: 12,
      });

      
      map.on('load', () => {
        
        map.addControl(new (window as any).bkoigl.FullscreenControl());

        
        map.addControl(new (window as any).bkoigl.NavigationControl());

        
        map.addControl(new (window as any).bkoigl.ScaleControl());

        
        autocompleteResults.forEach((result) => {
          new (window as any).bkoigl.Marker({ draggable: true })
            .setLngLat([result.longitude, result.latitude])
            .addTo(map);
        });
      });
    };

    
    return () => {
      document.head.removeChild(script);
      document.head.removeChild(link);
    };
  }, [autocompleteResults]);

  return <div id="map" style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
  </div>;
};

export default DisplayMap;
