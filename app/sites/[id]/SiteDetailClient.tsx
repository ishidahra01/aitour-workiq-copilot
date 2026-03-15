"use client";

import { useState } from "react";
import Link from "next/link";
import {
  SiteProject,
  ProjectStatus,
  IssueSeverity,
  IssueStatus,
  ApprovalStatus,
  OpenIssue,
  Approval,
} from "@/lib/types";
import { StatusBadge } from "@/components/StatusBadge";
import {
  SeverityBadge,
  IssueStatusBadge,
  ApprovalStatusBadge,
} from "@/components/Badges";
import {
  ArrowLeft,
  User,
  Clock,
  Building2,
  Radio,
  AlertTriangle,
  CheckSquare,
  Edit2,
  Save,
  X,
  Plus,
  Trash2,
} from "lucide-react";

const PROJECT_STATUSES: ProjectStatus[] = [
  "Planning",
  "Design Review",
  "Cost Review",
  "Approval Pending",
  "Approved",
];
const ISSUE_SEVERITIES: IssueSeverity[] = ["Low", "Medium", "High"];
const ISSUE_STATUSES: IssueStatus[] = ["Open", "In Review", "Blocked", "Resolved"];
const APPROVAL_STATUSES: ApprovalStatus[] = ["Pending", "Approved", "Rejected"];

/* ---------- small input helpers ---------- */
function TextInput({
  value,
  onChange,
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`border border-gray-300 rounded px-2 py-1 text-sm w-full focus:outline-none focus:ring-1 focus:ring-blue-500 ${className}`}
    />
  );
}

function NumberInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="border border-gray-300 rounded px-2 py-1 text-sm w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
  );
}

function TextareaInput({
  value,
  onChange,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      rows={rows}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-300 rounded px-2 py-1 text-sm w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
  );
}

