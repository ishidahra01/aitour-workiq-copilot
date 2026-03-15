export type ProjectStatus =
  | "Planning"
  | "Design Review"
  | "Cost Review"
  | "Approval Pending"
  | "Approved";

export type IssueSeverity = "Low" | "Medium" | "High";
export type IssueStatus = "Open" | "In Review" | "Blocked" | "Resolved";
export type ApprovalStatus = "Pending" | "Approved" | "Rejected";

export type OpenIssue = {
  id: string;
  title: string;
  severity: IssueSeverity;
  status: IssueStatus;
  owner: string;
  note: string;
};

export type Approval = {
  id: string;
  role: string;
  approver: string;
  status: ApprovalStatus;
};

export type SiteProject = {
  id: string;
  name: string;
  municipality: string;
  location: string;
  status: ProjectStatus;
  owner: string;
  lastUpdated: string;
  summary: {
    municipality: string;
    design: string;
    issue: string;
    nextAction: string;
  };
  municipalityConstraints?: {
    heightLimitMeters: number;
    colorRestriction: string;
    residentMeetingStatus: string;
    municipalityApprovalStatus: string;
  };
  rfDesignConstraints?: {
    requiredAntennaHeightMeters: number;
    coverageAtAllowedHeightPercent: number;
    targetCoveragePercent: number;
    alternativeDesign: string;
    designStatus: string;
  };
  openIssues?: OpenIssue[];
  approvals?: Approval[];
};
