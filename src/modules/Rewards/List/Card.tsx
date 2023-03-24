import React, { useEffect, useState } from 'react';
import { Check as CheckIcon } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { Box, Divider } from '@mui/material';
import {
  UICardBox,
  UIFlexCenterBox,
  UIFlexSpaceBox,
  UIFlexWrapBox,
  UIInfoTitle,
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
};

const RewardCard = ({ rewards }: RewardsCardProp) => {
  const router = useRouter();
  const [selectedReward, setSelectedReward] = useState<Reward.DataList>();
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
  console.log(selectedReward.gallery);
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
          <StyledInfoValue
            dangerouslySetInnerHTML={{
              __html: selectedReward?.description ?? '',
            }}
          />
        </UICardBox>
        <Box sx={{ marginTop: '30px' }}>
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
      <Divider orientation="vertical" sx={{ height: '100vh', mx: 4 }} />
      <StyledRightWrapBox>
        {selectedReward?.reward && (
          <RewardDetailTable rewards={selectedReward.reward} />
        )}
      </StyledRightWrapBox>
    </UIFlexWrapBox>
  );
};

export default RewardCard;
