import { format } from 'date-fns';
import { Typography, Table, TableBody } from '@mui/material';
import Link from 'next/link';
import { UIFlexSpaceBox, UIFlexCenterBox } from '@/components/UI';
import {
  StyledUserDetailCard,
  StyledUserRequestButton,
  StyledUserTableCell,
  StyledRequestTableRow,
} from './ui';
import { PointType } from '@/types';

interface UserDetailPointsCardProps {
  points: PointType[];
  onLoadMore: () => void;
}

const UserDetailPointsCard = ({
  points,
  onLoadMore,
}: UserDetailPointsCardProps) => {
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
        <StyledUserRequestButton onClick={onLoadMore}>
          Load more
        </StyledUserRequestButton>
      </UIFlexSpaceBox>
      {points.length === 0 && (
        <UIFlexCenterBox>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            No Data Found
          </Typography>
        </UIFlexCenterBox>
      )}
      <Table
        size="small"
        sx={{
          marginTop: '25px',
          borderCollapse: 'separate',
          borderSpacing: '0 5px',
        }}
      >
        <TableBody>
          {points.map((data, index) => {
            return (
              <StyledRequestTableRow key={data.id}>
                <StyledUserTableCell>#{index + 1}</StyledUserTableCell>
                <StyledUserTableCell sx={{ color: '#06251F', fontWeight: 500 }}>
                  <Link
                    href={`/locations/${data.userLocation?.location?.id}`}
                    legacyBehavior
                  >
                    <a target="_blank" rel="noopener noreferrer">
                      {data.userLocation?.location?.name ?? ''}
                    </a>
                  </Link>
                </StyledUserTableCell>
                <StyledUserTableCell sx={{ color: '#008A83', fontWeight: 500 }}>
                  {data.point} points
                </StyledUserTableCell>
                <StyledUserTableCell>
                  <Typography
                    component="p"
                    variant="caption"
                    sx={{ fontWeight: 700 }}
                  >
                    {format(new Date(data.createdAt), 'dd MMM KK:mm aa')}
                  </Typography>
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
