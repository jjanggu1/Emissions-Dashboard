import { create } from 'zustand';
import { SidebarStore, CompaniesType, PostsType, BaseYearsType } from '@/types';

// Sidebar Store
export const useSidebarStore = create<SidebarStore>((set) => ({
  isOpen: false,
  openSidebar: () => set({ isOpen: true }),
  closeSidebar: () => set({ isOpen: false }),
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
}));

// Main(ChartDashboard) Store
export const useBaseYearsStore = create<BaseYearsType>((set) => ({
  baseYears: "2025",
  baseYearsList: [],
  setBaseYears: (baseYears) => set({ baseYears }),
  setBaseYearsList: (baseYearsList) => set({ baseYearsList }),
}));

export const useCompanyStore = create<CompaniesType>((set) => ({
  companies: [
    {
      id: "",
      name: "",
      country: "",
      emissions: [],
    },
  ],

  setCompanies: (companies) => set({ companies }),
}));

export const usePostsStore = create<PostsType>((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
}));