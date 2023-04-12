import React, { useEffect, useState } from 'react';
import { Check as CheckIcon } from '@mui/icons-material';
import { Box, Divider } from '@mui/material';
import {
  UICardBox,
  UIFlexCenterBox,
  UIFlexSpaceBox,
  UIFlexWrapBox,
  UIInfoValue,
} from '@/components/UI';
import { Reward } from '@/types';
import {
  StyledImageBox,
  StyledLabel,
  StyledInfoTitle,
  StyledItemBox,
  StyledLeftWrapBox,
  StyledInfoValue,
  StyledRightWrapBox,
} from './ui';
import { format } from 'date-fns';
import RewardDetailTable from './RewardDetailTable';

export type RewardsCardProp = {
  rewards: Reward.DataList[];
  onDelete: (rewardId: number) => void;
  onEdit: (value: Reward.Data) => void;
};

const RewardCard = ({ rewards, onDelete, onEdit }: RewardsCardProp) => {
  const [selectedReward, setSelectedReward] = useState<Reward.DataList>();
  const [readMore, setReadMore] = useState(false);

  useEffect(() => {
    if (rewards && rewards.length > 0) {
      setSelectedReward(rewards[0]);
    } else {
      setSelectedReward(undefined);
    }
  }, [rewards]);

  const handleClickReward = (selectedId: number) => {
    setSelectedReward(rewards.find((obj) => obj.id === selectedId));
  };
  if (!selectedReward) {
    return (
      <UIFlexCenterBox>
        <UIInfoValue>No result</UIInfoValue>
      </UIFlexCenterBox>
    );
  }
  return (
    <UIFlexWrapBox sx={{ flexWrap: 'nowrap' }}>
      <StyledLeftWrapBox>
        <UICardBox sx={{ minHeight: '340px' }}>
          <StyledImageBox>
            <Box
              component="img"
              src={
                selectedReward?.gallery && selectedReward.gallery.length > 0
                  ? selectedReward?.gallery[0].asset?.url ??
                    '/images/noImage.jpg'
                  : '/images/noImage.jpg'
              }
              width="100%"
              height="100%"
            />
          </StyledImageBox>
          <StyledLabel sx={{ mt: '30px' }}>{selectedReward?.name}</StyledLabel>
          <StyledInfoTitle sx={{ mt: '15px' }}>Location:</StyledInfoTitle>
          <StyledInfoValue>
            {`${selectedReward?.address?.address1 ?? ''} ${
              selectedReward?.address?.address2 ?? ''
            } ${selectedReward?.address?.city ?? ''} ${
              selectedReward?.address?.state ?? ''
            } ${selectedReward?.address?.zipcode ?? ''} ${
              selectedReward?.address?.country ?? ''
            }`}
          </StyledInfoValue>
          <StyledInfoTitle sx={{ mt: '8px' }}>State:</StyledInfoTitle>
          <StyledInfoValue>{selectedReward?.status}</StyledInfoValue>
          <StyledInfoTitle sx={{ mt: '8px' }}>Description:</StyledInfoTitle>

          {readMore ? (
            <UIFlexWrapBox>
              <StyledInfoValue>{selectedReward?.description}</StyledInfoValue>
              <StyledInfoTitle
                sx={{ textDecorationLine: 'underline', cursor: 'pointer' }}
                onClick={() => setReadMore(false)}
              >
                Read less
              </StyledInfoTitle>
            </UIFlexWrapBox>
          ) : (selectedReward?.description?.length ?? 0) > 40 ? (
            <UIFlexWrapBox>
              <StyledInfoValue>
                {`${selectedReward?.description?.substring(0, 30)} ...`}
              </StyledInfoValue>
              <StyledInfoTitle
                sx={{ textDecorationLine: 'underline', cursor: 'pointer' }}
                onClick={() => setReadMore(true)}
              >
                Read more
              </StyledInfoTitle>
            </UIFlexWrapBox>
          ) : (
            <StyledInfoValue>{selectedReward?.description}</StyledInfoValue>
          )}
        </UICardBox>
        <Box
          sx={{
            mt: '30px',
            overflowY: 'auto',
            overflowX: 'hidden',
            maxHeight: '410px',
          }}
        >
          {rewards?.map((obj, index) => {
            return (
              <StyledItemBox
                key={index}
                onClick={() => handleClickReward(obj.id)}
              >
                <UIFlexSpaceBox>
                  <Box>
                    <StyledLabel>{obj.name}</StyledLabel>
                    <StyledInfoValue sx={{ marginTop: '8px' }}>
                      {format(new Date(obj?.createdAt ?? ''), 'yyyy-MM-dd')}
                    </StyledInfoValue>
                  </Box>
                  {Number(obj.id) === Number(selectedReward?.id) ? (
                    <CheckIcon />
                  ) : (
                    ''
                  )}
                </UIFlexSpaceBox>
              </StyledItemBox>
            );
          })}
        </Box>
      </StyledLeftWrapBox>
      <Divider
        orientation="vertical"
        sx={{ height: 'calc(100vh - 150px)', mx: 4 }}
      />
      <StyledRightWrapBox sx={{ overflowY: 'auto', maxHeight: '700px' }}>
        {selectedReward?.reward && (
          <RewardDetailTable
            rewards={selectedReward.reward}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        )}
      </StyledRightWrapBox>
    </UIFlexWrapBox>
  );
};

export default RewardCard;
