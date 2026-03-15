# WorkIQ Site Manager — 5G基地局設置計画管理ツール

5G基地局の設置計画を管理するためのシンプルなWebアプリです。  
プロジェクト責任者・エリア企画担当・設計担当・マネジメント層が「何が決まっていて、何が未解決で、誰が見るべきか」を直感的に把握できます。

---

## セットアップ手順

### 前提条件

- Node.js 18 以上
- npm 9 以上

### インストール

```bash
git clone https://github.com/ishidahra01/aitour-workiq-copilot.git
cd aitour-workiq-copilot
npm install
```

---

## 起動方法

### 開発環境（ホットリロードあり）

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

### 本番ビルド & 起動

```bash
npm run build
npm start
```

---

## 画面構成

### 1. 案件一覧画面（`/`）

- 全案件のステータス・担当者・未解決論点数・最終更新日を一覧表示
- ページ上部にステータス別サマリーカードを表示
- 各行をクリックすると案件詳細へ遷移

### 2. 案件詳細画面（`/sites/[id]`）

案件ごとに以下のセクションを表示します。

| セクション | 内容 |
|-----------|------|
| **ヘッダー** | 案件名・ステータス・場所・担当者・最終更新 |
| **サマリーカード** | 自治体条件・設計条件・主要論点・次のアクション |
| **自治体制約** | 高さ制限・景観条例・住民説明会・自治体承認状況 |
| **RF / 設計制約** | 必要アンテナ高・カバレッジ・代替案・設計ステータス |
| **未解決論点** | 各論点の重要度・ステータス・オーナー・メモ |
| **承認状況** | 各承認者のロール・承認状況 |

---

## モックデータの場所

```
lib/data.ts     — 案件データ（A市公園 / B市駅前 / C市住宅街）
lib/types.ts    — TypeScript 型定義（SiteProject, OpenIssue, Approval など）
```

### 初期データ

| 案件名 | ステータス | 特徴 |
|--------|-----------|------|
| **A市公園** | Cost Review | 高さ制限・コスト承認待ちの複合論点あり |
| **B市駅前** | Approved | 問題なし・承認済みのサンプル |
| **C市住宅街** | Design Review | 住民説明会未実施・設計検討中 |

---

## プロジェクト構成

```
aitour-workiq-copilot/
├── app/
│   ├── layout.tsx          # ルートレイアウト（ヘッダー含む）
│   ├── page.tsx            # 案件一覧画面
│   ├── not-found.tsx       # 404ページ
│   └── sites/
│       └── [id]/
│           └── page.tsx    # 案件詳細画面
├── components/
│   ├── StatusBadge.tsx     # ステータスバッジ
│   └── Badges.tsx          # 重要度・論点ステータス・承認ステータスバッジ
├── lib/
│   ├── types.ts            # TypeScript型定義
│   └── data.ts             # モックデータ
└── README.md
```

---

## 今後の拡張ポイント

### API 化

`lib/data.ts` のモックデータを REST API または GraphQL エンドポイントに置き換えるだけで API 対応できます。  
`getSiteProject(id)` 関数を `fetch('/api/sites/${id}')` に切り替える構造になっています。

### AI 要約連携

案件詳細のサマリーカードは `summary` フィールドを表示しています。  
このフィールドを Azure OpenAI / OpenAI API で動的生成するように変更することで、AI 要約連携が可能です。

### 承認フロー自動化

`approvals` フィールドのステータス変更を API 経由で行い、  
Microsoft Teams / メール通知を連携することで承認フローを自動化できます。

### 外部システム連携

- SharePoint / Teams: 案件ドキュメントや会話履歴のリンク
- Azure Active Directory: 認証・権限制御
- Power Automate: 承認ワークフロー自動化

---

## 技術スタック

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **lucide-react** (アイコン)
