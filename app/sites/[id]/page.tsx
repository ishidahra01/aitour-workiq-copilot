import { notFound } from "next/navigation";
import Link from "next/link";
import { getSiteProject } from "@/lib/data";
import { StatusBadge } from "@/components/StatusBadge";
import {
  SeverityBadge,
  IssueStatusBadge,
  ApprovalStatusBadge,
} from "@/components/Badges";
import {
  ArrowLeft,
  MapPin,
  User,
  Clock,
  Building2,
  Radio,
  AlertTriangle,
  CheckSquare,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SiteDetailPage({ params }: PageProps) {
  const { id } = await params;
  const project = getSiteProject(id);

  if (!project) {
    notFound();
  }

  const openIssueCount = project.openIssues.filter(
    (i) => i.status !== "Resolved"
  ).length;

  return (
    <div>
      {/* Back navigation */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          案件一覧に戻る
        </Link>
      </div>

      {/* Header card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-slate-900">
                {project.name}
              </h1>
              <StatusBadge status={project.status} />
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {project.location}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                担当: {project.owner}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                最終更新: {project.lastUpdated}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
              承認依頼
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
              自治体条件
            </span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            {project.summary.municipality}
          </p>
        </div>
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Radio className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wide">
              設計条件
            </span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            {project.summary.design}
          </p>
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
              主要な未解決論点
            </span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            {project.summary.issue}
          </p>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-green-600" />
            <span className="text-xs font-semibold text-green-700 uppercase tracking-wide">
              次のアクション
            </span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            {project.summary.nextAction}
          </p>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Municipality Constraints */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-slate-500" />
            <h2 className="text-sm font-semibold text-slate-700">
              自治体制約
            </h2>
          </div>
          <div className="p-6">
            <dl className="space-y-4">
              <ConstraintRow
                label="高さ制限"
                value={`${project.municipalityConstraints.heightLimitMeters}m`}
                highlight={
                  project.municipalityConstraints.heightLimitMeters <
                  project.rfDesignConstraints.requiredAntennaHeightMeters
                }
              />
              <ConstraintRow
                label="景観条例"
                value={project.municipalityConstraints.colorRestriction}
              />
              <ConstraintRow
                label="住民説明会"
                value={project.municipalityConstraints.residentMeetingStatus}
              />
              <ConstraintRow
                label="自治体承認状況"
                value={
                  project.municipalityConstraints.municipalityApprovalStatus
                }
              />
            </dl>
          </div>
        </div>

        {/* RF / Design Constraints */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
            <Radio className="w-4 h-4 text-slate-500" />
            <h2 className="text-sm font-semibold text-slate-700">
              RF / 設計制約
            </h2>
          </div>
          <div className="p-6">
            <dl className="space-y-4">
              <ConstraintRow
                label="必要アンテナ高"
                value={`${project.rfDesignConstraints.requiredAntennaHeightMeters}m`}
                highlight={
                  project.rfDesignConstraints.requiredAntennaHeightMeters >
                  project.municipalityConstraints.heightLimitMeters
                }
              />
              <ConstraintRow
                label="制限高さ時のカバレッジ"
                value={`${project.rfDesignConstraints.coverageAtAllowedHeightPercent}%`}
                highlight={
                  project.rfDesignConstraints.coverageAtAllowedHeightPercent <
                  project.rfDesignConstraints.targetCoveragePercent
                }
              />
              <ConstraintRow
                label="カバレッジ基準"
                value={`${project.rfDesignConstraints.targetCoveragePercent}%`}
              />
              <ConstraintRow
                label="代替案"
                value={project.rfDesignConstraints.alternativeDesign}
              />
              <ConstraintRow
                label="設計判断ステータス"
                value={project.rfDesignConstraints.designStatus}
              />
            </dl>
          </div>
        </div>
      </div>

      {/* Open Issues */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-slate-500" />
            <h2 className="text-sm font-semibold text-slate-700">
              未解決論点（Open Issues）
            </h2>
          </div>
          {openIssueCount > 0 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
              {openIssueCount}件未解決
            </span>
          )}
        </div>
        <div className="divide-y divide-slate-100">
          {project.openIssues.length === 0 ? (
            <div className="px-6 py-8 text-center text-slate-400 text-sm">
              未解決論点はありません
            </div>
          ) : (
            project.openIssues.map((issue) => (
              <div key={issue.id} className="p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <SeverityBadge severity={issue.severity} />
                      <IssueStatusBadge status={issue.status} />
                    </div>
                    <p className="font-medium text-slate-900 text-sm">
                      {issue.title}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 text-xs text-slate-500 mb-2">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    オーナー: {issue.owner}
                  </span>
                </div>
                {issue.note && (
                  <p className="text-xs text-slate-600 bg-slate-50 rounded-lg px-3 py-2 leading-relaxed">
                    {issue.note}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Approval Status */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
          <CheckSquare className="w-4 h-4 text-slate-500" />
          <h2 className="text-sm font-semibold text-slate-700">承認状況</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {project.approvals.map((approval) => (
            <div
              key={approval.id}
              className="px-6 py-4 flex items-center justify-between gap-4"
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">
                  {approval.role}
                </p>
                <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {approval.approver}
                </p>
              </div>
              <ApprovalStatusBadge status={approval.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ConstraintRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-sm text-slate-500 shrink-0 w-40">{label}</dt>
      <dd
        className={`text-sm font-medium text-right ${
          highlight ? "text-red-600" : "text-slate-900"
        }`}
      >
        {highlight && (
          <AlertTriangle className="w-3.5 h-3.5 inline mr-1 text-red-500" />
        )}
        {value}
      </dd>
    </div>
  );
}
