import type { Company, Post } from "@/types";

export const countries = [
  { code: "US", name: "United States" },
  { code: "DE", name: "Germany" },
  { code: "KR", name: "South Korea" },
  { code: "JP", name: "Japan" },
  { code: "FR", name: "France" },
];

// 1년치 월별 데이터 생성
function generateEmissions(year: number, base: number) {
  const sources = ["gasoline", "diesel", "lpg", "electricity"];
  return Array.from({ length: 12 }, (_, i) => {
    const month = (i + 1).toString().padStart(2, "0");
    return {
      yearMonth: `${year}-${month}`,
      source: sources[Math.floor(Math.random() * sources.length)],
      emissions: Math.floor(base + Math.random() * 50), // base +- 50
    };
  });
}

export const companies: Company[] = [
  {
    id: "c1",
    name: "Acme Corp",
    country: "US",
    emissions: [
      ...generateEmissions(2024, 120),
      ...generateEmissions(2025, 130),
    ],
  },
  {
    id: "c2",
    name: "Globex",
    country: "DE",
    emissions: [
      ...generateEmissions(2024, 90),
      ...generateEmissions(2025, 100),
    ],
  },
  {
    id: "c3",
    name: "Initech",
    country: "KR",
    emissions: [
      ...generateEmissions(2024, 70),
      ...generateEmissions(2025, 85),
    ],
  },
  {
    id: "c4",
    name: "Umbrella Corp",
    country: "JP",
    emissions: [
      ...generateEmissions(2024, 150),
      ...generateEmissions(2025, 160),
    ],
  },
  {
    id: "c5",
    name: "Soylent Industries",
    country: "FR",
    emissions: [
      ...generateEmissions(2024, 60),
      ...generateEmissions(2025, 75),
    ],
  },
];

export const posts: Post[] = [
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