function SelectInput({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-300 rounded px-2 py-1 text-sm w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

/* ---------- section card ---------- */
function SectionCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-5 py-3 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
        {icon}
        <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
          {title}
        </h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

/* ---------- field row ---------- */
function FieldRow({
  label,
  value,
  editing,
}: {
  label: string;
  value: React.ReactNode;
  editing: React.ReactNode;
}) {
  return (
    <tr className="border-b border-gray-100 last:border-0">
      <td className="py-2.5 pr-4 text-xs font-medium text-gray-500 w-44 align-top pt-3">
        {label}
      </td>
      <td className="py-2.5 text-sm text-gray-900 align-top">{editing ?? value}</td>
    </tr>
  );
}

/* ========== main component ========== */
function loadFromStorage(id: string, defaultProject: SiteProject): SiteProject {
  if (typeof window === "undefined") return defaultProject;
  try {
    const saved = localStorage.getItem(`siteProject_${id}`);
    if (saved) return JSON.parse(saved) as SiteProject;
  } catch {
    /* ignore */
  }
  return defaultProject;
}

export default function SiteDetailClient({
  defaultProject,
}: {
  defaultProject: SiteProject;
}) {
  const [project, setProject] = useState<SiteProject>(() =>
    loadFromStorage(defaultProject.id, defaultProject)
  );
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<SiteProject>(() =>
    loadFromStorage(defaultProject.id, defaultProject)
  );

  const handleEdit = () => {
    setForm(structuredClone(project));
    setIsEditing(true);
  };

  const handleSave = () => {
    const updated: SiteProject = {
      ...form,
      lastUpdated: new Date().toISOString().slice(0, 10),
    };
    setProject(updated);
    try {
      localStorage.setItem(
        `siteProject_${updated.id}`,
        JSON.stringify(updated)
      );
    } catch {
      /* ignore */
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setForm(structuredClone(project));
    setIsEditing(false);
  };

  /* ---- form updaters ---- */
  const set = <K extends keyof SiteProject>(key: K, value: SiteProject[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const setSummary = (key: keyof SiteProject["summary"], value: string) =>
    setForm((prev) => ({ ...prev, summary: { ...prev.summary, [key]: value } }));

  const setMunicipality = (
    key: keyof NonNullable<SiteProject["municipalityConstraints"]>,
    value: string | number
  ) =>
    setForm((prev) => ({
      ...prev,
      municipalityConstraints: {
        ...(prev.municipalityConstraints ?? {
          heightLimitMeters: 0,
          colorRestriction: "",
          residentMeetingStatus: "",
          municipalityApprovalStatus: "",
        }),
        [key]: value,
      },
    }));

  const setRF = (
    key: keyof NonNullable<SiteProject["rfDesignConstraints"]>,
    value: string | number
  ) =>
    setForm((prev) => ({
      ...prev,
      rfDesignConstraints: {
        ...(prev.rfDesignConstraints ?? {
          requiredAntennaHeightMeters: 0,
          coverageAtAllowedHeightPercent: 0,
          targetCoveragePercent: 95,
          alternativeDesign: "",
          designStatus: "",
        }),
        [key]: value,
      },
    }));

  const updateIssue = (
    idx: number,
    key: keyof OpenIssue,
    value: string
  ) =>
    setForm((prev) => {
      const issues = [...(prev.openIssues ?? [])];
      issues[idx] = { ...issues[idx], [key]: value };
      return { ...prev, openIssues: issues };
    });

  const addIssue = () =>
    setForm((prev) => ({
      ...prev,
      openIssues: [
        ...(prev.openIssues ?? []),
        {
          id: `issue-${crypto.randomUUID()}`,
          title: "新規論点",
          severity: "Medium" as IssueSeverity,
          status: "Open" as IssueStatus,
          owner: "",
          note: "",
        },
      ],
    }));

  const removeIssue = (idx: number) =>
    setForm((prev) => ({
      ...prev,
      openIssues: (prev.openIssues ?? []).filter((_, i) => i !== idx),
    }));

  const updateApproval = (
    idx: number,
    key: keyof Approval,
    value: string
  ) =>
    setForm((prev) => {
      const approvals = [...(prev.approvals ?? [])];
      approvals[idx] = { ...approvals[idx], [key]: value };
      return { ...prev, approvals };
    });

  const addApproval = () =>
    setForm((prev) => ({
      ...prev,
      approvals: [
        ...(prev.approvals ?? []),
        {
          id: `approval-${crypto.randomUUID()}`,
          role: "新規承認",
          approver: "",
          status: "Pending" as ApprovalStatus,
        },
      ],
    }));

  const removeApproval = (idx: number) =>
    setForm((prev) => ({
      ...prev,
      approvals: (prev.approvals ?? []).filter((_, i) => i !== idx),
    }));

  /* ---- shorthand: current data source ---- */
  const d = isEditing ? form : project;
  const mc = d.municipalityConstraints;
  const rf = d.rfDesignConstraints;
  const openIssueCount = (project.openIssues ?? []).filter(
    (i) => i.status !== "Resolved"
  ).length;

  return (
    <div>
      {/* Breadcrumb */}
      <div className="mb-4 flex items-center gap-1.5 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-700 transition-colors">
          案件一覧
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{project.name}</span>
      </div>

      {/* Page header */}
      <div className="flex items-start justify-between mb-5 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-lg font-bold text-gray-900">{project.name}</h1>
            <StatusBadge status={project.status} />
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              担当: {project.owner}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              最終更新: {project.lastUpdated}
            </span>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white hover:bg-gray-50 text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
                キャンセル
              </button>
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                保存
              </button>
            </>
          ) : (
            <button
              onClick={handleEdit}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white hover:bg-gray-50 text-gray-700 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              編集
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* ---- 基本情報 ---- */}
        <SectionCard
          icon={<Building2 className="w-4 h-4 text-gray-400" />}
          title="基本情報"
        >
          <table className="w-full">
            <tbody>
              <FieldRow
                label="案件名"
                value={d.name}
                editing={
                  isEditing ? (
                    <TextInput value={form.name} onChange={(v) => set("name", v)} />
                  ) : null
                }
              />
              <FieldRow
                label="自治体"
                value={d.municipality}
                editing={
                  isEditing ? (
                    <TextInput
                      value={form.municipality}
                      onChange={(v) => set("municipality", v)}
                    />
                  ) : null
                }
              />
              <FieldRow
                label="場所"
                value={d.location}
                editing={
                  isEditing ? (
                    <TextInput
                      value={form.location}
                      onChange={(v) => set("location", v)}
                    />
                  ) : null
                }
              />
              <FieldRow
                label="ステータス"
                value={<StatusBadge status={d.status} />}
                editing={
                  isEditing ? (
                    <SelectInput
                      value={form.status}
                      options={PROJECT_STATUSES}
                      onChange={(v) => set("status", v as ProjectStatus)}
                    />
                  ) : null
                }
              />
              <FieldRow
                label="担当者"
                value={d.owner}
                editing={
                  isEditing ? (
                    <TextInput value={form.owner} onChange={(v) => set("owner", v)} />
                  ) : null
                }
              />
            </tbody>
          </table>
        </SectionCard>

        {/* ---- サマリー ---- */}
        <SectionCard
          icon={<ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />}
          title="サマリー"
        >
          <table className="w-full">
            <tbody>
              <FieldRow
                label="自治体条件"
                value={d.summary.municipality}
                editing={
                  isEditing ? (
                    <TextareaInput
                      value={form.summary.municipality}
                      onChange={(v) => setSummary("municipality", v)}
                    />
                  ) : null
                }
              />
              <FieldRow
                label="設計条件"
                value={d.summary.design}
                editing={
                  isEditing ? (
                    <TextareaInput
                      value={form.summary.design}
                      onChange={(v) => setSummary("design", v)}
                    />
                  ) : null
                }
              />
              <FieldRow
                label="主要な論点"
                value={d.summary.issue}
                editing={
                  isEditing ? (
                    <TextareaInput
                      value={form.summary.issue}
                      onChange={(v) => setSummary("issue", v)}
                    />
                  ) : null
                }
              />
              <FieldRow
                label="次のアクション"
                value={d.summary.nextAction}
                editing={
                  isEditing ? (
                    <TextareaInput
                      value={form.summary.nextAction}
                      onChange={(v) => setSummary("nextAction", v)}
                    />
                  ) : null
                }
              />
            </tbody>
          </table>
        </SectionCard>

        {/* ---- 自治体制約 ---- */}
        <SectionCard
          icon={<Building2 className="w-4 h-4 text-gray-400" />}
          title="自治体制約"
        >
          <table className="w-full">
            <tbody>
              <FieldRow
                label="高さ制限"
                value={mc ? `${mc.heightLimitMeters}m` : "—"}
                editing={
                  isEditing && mc ? (
                    <div className="flex items-center gap-1">
                      <NumberInput
                        value={form.municipalityConstraints!.heightLimitMeters}
                        onChange={(v) => setMunicipality("heightLimitMeters", v)}
                      />
                      <span className="text-sm text-gray-500 shrink-0">m</span>
                    </div>
                  ) : null
                }
              />
              <FieldRow
                label="景観条例"
                value={mc?.colorRestriction ?? "—"}
                editing={
                  isEditing && mc ? (
                    <TextInput
                      value={form.municipalityConstraints!.colorRestriction}
                      onChange={(v) => setMunicipality("colorRestriction", v)}
                    />
                  ) : null
                }
              />
              <FieldRow
                label="住民説明会"
                value={mc?.residentMeetingStatus ?? "—"}
                editing={
                  isEditing && mc ? (
                    <TextInput
                      value={form.municipalityConstraints!.residentMeetingStatus}
                      onChange={(v) =>
                        setMunicipality("residentMeetingStatus", v)
                      }
                    />
                  ) : null
                }
              />
              <FieldRow
                label="自治体承認状況"
                value={mc?.municipalityApprovalStatus ?? "—"}
                editing={
                  isEditing && mc ? (
                    <TextInput
                      value={
                        form.municipalityConstraints!.municipalityApprovalStatus
                      }
                      onChange={(v) =>
                        setMunicipality("municipalityApprovalStatus", v)
                      }
                    />
                  ) : null
                }
              />
            </tbody>
          </table>
        </SectionCard>

        {/* ---- RF / 設計制約 ---- */}
        <SectionCard
          icon={<Radio className="w-4 h-4 text-gray-400" />}
          title="RF / 設計制約"
        >
          <table className="w-full">
            <tbody>
              <FieldRow
                label="必要アンテナ高"
                value={rf ? `${rf.requiredAntennaHeightMeters}m` : "—"}
                editing={
                  isEditing && rf ? (
                    <div className="flex items-center gap-1">
                      <NumberInput
                        value={form.rfDesignConstraints!.requiredAntennaHeightMeters}
                        onChange={(v) =>
                          setRF("requiredAntennaHeightMeters", v)
                        }
                      />
                      <span className="text-sm text-gray-500 shrink-0">m</span>
                    </div>
                  ) : null
                }
              />
              <FieldRow
                label="制限高さ時のカバレッジ"
                value={rf ? `${rf.coverageAtAllowedHeightPercent}%` : "—"}
                editing={
                  isEditing && rf ? (
                    <div className="flex items-center gap-1">
                      <NumberInput
                        value={
                          form.rfDesignConstraints!.coverageAtAllowedHeightPercent
                        }
                        onChange={(v) =>
                          setRF("coverageAtAllowedHeightPercent", v)
                        }
                      />
                      <span className="text-sm text-gray-500 shrink-0">%</span>
                    </div>
                  ) : null
                }
              />
              <FieldRow
                label="カバレッジ基準"
                value={rf ? `${rf.targetCoveragePercent}%` : "—"}
                editing={
                  isEditing && rf ? (
                    <div className="flex items-center gap-1">
                      <NumberInput
                        value={form.rfDesignConstraints!.targetCoveragePercent}
                        onChange={(v) => setRF("targetCoveragePercent", v)}
                      />
                      <span className="text-sm text-gray-500 shrink-0">%</span>
                    </div>
                  ) : null
                }
              />
              <FieldRow
                label="代替案"
                value={rf?.alternativeDesign ?? "—"}
                editing={
                  isEditing && rf ? (
                    <TextInput
                      value={form.rfDesignConstraints!.alternativeDesign}
                      onChange={(v) => setRF("alternativeDesign", v)}
                    />
                  ) : null
                }
              />
              <FieldRow
                label="設計判断ステータス"
                value={rf?.designStatus ?? "—"}
                editing={
                  isEditing && rf ? (
                    <TextInput
                      value={form.rfDesignConstraints!.designStatus}
                      onChange={(v) => setRF("designStatus", v)}
                    />
                  ) : null
                }
              />
            </tbody>
          </table>
        </SectionCard>
      </div>

      {/* ---- 未解決論点 ---- */}
      <div className="mt-5">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-gray-400" />
              <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                未解決論点（Open Issues）
              </h2>
              {openIssueCount > 0 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                  {openIssueCount}件未解決
                </span>
              )}
            </div>
            {isEditing && (
              <button
                onClick={addIssue}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs text-blue-600 border border-blue-300 rounded hover:bg-blue-50 transition-colors"
              >
                <Plus className="w-3 h-3" />
                追加
              </button>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    重要度
                  </th>
                  <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    ステータス
                  </th>
                  <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    論点タイトル
                  </th>
                  <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    オーナー
                  </th>
                  <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    備考
                  </th>
                  {isEditing && <th className="px-4 py-2 w-10"></th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {(d.openIssues ?? []).length === 0 ? (
                  <tr>
                    <td
                      colSpan={isEditing ? 6 : 5}
                      className="px-4 py-6 text-center text-gray-400 text-sm"
                    >
                      未解決論点はありません
                    </td>
                  </tr>
                ) : (
                  (d.openIssues ?? []).map((issue, idx) => (
                    <tr key={issue.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 align-top">
                        {isEditing ? (
                          <SelectInput
                            value={form.openIssues![idx].severity}
                            options={ISSUE_SEVERITIES}
                            onChange={(v) =>
                              updateIssue(idx, "severity", v)
                            }
                          />
                        ) : (
                          <SeverityBadge severity={issue.severity} />
                        )}
                      </td>
                      <td className="px-4 py-3 align-top">
                        {isEditing ? (
                          <SelectInput
                            value={form.openIssues![idx].status}
                            options={ISSUE_STATUSES}
                            onChange={(v) => updateIssue(idx, "status", v)}
                          />
                        ) : (
                          <IssueStatusBadge status={issue.status} />
                        )}
                      </td>
                      <td className="px-4 py-3 align-top font-medium text-gray-900">
                        {isEditing ? (
                          <TextInput
                            value={form.openIssues![idx].title}
                            onChange={(v) => updateIssue(idx, "title", v)}
                          />
                        ) : (
                          issue.title
                        )}
                      </td>
                      <td className="px-4 py-3 align-top text-gray-600">
                        {isEditing ? (
                          <TextInput
                            value={form.openIssues![idx].owner}
                            onChange={(v) => updateIssue(idx, "owner", v)}
                          />
                        ) : (
                          issue.owner
                        )}
                      </td>
                      <td className="px-4 py-3 align-top text-gray-500 text-xs">
                        {isEditing ? (
                          <TextareaInput
                            value={form.openIssues![idx].note}
                            onChange={(v) => updateIssue(idx, "note", v)}
                            rows={2}
                          />
                        ) : (
                          issue.note
                        )}
                      </td>
                      {isEditing && (
                        <td className="px-4 py-3 align-top">
                          <button
                            onClick={() => removeIssue(idx)}
                            className="text-red-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ---- 承認状況 ---- */}
      <div className="mt-5">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-gray-400" />
              <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                承認状況
              </h2>
            </div>
            {isEditing && (
              <button
                onClick={addApproval}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs text-blue-600 border border-blue-300 rounded hover:bg-blue-50 transition-colors"
              >
                <Plus className="w-3 h-3" />
                追加
              </button>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    役割
                  </th>
                  <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    承認者
                  </th>
                  <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    ステータス
                  </th>
                  {isEditing && <th className="px-4 py-2 w-10"></th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {(d.approvals ?? []).length === 0 ? (
                  <tr>
                    <td
                      colSpan={isEditing ? 4 : 3}
                      className="px-4 py-6 text-center text-gray-400 text-sm"
                    >
                      承認情報はありません
                    </td>
                  </tr>
                ) : (
                  (d.approvals ?? []).map((approval, idx) => (
                    <tr key={approval.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-900 font-medium">
                        {isEditing ? (
                          <TextInput
                            value={form.approvals![idx].role}
                            onChange={(v) => updateApproval(idx, "role", v)}
                          />
                        ) : (
                          approval.role
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {isEditing ? (
                          <TextInput
                            value={form.approvals![idx].approver}
                            onChange={(v) =>
                              updateApproval(idx, "approver", v)
                            }
                          />
                        ) : (
                          approval.approver
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {isEditing ? (
                          <SelectInput
                            value={form.approvals![idx].status}
                            options={APPROVAL_STATUSES}
                            onChange={(v) =>
                              updateApproval(idx, "status", v)
                            }
                          />
                        ) : (
                          <ApprovalStatusBadge status={approval.status} />
                        )}
                      </td>
                      {isEditing && (
                        <td className="px-4 py-3">
                          <button
                            onClick={() => removeApproval(idx)}
                            className="text-red-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
