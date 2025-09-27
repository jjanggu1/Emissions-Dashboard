"use client";

import { usePostsStore, useCompanyStore } from "@/store/store";

export default function CarbonReport() {
  const { posts } = usePostsStore();
  const { companies } = useCompanyStore();

  const newsPosts = posts.sort((a, b) => {
    const dateA = new Date(a.dateTime);
    const dateB = new Date(b.dateTime);
    return dateB.getTime() - dateA.getTime();
  });

  const formatYearMonth = (ym: string) => {
    const [year, month] = ym.split("-");
    return `${year}년 ${Number(month)}월`;
  };

  const formatCompanyName = (resourceUid: string) => {
    const company = companies.find((company) => company.id === resourceUid);
    return company?.name;
  };

  return (
    <div className="w-full h-screen max-h-[calc(100vh-200px)] overflow-y-auto flex-1">
      <h1 className="text-2xl font-bold">탄소 리포트</h1>
      {newsPosts?.map((post) => (
        <div className="flex flex-col gap-2 max-w-[400px] mb-4">
          <h2 className="mt-4 font-semibold">
            {formatCompanyName(post.resourceUid)}
          </h2>
          <div className="bg-white p-4 border border-gray-100 rounded-lg shadow-sm flex flex-col gap-1">
            <h2 className="text-lg font-bold">{post.title}</h2>
            <p className="text-sm text-gray-500">
              {formatYearMonth(post.dateTime)}
            </p>
            <p className="">{post.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
