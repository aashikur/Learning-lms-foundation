import React from "react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

import { Button } from "@/components/ui/button";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onAction?: () => void;
}

export default function EmptyState({
  title = "No data found",
  description = "There is nothing to display right now.",
  buttonText = "Add data",
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center w-full py-16 px-4">
      <Empty className="w-full max-w-md rounded-2xl border bg-white dark:bg-gray-900 shadow-sm p-6">
        
        <EmptyHeader className="text-center space-y-3">
          <EmptyMedia variant="icon">
            <Inbox className="w-10 h-10 text-gray-400" />
          </EmptyMedia>

          <EmptyTitle className="text-lg font-semibold">
            {title}
          </EmptyTitle>

          <EmptyDescription className="text-sm text-gray-500">
            {description}
          </EmptyDescription>
        </EmptyHeader>

        <EmptyContent className="flex justify-center mt-6">
          <Button className="px-5 py-3" onClick={onAction}>{buttonText}</Button>
        </EmptyContent>

      </Empty>
    </div>
  );
}