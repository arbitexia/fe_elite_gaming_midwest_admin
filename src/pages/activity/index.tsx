import { useState, useEffect, useRef } from 'react';
import {
  ActivityHeader,
  ActivityTable,
  ActivityPagination,
} from '@/modules/Activity';
import { DashboardLayout } from '@/layouts';
import { ActivityFilterType, ExportActivityType } from '@/types';
import { Divider } from '@mui/material';
import { useActivity } from '@/hooks/activity';
import { CSVLink } from 'react-csv';
import { format } from 'date-fns';

const ActivityPage = () => {
  const { activities, onFilterActivities, pageInfo } = useActivity();
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState('ALL');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [csvData, setCsvData] = useState<any[]>([]);

  const csvLinkRef = useRef<
    CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }
  >(null);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        await fetchActivities({
          filterBy: {
            search: searchValue,
            modelType: searchType,
          },
          cursor: { page, size: rowsPerPage },
        });
      } catch (error) {
        console.log(error);
      }
    };

    loadActivities();
  }, [page, rowsPerPage, searchValue, searchType]);

  const fetchActivities = async (filter: ActivityFilterType) => {
    await onFilterActivities(filter);
  };

  const handleSort = async (sort: string) => {
    await fetchActivities({
      filterBy: {
        search: searchValue,
        modelType: searchType,
        sort,
      },
      cursor: { page, size: rowsPerPage },
    });
  };

  const generateTableData = () => {
    const details: ExportActivityType[] = activities.map((obj) => {
      return {
        id: obj.id,
        user: `${obj.user.firstName} ${obj.user.lastName}`,
        date: format(new Date(obj.createdAt), 'yyyy-MM-dd'),
        model: obj.model,
        victimId: obj.victimId,
        type: obj.type,
        metadata: JSON.stringify(obj.metadata).replaceAll(',', ' '),
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
      <ActivityTable activityTableData={activities} onSort={handleSort} />
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
