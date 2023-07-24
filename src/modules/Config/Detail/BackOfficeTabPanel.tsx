import { UIFlexWrapBox } from '@/components/UI';
import { BackOfficeType } from '@/types';
import {
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Switch,
  Divider,
  Box,
} from '@mui/material';

interface BackOfficeTabPanelProps {
  backOfficeValues: BackOfficeType[];
  setBackOfficeValues: (values: BackOfficeType[]) => void;
}

const BackOfficeTabPanel = ({
  backOfficeValues,
  setBackOfficeValues,
}: BackOfficeTabPanelProps) => {
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value, checked } = event.target;
    const updatedFormValues = [...backOfficeValues];
    let updatedValue = Number(value);
    if (name === 'status') {
      updatedValue = checked ? 1 : 0;
    }
    updatedFormValues[index] = {
      ...updatedFormValues[index],
      [name]: updatedValue,
    };
    setBackOfficeValues(updatedFormValues);
  };

  return (
    <Stack direction={'column'} gap={3} sx={{ ml: 4, padding: '24px 0' }}>
      {backOfficeValues.map((obj, index) => {
        return (
          <Box key={index}>
            {index === 7 && <Divider sx={{ mt: 2, mb: 3 }} />}
            <UIFlexWrapBox
              sx={{ alignItems: 'center' }}
              key={`backOffice${index}`}
            >
              <Switch
                name="status"
                checked={backOfficeValues[index].status === 0 ? false : true}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(event, index)
                }
                inputProps={{ 'aria-label': 'controlled' }}
              />
              <Typography>Customer gets</Typography>
              <TextField
                variant="standard"
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                name="coupon"
                value={backOfficeValues[index].coupon}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(event, index)
                }
                sx={{ width: '120px' }}
              />
              <Typography>
                {obj.type === 'FREE' ? 'FreePlay' : 'MatchPlay'} when they check
                in
              </Typography>
              <TextField
                variant="standard"
                type="number"
                name="checkinThreshold"
                value={backOfficeValues[index].checkinThreshold}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(event, index)
                }
                sx={{ width: '80px' }}
              />
              <Typography>times.</Typography>
              <Typography>Coupon valid for</Typography>
              <TextField
                variant="standard"
                type="number"
                name="days"
                value={backOfficeValues[index].days}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(event, index)
                }
                sx={{ width: '60px' }}
              />
              <Typography>Days.</Typography>
            </UIFlexWrapBox>
          </Box>
        );
      })}
    </Stack>
  );
};

export default BackOfficeTabPanel;
