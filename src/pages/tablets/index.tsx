import { useState, useEffect } from 'react';
import { Divider } from '@mui/material';
import { DashboardLayout } from '@/layouts';
import { useTablet } from '@/hooks';
import {
  ChangePasswordDialog,
  TabletDialog,
  TabletsListHeader,
  TabletsListPagination,
  TabletsListTable,
} from '@/modules/Tablets';
import { TabletType } from '@/types';

const TabletsPage = () => {
  const { tablets, pageInfo, onGetTablets } = useTablet();
  const [searchValue, setSearchValue] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTablet, setSelectedTablet] = useState<TabletType.Data>();
  const [openChangePwdModal, setOpenChangePwdModal] = useState(false);

  useEffect(() => {
    fetchTablets();
  }, [filterStatus, page, rowsPerPage, searchValue]);

  const fetchTablets = (sort?: string) => {
    onGetTablets({
      filterBy: {
        status: filterStatus,
        search: searchValue,
        sort,
      },
      cursor: { page: page, size: rowsPerPage },
    });
  };

  const handleTableAction = (
    data: TabletType.Data,
    type: 'edit' | 'change_password'
  ) => {
    if (data && type === 'edit') {
      setSelectedTablet(data);
      setOpenModal(true);
    } else if (data && type === 'change_password') {
      setSelectedTablet(data);
      setOpenChangePwdModal(true);
    }
  };

  return (
    <DashboardLayout title="Tablets">
      <TabletsListHeader
        searchValue={searchValue}
        filterStatus={filterStatus}
        setSearchValue={setSearchValue}
        setFilterStatus={setFilterStatus}
        onCreate={() => setOpenModal(true)}
      />
      <Divider sx={{ mt: '30px' }} />
      <TabletsListTable
        tabletsTableData={tablets}
        onAction={handleTableAction}
        onSort={fetchTablets}
      />
      <TabletsListPagination
        page={page}
        rowsPerPage={rowsPerPage}
        total={pageInfo?.total ?? 0}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
      />
      <TabletDialog
        selectedTablet={selectedTablet}
        open={openModal}
        actionType={selectedTablet ? 'edit' : 'create'}
        onClose={() => {
          setOpenModal(false);
          setSelectedTablet(undefined);
        }}
      />

      <ChangePasswordDialog
        selectedTablet={selectedTablet}
        open={openChangePwdModal}
        title={'Change password'}
        onClose={() => {
          setOpenChangePwdModal(false);
          setSelectedTablet(undefined);
        }}
      />
    </DashboardLayout>
  );
};

export default TabletsPage;
