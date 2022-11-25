import { Typography, Table, TableBody } from '@mui/material';
import { UIFlexSpaceBox } from '@/components/UI';
import {
  StyledUserDetailCard,
  StyledUserRequestButton,
  StyledUserTableCell,
  StyledRequestTableRow,
} from './ui';
import { userPointsData } from '@/_mock/users';

const UserDetailPointsCard = () => {
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
          Points
        </Typography>
        <StyledUserRequestButton>Load more</StyledUserRequestButton>
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
          {userPointsData.map((data) => {
            return (
              <StyledRequestTableRow key={data.id}>
                <StyledUserTableCell>#{data.id}</StyledUserTableCell>
                <StyledUserTableCell sx={{ color: '#008A83', fontWeight: 500 }}>
                  {data.point} points
                </StyledUserTableCell>
                <StyledUserTableCell sx={{ color: '#06251F' }}>
                  {data.location}
                </StyledUserTableCell>
                <StyledUserTableCell sx={{ fontWeight: 500 }}>
                  {data.updatedAt}
                </StyledUserTableCell>
              </StyledRequestTableRow>
            );
          })}
        </TableBody>
      </Table>
    </StyledUserDetailCard>
  );
};

export default UserDetailPointsCard;
