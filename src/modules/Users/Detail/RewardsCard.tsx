import { Box, Typography, Table, TableBody, IconButton } from '@mui/material';
import { UIFlexSpaceBox } from '@/components/UI';
import {
  StyledUserDetailCard,
  StyledUserRequestButton,
  StyledRewardsTableCell,
  StyledRequestTableRow,
} from './ui';
import { rewardsData } from '@/_mock/rewards';
import { MoreHoriz } from '@mui/icons-material';

const UserDetailRewardsCard = () => {
  return (
    <StyledUserDetailCard>
      <UIFlexSpaceBox>
        <Typography
          sx={{
            ml: '15px',
            fontWeight: '600',
            fontSize: '18px',
            lineHeight: '17px',
            color: '#222B35',
          }}
        >
          Avaliable Rewards
        </Typography>
        <StyledUserRequestButton>All Rewards</StyledUserRequestButton>
      </UIFlexSpaceBox>
      <Table
        size="small"
        sx={{
          marginTop: '25px',
          borderCollapse: 'separate',
          borderSpacing: '0 5px',
        }}
      >
        <TableBody>
          {rewardsData.map((data, index) => {
            if (index >= 4) return null;
            return (
              <StyledRequestTableRow key={data.id}>
                <StyledRewardsTableCell>
                  {data.createdAt}
                </StyledRewardsTableCell>
                <StyledRewardsTableCell>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: '#06251F',
                        paddingBottom: '5px',
                      }}
                    >
                      {data.name}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 12, fontWeight: 500, color: '#008A83' }}
                    >
                      {data.point} points
                    </Typography>
                  </Box>
                </StyledRewardsTableCell>
                <StyledRewardsTableCell sx={{ fontWeight: 400 }}>
                  {data.location}
                </StyledRewardsTableCell>
                <StyledRewardsTableCell>
                  <IconButton>
                    <MoreHoriz />
                  </IconButton>
                </StyledRewardsTableCell>
              </StyledRequestTableRow>
            );
          })}
        </TableBody>
      </Table>
    </StyledUserDetailCard>
  );
};

export default UserDetailRewardsCard;
