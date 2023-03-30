import { CommonType } from '@/types';
import { TablePagination } from '@mui/material';

const TabletsPagination = ({
  page,
  rowsPerPage,
  total,
  setPage,
  setRowsPerPage,
}: CommonType.PaginationProps) => {
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
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
      count={total}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

export default TabletsPagination;
