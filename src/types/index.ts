// Main Data Types
export type BaseYearsType = {
    baseYears: string;
    baseYearsList: string[];
    setBaseYears: (baseYears: string) => void;
    setBaseYearsList: (baseYearsList: string[]) => void;
  };

export type GhgEmissionType = {
    yearMonth: string; // "2025-01"
    source: string; // gasoline, lpg, diesel, etc
    emissions: number; // tons of CO2 equivalent
  };
  
  export type CompanyType = {
    id: string;
    name: string;
    country: string; // country code like "US"
    emissions: GhgEmissionType[];
    setCompanies?: (companies: CompanyType[]) => void;
  };

  export type CompaniesType = {
    companies: CompanyType[];
    setCompanies: (companies: CompanyType[]) => void;
  };
  
  export type PostType = {
    id: string;
    title: string;
    resourceUid: string; // Company.id
    dateTime: string; // "2024-02"
    content: string;
    setPosts?: (post: PostType[]) => void;
  };

  export type PostsType = {
    posts: PostType[];
    setPosts: (posts: PostType[]) => void;
  };
  

  // Sidebar Store Types
  export interface SidebarStore {
    isOpen: boolean;
    openSidebar: () => void;
    closeSidebar: () => void;
    toggleSidebar: () => void;
  }