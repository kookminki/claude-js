const PAGE = 20;
let all = [], list = [], shown = 0;
const grid = document.getElementById('grid');
const more = document.getElementById('more');
const count = document.getElementById('count');

function esc(s) {
    return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

function render() {
    const end = Math.min(shown + PAGE, list.length);
    grid.insertAdjacentHTML('beforeend', list.slice(shown, end).map(s => `
        <li class="item">
            <a href="#" class="poster">
                <img src="${esc(s.albumCover)}" alt="${esc(s.title)}" loading="lazy">
                <span class="rank">${s.rank}</span>
            </a>
            <div class="tit"><span class="badge">${s.rank <= 10 ? 'HOT' : 'ALL'}</span><b title="${esc(s.title)}">${esc(s.title)}</b></div>
            <div class="info">${esc(s.artist)}</div>
            <div class="btns">
                <button class="like" data-like>♡ ${esc(s.likes)}</button>
                <button class="play">재생</button>
            </div>
        </li>`).join(''));
    shown = end;
    more.classList.toggle('hide', shown >= list.length);
}

function reset() {
    grid.innerHTML = '';
    shown = 0;
    count.textContent = `${list.length}개의 곡이 검색되었습니다.`;
    render();
}

grid.addEventListener('click', e => {
    const b = e.target.closest('[data-like]');
    if (b) b.classList.toggle('on');
});
more.addEventListener('click', render);
document.getElementById('q').addEventListener('input', e => {
    const k = e.target.value.trim().toLowerCase();
    list = all.filter(s => (s.title + s.artist).toLowerCase().includes(k));
    reset();
});

fetch('melon.json')
    .then(r => r.json())
    .then(data => { all = list = data; reset(); })
    .catch(() => { count.textContent = 'melon.json을 불러오지 못했습니다. 로컬 서버로 열어주세요.'; });
