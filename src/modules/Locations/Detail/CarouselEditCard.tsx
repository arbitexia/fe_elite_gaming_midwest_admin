import { useState, useEffect } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import {
  StyledLocationCardBox,
  StyledLocationEditPhotoButton,
  StyledLocationAddPhotoButton,
} from './ui';
import { LocationsDetailProps } from '@/types';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { UIFlexSpaceBox, UIFlexCenterBox } from '@/components/UI';
import { ArrowBackIos, ArrowForwardIos, AddAPhoto } from '@mui/icons-material';
import Thumbnail from './Thumbnail';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const LocationsDetailCarouselEditCard = ({
  locationItem,
}: LocationsDetailProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  useEffect(() => {
    setImages(locationItem.urls);
  }, [locationItem]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep + 2 > images.length ? 0 : prevActiveStep + 1
    );
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep - 1 >= 0 ? prevActiveStep - 1 : images.length - 1
    );
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const handleRemove = (index: number) => {
    setImages((prev) => {
      prev.splice(index, 1);
      return prev;
    });
  };

  return (
    <StyledLocationCardBox alignSelf="flex-start">
      <UIFlexCenterBox sx={{ gap: '20px' }}>
        <Box
          sx={{
            width: 'calc(100% - 120px)',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          <AutoPlaySwipeableViews
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {images.map((url, index) => {
              return Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    display: 'block',
                    overflow: 'hidden',
                    width: '100%',
                    height: '350px',
                  }}
                  src={`/${url}`}
                  alt="image"
                />
              ) : null;
            })}
          </AutoPlaySwipeableViews>
        </Box>
        <UIFlexSpaceBox
          flexDirection="column"
          sx={{ width: '100px', height: 350 }}
        >
          <Box>
            {images.map((url, index) => {
              return (
                <Thumbnail
                  key={index}
                  index={index}
                  url={url}
                  handleRemove={handleRemove}
                  activeStep={activeStep}
                />
              );
            })}
          </Box>
          <UIFlexSpaceBox>
            <IconButton
              onClick={handleBack}
              sx={{ color: 'rgba(137, 200, 198, 0.8)' }}
            >
              <ArrowBackIos />
            </IconButton>
            <IconButton
              onClick={handleNext}
              sx={{ color: 'rgba(137, 200, 198, 0.8)' }}
            >
              <ArrowForwardIos />
            </IconButton>
          </UIFlexSpaceBox>
        </UIFlexSpaceBox>
      </UIFlexCenterBox>
      <Typography
        sx={{
          fontWeight: '400',
          fontSize: '11px',
          lineHeight: '15px',
          textAlign: 'center',
          color: '#667180',
          paddingRight: '130px',
          marginTop: '20px',
        }}
      >
        Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3.1 MB
        <br /> Maximium image count: 4
      </Typography>
      <UIFlexCenterBox sx={{ gap: '15px', marginTop: '31px' }}>
        <StyledLocationEditPhotoButton>
          Edit Photo
        </StyledLocationEditPhotoButton>
        <StyledLocationAddPhotoButton
          startIcon={<AddAPhoto sx={{ color: 'rgba(255, 255, 255, 0.54)' }} />}
        >
          Add Photo
        </StyledLocationAddPhotoButton>
      </UIFlexCenterBox>
    </StyledLocationCardBox>
  );
};

export default LocationsDetailCarouselEditCard;
