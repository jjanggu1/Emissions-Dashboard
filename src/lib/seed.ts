import type { CompanyType, PostType } from "@/types";

// Seed data example
/*
export const companies: Company[] = [
  {
    id: "c1",
    name: "Acme Corp",
    country: "US",
    emissions: [{ "yearMonth": "2024-01",  "emissions": 120}, { "yearMonth": "2024-02": "emissions": 110}, {"yearMonth": "2024-03": "emissions": 95 }]
  },
  {
    id: "c2",
    name: "Globex",
    country: "DE",
    emissions: [{ "yearMonth": "2024-01",  "emissions": 80}, { "yearMonth": "2024-02": "emissions": 105}, {"yearMonth": "2024-03": "emissions": 120 }]
  }
];

export const posts: Post[] = [
  {
    id: "p1",
    title: "Sustainability Report",
    resourceUid: "c1",
    dateTime: "2024-02",
    content: "Quarterly CO2 update"
  }
];
*/


// 1년치 월별 데이터 생성
function generateEmissions(year: number, base: number) {
  const sources = ["gasoline", "diesel", "lpg", "etc"];
  return Array.from({ length: 12 }, (_, i) => {
    const month = (i + 1).toString().padStart(2, "0");
    return {
      yearMonth: `${year}-${month}`,
      source: sources[Math.floor(Math.random() * sources.length)],
      emissions: Math.floor(base + Math.random() * 50), // base +- 50
    };
  });
}

export const companies: CompanyType[] = [
  {
    id: "c1",
    name: "Acme Corp",
    country: "US",
    emissions: [
      ...generateEmissions(2023, 1800),
      ...generateEmissions(2024, 1400),
      ...generateEmissions(2025, 1100),
    ],
  },
  {
    id: "c2",
    name: "Globex",
    country: "DE",
    emissions: [
      ...generateEmissions(2023, 1600),
      ...generateEmissions(2024, 1200),
      ...generateEmissions(2025, 1100),
    ],
  },
  {
    id: "c3",
    name: "Initech",
    country: "KR",
    emissions: [
      ...generateEmissions(2023, 1500),
      ...generateEmissions(2024, 1000),
      ...generateEmissions(2025, 800),
    ],
  },
  {
    id: "c4",
    name: "Umbrella Corp",
    country: "JP",
    emissions: [
      ...generateEmissions(2023, 1800),
      ...generateEmissions(2024, 1600),
      ...generateEmissions(2025, 1200),
    ],
  },
  {
    id: "c5",
    name: "Soylent Industries",
    country: "FR",
    emissions: [
      ...generateEmissions(2023, 1700),
      ...generateEmissions(2024, 1300),
      ...generateEmissions(2025, 1100),
    ],
  },
];

export const posts: PostType[] = [
  {
    id: "p1",
    title: "Sustainability Report Q1",
    resourceUid: "c1",
    dateTime: "2024-03",
    content: "Acme Corp reduced CO2 emissions by 10% compared to last quarter.",
  },
  {
    id: "p2",
    title: "Energy Shift Update",
    resourceUid: "c2",
    dateTime: "2024-06",
    content: "Globex invested in renewable energy projects in Europe.",
  },
  {
    id: "p3",
    title: "Carbon Neutral Goal",
    resourceUid: "c3",
    dateTime: "2024-09",
    content: "Initech announced plan to be carbon neutral by 2030.",
  },
  {
    id: "p4",
    title: "Nuclear Energy Report",
    resourceUid: "c4",
    dateTime: "2025-01",
    content: "Umbrella Corp shifted 30% of its energy to nuclear.",
  },
  {
    id: "p5",
    title: "Green Supply Chain",
    resourceUid: "c5",
    dateTime: "2025-04",
    content: "Soylent Industries optimized logistics to cut diesel usage.",
  },
];
