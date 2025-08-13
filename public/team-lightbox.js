// Minimal, framework-free lightbox for your existing WP HTML
(function () {
  const bios = {
    "erin-scherer": {
      title: "Erin Scherer",
      role: "Director",
      html: `<p>Through a unique blend of strategic planning, operational expertise and collaborative leadership Erin leads this amazing team by supporting them with event logistics and management.</p><p>In addition to directing high-profile events, Erin is instrumental in aligning conference and event strategies with client’s overall goals to ensure seamless logistical execution and effective utilization of resources.</p>`
    },
    "scott-homolka": {
      title: "Scott Homolka",
      role: "Senior Coordinator",
      html: `<p>Scott’s takes on all facets of event management, from facility reservations and catering arrangements to managing vendor contracts and event housing all to adhere to the client’s budget. He oversees the execution of events – like the famed EPIC Engineering Camp cardboard boat race.</p>`
    },
    "tammy-farrell": {
      title: "Tammy Farrell",
      role: "Senior Accounting Analyst",
      html: `<p>A key figure in both Conference & Event Planning and the Performing Arts Center, Tammy oversees all financial transactions, actively participates in the annual budget process and so much more all to ensure that financial plans align seamlessly with organizational goals and objectives, fostering sustainable growth and resource allocation.</p>`
    },
    "nathan-tausch": {
      title: "Nathan Tausch",
      role: "Event Operations Specialist",
      html: `<p>Nathan Tausch is a 2023 graduate of Cal Poly, San Luis Obispo, where he earned a degree in Recreation, Parks & Tourism Administration with a focus on Sports Management. A San Diego native, Nathan joined the team in November 2024 and works to create seamless event production from planning to breakdown.</p>`
    },
    "harlie-adams": {
      title: "Harlie Adams",
      role: "Event and Project Coordinator",
      html: `<p>Harlie excels at planning and executing events, meticulously aligning every detail with client goals and expectations. From choosing venues and managing vendors to coordinating timelines and overseeing on-site logistics, Harlie brings creativity, expertise and experience to craft seamless, memorable experiences.</p>`
    },
  };

  function slugify(s) {
    return (s || "")
      .normalize('NFKD')
      .replace(/[^\w\s-]/g, '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-');
  }

  // Create modal once
  const overlay = document.createElement('div');
  overlay.style.cssText =
    'position:fixed;inset:0;z-index:9999;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.6)';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');

  const panel = document.createElement('div');
  panel.style.cssText =
    'position:relative;max-width:820px;width:min(92vw,820px);max-height:85vh;overflow:auto;background:#fff;border-radius:16px;padding:24px;box-shadow:0 10px 30px rgba(0,0,0,.25)';
  overlay.appendChild(panel);

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.setAttribute('aria-label', 'Close');
  closeBtn.textContent = '×';
  closeBtn.style.cssText =
    'position:absolute;top:8px;right:12px;width:36px;height:36px;border:1px solid #ddd;border-radius:18px;background:#fff;font-size:22px;line-height:34px;cursor:pointer';
  closeBtn.onclick = hide;
  panel.appendChild(closeBtn);

  const content = document.createElement('div');
  panel.appendChild(content);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) hide();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hide();
  });

  function show(html) {
    content.innerHTML = html;
    overlay.style.display = 'flex';
    // Prevent background scroll
    document.documentElement.style.overflow = 'hidden';
  }
  function hide() {
    overlay.style.display = 'none';
    document.documentElement.style.overflow = '';
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(overlay);

    // Delegate clicks from your team section
    const container = document.querySelector('.team');
    if (!container) return;

    container.addEventListener('click', (e) => {
      const a = e.target && e.target.closest('a');
      if (!a) return;

      const text = (a.textContent || '').trim();
      if (!/^Meet\s+/i.test(text)) return;

      e.preventDefault();

      const card = a.closest('.wp-block-column');
      if (!card) return;

      const name = (card.querySelector('h3')?.textContent || '').trim();
      const role = (card.querySelector('h3 + p')?.textContent || '').trim();
      const img = card.querySelector('figure img');

      const slug = slugify(name);
      const b = bios[slug];

      const safeTitle = (b && b.title) || name || 'Team Member';
      const safeRole = (b && b.role) || role || '';
      const imgSrc = img?.getAttribute('src') || '';
      const imgAlt = img?.getAttribute('alt') || safeTitle;

      const html = `
        <div style="display:grid;grid-template-columns:180px 1fr;gap:16px;align-items:start;">
          <div>
            ${imgSrc
              ? `<img src="${imgSrc}" alt="${imgAlt}" style="width:180px;height:180px;object-fit:cover;border-radius:12px;" />`
              : `<div style="width:180px;height:180px;background:#eee;border-radius:12px;"></div>`}
          </div>
          <div>
            <h2 style="margin:0 0 6px 0;font-size:24px;line-height:1.2;">${safeTitle}</h2>
            ${safeRole ? `<p style="margin:0 0 12px 0;font-weight:600;">${safeRole}</p>` : ''}
            <div>${(b && b.html) || '<p>No bio available yet.</p>'}</div>
          </div>
        </div>
      `;
      show(html);
    });
  });
})();
