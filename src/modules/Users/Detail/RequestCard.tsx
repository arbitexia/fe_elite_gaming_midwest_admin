import { Typography, Table, TableBody } from '@mui/material';
import { UIChip, UIFlexSpaceBox } from '@/components/UI';
import {
  StyledUserDetailCard,
  StyledUserRequestButton,
  StyledRequestTableCell,
  StyledRequestTableRow,
} from './ui';
import { userRequestData } from '@/_mock/users';
import { getColor } from '@/libs/data-helper';

const UserDetailRequestCard = () => {
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
          Recent Request
        </Typography>
        <StyledUserRequestButton>View more</StyledUserRequestButton>
      </UIFlexSpaceBox>
      <Table
        size="small"
        sx={{
          marginTop: '25px',
          borderCollapse: 'separate',
          borderSpacing: '0 1px',
        }}
      >
        <TableBody>
          {userRequestData.map((data) => {
            return (
              <StyledRequestTableRow key={data.id}>
                <StyledRequestTableCell>#{data.id}</StyledRequestTableCell>
                <StyledRequestTableCell>
                  {data.rewardName}
                </StyledRequestTableCell>
                <StyledRequestTableCell>{data.location}</StyledRequestTableCell>
                <StyledRequestTableCell>
                  {data.point} points
                </StyledRequestTableCell>
                <StyledRequestTableCell>
                  <UIChip label={data.status} color={getColor(data.status)} />
                </StyledRequestTableCell>
                <StyledRequestTableCell>
                  {data.createdAt}
                </StyledRequestTableCell>
              </StyledRequestTableRow>
            );
          })}
        </TableBody>
      </Table>
    </StyledUserDetailCard>
  );
};

export default UserDetailRequestCard;
