# mylocation
GitHub Pages で公開するシンプルな居場所表示ページです。
ChatGTP plusで作成

## ファイル構成
- `index.html` : ページ本体
- `style.css` : 見た目
- `app.js` : `location.txt` と `schedule.txt` を読み込んで表示
- `location.txt` : 現在地
- `schedule.txt` : 予定メモ

## 使い方

1. このリポジトリの内容を `main` ブランチにアップロードする
2. GitHub の `Settings` → `Pages` で以下を設定する
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
3. 数分待つと `https://uhehara.github.io/mylocation/` で公開される

## 更新方法

- 現在地を変えるときは `location.txt` を編集
- 予定を変えるときは `schedule.txt` を編集
- `last update` は、上記2ファイルのうち最後に更新されたファイルのコミット時刻を表示

## 注意

- `app.js` 内の `owner`, `repo`, `branch` は現在 `uhehara / mylocation / main` に設定済みです
- GitHub API の取得制限にかかるほどのアクセスが無い限り、そのまま使えます
