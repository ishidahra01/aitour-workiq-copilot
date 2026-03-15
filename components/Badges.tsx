import { IssueSeverity, IssueStatus, ApprovalStatus } from "@/lib/types";

const severityConfig: Record<
  IssueSeverity,
  { label: string; className: string }
> = {
  High: {
    label: "High",
    className: "bg-red-50 text-red-700 border border-red-200",
  },
  Medium: {
    label: "Medium",
    className: "bg-amber-50 text-amber-700 border border-amber-200",
  },
  Low: {
    label: "Low",
    className: "bg-slate-50 text-slate-600 border border-slate-200",
  },
};

const issueStatusConfig: Record<
  IssueStatus,
  { label: string; className: string }
> = {
  Open: {
    label: "Open",
    className: "bg-blue-50 text-blue-700 border border-blue-200",
  },
  "In Review": {
    label: "In Review",
    className: "bg-purple-50 text-purple-700 border border-purple-200",
  },
  Blocked: {
    label: "Blocked",
    className: "bg-red-50 text-red-700 border border-red-200",
  },
  Resolved: {
    label: "Resolved",
    className: "bg-green-50 text-green-700 border border-green-200",
  },
};

const approvalStatusConfig: Record<
  ApprovalStatus,
  { label: string; className: string }
> = {
  Pending: {
    label: "Pending",
    className: "bg-amber-50 text-amber-700 border border-amber-200",
  },
  Approved: {
    label: "Approved",
    className: "bg-green-50 text-green-700 border border-green-200",
  },
  Rejected: {
    label: "Rejected",
    className: "bg-red-50 text-red-700 border border-red-200",
  },
};

export function SeverityBadge({ severity }: { severity: IssueSeverity }) {
  const config = severityConfig[severity];
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}

export function IssueStatusBadge({ status }: { status: IssueStatus }) {
  const config = issueStatusConfig[status];
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}

export function ApprovalStatusBadge({ status }: { status: ApprovalStatus }) {
  const config = approvalStatusConfig[status];
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}
