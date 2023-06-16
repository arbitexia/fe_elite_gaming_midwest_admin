import { useState, useEffect } from 'react';
import { Divider } from '@mui/material';
import {
  FollowUpEmailDialog,
  SendEmailDialog,
  UsersListHeader,
  UsersListPagination,
  UsersListTable,
} from '@/modules/Users';
import { DashboardLayout } from '@/layouts';
import { slugIndex } from '@/constants/user';
import { useRouter } from 'next/router';
import { useAuth, useEmailTemplate, useLocation, useUser } from '@/hooks';
import { EmailTemplateType, UserType } from '@/types';
import ConfirmModal from '@/components/App/Modal/ConfirmModal';
import { UserRoleIDEnum } from '@/constants';

const UsersListPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { users, pageInfo, onGetUsers, onDeleteUser } = useUser();
  const { locations, onGetLocations } = useLocation();
  const { me } = useAuth();
  const {
    emailTemplates,
    onGetEmailTemplates,
    onSendCampaignEmail,
    onFollowUpEmail,
  } = useEmailTemplate();

  const [searchValue, setSearchValue] = useState('');
  const [searchStatus, setSearchStatus] = useState('ALL');
  const [searchLocation, setSearchLocation] = useState('ALL');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>();
  const [followUpCustomerId, setFollowUpCustomerId] = useState<number>();
  const [deletedCustomerId, setDeletedCustomerId] = useState<number>();

  useEffect(() => {
    if (!locations) {
      onGetLocations({
        filterBy: {
          search: '',
          ...((me as UserType.User)?.roleId === UserRoleIDEnum.ADMIN && {
            userId: Number((me as UserType.User).id),
          }),
        },
      });
    }
  }, [locations]);

  useEffect(() => {
    if (!emailTemplates) {
      onGetEmailTemplates({
        filterBy: {
          search: '',
        },
        cursor: { page: 0, size: 1000 },
      });
    }
  }, [emailTemplates]);

  useEffect(() => {
    if (slug && !deletedCustomerId) {
      handleSearch();
    }
  }, [
    searchValue,
    searchStatus,
    searchLocation,
    page,
    rowsPerPage,
    slug,
    deletedCustomerId,
  ]);

  const handleSearch = () => {
    onGetUsers({
      filterBy: {
        type: slugIndex[slug as keyof typeof slugIndex],
        status: searchStatus,
        search: searchValue,
        location: searchLocation,
      },
      cursor: { page: page, size: rowsPerPage },
    });
  };

  const handleSendEmail = (values: EmailTemplateType.UserCampaignType) => {
    onSendCampaignEmail({
      ...values,
      ...(selectedUserIds &&
        selectedUserIds?.length > 0 && { customerIds: selectedUserIds }),
    });
  };

  return (
    <DashboardLayout title="Users">
      <UsersListHeader
        onSearch={handleSearch}
        searchValue={searchValue}
        searchStatus={searchStatus}
        searchLocation={searchLocation}
        setSearchValue={setSearchValue}
        setSearchStatus={setSearchStatus}
        setSearchLocation={setSearchLocation}
        onOpenSendEmail={() => setOpenEmailModal(true)}
      />
      <Divider sx={{ mt: '30px' }} />
      <UsersListTable
        usersTableData={users}
        onSelectedUserIds={(ids: string[]) => setSelectedUserIds(ids)}
        onFollowupCustomer={(cid: number) => {
          setFollowUpCustomerId(cid);
        }}
        onDeleteCustomer={(cid: number) => {
          setDeletedCustomerId(cid);
        }}
      />
      <UsersListPagination
        page={page}
        rowsPerPage={rowsPerPage}
        total={pageInfo?.total ?? 0}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
      />

      <FollowUpEmailDialog
        open={!!followUpCustomerId}
        onClose={() => {
          setFollowUpCustomerId(undefined);
        }}
        title="Follow-up Email"
        onFollowUpEmail={(values) => {
          if (values.templateId > 0) {
            if (followUpCustomerId) {
              onSendCampaignEmail({
                templateId: values.templateId,
                locationId: 0,
                customerIds: [followUpCustomerId.toString()],
              });
            }
          } else {
            onFollowUpEmail({
              ...values,
              to: users.find((obj) => obj.id === followUpCustomerId)?.email,
            });
          }
        }}
      />
      <SendEmailDialog
        onClose={() => {
          setOpenEmailModal(false);
        }}
        open={openEmailModal}
        title="Send Email"
        onSendEmail={handleSendEmail}
        isSelectedUser={
          selectedUserIds && selectedUserIds?.length > 0 ? true : false
        }
      />
      <ConfirmModal
        open={!!deletedCustomerId}
        onClose={() => {
          setDeletedCustomerId(undefined);
        }}
        title="Delete"
        content="Are you sure you want to remove this user?"
        onAction={async () => {
          if (deletedCustomerId) {
            onDeleteUser(deletedCustomerId);
            setDeletedCustomerId(undefined);
          }
        }}
      />
    </DashboardLayout>
  );
};

export default UsersListPage;
