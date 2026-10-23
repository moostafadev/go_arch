"use client";

import { ChevronDown, ChevronUp, ChevronsDown, ChevronsUp } from "lucide-react";

import { Button } from "@/components/button";
import { Tooltip } from "@/components/tooltip";

import { ReorderButtonsProps } from "./types";

const ReorderButtons = ({
  index,
  total,
  disabled = false,
  onMove,
}: ReorderButtonsProps) => {
  const isFirst = index <= 0;
  const isLast = index >= total - 1;
  const isDisabled = disabled || total <= 1;

  const actions = [
    { label: "Move to top", icon: ChevronsUp, target: 0, blocked: isFirst },
    { label: "Move up", icon: ChevronUp, target: index - 1, blocked: isFirst },
    {
      label: "Move down",
      icon: ChevronDown,
      target: index + 1,
      blocked: isLast,
    },
    {
      label: "Move to bottom",
      icon: ChevronsDown,
      target: total - 1,
      blocked: isLast,
    },
  ];

  return (
    <div className="flex items-center gap-0.5">
      {actions.map(({ label, icon: Icon, target, blocked }) => (
        <Tooltip key={label} content={label} focusable={false}>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            disabled={isDisabled || blocked}
            onClick={() => onMove(target)}
            aria-label={label}
            className="size-7 text-foreground-second hover:text-accent disabled:opacity-30"
          >
            <Icon className="size-3.5" />
          </Button>
        </Tooltip>
      ))}
    </div>
  );
};

export default ReorderButtons;
