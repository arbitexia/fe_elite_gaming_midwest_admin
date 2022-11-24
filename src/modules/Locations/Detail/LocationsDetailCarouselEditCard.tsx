import { useState, useEffect } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { StyledLocationCardBox } from './ui';
import { LocationsDetailProps } from '@/types';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import {
  UIFlexSpaceBox,
  UIFlexCenterBox,
  UIDefaultButton,
} from '@/components/UI';
import {
  Close,
  ArrowBackIos,
  ArrowForwardIos,
  AddAPhoto,
} from '@mui/icons-material';

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
    <StyledLocationCardBox>
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
                <Box key={index} sx={{ position: 'relative' }}>
                  <Box
                    component="img"
                    sx={{
                      marginBottom: '15px',
                      height: '60px',
                      display: 'block',
                      width: '100%',
                      overflow: 'hidden',
                      borderRadius: '4px',
                      opacity: index === activeStep ? '100%' : '60%',
                    }}
                    src={`/${url}`}
                    alt="image"
                  />
                  <IconButton
                    sx={{
                      position: 'absolute',
                      width: '27px',
                      height: '27px',
                      top: -13,
                      right: -13,
                      border: '1px solid #89C8C6',
                      background: 'rgba(255, 255, 255, 1)',
                    }}
                    onClick={() => handleRemove(index)}
                  >
                    <Close />
                  </IconButton>
                </Box>
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
      </Typography>
      <UIFlexCenterBox sx={{ gap: '15px', marginTop: '31px' }}>
        <UIDefaultButton
          sx={{
            width: '190px',
            height: '42px',
            background: 'rgba(191, 215, 225, 0.05)',
            border: '2px solid rgba(137, 200, 198, 0.4)',
            borderRadius: '8px',
            fontWeight: '500',
            fontSize: '16px',
            lineHeight: '24px',
            color: '#008A83',
          }}
        >
          Edit Photo
        </UIDefaultButton>
        <UIDefaultButton
          sx={{
            width: '190px',
            height: '42px',
            background: 'rgba(60, 96, 95, 0.8)',
            border: '1px solid rgba(191, 215, 225, 0.05)',
            borderRadius: '8px',
            fontWeight: '500',
            fontSize: '16px',
            lineHeight: '24px',
            color: '#FFFFFF',
          }}
          startIcon={<AddAPhoto sx={{ color: 'rgba(255, 255, 255, 0.54)' }} />}
        >
          Add Photo
        </UIDefaultButton>
      </UIFlexCenterBox>
    </StyledLocationCardBox>
  );
};

export default LocationsDetailCarouselEditCard;
