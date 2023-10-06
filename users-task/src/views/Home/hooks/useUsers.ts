import { baseUrl } from '@/utilities/api';
import axios from 'axios';
import { useQuery, UseQueryOptions, useMutation } from '@tanstack/react-query';
import { queryKeys } from '@/utilities/queryKeys';
import { TUser } from '@/utilities/types';
import { useUserContext } from '@/context/UserContext';
import { useSnackbar } from 'notistack';

const getUsers = async () => {
  const response = await axios.get<TUser[]>(baseUrl); // Specify the User[] type here
  return response.data;
};

export const useUsers = (options?: UseQueryOptions<TUser[]>) => {
  const defaultQueryOptions: UseQueryOptions<TUser[]> = {
    queryKey: [queryKeys.users],
  };

  const query = useQuery<TUser[]>({
    ...defaultQueryOptions,
    ...options,
    queryFn: getUsers,
  });

  return query;
};

const getUser = async (id?: string) => {
  const response = await axios.get<TUser>(`${baseUrl}/${id}`); // Specify the User[] type here
  return response.data;
};

export const useUser = (id?: string, options?: UseQueryOptions<TUser>) => {
  const defaultQueryOptions: UseQueryOptions<TUser> = {
    queryKey: [queryKeys.user, id],
  };

  const query = useQuery<TUser>({
    ...defaultQueryOptions,
    ...options,
    queryFn: () => getUser(id),
    enabled: id !== undefined,
  });

  return query;
};

const postUser = async (user: TUser) => {
  const response = await axios.post<TUser>(baseUrl, user);
  return response.data;
};

export const usePostUser = () => {
  const { setUsers } = useUserContext();
  const { enqueueSnackbar } = useSnackbar();
  const mutate = useMutation((data: TUser) => postUser(data), {
    onSuccess: (data) => {
      setUsers((prevUsers) => [...prevUsers, data]);
      enqueueSnackbar('User added succesfully', { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar('Oops, something went wrong', { variant: 'error' });
    },
  });

  return mutate;
};

const putUser = async (user: TUser) => {
  const response = await axios.put<TUser>(`${baseUrl}/${user.id}`, user);
  return response.data;
};

export const usePutUser = () => {
  const { setUsers } = useUserContext();
  const { enqueueSnackbar } = useSnackbar();

  const mutate = useMutation((data: TUser) => putUser(data), {
    onSuccess: (data) => {
      setUsers((prevUsers) => {
        return prevUsers.map((user) => {
          if (user.id === data.id) {
            return data;
          }
          return user;
        });
      });
      enqueueSnackbar('User edited succesfully', { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar('Oops, something went wrong', { variant: 'error' });
    },
  });

  return mutate;
};

const deleteUser = async (userId: number | undefined) => {
  await axios.delete(`${baseUrl}/${userId}`);
  return userId;
};

export const useDeleteUser = () => {
  const { setUsers } = useUserContext();
  const { enqueueSnackbar } = useSnackbar();
  const mutate = useMutation(
    (userId: number | undefined) => deleteUser(userId),
    {
      onSuccess: (deletedUserId) => {
        setUsers((prevUsers) => {
          return prevUsers.filter((user) => user.id !== deletedUserId);
        });
        enqueueSnackbar('User deleted succesfully', { variant: 'success' });
      },
      onError: () => {
        enqueueSnackbar('Oops, something went wrong', { variant: 'error' });
      },
    }
  );

  return mutate;
};
