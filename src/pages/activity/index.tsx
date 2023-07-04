import { useState, useEffect, useRef } from 'react';
import {
  ActivityHeader,
  ActivityTable,
  ActivityPagination,
} from '@/modules/Activity';
import { DashboardLayout } from '@/layouts';
import { ActivityItemType, ExportActivityType } from '@/types';
import { Divider } from '@mui/material';
import { useActivity } from '@/hooks';
import { CSVLink } from 'react-csv';
import { format } from 'date-fns';

const ActivityPage = () => {
  const { activities, onFilterActivities, pageInfo, onDeleteActivity } =
    useActivity();
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState('ALL');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [csvData, setCsvData] = useState<any[]>([]);
  const [sort, setSort] = useState('id|desc');
  const [isChanged, setIsChanged] = useState(false);
  const csvLinkRef = useRef<
    CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }
  >(null);

  useEffect(() => {
    fetchActivities();
    if (isChanged) {
      setIsChanged(false);
    }
  }, [page, rowsPerPage, searchValue, searchType, sort, isChanged]);

  const fetchActivities = async () => {
    try {
      await onFilterActivities({
        filterBy: {
          search: searchValue,
          modelType: searchType,
          sort,
        },
        cursor: { page, size: rowsPerPage },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const generateTableData = () => {
    const details: ExportActivityType[] = activities.map((obj) => {
      return {
        id: obj.id,
        user: `${obj.user?.firstName ?? ''} ${obj.user?.lastName ?? ''}`,
        date: format(new Date(obj.createdAt), 'yyyy-MM-dd yy:mm'),
        model: obj.model,
        type: obj.type,
        status: obj.attributes.status,
        description: obj.attributes.description,
        ...(obj.attributes.body && {
          body: JSON.stringify(obj.attributes?.body ?? '').replaceAll(',', ' '),
        }),
      };
    });
    return details;
  };

  const handleExport = async () => {
    const detailsOfCSV = generateTableData();
    if (!detailsOfCSV) return;
    setCsvData(detailsOfCSV);
    setTimeout(() => {
      csvLinkRef.current?.link?.click();
    });
  };

  const handleDelete = async (value: ActivityItemType) => {
    try {
      await onDeleteActivity(value.id);
      setIsChanged(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DashboardLayout title="Activities">
      <ActivityHeader
        searchValue={searchValue}
        searchType={searchType}
        onValueChange={(value: string) => setSearchValue(value)}
        onTypeChange={(value: string) => setSearchType(value)}
        onCSVExport={handleExport}
      />
      <CSVLink
        data={csvData}
        filename={'activities.csv'}
        target="_blank"
        ref={csvLinkRef}
      ></CSVLink>
      <Divider sx={{ mt: '30px' }} />
      <ActivityTable
        activityTableData={activities}
        onSort={setSort}
        onDelete={handleDelete}
      />
      <ActivityPagination
        page={page}
        rowsPerPage={rowsPerPage}
        total={pageInfo?.total ?? 0}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
      />
    </DashboardLayout>
  );
};

export default ActivityPage;
