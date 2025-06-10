import { UserStoryPriority, UserStorySize, UserStoryStatus } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper function to get status styling
export const getStatusStyle = (status: UserStoryStatus): string => {
  const statusMap: Record<UserStoryStatus, string> = {
    Backlog:
      "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20",
    Ready: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
    "In Progress":
      "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20",
    "In Review":
      "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20",
    Completed:
      "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
  };

  return statusMap[status] || statusMap["Backlog"];
};

export const getSizeStyle = (size: UserStorySize): string => {
  const sizeMap: Record<UserStorySize, string> = {
    small:
      "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
    medium:
      "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20",
    large: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
  };

  return sizeMap[size] || sizeMap["medium"];
};

export const getPriorityStyle = (priority: UserStoryPriority): string => {
  const priorityMap: Record<UserStoryPriority, string> = {
    low: "text-green-600 dark:text-green-400",
    medium: "text-yellow-600 dark:text-yellow-400",
    high: "text-red-600 dark:text-red-400",
  };

  return priorityMap[priority] || priorityMap["medium"];
};

// Helper function to get status display text
export const getStatusDisplayText = (status: UserStoryStatus): string => {
  // Handle "Completed" status from your data
  if (status === ("Completed" as any)) {
    return "Complete";
  }
  return status;
};

// Helper function to get size display text
export const getSizeDisplayText = (size: UserStorySize): string => {
  const sizeDisplayMap: Record<UserStorySize, string> = {
    small: "S",
    medium: "M",
    large: "L",
  };

  return sizeDisplayMap[size] || "M";
};
