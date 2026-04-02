const owner = "uhehara";
const repo = "mylocation";
const branch = "main";

const locationElement = document.getElementById("location");
const scheduleElement = document.getElementById("schedule");
const lastUpdateElement = document.getElementById("last-update");

async function fetchTextFile(path) {
  const response = await fetch(`${path}?t=${Date.now()}`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`${path} の読み込みに失敗しました。`);
  }
  return response.text();
}

async function fetchLastCommitTime(path) {
  const url = `https://api.github.com/repos/${owner}/${repo}/commits?path=${encodeURIComponent(path)}&sha=${branch}&per_page=1`;
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json"
    }
  });

  if (!response.ok) {
    throw new Error(`${path} の更新時刻を取得できませんでした。`);
  }

  const commits = await response.json();
  const iso = commits?.[0]?.commit?.committer?.date;
  if (!iso) {
    throw new Error(`${path} のコミット履歴が見つかりませんでした。`);
  }

  return new Date(iso);
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  return `${year}/${month}/${day} ${hour}:${minute}`;
}

async function loadPage() {
  try {
    const [locationText, scheduleText, locationUpdatedAt, scheduleUpdatedAt] = await Promise.all([
      fetchTextFile("location.txt"),
      fetchTextFile("schedule.txt"),
      fetchLastCommitTime("location.txt"),
      fetchLastCommitTime("schedule.txt")
    ]);

    locationElement.textContent = locationText.trim() || "未設定";
    scheduleElement.textContent = scheduleText.trim() || "予定はありません。";

    const latestDate = locationUpdatedAt > scheduleUpdatedAt ? locationUpdatedAt : scheduleUpdatedAt;
    lastUpdateElement.textContent = `last update: ${formatDate(latestDate)}`;
  } catch (error) {
    console.error(error);
    locationElement.textContent = "表示できませんでした";
    scheduleElement.textContent = "ファイルの読み込みに失敗しました。";
    lastUpdateElement.textContent = "last update: 取得できませんでした";
  }
}

loadPage();
