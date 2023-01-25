import { useState, useEffect, useRef } from 'react';
import { Typography, Stack, Box, MenuItem } from '@mui/material';
import {
  UIFlexWrapBox,
  UIFlexSpaceBox,
  UIEditTextField,
} from '@/components/UI';
import { StyledLocationCardBox, StyledLocationInfoTitle } from './ui';
import { LocationType } from '@/types';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { locationStatus, locationType } from '@/_mock/locations';
import { FormikProps } from 'formik';

const accessToken =
  'pk.eyJ1Ijoic2FoaWx0aGFrYXJlNTIxIiwiYSI6ImNrbjVvMTkzNDA2MXQydnM2OHJ6aHJvbXEifQ.z5aEqRBTtDMWoxVzf3aGsg';

const LocationsDetailInfoCard = ({
  locationFormik,
}: {
  locationFormik: FormikProps<LocationType>;
}) => {
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
        locationFormik.values.coords.lng,
        locationFormik.values.coords.lat,
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
          lng: locationFormik.values.coords.lng,
          lat: locationFormik.values.coords.lat,
        })
        .addTo(mapboxMap);
    });
    setMap(mapboxMap);

    return () => {
      mapboxMap.remove();
    };
  }, []);
  return (
    <StyledLocationCardBox sx={{ height: '580px' }}>
      <UIFlexSpaceBox>
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
        <UIFlexWrapBox sx={{ alignItems: 'center' }}>
          <StyledLocationInfoTitle>Status:</StyledLocationInfoTitle>
          <Box width={150}>
            <UIEditTextField
              name="status"
              defaultValue={'Open'}
              value={locationFormik.values.status}
              onChange={locationFormik.handleChange}
              fullWidth
              select
            >
              {locationStatus.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    {item.value}
                  </MenuItem>
                );
              })}
            </UIEditTextField>
          </Box>
        </UIFlexWrapBox>
      </UIFlexSpaceBox>
      <UIFlexWrapBox sx={{ paddingTop: '20px' }}>
        <Stack direction="column" sx={{ flex: '1 1 0', gap: '18px' }}>
          <UIFlexWrapBox sx={{ alignItems: 'center' }}>
            <StyledLocationInfoTitle>Name:</StyledLocationInfoTitle>
            <Box>
              <UIEditTextField
                name="name"
                value={locationFormik.values.name}
                onChange={locationFormik.handleChange}
                fullWidth
              />
            </Box>
          </UIFlexWrapBox>
        </Stack>
        <Stack direction="column" sx={{ flex: '1 1 0', gap: '18px' }}>
          <UIFlexWrapBox sx={{ alignItems: 'center' }}>
            <StyledLocationInfoTitle>Type:</StyledLocationInfoTitle>
            <Box flexGrow={1}>
              <UIEditTextField
                name="type"
                defaultValue={'Open'}
                value={locationFormik.values.type}
                onChange={locationFormik.handleChange}
                fullWidth
                select
              >
                {locationType.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.value}
                    </MenuItem>
                  );
                })}
              </UIEditTextField>
            </Box>
          </UIFlexWrapBox>
        </Stack>
      </UIFlexWrapBox>
      <UIFlexWrapBox sx={{ paddingTop: '20px' }}>
        <Stack direction="column" sx={{ flex: '1 1 0', gap: '18px' }}>
          <UIFlexWrapBox sx={{ alignItems: 'center' }}>
            <StyledLocationInfoTitle>Address1:</StyledLocationInfoTitle>
            <Box>
              <UIEditTextField
                name="address.address1"
                value={locationFormik.values.address.address1}
                onChange={locationFormik.handleChange}
                fullWidth
              />
            </Box>
          </UIFlexWrapBox>
          <UIFlexWrapBox sx={{ alignItems: 'center' }}>
            <StyledLocationInfoTitle>City:</StyledLocationInfoTitle>
            <Box>
              <UIEditTextField
                name="address.city"
                value={locationFormik.values.address.city}
                onChange={locationFormik.handleChange}
                fullWidth
              />
            </Box>
          </UIFlexWrapBox>
          <UIFlexWrapBox sx={{ alignItems: 'center' }}>
            <StyledLocationInfoTitle>ZipCode:</StyledLocationInfoTitle>
            <Box>
              <UIEditTextField
                name="address.zipcode"
                value={locationFormik.values.address.zipcode}
                onChange={locationFormik.handleChange}
                fullWidth
              />
            </Box>
          </UIFlexWrapBox>
        </Stack>
        <Stack direction="column" sx={{ flex: '1 1 0', gap: '18px' }}>
          <UIFlexWrapBox sx={{ alignItems: 'center' }}>
            <StyledLocationInfoTitle>Address2:</StyledLocationInfoTitle>
            <Box>
              <UIEditTextField
                name="address.address2"
                value={locationFormik.values.address.address2}
                onChange={locationFormik.handleChange}
                fullWidth
              />
            </Box>
          </UIFlexWrapBox>
          <UIFlexWrapBox sx={{ alignItems: 'center' }}>
            <StyledLocationInfoTitle>State:</StyledLocationInfoTitle>
            <Box>
              <UIEditTextField
                name="address.state"
                value={locationFormik.values.address.state}
                onChange={locationFormik.handleChange}
                fullWidth
              />
            </Box>
          </UIFlexWrapBox>
          <UIFlexWrapBox sx={{ alignItems: 'center' }}>
            <StyledLocationInfoTitle>Country:</StyledLocationInfoTitle>
            <Box>
              <UIEditTextField
                name="address.country"
                value={locationFormik.values.address.country}
                onChange={locationFormik.handleChange}
                fullWidth
              />
            </Box>
          </UIFlexWrapBox>
        </Stack>
      </UIFlexWrapBox>
      <UIFlexWrapBox sx={{ alignItems: 'center', my: '18px' }}>
        <StyledLocationInfoTitle sx={{ width: '90px' }}>
          Description:
        </StyledLocationInfoTitle>
        <Box flexGrow={1}>
          <UIEditTextField
            multiline
            maxRows={2}
            sx={{ '.MuiInputBase-root': { height: '62px' } }}
            fullWidth
            name="description"
            value={locationFormik.values.description}
            onChange={locationFormik.handleChange}
          />
        </Box>
      </UIFlexWrapBox>
      <Box
        ref={mapNode}
        sx={{
          flexGrow: 1,
          width: '100%',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      />
    </StyledLocationCardBox>
  );
};

export default LocationsDetailInfoCard;
