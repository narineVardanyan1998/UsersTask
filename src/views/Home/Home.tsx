import { useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from './Table';

import { useDeleteUser, usePutUser, useUsers } from './hooks/useUsers';
import { TUser } from '@/utilities/types';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { MoreHorizontal } from 'lucide-react';
import { UserForm } from '@/components/UserForm';
import { useUserContext } from '@/context/UserContext';
import { DialogClose } from '@radix-ui/react-dialog';
import { BallTriangle } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();
  const { users, setUsers } = useUserContext();
  const { data, isLoading: usersLoading } = useUsers();

  const { mutate: editUser, isLoading: editLoading } = usePutUser();
  const { mutate: deleteUser, isLoading: deleteLoading } = useDeleteUser();

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data, setUsers]);

  const handleSubmit = (values: TUser) => {
    editUser(values);
  };
  const columns: ColumnDef<TUser>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'address.city',
      header: 'City',
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const user = row.original;

        return (
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <Dialog>
                  <DialogTrigger className="w-full">
                    <DropdownMenuItem
                      onSelect={(e) => e.preventDefault()}
                      className="cursor-pointer"
                    >
                      Edit User
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit User</DialogTitle>
                    </DialogHeader>
                    <UserForm
                      defaultValues={{
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        address: { city: user.address.city },
                      }}
                      onSubmit={handleSubmit}
                    />
                  </DialogContent>
                </Dialog>
                <DropdownMenuSeparator />
                <Dialog>
                  <DialogTrigger className="w-full">
                    <DropdownMenuItem
                      onSelect={(e) => e.preventDefault()}
                      className="cursor-pointer"
                    >
                      Delete item
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                      <Button onClick={() => deleteUser(user.id)}>Yes</Button>
                      <DialogClose asChild>
                        <Button>No</Button>
                      </DialogClose>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => navigate(`/user/${row.original.id}`)}
                >
                  User Details
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Dialog>
        );
      },
    },
  ];
  return (
    <div className="container mx-auto py-10 ">
      {usersLoading || editLoading || deleteLoading ? (
        <div className="flex justify-center items-center">
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            visible={true}
          />
        </div>
      ) : (
        <DataTable columns={columns} data={users || []} />
      )}
    </div>
  );
};
