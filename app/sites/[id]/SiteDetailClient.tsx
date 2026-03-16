"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteProject, ProjectStatus } from "@/lib/types";
import { StatusBadge } from "@/components/StatusBadge";
import {
  ArrowLeft,
  User,
  Clock,
  Building2,
  AlertTriangle,
  Edit2,
  Save,
  X,
} from "lucide-react";

const PROJECT_STATUSES: ProjectStatus[] = [
  "Planning",
  "Design Review",
  "Cost Review",
  "Approval Pending",
  "Approved",
];
const STORAGE_VERSION = "v2";

function getStorageKey(id: string) {
  return `siteProject_${STORAGE_VERSION}_${id}`;
}

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
    const saved = localStorage.getItem(getStorageKey(id));
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
      localStorage.setItem(getStorageKey(updated.id), JSON.stringify(updated));
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

  /* ---- shorthand: current data source ---- */
  const d = isEditing ? form : project;

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

      <div className="mb-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-900">
              この案件は初期登録段階です。
            </p>
          </div>
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
                label="現状メモ"
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
                label="確認メモ"
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
                label="気になっている点"
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
      </div>

    </div>
  );
}
