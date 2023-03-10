import { useState } from 'react';
import { TablePagination } from '@mui/material';

export default function RequestsPagination() {
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      sx={{
        marginTop: '20px',
        '.MuiTablePagination-selectLabel': {
          fontWeight: 500,
          fontSize: 13,
          color: '#83A9A8',
        },
        '.MuiTablePagination-displayedRows': {
          fontWeight: 500,
          fontSize: 12,
          color: '#667180',
        },
        '.MuiIconButton-root': {
          color: '#83A9A8',
        },
      }}
      component="div"
      count={100}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
