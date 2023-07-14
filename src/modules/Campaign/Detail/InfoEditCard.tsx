import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  InputAdornment,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { UIFlexWrapBox } from '@/components/UI';
import { CampaignType, EmailTemplateType } from '@/types';
import { CalendarToday as CalendarTodayIcon } from '@mui/icons-material';

import {
  StyledUserInfoTitle,
  StyledUserInfoCard,
  StyledUserInfoCardHeader,
  StyledUserInfoCardContent,
  StyledUserInfoCardStatus,
  StyledUserEditTextField,
} from './ui';
import { useAppToast } from '@/providers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { MobileDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import moment, { Moment } from 'moment';
import { CampaignSchema } from '@/libs/yupSchema';
import CampaignDetailHeader from './Header';
import {
  campaignModel,
  campaignOfferType,
  campaignStatus,
  campaignType,
} from '@/constants';
import { CampaignChannelsEnum } from '@/constants/enum';

interface CampaignDetailHeaderProps {
  campaign: CampaignType.Data;
  emailTemplates: EmailTemplateType.Data[];
  sendinEmails?: EmailTemplateType.SendinBlueEmail[];
  onSave: (value: CampaignType.Body) => void;
}

const CampaignDetailInfoCard = ({
  campaign,
  emailTemplates,
  sendinEmails,
  onSave,
}: CampaignDetailHeaderProps) => {
  const [errorMsg, setErrorMsg] = useState<string>();
  const [selectedTempId, setSelectedTempId] = useState<number>();
  const appToast = useAppToast();

  const campaignFormik = useFormik({
    initialValues: campaign,
    validationSchema: CampaignSchema,
    onSubmit: async (values) => {
      onSave({ input: values });
    },
  });

  useEffect(() => {
    if (errorMsg) {
      appToast({
        severity: 'error',
        message: errorMsg,
      });
      setErrorMsg(undefined);
    }
  }, [errorMsg]);

  const handleClickSave = () => {
    if (JSON.stringify(campaignFormik.errors) !== '{}') {
      const errorKey = Object.keys(
        campaignFormik.errors
      )[0] as keyof typeof campaignFormik.errors;
      setErrorMsg(campaignFormik.errors[errorKey] as string | undefined);
      return;
    }
    campaignFormik.handleSubmit();
  };
  const handleChannels = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkedValue = Number(event.currentTarget.value);
    const currentChannels = campaignFormik.values.channels;
    const updatedChannels = event.currentTarget.checked
      ? currentChannels + checkedValue
      : currentChannels - checkedValue;
    campaignFormik.setFieldValue('channels', updatedChannels);
  };

  return (
    <Box>
      <CampaignDetailHeader campaign={campaign} onSave={handleClickSave} />
      <Divider sx={{ my: '18px' }} />
      <StyledUserInfoCard>
        <StyledUserInfoCardHeader />
        <StyledUserInfoCardContent>
          {campaign.id !== 0 && (
            <StyledUserInfoCardStatus>
              <Typography
                sx={{
                  fontWeight: '400',
                  fontSize: '14px',
                  lineHeight: '22px',
                  color: '#667180',
                }}
              >
                ID #{campaign.id}
              </Typography>
            </StyledUserInfoCardStatus>
          )}

          <Box flex="1">
            <UIFlexWrapBox sx={{ paddingTop: '20px' }}>
              <Stack direction="column" sx={{ width: '49%', gap: '10px' }}>
                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>Name:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="name"
                    value={campaignFormik.values.name}
                    onChange={campaignFormik.handleChange}
                  />
                </UIFlexWrapBox>

                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>Model:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="model"
                    onChange={campaignFormik.handleChange}
                    value={campaignFormik.values.model}
                    select
                  >
                    {campaignModel.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          {item.value}
                        </MenuItem>
                      );
                    })}
                  </StyledUserEditTextField>
                </UIFlexWrapBox>

                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>Type:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="type"
                    onChange={campaignFormik.handleChange}
                    value={campaignFormik.values.type}
                    select
                  >
                    {campaignType.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          {item.value}
                        </MenuItem>
                      );
                    })}
                  </StyledUserEditTextField>
                </UIFlexWrapBox>

                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>Status:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="status"
                    onChange={campaignFormik.handleChange}
                    value={campaignFormik.values.status}
                    select
                  >
                    {campaignStatus.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          {item.value}
                        </MenuItem>
                      );
                    })}
                  </StyledUserEditTextField>
                </UIFlexWrapBox>
              </Stack>
              <Stack direction="column" sx={{ width: '49%', gap: '10px' }}>
                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>Offer:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="offer"
                    type="number"
                    value={campaignFormik.values.offer}
                    onChange={campaignFormik.handleChange}
                  />
                </UIFlexWrapBox>
                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>Start Date:</StyledUserInfoTitle>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <MobileDatePicker
                      inputFormat="MM/DD/YYYY"
                      value={campaignFormik.values.startDate}
                      minDate={moment()}
                      onChange={(value: Moment | null) => {
                        campaignFormik.setFieldValue(
                          'startDate',
                          value ? value.format('MM/DD/YYYY') : ''
                        );
                      }}
                      renderInput={(params) => {
                        return (
                          <Box sx={{ position: 'relative' }}>
                            <StyledUserEditTextField
                              {...params}
                              placeholder="MM/DD/YYYY"
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <CalendarTodayIcon />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Box>
                        );
                      }}
                    />
                  </LocalizationProvider>
                </UIFlexWrapBox>

                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>End Date:</StyledUserInfoTitle>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <MobileDatePicker
                      inputFormat="MM/DD/YYYY"
                      value={campaignFormik.values.endDate}
                      minDate={moment(campaignFormik.values.startDate).add(
                        1,
                        'days'
                      )}
                      onChange={(value: Moment | null) => {
                        campaignFormik.setFieldValue(
                          'endDate',
                          value ? value.format('MM/DD/YYYY') : ''
                        );
                      }}
                      renderInput={(params) => {
                        return (
                          <Box sx={{ position: 'relative' }}>
                            <StyledUserEditTextField
                              {...params}
                              placeholder="MM/DD/YYYY"
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <CalendarTodayIcon />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Box>
                        );
                      }}
                    />
                  </LocalizationProvider>
                </UIFlexWrapBox>

                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>Channels:</StyledUserInfoTitle>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="1"
                        checked={
                          campaignFormik.values.channels ===
                            CampaignChannelsEnum.EMAIL ||
                          campaignFormik.values.channels ===
                            CampaignChannelsEnum.BOTH
                        }
                        onChange={handleChannels}
                        name="email"
                        disabled={!campaignFormik.values.type}
                      />
                    }
                    label="Email"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="2"
                        checked={
                          campaignFormik.values.channels ===
                            CampaignChannelsEnum.PHONE ||
                          campaignFormik.values.channels ===
                            CampaignChannelsEnum.BOTH
                        }
                        onChange={handleChannels}
                        name="phone"
                        disabled={!campaignFormik.values.type}
                      />
                    }
                    label="Phone"
                  />
                </UIFlexWrapBox>
              </Stack>
            </UIFlexWrapBox>
          </Box>
        </StyledUserInfoCardContent>
        {/* <Box
          dangerouslySetInnerHTML={{
            __html:
              sendinEmails?.find((obj) => obj.id === 1)?.htmlContent ?? '',
          }}
          sx={{ my: 4 }}
        ></Box> */}
      </StyledUserInfoCard>
    </Box>
  );
};

export default CampaignDetailInfoCard;
