import { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import { StyledLocationCardBox } from './ui';
import { LocationsDetailProps } from '@/types';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { UIFlexSpaceBox, UIFlexCenterBox } from '@/components/UI';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import Thumbnail from './Thumbnail';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const LocationsDetailCarouselCard = ({
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
                    width: '100%',
                    height: '350px',
                  }}
                  src={`${url}`}
                  alt="image"
                />
              ) : null;
            })}
          </AutoPlaySwipeableViews>
        </Box>
        <UIFlexSpaceBox flexDirection="column" width="100px" height="350px">
          <Box>
            {images.map((url, index) => {
              return (
                <Thumbnail
                  key={index}
                  index={index}
                  url={url}
                  activeStep={activeStep}
                />
              );
            })}
          </Box>
          <UIFlexSpaceBox>
            <IconButton onClick={handleBack}>
              <ArrowBackIos sx={{ color: 'rgba(137, 200, 198, 0.8)' }} />
            </IconButton>
            <IconButton onClick={handleNext}>
              <ArrowForwardIos sx={{ color: 'rgba(137, 200, 198, 0.8)' }} />
            </IconButton>
          </UIFlexSpaceBox>
        </UIFlexSpaceBox>
      </UIFlexCenterBox>
    </StyledLocationCardBox>
  );
};

export default LocationsDetailCarouselCard;
