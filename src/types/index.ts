export type GhgEmission = {
    yearMonth: string; // "2025-01"
    source: string; // gasoline, lpg, diesel, etc
    emissions: number; // tons of CO2 equivalent
  };
  
  export type Company = {
    id: string;
    name: string;
    country: string; // country code like "US"
    emissions: GhgEmission[];
  };
  
  export type Post = {
    id: string;
    title: string;
    resourceUid: string; // Company.id
    dateTime: string; // "2024-02"
    content: string;
  };
  