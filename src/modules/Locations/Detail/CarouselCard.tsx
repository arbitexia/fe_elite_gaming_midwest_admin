import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { StyledLocationCardBox } from './ui';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { UIFlexSpaceBox, UIFlexCenterBox } from '@/components/UI';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import Thumbnail from './Thumbnail';
import { useAsset } from '@/hooks/asset';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const LocationsDetailCarouselCard = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { galleries } = useAsset();

  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep + 2 > galleries.length ? 0 : prevActiveStep + 1
    );
  };

  const handleBack = () => {
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
            borderRadius: '12px',
            overflow: 'hidden',
            display: 'flex',
          }}
        >
          <AutoPlaySwipeableViews
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {galleries &&
              galleries.map((gallery, index) => {
                return Math.abs(activeStep - index) <= 2 ? (
                  <Box
                    component="img"
                    sx={{
                      width: '100%',
                      height: '350px',
                      display: 'flex',
                    }}
                    display={'flex'}
                    src={`/${gallery.asset?.url}`}
                    alt="image"
                  />
                ) : null;
              })}
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
                    url={gallery.asset?.url ?? ''}
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
