export declare namespace CampaignType {
  type Data = {
    id: number;
    name: string;
    model: string;
    type: string;
    offer: number;
    offerType: string;
    status: number;
    total: number;
    redeemed: number;
    startDate: string;
    endDate: string;
    channels: number;
    nextDelivery?: string;
    createdAt?: string;
  };

  type Param = { id: number };

  type Body = {
    input: CampaignType.Data;
  };

  type Filter = {
    filterBy: {
      search: string;
      sort?: string;
    };
    // cursor: {
    //   page: number;
    //   size: number;
    // };
  };
  type OverviewInfo = {
    campaigns: number;
    offerIssued: number;
    offersRedeemed: number;
    Redeemed: number;
  };
}
