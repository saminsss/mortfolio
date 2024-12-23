"use client";

import ResumePreview from "@/components/ResumePreview";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { ResumeServerData } from "@/lib/types";
import { mapToResumeValues } from "@/lib/utils";
import { formatDate } from "date-fns";
import { MoreVertical, Printer, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState, useTransition } from "react";
import { deleteResume } from "./actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LoadingButton from "@/components/LoadingButton";
import { useReactToPrint } from "react-to-print";

type ResumeItemProps = {
  resume: ResumeServerData;
};

const ResumeItem = ({ resume }: ResumeItemProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const reactToPrintFn = useReactToPrint({
    contentRef: contentRef as React.RefObject<HTMLDivElement>,
    documentTitle: resume.title || "Untitled",
  });
  const wasUpdated = resume.updatedAt !== resume.createdAt;
  return (
    <div className="group relative rounded-lg border border-transparent bg-secondary p-3 transition-colors hover:border-border">
      <div className="space-y-3">
        <Link
          href={`/editor?resumeId=${resume.id}`}
          className="inline-block w-full text-center"
        >
          <p className="line-clamp-1 font-semibold">
            {resume.title || "Untitled"}
          </p>
          {resume.description && (
            <p className="line-clamp-2 text-sm">{resume.description}</p>
          )}
          <p className="text-xs text-muted-foreground">
            {wasUpdated ? "Updated" : "Created"} on{" "}
            {formatDate(resume.updatedAt, "MMM d, yyyy h:mm a")}
          </p>
        </Link>
        <Link
          href={`/editor?resumeId=${resume.id}`}
          className="relative inline-block w-full"
        >
          <ResumePreview
            contentRef={contentRef as React.RefObject<HTMLDivElement>}
            resumeData={mapToResumeValues(resume)}
            className="overflow-hidden shadow-sm transition-shadow group-hover:shadow-lg"
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
        </Link>
      </div>
      <MoreMenu
        resumeId={resume.id}
        onPrintClick={reactToPrintFn}
        className="absolute right-1 top-1 opacity-0 transition-opacity group-hover:opacity-100"
      />
    </div>
  );
};

type MoreMenuProps = {
  resumeId: string;
  onPrintClick: () => void;
  className?: string;
};
const MoreMenu = ({ resumeId, onPrintClick, className }: MoreMenuProps) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className={className}>
            <MoreVertical className="size-4" />
            <span className="sr-only">More</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={() => setShowDeleteConfirmation(true)}
          >
            <Trash2 className="size-4"></Trash2>
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={() => onPrintClick()}
          >
            <Printer className="size-4" />
            Print
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteConfirmationDialog
        resumeId={resumeId}
        open={showDeleteConfirmation}
        onOpenChange={setShowDeleteConfirmation}
      />
    </>
  );
};

type DeleteConfirmationDialogProps = {
  resumeId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const DeleteConfirmationDialog = ({
  resumeId,
  open,
  onOpenChange,
}: DeleteConfirmationDialogProps) => {
  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      try {
        await deleteResume(resumeId);
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          description: "Failed to delete resume. Please try again.",
        });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Resume?</DialogTitle>
          <DialogDescription>
            This will permanently delete this resume. This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <LoadingButton
            variant="destructive"
            onClick={handleDelete}
            loading={isPending}
          >
            Delete
          </LoadingButton>
          <Button onClick={() => onOpenChange(false)}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeItem;
