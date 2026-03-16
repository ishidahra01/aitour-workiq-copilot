# WorkIQ Site Manager — 5G基地局設置計画管理ツール

5G基地局の設置計画を管理するためのシンプルなWebアプリです。  
現時点では案件の初期登録と粗いメモ管理に寄せており、自治体制約やRF / 設計制約などの具体情報は後続の情報収集を前提にしています。

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

- 全案件のステータス・担当者・情報状態・最終更新日を一覧表示
- ページ上部にステータス別サマリーカードを表示
- 各行をクリックすると案件詳細へ遷移

### 2. 案件詳細画面（`/sites/[id]`）

案件ごとに以下のセクションを表示します。

| セクション | 内容 |
| ----------- | ------ |
| **ヘッダー** | 案件名・ステータス・場所・担当者・最終更新 |
| **注意メッセージ** | まだ情報取り込み前の案件であることを表示 |
| **基本情報** | 案件名・自治体・場所・担当者・ステータス |
| **サマリー** | 現状メモ・確認メモ・気になっている点・次アクション |

後続のデモで Work IQ を使い、Outlook / Teams / SharePoint の情報を集めて詳細を具体化する前提です。

---

## モックデータの場所

```text
lib/data.ts     — 案件データ（A市公園 / B市駅前 / C市住宅街）
lib/types.ts    — TypeScript 型定義（SiteProject, OpenIssue, Approval など）
```

### 初期データ

| 案件名 | ステータス | 特徴 |
| -------- | ----------- | ------ |
| **A市公園** | Cost Review | 候補地として登録済み。詳細条件は未整理 |
| **B市駅前** | Approval Pending | 一次登録済み。承認判断の材料が不足 |
| **C市住宅街** | Design Review | 初期検討中。関連情報が散在 |

---

## プロジェクト構成

```text
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
