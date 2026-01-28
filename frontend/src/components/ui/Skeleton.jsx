import React from "react";
import { cn } from "./utils";

const Skeleton = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-accent", className)}
      {...props}
    />
  );
});

Skeleton.displayName = "Skeleton";

export { Skeleton };
