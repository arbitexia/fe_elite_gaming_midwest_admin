import { Typography, Table, TableBody } from '@mui/material';
import { UIFlexSpaceBox } from '@/components/UI';
import {
  StyledUserDetailCard,
  StyledUserRequestButton,
  StyledUserTableCell,
  StyledRequestTableRow,
} from './ui';
import { PointType } from '@/types';

interface UserDetailPointsCardProps {
  points: PointType[] | PointType | null;
}

const UserDetailPointsCard = ({ points }: UserDetailPointsCardProps) => {
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
          {points &&
            Array.isArray(points) &&
            points.map((data) => {
              return (
                <StyledRequestTableRow key={data.id}>
                  <StyledUserTableCell>#{data.id}</StyledUserTableCell>
                  <StyledUserTableCell
                    sx={{ color: '#008A83', fontWeight: 500 }}
                  >
                    {data.point} points
                  </StyledUserTableCell>
                  <StyledUserTableCell sx={{ color: '#06251F' }}>
                    {data.userLocation?.location?.address
                      ? `${data.userLocation.location.address.address1 ?? ''} ${
                          data.userLocation.location.address.address2 ?? ''
                        } ${data.userLocation.location.address.city ?? ''} ${
                          data.userLocation.location.address.state ?? ''
                        } ${data.userLocation.location.address.zipcode ?? ''} ${
                          data.userLocation.location.address.country ?? ''
                        }`
                      : ''}
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
