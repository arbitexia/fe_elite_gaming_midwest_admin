import { Typography, TextField, InputAdornment } from '@mui/material';
import { UIFlexWrapBox } from '@/components/UI';
import { useFormikContext } from 'formik';
import { ConfigType } from '@/types';
interface CardPlayFieldProps {
  configFormik: ReturnType<typeof useFormikContext<ConfigType>>;
  couponField: string;
  thresholdField: string;
  daysField?: string;
}

const CardPlayField = ({
  configFormik,
  couponField,
  thresholdField,
  daysField,
}: CardPlayFieldProps) => {
  return (
    <UIFlexWrapBox sx={{ alignItems: 'center' }}>
      <Typography>Customer gets</Typography>
      <TextField
        variant="standard"
        type="number"
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        {...configFormik.getFieldProps(couponField)}
        sx={{ width: '120px' }}
      />
      <Typography>FreePlay when they check in </Typography>
      <TextField
        variant="standard"
        type="number"
        {...configFormik.getFieldProps(thresholdField)}
        sx={{ width: '80px' }}
      />
      <Typography>times.</Typography>
      <Typography>Coupon valid for</Typography>
      <TextField
        variant="standard"
        type="number"
        {...configFormik.getFieldProps(thresholdField)}
        sx={{ width: '60px' }}
      />
      <Typography>Days</Typography>
    </UIFlexWrapBox>
  );
};

export default CardPlayField;
