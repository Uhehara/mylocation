# mylocation

現在の居場所を公開表示するためのシンプルな GitHub Pages 用サイトです。

公開URLの想定:

- https://uhehara.github.io/mylocation/

## 構成

- `index.html` : 公開トップページ
- `style.css` : 見た目
- `app.js` : `status.json` を読み込んで画面表示
- `status.json` : 場所一覧、現在地、最終更新時刻
- `.github/workflows/update-location.yml` : GitHub Actions から現在地を簡単更新

## 初期設定

### 1. リポジトリを作成

GitHub で `mylocation` リポジトリを作成します。

### 2. ファイルを配置

この一式をリポジトリ直下に配置してコミットします。

### 3. GitHub Pages を有効化

GitHub のリポジトリ設定から Pages を有効にします。

おすすめ設定:

- **Build and deployment**
  - Source: **Deploy from a branch**
  - Branch: **main**
  - Folder: **/(root)**

これで `main` ブランチの内容がそのまま公開されます。

## 使い方

### 現在地を更新する

1. GitHub で `Actions` タブを開く
2. `Update location` ワークフローを開く
3. `Run workflow` を押す
4. 現在地を選んで実行する

`status.json` の `current` と `updatedAt` が自動更新されます。

### 場所リストを編集する

`status.json` を GitHub 上で編集してください。

例:

```json
{
  "places": ["A大学", "B大学", "在宅", "出張", "休暇"],
  "current": "A大学",
  "updatedAt": "2026-04-02T09:00:00+09:00"
}
```

- `places`: 表示する場所の一覧
- `current`: 現在いる場所。`places` のどれかと一致させます
- `updatedAt`: 最終更新日時。通常は Actions が自動更新します

## 注意

現在のワークフローの選択肢は以下で固定です。

- A大学
- B大学
- 在宅
- 出張
- 休暇

`status.json` で場所リストを変更した場合、
`.github/workflows/update-location.yml` の `options:` も同じ内容に合わせて更新してください。

