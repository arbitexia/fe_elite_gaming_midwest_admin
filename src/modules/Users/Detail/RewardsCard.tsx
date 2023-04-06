import { Box, Typography, Table, TableBody, IconButton } from '@mui/material';
import { UIFlexSpaceBox } from '@/components/UI';
import {
  StyledUserDetailCard,
  StyledUserRequestButton,
  StyledRewardsTableCell,
  StyledRequestTableRow,
} from './ui';
import { MoreHoriz } from '@mui/icons-material';
import { Reward } from '@/types';
import { format } from 'date-fns';
import { useRouter } from 'next/router';

type UserDetailRewardsCardProps = {
  rewards: Reward.Data[];
};
const UserDetailRewardsCard = ({ rewards }: UserDetailRewardsCardProps) => {
  const router = useRouter();
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
          Available Rewards
        </Typography>
        <StyledUserRequestButton onClick={() => router.push('/rewards')}>
          All Rewards
        </StyledUserRequestButton>
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
          {rewards?.map((data, index) => {
            if (index >= 4) return null;
            return (
              <StyledRequestTableRow key={data.id}>
                <StyledRewardsTableCell>
                  {format(new Date(data?.createdAt ?? ''), 'yyyy-MM-dd')}
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
                      {data.product.name}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 12, fontWeight: 500, color: '#008A83' }}
                    >
                      {data.product.point} points
                    </Typography>
                  </Box>
                </StyledRewardsTableCell>
                <StyledRewardsTableCell sx={{ fontWeight: 400 }}>
                  {data.location?.name}
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
