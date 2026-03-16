import { siteProjects } from "@/lib/data";
import { SiteProjectRow } from "@/components/SiteProjectRow";
import { StatusBadge } from "@/components/StatusBadge";
import {
  AlertCircle,
  Clock,
  CheckCircle,
  Activity,
} from "lucide-react";

const statusOrder = [
  "Planning",
  "Design Review",
  "Cost Review",
  "Approval Pending",
  "Approved",
] as const;

function hasStructuredDetails(project: (typeof siteProjects)[number]) {
  return Boolean(
    project.municipalityConstraints ||
      project.rfDesignConstraints ||
      (project.openIssues ?? []).length > 0 ||
      (project.approvals ?? []).length > 0
  );
}

export default function HomePage() {
  const totalProjects = siteProjects.length;
  const approvedCount = siteProjects.filter(
    (p) => p.status === "Approved"
  ).length;
  const detailPendingCount = siteProjects.filter(
    (p) => !hasStructuredDetails(p)
  ).length;
  const inProgressCount = siteProjects.filter(
    (p) => p.status !== "Approved"
  ).length;

  return (
    <div>
      {/* Page title bar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-bold text-gray-900">案件一覧</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            5G基地局設置候補の初期登録一覧 — {totalProjects}件
          </p>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
            <Activity className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500">総案件数</p>
            <p className="text-xl font-bold text-gray-900">{totalProjects}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500">承認済み</p>
            <p className="text-xl font-bold text-green-600">{approvedCount}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500">進行中</p>
            <p className="text-xl font-bold text-amber-600">{inProgressCount}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500">詳細未整理</p>
            <p className="text-xl font-bold text-red-600">{detailPendingCount}</p>
          </div>
        </div>
      </div>

      {/* Project table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
        <div className="px-5 py-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
          <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
            案件リスト
          </h2>
          <span className="text-xs text-gray-400">{totalProjects}件</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-5 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide bg-gray-50">
                  案件名
                </th>
                <th className="text-left px-5 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide bg-gray-50">
                  自治体 / 場所
                </th>
                <th className="text-left px-5 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide bg-gray-50">
                  ステータス
                </th>
                <th className="text-left px-5 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide bg-gray-50">
                  担当者
                </th>
                <th className="text-left px-5 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide bg-gray-50">
                  情報状態
                </th>
                <th className="text-left px-5 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide bg-gray-50">
                  最終更新
                </th>
                <th className="px-5 py-2.5 bg-gray-50"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {siteProjects.map((project) => {
                const detailsReady = hasStructuredDetails(project);
                return (
                  <SiteProjectRow
                    key={project.id}
                    project={project}
                    detailsReady={detailsReady}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Status breakdown */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
          ステータス別集計
        </h2>
        <div className="flex flex-wrap gap-2">
          {statusOrder.map((status) => {
            const count = siteProjects.filter((p) => p.status === status).length;
            return (
              <div
                key={status}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-50 border border-gray-200"
              >
                <StatusBadge status={status} />
                <span className="text-sm font-semibold text-gray-700">
                  {count}件
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
