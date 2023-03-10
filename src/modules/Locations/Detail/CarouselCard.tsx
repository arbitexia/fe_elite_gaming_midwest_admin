import { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Box, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { UIFlexSpaceBox, UIFlexCenterBox } from '@/components/UI';
import { useAsset } from '@/hooks/asset';
import Thumbnail from './Thumbnail';
import { StyledLocationCardBox } from './ui';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const LocationsDetailCarouselCard = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { galleries } = useAsset();

  const handleNext = () => {
    if (galleries.length <= 1) return;
    setActiveStep((prevActiveStep) =>
      prevActiveStep + 2 > galleries.length ? 0 : prevActiveStep + 1
    );
  };

  const handleBack = () => {
    if (galleries.length <= 1) return;
    setActiveStep((prevActiveStep) =>
      prevActiveStep - 1 >= 0 ? prevActiveStep - 1 : galleries.length - 1
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
            display: 'block',
            overflow: 'hidden',
            borderRadius: '12px',
            height: '350px',
          }}
        >
          <AutoPlaySwipeableViews
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {galleries.length > 0 ? (
              galleries.map((gallery, index) => {
                return Math.abs(activeStep - index) <= 2 ? (
                  <Box
                    key={index}
                    component="img"
                    sx={{
                      width: '100%',
                      height: '350px',
                    }}
                    src={`${gallery.asset?.url ?? '/images/noImage.jpg'}`}
                    alt="image"
                  />
                ) : null;
              })
            ) : (
              <Box
                component="img"
                sx={{
                  width: '100%',
                  height: '350px',
                }}
                src={'/images/noImage.jpg'}
                alt="image"
              />
            )}
          </AutoPlaySwipeableViews>
        </Box>
        <UIFlexSpaceBox flexDirection="column" width="100px" height="350px">
          <Box>
            {galleries &&
              galleries.map((gallery, index) => {
                return (
                  <Thumbnail
                    key={index}
                    index={index}
                    url={gallery.asset?.url ?? '/images/noImage.jpg'}
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
