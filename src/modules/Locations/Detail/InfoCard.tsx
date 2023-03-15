import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

import { Typography, Stack, Box } from '@mui/material';
import {
  UICardBox,
  UIFlexWrapBox,
  UIInfoTitle,
  UIInfoValue,
} from '@/components/UI';
import { Location } from '@/types';
import 'mapbox-gl/dist/mapbox-gl.css';

const accessToken =
  'pk.eyJ1Ijoic2FoaWx0aGFrYXJlNTIxIiwiYSI6ImNrbjVvMTkzNDA2MXQydnM2OHJ6aHJvbXEifQ.z5aEqRBTtDMWoxVzf3aGsg';

interface ILocationsDetailInfoCard {
  locationItem: Location.Data;
}

const LocationsDetailInfoCard = ({
  locationItem,
}: ILocationsDetailInfoCard) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [map, setMap] = useState<mapboxgl.Map>();

  const mapNode = useRef(null);

  useEffect(() => {
    const node = mapNode.current;
    if (typeof window === 'undefined' || node === null) return;
    const mapboxMap = new mapboxgl.Map({
      container: node,
      accessToken: accessToken,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [locationItem.coords?.lng ?? 0, locationItem.coords?.lat ?? 0],
      zoom: 15,
    });
    mapboxMap.on('load', () => {
      const markerIcon = document.createElement('div');
      markerIcon.className = 'location-marker';
      markerIcon.style.backgroundImage = 'url("/images/icons/pin.svg")';
      markerIcon.style.width = '25px';
      markerIcon.style.height = '25px';
      new mapboxgl.Marker(markerIcon)
        .setLngLat({
          lng: locationItem.coords?.lng ?? 0,
          lat: locationItem.coords?.lat ?? 0,
        })
        .addTo(mapboxMap);
    });
    setMap(mapboxMap);

    return () => {
      mapboxMap.remove();
    };
  }, []);
  return (
    <UICardBox>
      <Typography
        sx={{
          fontWeight: '600',
          fontSize: '18px',
          lineHeight: '17px',
          color: '#222B35',
        }}
      >
        Information:
      </Typography>
      <UIFlexWrapBox sx={{ paddingTop: '20px' }}>
        <Stack direction="column" sx={{ flex: '1 1 0', gap: '18px' }}>
          <UIFlexWrapBox>
            <UIInfoTitle>Name:</UIInfoTitle>
            <UIInfoValue>{locationItem.name}</UIInfoValue>
          </UIFlexWrapBox>
          <UIFlexWrapBox>
            <UIInfoTitle>Location:</UIInfoTitle>
            <UIInfoValue>
              {`${locationItem.address?.address1 ?? ''} ${
                locationItem.address?.address2 ?? ''
              } ${locationItem.address?.city ?? ''} ${
                locationItem.address?.state ?? ''
              } ${locationItem.address?.zipcode ?? ''} ${
                locationItem.address?.country ?? ''
              }`}
            </UIInfoValue>
          </UIFlexWrapBox>
        </Stack>
        <Stack direction="column" sx={{ flex: '1 1 0', gap: '18px' }}>
          <UIFlexWrapBox>
            <UIInfoTitle>Status:</UIInfoTitle>
            <UIInfoValue>{locationItem.status}</UIInfoValue>
          </UIFlexWrapBox>
          <UIFlexWrapBox>
            <UIInfoTitle>Type:</UIInfoTitle>
            <UIInfoValue>{locationItem.type}</UIInfoValue>
          </UIFlexWrapBox>
        </Stack>
      </UIFlexWrapBox>
      <Box sx={{ mt: 2 }}>
        <UIInfoTitle>Description:</UIInfoTitle>
        <UIInfoValue
          sx={{ height: '100px' }}
          dangerouslySetInnerHTML={{
            __html: locationItem.description ?? '',
          }}
        />
      </Box>
      <Box
        ref={mapNode}
        width="100%"
        height="250px"
        borderRadius="8px"
        overflow="hiddend"
      />
    </UICardBox>
  );
};

export default LocationsDetailInfoCard;
