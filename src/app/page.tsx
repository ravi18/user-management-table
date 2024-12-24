"use client";

import TableSkeleton from "@/components/table-skeleton";
import Table from "@/components/user-table";
import { useUsers } from "@/hooks/useUsers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Suspense } from "react";

const queryClient = new QueryClient();

function TableWrapper() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const page = Number(searchParams?.get("page")) || 1;
  const { data, isLoading, error } = useUsers(page);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  if (isLoading) return <TableSkeleton/>;
  if (error) return <div>Error loading data</div>;
  if (!data) return null;

  return (
    <Table 
      data={data.users} 
      currentPage={page}
      totalPages={data.totalPages}
      onPageChange={handlePageChange}
    />
  );
}

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container py-10">
      <Suspense fallback={<TableSkeleton />}>
        <TableWrapper />
        </Suspense>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}