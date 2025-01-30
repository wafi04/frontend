"use client";
import { useGetListSessions, useRevokeSessions } from "@/lib/api/auth/session";
import { LoadingSkeletons } from "@/components/ui/skeleton/CardProductSkeleton";
import { DeviceInfo, FormatTimestamp, identifyDeviceType } from "@/utils/Format";
import { Button } from "@/components/ui/button";
import { MoreVertical, AlertTriangle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function ListSessions() {
  const { data, error, isLoading } = useGetListSessions();

  if (isLoading) {
    return <LoadingSkeletons />;
  }

  return (
    <section className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-medium text-gray-800">Active Sessions</h2>
        <Button variant="ghost" size="icon">
          <MoreVertical className="w-5 h-5 text-gray-600" />
        </Button>
      </div>

      <div className="space-y-4">
        {data.map((item) => (
          <div
            key={item.session_id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors group">
            <div className="flex items-center space-x-4">
             <DeviceInfo
              item={item.device_info}
              className="flex items-center justify-center w-20"
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                  {item.ip_address}
                </span>
              </div>
            <p className="text-xs text-gray-500 truncate max-w-xs">
              {identifyDeviceType({ userAgent: item.device_info }).name} -{" "}
              {item.device_info.length > 10
                ? `${item.device_info.slice(0, 10)}...`
                : item.device_info}
            </p>
            </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-xs text-gray-500">Created</p>
                <p className="text-sm text-gray-800">
                  {FormatTimestamp(item.created_at)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Last Active</p>
                <p className="text-sm text-gray-800">
                  {FormatTimestamp(item.last_activity_at)}
                </p>
              </div>
              <HandleDeleteSession id={item.session_id} />
            </div>
          </div>
        ))}
      </div>

      {data.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          <AlertTriangle className="mx-auto mb-4 w-12 h-12 text-gray-300" />
          <p>No active sessions found</p>
        </div>
      )}
    </section>
  );
}

function HandleDeleteSession({ id }: { id: string }) {
  const [open, setOpen] = useState<boolean>(false);
  const deletes = useRevokeSessions();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="opacity-0 group-hover:opacity-100">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {open && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Sessions</DialogTitle>
              <DialogDescription>
                Are you sure Want to delete sessions ?
              </DialogDescription>
            </DialogHeader>
            <div className="flex w-full justify-between items-center">
              <Button
                onClick={() => setOpen(false)}
                disabled={deletes.isPending}>
                Cancel
              </Button>
              <Button
                onClick={() => deletes.mutate(id)}
                disabled={deletes.isPending}>
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
