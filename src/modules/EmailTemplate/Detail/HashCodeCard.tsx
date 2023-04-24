import React, { useEffect } from 'react';
import { Typography, Table, TableBody } from '@mui/material';
import { UIChip, UIFlexCenterBox, UIFlexSpaceBox } from '@/components/UI';
import {
  StyledUserDetailCard,
  StyledRequestTableCell,
  StyledRequestTableRow,
} from './ui';
import { getColor } from '@/libs/data-helper';
import { format } from 'date-fns';
import { useHashCode } from '@/hooks';

const HashCodeCard = () => {
  const { hashCodes, onGetHashCodes } = useHashCode();

  useEffect(() => {
    onGetHashCodes();
  }, []);

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
          Hash Codes
        </Typography>
      </UIFlexSpaceBox>
      {hashCodes?.length === 0 && (
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
          {hashCodes?.map((data, index) => {
            return (
              <StyledRequestTableRow key={index}>
                <StyledRequestTableCell>#{data.id}</StyledRequestTableCell>
                <StyledRequestTableCell>{data.name}</StyledRequestTableCell>
                <StyledRequestTableCell>{data.model}</StyledRequestTableCell>
                <StyledRequestTableCell>{data.field}</StyledRequestTableCell>
                <StyledRequestTableCell>
                  <UIChip label={data.status} color={getColor(data.status)} />
                </StyledRequestTableCell>
                <StyledRequestTableCell>
                  {format(new Date(data?.createdAt ?? ''), 'dd MMM KK:mm aa')}
                </StyledRequestTableCell>
              </StyledRequestTableRow>
            );
          })}
        </TableBody>
      </Table>
    </StyledUserDetailCard>
  );
};

export default HashCodeCard;
