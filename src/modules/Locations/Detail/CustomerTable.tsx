import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { TableHead, TableBody, TableRow, Typography } from '@mui/material';

import {
  UICardBox,
  UIChip,
  UITable,
  UITableRow,
  UITableCell,
} from '@/components/UI';
import { getColor } from '@/libs/data-helper';
import { useUserLocation } from '@/hooks';
import { UserLocationsType } from '@/types';
import LocationPagination from './Pagination';

const LocationDetailCustomerTable = () => {
  const router = useRouter();
  const { id: locationId } = router.query;
  const { userLocations, onGetUserLocationById, pageInfo } = useUserLocation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  useEffect(() => {
    if (locationId) {
      fetchUserLocations();
    }
  }, [page, rowsPerPage, locationId]);

  const fetchUserLocations = async () => {
    await onGetUserLocationById({
      filterBy: { locationId: Number(locationId ?? 0) },
      cursor: { page: page, size: rowsPerPage },
    });
  };
  return (
    <UICardBox sx={{ marginTop: '30px' }}>
      <Typography
        sx={{
          fontWeight: '600',
          fontSize: '18px',
          lineHeight: '17px',
          color: '#222B35',
        }}
      >
        Customers
      </Typography>
      <UITable size="small">
        <TableHead>
          <TableRow>
            <UITableCell>ID</UITableCell>
            <UITableCell>Name</UITableCell>
            <UITableCell>Phone</UITableCell>
            <UITableCell>Status</UITableCell>
            <UITableCell>Created At</UITableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userLocations && userLocations?.length > 0 ? (
            userLocations.map((item: UserLocationsType) => {
              return (
                <UITableRow key={item.id}>
                  <UITableCell
                    onClick={() =>
                      router.push(`/users/customers/${item?.user?.id}`)
                    }
                    sx={{ cursor: 'pointer' }}
                  >
                    #{item.id}
                  </UITableCell>
                  <UITableCell>{item.user?.userName}</UITableCell>
                  <UITableCell>{item.user?.phone}</UITableCell>
                  <UITableCell>
                    <UIChip
                      label={item.user?.status}
                      color={getColor(item.user?.status ?? 'error')}
                    />
                  </UITableCell>
                  <UITableCell sx={{ color: '#B3B3B3 !important' }}>
                    {item.user?.createdAt
                      ? format(
                          new Date(item.user.createdAt),
                          'yyyy-MM-dd hh:mm'
                        )
                      : ''}
                  </UITableCell>
                </UITableRow>
              );
            })
          ) : (
            <UITableRow
              sx={{
                position: 'relative',
                backgroundColor: 'transparent !important',
              }}
            >
              <UITableCell colSpan={6} sx={{ textAlign: 'center' }}>
                No Data
              </UITableCell>
            </UITableRow>
          )}
        </TableBody>
      </UITable>
      <LocationPagination
        page={page}
        rowsPerPage={rowsPerPage}
        total={pageInfo?.total ?? 0}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
      />
    </UICardBox>
  );
};

export default LocationDetailCustomerTable;
