import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface User {
  name: string;
  email: string;
  company: {
    name: string;
  };
}

interface FetchUsersParams {
  page: number;
}

const ITEMS_PER_PAGE = 5;

export const fetchUsers = async ({ page = 1 }: FetchUsersParams) => {
  const { data } = await axios.get<User[]>(
    `https://jsonplaceholder.typicode.com/users`
  );
  
  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginatedData = data.slice(start, start + ITEMS_PER_PAGE);
  
  return {
    users: paginatedData,
    totalPages: Math.ceil(data.length / ITEMS_PER_PAGE),
    totalItems: data.length,
  };
};

export const useUsers = (page: number) => {
  return useQuery({
    queryKey: ["users", page],
    queryFn: () => fetchUsers({ page }),
  });
};