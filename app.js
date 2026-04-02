async function loadText(file) {
  const response = await fetch(file);
  return await response.text();
}

async function getLastUpdate() {
  try {
    const repo = "uhehara/mylocation";

    const res = await fetch(
      `https://api.github.com/repos/${repo}/commits?per_page=1`
    );
    const data = await res.json();

    const date = new Date(data[0].commit.committer.date);

    const formatted =
      date.getFullYear() + "/" +
      String(date.getMonth() + 1).padStart(2, "0") + "/" +
      String(date.getDate()).padStart(2, "0") + " " +
      String(date.getHours()).padStart(2, "0") + ":" +
      String(date.getMinutes()).padStart(2, "0");

    return formatted;
  } catch (e) {
    return "--";
  }
}

async function init() {
  const locationEl = document.getElementById("location");
  const scheduleEl = document.getElementById("schedule");
  const updatedEl = document.getElementById("updated");

  try {
    const locationText = await loadText("location.txt");
    const scheduleText = await loadText("schedule.txt");

    // 改行そのまま表示
    locationEl.textContent = locationText.trim();
    scheduleEl.textContent = scheduleText.trim();

  } catch (e) {
    locationEl.textContent = "読み込みエラー";
    scheduleEl.textContent = "読み込みエラー";
  }

  const updated = await getLastUpdate();
  updatedEl.textContent = "last update: " + updated;
}

init();
