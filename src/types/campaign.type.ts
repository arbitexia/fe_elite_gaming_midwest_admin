export declare namespace CampaignType {
  type Data = {
    id: number;
    name: string;
    type: string;
    offer: number;
    status: number;
    total: number;
    redeemed: number;
    startDate: string;
    endDate: string;
    createdAt?: string;
  };

  type Param = { id: number };

  type Body = {
    input: {
      id?: number;
      name: string;
      status: string;
    };
  };

  type Filter = {
    filterBy: {
      search: string;
      sort?: string;
    };
    cursor: {
      page: number;
      size: number;
    };
  };
}
