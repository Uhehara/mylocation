async function loadStatus() {
  const statusArea = document.getElementById('status-area');
  const updatedAt = document.getElementById('updated-at');

  try {
    const response = await fetch(`./status.json?ts=${Date.now()}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`status.json の取得に失敗しました: ${response.status}`);
    }

    const data = await response.json();
    const places = Array.isArray(data.places) ? data.places : [];
    const current = typeof data.current === 'string' ? data.current : '';

    renderPlaces(statusArea, places, current);
    updatedAt.textContent = formatUpdatedAt(data.updatedAt);
    updatedAt.setAttribute('datetime', data.updatedAt || '');
  } catch (error) {
    console.error(error);
    statusArea.innerHTML = '<p class="error">表示データを読み込めませんでした。</p>';
    updatedAt.textContent = '--';
  }
}

function renderPlaces(container, places, current) {
  if (places.length === 0) {
    container.innerHTML = '<p class="empty">表示する場所がまだ登録されていません。</p>';
    return;
  }

  const list = document.createElement('ul');
  list.className = 'location-list';

  for (const place of places) {
    const item = document.createElement('li');
    const isCurrent = place === current;
    item.className = `location-item${isCurrent ? ' current' : ''}`;

    const marker = document.createElement('span');
    marker.className = 'marker';
    marker.textContent = isCurrent ? '★' : '　';
    marker.setAttribute('aria-hidden', 'true');

    const name = document.createElement('span');
    name.className = 'location-name';
    name.textContent = place;

    if (isCurrent) {
      item.setAttribute('aria-current', 'true');
    }

    item.append(marker, name);
    list.appendChild(item);
  }

  container.replaceChildren(list);
}

function formatUpdatedAt(value) {
  if (!value) {
    return '--';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Asia/Tokyo',
  }).format(date);
}

loadStatus();
