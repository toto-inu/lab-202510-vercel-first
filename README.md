# lab-202510-vercel-first

Todo App with Next.js + NestJS

## プロジェクト構成

このプロジェクトは、Next.jsフロントエンドとNestJSバックエンドで構成されています。

- `frontend/` - Next.js アプリケーション (ポート3000)
- `backend/` - NestJS API サーバー (ポート3001)

## セットアップ

### 1. バックエンド (NestJS)

```bash
cd backend
npm install
```

### 2. フロントエンド (Next.js)

```bash
cd frontend
npm install
```

## 実行方法

### バックエンドの起動

```bash
cd backend
npm run dev
```

バックエンドは http://localhost:3001 で起動します。

利用可能なエンドポイント:
- `GET /todos` - 全てのTodoを取得
- `GET /todos/:id` - 指定したIDのTodoを取得
- `POST /todos` - 新しいTodoを作成 (body: { title: string })
- `PUT /todos/:id` - Todoを更新
- `DELETE /todos/:id` - Todoを削除

### フロントエンドの起動

```bash
cd frontend
npm run dev
```

フロントエンドは http://localhost:3000 で起動します。

## 機能

- Todoの一覧表示（NestJS APIから取得）
- Todoの追加
- Todoの完了/未完了の切り替え
- Todoの削除

## 技術スタック

- **Frontend**: Next.js 14 (App Router), TypeScript, React
- **Backend**: NestJS, TypeScript
- **データストレージ**: インメモリ（Node.js変数）
