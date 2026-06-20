"use client"

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
  title = "Coming soon",
  description = "This section is under development. Stay tuned for updates!",
  buttonText = "Go Back",
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center w-full py-16 px-4 min-h-[50vh]">
      <Empty className="w-full max-w-md rounded-2xl border bg-card text-card-foreground shadow-sm p-8 text-center space-y-6">
        
        <EmptyHeader className="space-y-4">
          <EmptyMedia className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted shadow-inner">
            <Inbox className="w-8 h-8 text-muted-foreground" />
          </EmptyMedia>

          <div className="space-y-2">
            <EmptyTitle className="text-xl font-semibold tracking-tight">
              {title}
            </EmptyTitle>
            <EmptyDescription className="text-sm text-muted-foreground max-w-sm mx-auto">
              {description}
            </EmptyDescription>
          </div>
        </EmptyHeader>

        <EmptyContent className="flex justify-center">
          <Button 
            className="px-6 py-2 rounded-full font-medium shadow-sm transition-all active:scale-95" 
            onClick={onAction}
          >
            {buttonText}
          </Button>
        </EmptyContent>

      </Empty>
    </div>
  );
}