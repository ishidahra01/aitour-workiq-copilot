import { ProjectStatus } from "@/lib/types";

const statusConfig: Record<
  ProjectStatus,
  { label: string; className: string }
> = {
  Planning: {
    label: "Planning",
    className: "bg-slate-100 text-slate-600 border border-slate-200",
  },
  "Design Review": {
    label: "Design Review",
    className: "bg-blue-50 text-blue-700 border border-blue-200",
  },
  "Cost Review": {
    label: "Cost Review",
    className: "bg-amber-50 text-amber-700 border border-amber-200",
  },
  "Approval Pending": {
    label: "Approval Pending",
    className: "bg-orange-50 text-orange-700 border border-orange-200",
  },
  Approved: {
    label: "Approved",
    className: "bg-green-50 text-green-700 border border-green-200",
  },
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const config = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}
