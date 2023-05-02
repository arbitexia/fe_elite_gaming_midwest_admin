export declare namespace EmailTemplateType {
  type Data = {
    id: number;
    name: string;
    templateId: number;
    subject?: string;
    htmlBody?: string;
    status: string;
    category: string;
    createdAt?: string;
  };

  type Param = { id: number };

  type Body = {
    input: {
      id?: number;
      templateId: number;
      name: string;
      status: string;
      category: string;
    };
  };

  type Filter = {
    filterBy: {
      search: string;
    };
    cursor: {
      page: number;
      size: number;
    };
  };

  type SendEmail = {
    id?: number;
    from?: string;
    to: string;
  };

  type SendinBlueEmail = {
    id: number;
    name: string;
    subject: string;
    htmlContent: string;
  };
}
