import { useState, useEffect, useRef } from 'react';
import { Typography, Stack, Box } from '@mui/material';
import { UIFlexWrapBox } from '@/components/UI';
import {
  StyledLocationCardBox,
  StyledLocationInfoTitle,
  StyledLocationInfoValue,
} from './ui';
import { LocationsDetailProps } from '@/types';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const accessToken =
  'pk.eyJ1Ijoic2FoaWx0aGFrYXJlNTIxIiwiYSI6ImNrbjVvMTkzNDA2MXQydnM2OHJ6aHJvbXEifQ.z5aEqRBTtDMWoxVzf3aGsg';

const LocationsDetailInfoCard = ({ locationItem }: LocationsDetailProps) => {
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
      center: [
        locationItem.coordinates?.lng ?? 0,
        locationItem.coordinates?.lat ?? 0,
      ],
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
          lng: locationItem.coordinates?.lng ?? 0,
          lat: locationItem.coordinates?.lat ?? 0,
        })
        .addTo(mapboxMap);
    });
    setMap(mapboxMap);

    return () => {
      mapboxMap.remove();
    };
  }, []);
  return (
    <StyledLocationCardBox>
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
            <StyledLocationInfoTitle>Name:</StyledLocationInfoTitle>
            <StyledLocationInfoValue>
              {locationItem.name}
            </StyledLocationInfoValue>
          </UIFlexWrapBox>
          <UIFlexWrapBox>
            <StyledLocationInfoTitle>Location:</StyledLocationInfoTitle>
            <StyledLocationInfoValue>
              {`${locationItem.address?.address1 ?? ''} ${
                locationItem.address?.address2 ?? ''
              } ${locationItem.address?.city ?? ''} ${
                locationItem.address?.state ?? ''
              } ${locationItem.address?.zipcode ?? ''}`}
            </StyledLocationInfoValue>
          </UIFlexWrapBox>
          <UIFlexWrapBox>
            <StyledLocationInfoTitle>Description:</StyledLocationInfoTitle>
            <StyledLocationInfoValue sx={{ height: '100px' }}>
              {locationItem.description ?? ''}
            </StyledLocationInfoValue>
          </UIFlexWrapBox>
        </Stack>
        <Stack direction="column" sx={{ flex: '1 1 0', gap: '18px' }}>
          <UIFlexWrapBox>
            <StyledLocationInfoTitle>Status:</StyledLocationInfoTitle>
            <StyledLocationInfoValue>
              {locationItem.status}
            </StyledLocationInfoValue>
          </UIFlexWrapBox>
          <UIFlexWrapBox>
            <StyledLocationInfoTitle>Type:</StyledLocationInfoTitle>
            <StyledLocationInfoValue>
              {locationItem.type}
            </StyledLocationInfoValue>
          </UIFlexWrapBox>
        </Stack>
      </UIFlexWrapBox>
      <Box
        ref={mapNode}
        width="100%"
        height="170px"
        borderRadius="8px"
        overflow="hiddend"
      />
    </StyledLocationCardBox>
  );
};

export default LocationsDetailInfoCard;
