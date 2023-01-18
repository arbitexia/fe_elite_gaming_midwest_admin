import {
  UIFlexSpaceBox,
  UIActionButton,
  UIDefaultButton,
} from '@/components/UI';
import { Stack, Box, Typography } from '@mui/material';

export type ActionItemType = {
  color: string;
  text: string;
  icon: React.ReactNode | React.ReactNode[];
};

export interface UIDetailHeaderProps {
  title: string;
  actionButtons: ActionItemType[];
  handleAction: (title: string) => void;
}

export const UIDetailHeader = ({
  title,
  actionButtons,
  handleAction,
}: UIDetailHeaderProps) => {
  return (
    <UIFlexSpaceBox>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: 24,
          lineHeight: '17px',
          color: '#06251F',
          mb: '30px',
        }}
      >
        {title}
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          {actionButtons.map((item, index) => {
            return (
              <>
                {item.text === 'Save' ? (
                  <UIDefaultButton sx={{ marginLeft: '8px' }} type="submit">
                    Save
                  </UIDefaultButton>
                ) : (
                  <UIActionButton
                    icon={item.icon}
                    color={item.color}
                    title={item.text}
                    key={index}
                    handleClick={() => {
                      handleAction(item.text);
                    }}
                  />
                )}
              </>
            );
          })}
        </Box>
      </Stack>
    </UIFlexSpaceBox>
  );
};
