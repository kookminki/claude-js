(() => {
  'use strict';

  // Menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const menuPopup = document.getElementById('menu-popup');

  menuToggle.addEventListener('click', (e) => {
    e.preventDefault();
    menuPopup.classList.toggle('open');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.menu-wrapper')) {
      menuPopup.classList.remove('open');
    }
  });

  // Score tabs
  const scoreData = {
    loan: 750,
    card: 680,
    delinquency: 820
  };

  const scoreDisplay = document.getElementById('score-display');
  const tabBtns = document.querySelectorAll('.tab-btn');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.type;
      const score = scoreData[type];

      scoreDisplay.textContent = `${score} 점 ›`;

      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Search modal
  const searchBtn = document.getElementById('search');
  const searchModal = document.getElementById('search-modal');
  const searchOverlay = document.getElementById('search-overlay');
  const searchClose = document.getElementById('search-close');
  const searchInput = document.querySelector('.search-input');

  const openSearch = (e) => {
    e.preventDefault();
    searchModal.classList.add('open');
    searchInput.focus();
  };

  const closeSearch = () => {
    searchModal.classList.remove('open');
  };

  searchBtn.addEventListener('click', openSearch);
  searchClose.addEventListener('click', closeSearch);
  searchOverlay.addEventListener('click', closeSearch);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchModal.classList.contains('open')) {
      closeSearch();
    }
  });

  const guards = [
    { tag: '신용을 보호해 주세요!', label: '내 신용조회 차단', img: '방패', blocked: false },
    { tag: '명의를 보호해 주세요!', label: '내 명의도용 차단', img: '자물쇠', blocked: false }
  ];

  const services = [
    { name: '점수 올리기' }, { name: '연체 방지' }, { name: '신용조회 차단' }, { name: '명의도용 차단' },
    { name: '대출가능 진단', badge: 'N' }, { name: '카드발급 진단' }, { name: '보험혜택 진단' }, { name: '이름 어때', badge: 'HOT' }
  ];

  const benefits = [
    { eyebrow: '개인/커플/사업자/집주인', title: '내 신용을 제출할 때\n신용보고서', img: '문서', bg: '#f3f4f2', fg: '#1c1f1d' },
    { eyebrow: '#이름분석 #이름랭킹 #이름추천', title: '나와 똑같은 이름\n전국에 몇 명?', img: '말풍선', bg: '#f3f4f2', fg: '#1c1f1d' },
    { eyebrow: '신용점수 예측하기', title: '대출 신규로 받으면\n내 신용점수는?', img: '그래프', bg: '#066DFD', fg: '#ffffff' },
    { eyebrow: '무료 신용조회', title: '나의 신용점수\n무료로 조회해 보세요', img: '게이지', bg: '#eef3f6', fg: '#1c1f1d' },
    { eyebrow: '제휴 저축은행 신용대출', title: '내 대출한도가\n도착했습니다!', img: '알림 벨', bg: '#f9efec', fg: '#1c1f1d' },
    { eyebrow: '맞춤 채무 조정', title: '해결되지 않는 연체\n회생파산 무료 진단', img: '건물', bg: '#faf4e6', fg: '#1c1f1d' }
  ];

  const tiles = [
    { eyebrow: '맞춤형 카드상품', title: '내 신용에 맞는\n퍼스널카드 찾기!', img: true, bg: '#f9ecef', fg: '#1c1f1d' },
    { eyebrow: '맞춤 채무조정 솔루션', title: '채무나 연체\n있으신가요?', img: true, bg: '#eef3f6', fg: '#1c1f1d' },
    { eyebrow: '', title: '담보계산기로\n예측하기', img: false, bg: '#066DFD', fg: '#ffffff' },
    { eyebrow: '맞춤형 대출상품', title: '내 신용점수로\n대출진단 받기', img: true, bg: '#f1eef7', fg: '#1c1f1d' },
    { eyebrow: '보험혜택 진단', title: '나에게 맞는\n혜택 받기', img: true, bg: '#faf4e6', fg: '#1c1f1d' }
  ];

  const notices = [
    { text: '신용변동 알림 서비스 일시 중단 안내', date: '2026.09.23' },
    { text: '추석 연휴 고객센터 운영 시간 안내', date: '2026.09.18' },
    { text: '개인정보처리방침 개정 안내', date: '2026.09.01' }
  ];

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  };

  // Promo carousel with Swiper
  const promoSwiper = new Swiper('#promo', {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '#promo-dots',
      clickable: true,
    },
    speed: 800,
  });

  // Guard cards — inserted before the side banners, status toggles on click
  const guardsWrap = document.getElementById('guards');
  const side = guardsWrap.querySelector('.side');
  guards.forEach(g => {
    const card = el('div', 'guard');
    card.appendChild(el('span', 'guard-tag', g.tag));
    card.appendChild(el('div', 'guard-label', g.label));
    const btn = el('button', 'link guard-status');
    btn.type = 'button';
    const render = () => {
      btn.textContent = `${g.blocked ? '차단 중' : '해제 중'} ›`;
      btn.setAttribute('aria-pressed', String(g.blocked));
    };
    btn.addEventListener('click', () => { g.blocked = !g.blocked; render(); });
    render();
    card.appendChild(btn);
    card.appendChild(el('div', 'ph', g.img));
    guardsWrap.insertBefore(card, side);
  });

  // Services
  const servicesWrap = document.getElementById('services');
  services.forEach(s => {
    const a = el('a', 'service');
    a.href = '#';
    const icon = el('span', 'service-icon');
    if (s.badge) icon.appendChild(el('span', 'badge', s.badge));
    a.appendChild(icon);
    a.appendChild(document.createTextNode(s.name));
    servicesWrap.appendChild(a);
  });

  // Benefits
  const benefitsWrap = document.getElementById('benefits');
  benefits.forEach(b => {
    const a = el('a', 'benefit');
    a.href = '#';
    a.style.background = b.bg;
    a.style.color = b.fg;
    a.appendChild(el('span', 'benefit-eyebrow', b.eyebrow));
    a.appendChild(el('span', 'benefit-title', b.title));
    a.appendChild(el('span', 'ph', b.img));
    benefitsWrap.appendChild(a);
  });

  // Tiles
  const tilesWrap = document.getElementById('tiles');
  tiles.forEach(t => {
    const a = el('a', 'tile');
    a.href = '#';
    a.style.background = t.bg;
    a.style.color = t.fg;
    if (t.img) a.appendChild(el('span', 'tile-img'));
    if (t.eyebrow) a.appendChild(el('span', 'tile-eyebrow', t.eyebrow));
    a.appendChild(el('span', 'tile-title', t.title));
    tilesWrap.appendChild(a);
  });

  // Notice ticker — click cycles to the next notice
  const noticeText = document.getElementById('notice-text');
  const noticeDate = document.getElementById('notice-date');
  let noticeIndex = 0;
  const renderNotice = () => {
    noticeText.textContent = notices[noticeIndex].text;
    noticeDate.textContent = notices[noticeIndex].date;
  };
  noticeText.addEventListener('click', () => {
    noticeIndex = (noticeIndex + 1) % notices.length;
    renderNotice();
  });
  renderNotice();
})();
