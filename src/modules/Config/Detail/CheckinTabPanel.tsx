import { UIFlexWrapBox, UIInfoTitle, UIInfoValue } from '@/components/UI';
import { useFormikContext } from 'formik';
import { ConfigType } from '@/types';
import {
  StyledConfigEditTextField,
  StyledConfigInfoCardContent,
  StyledConfigInfoTitle,
} from '../ui';
import { InputAdornment, Stack, TextField, Typography } from '@mui/material';

interface CheckinTabPanelProps {
  configData: ConfigType;
  configFormik: ReturnType<typeof useFormikContext<ConfigType>>;
}

const CheckinTabPanel = ({
  configFormik,
  configData,
}: CheckinTabPanelProps) => {
  return (
    <Stack direction={'column'} gap={3} sx={{ ml: 4, padding: '24px 0' }}>
      <UIFlexWrapBox sx={{ flexWrap: 'nowrap' }}>
        <StyledConfigInfoCardContent>
          <UIFlexWrapBox sx={{ alignItems: 'center' }}>
            <StyledConfigInfoTitle>Daily:</StyledConfigInfoTitle>
            <StyledConfigEditTextField
              type="number"
              name="daily"
              value={configFormik.values.daily}
              onChange={configFormik.handleChange}
            />
          </UIFlexWrapBox>
          <UIFlexWrapBox sx={{ alignItems: 'center' }}>
            <StyledConfigInfoTitle>Weekly:</StyledConfigInfoTitle>
            <StyledConfigEditTextField
              type="number"
              name="weekly"
              value={configFormik.values.weekly}
              onChange={configFormik.handleChange}
            />
          </UIFlexWrapBox>
          <UIFlexWrapBox sx={{ alignItems: 'center' }}>
            <StyledConfigInfoTitle>Monthly:</StyledConfigInfoTitle>
            <StyledConfigEditTextField
              type="number"
              name="monthly"
              value={configFormik.values.monthly}
              onChange={configFormik.handleChange}
            />
          </UIFlexWrapBox>
        </StyledConfigInfoCardContent>
        <StyledConfigInfoCardContent>
          <UIInfoTitle>Description</UIInfoTitle>
          <UIInfoValue sx={{ pr: 4 }}>
            On the settings page, have three different point allocations
            available for customers when they check in on the tablet: daily,
            weekly, and monthly. Daily Points: Customers receive{' '}
            {configData.daily} points every day when they check in on the
            tablet. Weekly Points: In addition to the daily points, customers
            also receive {configData.weekly} points on a weekly basis. Monthly
            Points: Alongside the daily and weekly points, customers are
            rewarded with {configData.monthly} points at the beginning of each
            month.
          </UIInfoValue>
        </StyledConfigInfoCardContent>
      </UIFlexWrapBox>
      <UIFlexWrapBox sx={{ alignItems: 'center' }}>
        <Typography>Customers will receive a coupon of</Typography>
        <TextField
          variant="standard"
          type="number"
          name="initialCoupon"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          value={configFormik.values?.initialCoupon ?? 0}
          onChange={configFormik.handleChange}
          sx={{ width: '120px' }}
        />
        <Typography>upon signing up.</Typography>
        {/* <Typography>Coupon valid for</Typography>
        <TextField
          variant="standard"
          type="number"
          name="days"
          value={0}
          // onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          //   handleInputChange(event, index)
          // }
          sx={{ width: '60px' }}
        />
        <Typography>Days.</Typography> */}
      </UIFlexWrapBox>
    </Stack>
  );
};

export default CheckinTabPanel;
