import { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import {
  StyledLocationCardBox,
  StyledLocationEditPhotoButton,
  StyledLocationAddPhotoButton,
} from './ui';
import SwipeableViews from 'react-swipeable-views';
import { UIFlexSpaceBox, UIFlexCenterBox } from '@/components/UI';
import { ArrowBackIos, ArrowForwardIos, AddAPhoto } from '@mui/icons-material';
import Thumbnail from './Thumbnail';
import { convertMBtoBytes } from '@/libs/data-helper';
import { useAppToast } from '@/providers';
import { useAsset } from '@/hooks/asset';
import { AssetType } from '@/types';

const LocationsDetailCarouselEditCard = () => {
  const [activeStep, setActiveStep] = useState(0);
  const {
    galleries,
    onAddGallery,
    onUpdateGallery,
    onCreateAsset,
    onDeleteImage,
  } = useAsset();
  const appToast = useAppToast();

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

  const handleRemove = (index: number) => {
    onDeleteImage(index);
  };

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // setShowImageError(false);
    const reader = new FileReader();
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) return;

    // Restrict user to upload file less than 3.1MB
    if (file.size > convertMBtoBytes(3.1)) {
      appToast('error', 'File size is too large');
      return;
    }
    reader.onloadend = async () => {
      const asset: AssetType.Asset = await onCreateAsset(file);
      onUpdateGallery(activeStep, asset);
    };

    reader.readAsDataURL(file);
  };

  const onImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // setShowImageError(false);
    const reader = new FileReader();
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) return;

    // Restrict user to upload file less than 3.1MB
    if (file.size > convertMBtoBytes(3.1)) {
      appToast('error', 'File size is too large');
      return;
    }
    reader.onloadend = async () => {
      const asset: AssetType.Asset = await onCreateAsset(file);
      onAddGallery({ id: 0, assetId: asset.id, asset: asset });
    };

    reader.readAsDataURL(file);
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
          <SwipeableViews index={activeStep} enableMouseEvents>
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
          </SwipeableViews>
        </Box>
        <UIFlexSpaceBox
          flexDirection="column"
          sx={{ width: '100px', height: 350 }}
        >
          <Box>
            {galleries.map((gallery, index) => {
              return (
                <Thumbnail
                  key={index}
                  index={index}
                  url={gallery.asset?.url ?? '/images/noImage.jpg'}
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
          <label htmlFor="photo-edit">Edit Photo</label>
          <input
            id="photo-edit"
            type="file"
            onChange={onImageChange}
            accept="image/png, image/gif, image/jpeg"
            hidden
          />
        </StyledLocationEditPhotoButton>

        <StyledLocationAddPhotoButton
          startIcon={<AddAPhoto sx={{ color: 'rgba(255, 255, 255, 0.54)' }} />}
        >
          <label htmlFor="photo-create">Add Photo</label>
          <input
            id="photo-create"
            type="file"
            onChange={onImageAdd}
            accept="image/png, image/gif, image/jpeg"
            hidden
          />
        </StyledLocationAddPhotoButton>
      </UIFlexCenterBox>
    </StyledLocationCardBox>
  );
};

export default LocationsDetailCarouselEditCard;
