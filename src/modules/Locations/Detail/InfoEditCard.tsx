import { useState, useEffect, useRef } from 'react';
import { FormikProps } from 'formik';
import mapboxgl from 'mapbox-gl';
import { Typography, Stack, Box, MenuItem } from '@mui/material';
import { locationStatus, locationType } from '@/_mock/locations';

import {
  UICardBox,
  UIFlexWrapBox,
  UIFlexSpaceBox,
  UIEditTextField,
  UIInfoTitle,
} from '@/components/UI';
import { Location } from '@/types';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-quill/dist/quill.snow.css';

const accessToken =
  'pk.eyJ1Ijoic2FoaWx0aGFrYXJlNTIxIiwiYSI6ImNrbjVvMTkzNDA2MXQydnM2OHJ6aHJvbXEifQ.z5aEqRBTtDMWoxVzf3aGsg';

const LocationsDetailInfoEditCard = ({
  locationFormik,
}: {
  locationFormik: FormikProps<Location.Data>;
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
        locationFormik.values.coords?.lng ?? 0,
        locationFormik.values.coords?.lat ?? 0,
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
          lng: locationFormik.values.coords?.lng ?? 0,
          lat: locationFormik.values.coords?.lat ?? 0,
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
          <UIInfoTitle>Status:</UIInfoTitle>
          <Box width={150}>
            <UIEditTextField
              name="status"
              value={locationFormik.values.status ?? locationStatus[0].id}
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
            <UIInfoTitle>Name:</UIInfoTitle>
            <Box>
              <UIEditTextField
                name="name"
                value={locationFormik.values.name ?? ''}
                onChange={locationFormik.handleChange}
                fullWidth
              />
            </Box>
          </UIFlexWrapBox>
        </Stack>
        <Stack direction="column" sx={{ flex: '1 1 0', gap: '18px' }}>
          <UIFlexWrapBox sx={{ alignItems: 'center' }}>
            <UIInfoTitle>Type:</UIInfoTitle>
            <Box flexGrow={1}>
              <UIEditTextField
                name="type"
                value={locationFormik.values.type ?? locationType[0].id}
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
            <UIInfoTitle>Address1:</UIInfoTitle>
            <Box>
              <UIEditTextField
                name="address.address1"
                value={locationFormik.values.address?.address1 ?? ''}
                onChange={locationFormik.handleChange}
                fullWidth
              />
            </Box>
          </UIFlexWrapBox>
          <UIFlexWrapBox sx={{ alignItems: 'center' }}>
            <UIInfoTitle>City:</UIInfoTitle>
            <Box>
              <UIEditTextField
                name="address.city"
                value={locationFormik.values.address?.city ?? ''}
                onChange={locationFormik.handleChange}
                fullWidth
              />
            </Box>
          </UIFlexWrapBox>
          <UIFlexWrapBox sx={{ alignItems: 'center' }}>
            <UIInfoTitle>ZipCode:</UIInfoTitle>
            <Box>
              <UIEditTextField
                name="address.zipcode"
                value={locationFormik.values.address?.zipcode ?? ''}
                onChange={locationFormik.handleChange}
                fullWidth
              />
            </Box>
          </UIFlexWrapBox>
        </Stack>
        <Stack direction="column" sx={{ flex: '1 1 0', gap: '18px' }}>
          <UIFlexWrapBox sx={{ alignItems: 'center' }}>
            <UIInfoTitle>Address2:</UIInfoTitle>
            <Box>
              <UIEditTextField
                name="address.address2"
                value={locationFormik.values.address?.address2 ?? ''}
                onChange={locationFormik.handleChange}
                fullWidth
              />
            </Box>
          </UIFlexWrapBox>
          <UIFlexWrapBox sx={{ alignItems: 'center' }}>
            <UIInfoTitle>State:</UIInfoTitle>
            <Box>
              <UIEditTextField
                name="address.state"
                value={locationFormik.values.address?.state ?? ''}
                onChange={locationFormik.handleChange}
                fullWidth
              />
            </Box>
          </UIFlexWrapBox>
          <UIFlexWrapBox sx={{ alignItems: 'center' }}>
            <UIInfoTitle>Country:</UIInfoTitle>
            <Box>
              <UIEditTextField
                name="address.country"
                value={locationFormik.values.address?.country ?? ''}
                onChange={locationFormik.handleChange}
                fullWidth
              />
            </Box>
          </UIFlexWrapBox>
        </Stack>
      </UIFlexWrapBox>
      <Box
        sx={{
          width: '100%',
          paddingTop: '20px',
        }}
      >
        <UIInfoTitle>Description:</UIInfoTitle>
        <Box>
          <UIEditTextField
            sx={{ marginTop: '8px' }}
            name="description"
            value={locationFormik.values.description ?? ''}
            onChange={locationFormik.handleChange}
            fullWidth
          />
        </Box>
      </Box>
      <Box
        ref={mapNode}
        sx={{
          flexGrow: 1,
          width: '100%',
          height: '250px',
          marginTop: '50px',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      />
    </UICardBox>
  );
};

export default LocationsDetailInfoEditCard;
