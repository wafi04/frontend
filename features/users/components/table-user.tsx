import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetRoles } from "@/features/roles/hooks/api";
import { UserData } from "@/shared/types/user";
import { formatDate } from "@/utils/format";
import { useState } from "react";
import { useDeleteUser, useUpdateUser } from "../hooks/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function TableUser({ userData }: { userData: UserData[] }) {
  const { mutate: updateUser, isPending: updating } = useUpdateUser();
  const { mutate: deleteUser, isPending: deleting } = useDeleteUser();
  const { data } = useGetRoles();
  const availableRoles = data?.data ?? [];

  const [editingRoles, setEditingRoles] = useState<Record<number, string>>({});
  const [editingBalance, setEditingBalance] = useState<Record<number, number>>(
    {}
  );

  const handleRoleChange = (userId: number, newRole: string) => {
    setEditingRoles((prev) => ({
      ...prev,
      [userId]: newRole,
    }));
  };

  const handleSaveRole = (user: UserData) => {
    const newRoleName = editingRoles[user.id] ?? user.roleName;
    const selectedRole = availableRoles.find((r) => r.name === newRoleName);
    if (!selectedRole) return;

    const newBalance = editingBalance[user.id] ?? user.balance;

    updateUser({
      id: user.id,
      data: {
        roleID: Number(selectedRole.id),
        balance: newBalance,
      },
    });
  };

  const handleDeleteUser = (userId: number) => {
    deleteUser(userId);
  };

  return (
    <div className="w-full p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Cabang</TableHead>
            <TableHead>Balance</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Terdaftar</TableHead>
            <TableHead>Terakhir Update</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userData.length > 0 ? (
            userData.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Select
                    value={editingRoles[user.id] ?? user.roleName}
                    onValueChange={(value) => handleRoleChange(user.id, value)}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {availableRoles?.map((role) => (
                        <SelectItem key={role.id} value={role.name}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>{user.branchName}</TableCell>
                <TableCell className="font-mono">
                  <Input
                    type="number"
                    value={editingBalance[user.id] ?? user.balance}
                    onChange={(e) =>
                      setEditingBalance((prev) => ({
                        ...prev,
                        [user.id]: Number(e.target.value),
                      }))
                    }
                    className="w-24"
                  />
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      user.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-gray-500">
                  {formatDate(user.createdAt)}
                </TableCell>
                <TableCell className="text-sm text-gray-500">
                  {formatDate(user.updatedAt)}
                </TableCell>
                <TableCell className="space-x-2">
                  <Button
                    size="sm"
                    onClick={() => handleSaveRole(user)}
                    disabled={updating}
                  >
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeleteUser(user.id)}
                    disabled={deleting}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={11} className="h-24 text-center">
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
