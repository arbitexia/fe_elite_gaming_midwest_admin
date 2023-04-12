import { Typography, Table, TableBody } from '@mui/material';
import { UIChip, UIFlexCenterBox, UIFlexSpaceBox } from '@/components/UI';
import {
  StyledUserDetailCard,
  StyledUserRequestButton,
  StyledRequestTableCell,
  StyledRequestTableRow,
} from './ui';
import { getColor } from '@/libs/data-helper';
import { TransactionType } from '@/types';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import Link from 'next/link';

type UserDetailRequestCardProps = {
  requests: TransactionType.Data[];
};
const UserDetailRequestCard = ({ requests }: UserDetailRequestCardProps) => {
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
          Recent Requests
        </Typography>
        <StyledUserRequestButton onClick={() => router.push('/requests')}>
          View more
        </StyledUserRequestButton>
      </UIFlexSpaceBox>
      {requests.length === 0 && (
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
          borderSpacing: '0 1px',
        }}
      >
        <TableBody>
          {requests?.map((data, index) => {
            return (
              <StyledRequestTableRow key={index}>
                <StyledRequestTableCell>#{data.id}</StyledRequestTableCell>
                <StyledRequestTableCell>
                  <Link
                    href={`/products/${data.reward.product?.id}`}
                    legacyBehavior
                  >
                    <a target="_blank" rel="noopener noreferrer">
                      {data.reward.product?.name}
                    </a>
                  </Link>
                </StyledRequestTableCell>
                <StyledRequestTableCell>
                  <Link href={`/locations/${data.location.id}`} legacyBehavior>
                    <a target="_blank" rel="noopener noreferrer">
                      {data.location.name}
                    </a>
                  </Link>
                </StyledRequestTableCell>
                <StyledRequestTableCell>
                  {data.reward?.point} points
                </StyledRequestTableCell>
                <StyledRequestTableCell>
                  <UIChip label={data.status} color={getColor(data.status)} />
                </StyledRequestTableCell>
                <StyledRequestTableCell>
                  {format(new Date(data.createdAt), 'dd MMM KK:mm aa')}
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
