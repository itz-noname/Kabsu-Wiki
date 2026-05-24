// ---- ALPHA FILTER ---- //
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function buildAlphaFilter(sectionId, names) {
  const section = document.getElementById(sectionId);
  const grid = document.getElementById('grid-' + sectionId);

  // Which letters exist in this section
  const available = new Set(names.map(n => (n.name || n)[0].toUpperCase()));

  // Insert filter before the grid
  const wrap = document.createElement('div');
  wrap.className = 'alpha-filter-wrap';

  const label = document.createElement('span');
  label.className = 'alpha-filter-label';
  label.textContent = 'Filter:';
  wrap.appendChild(label);

  const btnsWrap = document.createElement('div');
  btnsWrap.className = 'alpha-btns';

  // "All" button
  const allBtn = document.createElement('button');
  allBtn.className = 'alpha-btn alpha-btn-all active';
  allBtn.dataset.letter = 'ALL';
  allBtn.textContent = 'All';
  btnsWrap.appendChild(allBtn);

  LETTERS.forEach(letter => {
    const btn = document.createElement('button');
    btn.className = 'alpha-btn' + (available.has(letter) ? '' : ' disabled');
    btn.dataset.letter = letter;
    btn.textContent = letter;
    btnsWrap.appendChild(btn);
  });

  wrap.appendChild(btnsWrap);

  // No results msg
  const noResults = document.createElement('div');
  noResults.className = 'alpha-no-results';
  noResults.textContent = 'No organizations found for this letter.';

  section.insertBefore(noResults, grid);
  section.insertBefore(wrap, noResults);

  // Filter logic
  function applyFilter(letter) {
    let visible = 0;
    grid.querySelectorAll('.org-card').forEach(card => {
      const name = card.querySelector('.org-card-name').textContent;
      const show = letter === 'ALL' || name[0].toUpperCase() === letter;
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    noResults.classList.toggle('visible', visible === 0);
  }

  btnsWrap.addEventListener('click', e => {
    const btn = e.target.closest('.alpha-btn');
    if (!btn || btn.classList.contains('disabled')) return;
    btnsWrap.querySelectorAll('.alpha-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilter(btn.dataset.letter);
  });
}

// ---- DATA ---- //
// Each entry: { name, link }
const orgs = {
    academic: [
        { name: "Chief Delegates of Development Management",                                                                                    link: "https://www.facebook.com/CDDMgt" },
        { name: "Circle of Foundational Educators",                                                                                             link: "https://www.facebook.com/cfe.cvsu/" },
        { name: "Circle of Hotel and Restaurant Management Students",                                                                           link: "https://www.facebook.com/WeAreCHARMS" },
        { name: "Computer Engineering Students' Society - Institute of Computer Engineers of the Philippines Student Edition",                  link: "https://www.facebook.com/CvSUCpE" },
        { name: "Computer Science Student Organization",                                                                                        link: "https://www.facebook.com/CSSO2016/" },
        { name: "CvSU Journalism Guild",                                                                                                        link: "https://www.facebook.com/CvSUJournGuildOfficial" },
        { name: "CvSU Lantern - Leading Assoc. of Nightingales in Training And Emerging RN",                                                    link: "https://www.facebook.com/p/CVSU-Lantern-Leading-Assoc-of-Nightingales-in-Training-Emerging-RNs-61565745496538/" },
        { name: "CvSU League of Automotive SuperB Students",                                                                                    link: "https://www.facebook.com/CLASS.CVSU/" },
        { name: "Criminology Society",                                                                                                          link: "https://www.facebook.com/CCJCriSoc/" },
        { name: "Development Communicators' Association",                                                                                       link: "https://www.facebook.com/cvsudvca/" },
        { name: "Electrical Technology Student Organization",                                                                                   link: "https://www.facebook.com/profile.php?id=100072488476712" },
        { name: "Elite League of Information Technology Students",                                                                              link: "https://www.facebook.com/CvSUELITS" },
        { name: "Industrial Security Students Society",                                                                                         link: "https://www.facebook.com/ISSS.CCJ.CvSU" },
        { name: "Institute of Integrated Electrical Engineers - Council of Student Chapter",                                                    link: "https://www.facebook.com/iieecsccvsumain" },
        { name: "Integrated Student Midwives Association of the Philippines",                                                                   link: "https://www.facebook.com/ISMAPCvSU/" },
        { name: "International Studies Students' Association",                                                                                  link: "https://www.facebook.com/issacvsu" },
        { name: "International Veterinary Students' Association",                                                                               link: "https://www.facebook.com/ivsacvsu" },
        { name: "Junior Financial Executives Institute of the Philippines - CvSU Main Chapter",                                                 link: "https://www.facebook.com/jfinexcvsu" },
        { name: "Junior Institute of Electronics Engineers of the Philippines",                                                                 link: "https://www.facebook.com/cvsuece" },
        { name: "Junior Marketing Association",                                                                                                 link: "https://www.facebook.com/CvSUJMA/" },
        { name: "Junior Operations Management Association",                                                                                     link: "https://www.facebook.com/joma.cvsumain" },
        { name: "Junior People Management Association of the Philippines - CvSU Central Chapter",                                               link: "https://www.facebook.com/JPMAPCvSUMain/" },
        { name: "Junior Philippine Institute of the Accountants - CvSU Chapter",                                                               link: "https://www.facebook.com/jpiacvsu/" },
        { name: "Junior Social Workers' Association of the Philippines - CvSU Main Campus Chapter",                                            link: "https://www.facebook.com/jswap.cvsumain" },
        { name: "Matayuyon Crop Science Society",                                                                                               link: "https://www.facebook.com/MatayuyonCS/" },
        { name: "Mitochondrion Society",                                                                                                        link: "https://www.facebook.com/CvSUMitochondrion" },
        { name: "Paddock Society",                                                                                                              link: "./PADDOCK SOCIETY/Paddock Society.html",             img: "./Images/Orgs/PaddockSocietyImg.jpg" },
        { name: "Philippine Association of Food Technologists Inc. - CvSU Chapter",                                                            link: "https://www.facebook.com/PAFTCvSUChapter/" },
        { name: "Philippine Association of Students in Office Administration - CvSU Main Chapter",                                              link: "https://www.facebook.com/PASOACvSUOfficialsPage" },
        { name: "Philippine Institute of Civil Engineers - CvSU Student Chapter",                                                              link: "https://www.facebook.com/picecvsustudentchapter/" },
        { name: "Philippine Institute of Industrial Engineers - CvSU Student Chapter",                                                         link: "https://www.facebook.com/piiecvsusc/" },
        { name: "Philippine Society of Agricultural And Biosystems Engineers - Pre-Professional Group CvSU Chapter",                           link: "https://www.facebook.com/psabeppgcvsuchapter" },
        { name: "Philippine Society of Medical Technology Students - CvSU Chapter",                                                            link: "https://www.facebook.com/PHISMETS.CvSU" },
        { name: "Pragmaticus",                                                                                                                  link: "https://www.facebook.com/pragmaticus.cvsu" },
        { name: "Psychology Circle",                                                                                                            link: "https://www.facebook.com/PsychCircleCvSUMain" },
        { name: "Punlaan Community",                                                                                                            link: "https://www.facebook.com/p/Punlaan-Community-61552235964596/" },
        { name: "Radicands - CvSU Cluster of Applied Mathematics Students",                                                                    link: "https://www.facebook.com/bsam.radicands" },
        { name: "Rodeo Club",                                                                                                                   link: "https://www.facebook.com/cvsurodeoclub" },
        { name: "Salinlahi - The Association of BS Environmental Science Students",                                                             link: "https://www.facebook.com/salinlahicvsu" },
        { name: "SAMAKOM - Samahan Ng Mga Mag-Aaral Sa Komunikasyon",                                                                          link: "https://www.facebook.com/cvsusamakom/" },
        { name: "Society for the Advancement of Veterinary Education and Research",                                                            link: "https://www.facebook.com/cvsusaver/" },
        { name: "Society of Future Economists",                                                                                                 link: "https://www.facebook.com/OfficialSFE" },
        { name: "Society of Industrial Technology Electronics Students",                                                                        link: "https://www.facebook.com/cvsu.elex.sites" },
        { name: "Student Congress of Physical Education",                                                                                       link: "https://www.facebook.com/profile.php?id=61564736113731" },
        { name: "Teacher Education Circle",                                                                                                     link: "https://www.facebook.com/educcirclecvsu" },
        { name: "Thoroughbreds",                                                                                                                link: "https://www.facebook.com/CvSUThoroughbreds/" },
        { name: "Tourism Students Association",                                                                                                 link: "https://www.facebook.com/tourismstudentsassociation/" },
        { name: "United Architects of the Philippines - Student Auxiliary - CvSU Chapter",                                                     link: "https://www.facebook.com/uapsacvsu" },
        { name: "Utopia - The Society of BA Political Science Students",                                                                        link: "https://www.facebook.com/utopiacvsu" },
        { name: "Venerable Knight Veterinarians - Venerable Lady Veterinarians",                                                               link: "https://www.facebook.com/VKVVLVLAMBDA" }
    ],
    "non-academic": [
        { name: "Amazon Web Services Learning Club - Spade",                                                                                    link: "https://www.facebook.com/p/AWS-Learning-Club-Spade-61558923103548/" },
        { name: "Argumentum El Debaztere Society",                                                                                             link: "https://www.facebook.com/p/Argumentum-El-Debaztere-Society-100086739533541/" },
        { name: "Banyuhay Publication",                                                                                                         link: "https://www.facebook.com/BanyuhayPublication/" },
        { name: "CCJ - Information, Communication and Technical Team",                                                                          link: "https://www.facebook.com/profile.php?id=100086450767378" },
        { name: "CSPEAR - Cultural and Performing Arts Guild",                                                                                  link: "https://www.facebook.com/profile.php?id=61578986355708" },
        { name: "CSPEAR Sports Organization",                                                                                                   link: "https://www.facebook.com/profile.php?id=61565273090786" },
        { name: "CvSU Chess Club",                                                                                                              link: "https://www.facebook.com/profile.php?id=61581941938690" },
        { name: "CvSU DOST Scholars' Association",                                                                                             link: "https://www.facebook.com/cvsudostscholars/" },
        { name: "CvSU Emergency Response and Airsoft Team",                                                                                    link: "https://www.facebook.com/CvSUMAIN.CERAT/" },
        { name: "CvSU Hornets Cheer Squad",                                                                                                    link: "https://www.facebook.com/profile.php?id=61574905111631" },
        { name: "CvSU Mountaineering Society",                                                                                                  link: "https://www.facebook.com/CavSUM/" },
        { name: "CvSU Musikeros",                                                                                                               link: "https://www.facebook.com/CvSUMusikeros" },
        { name: "CvSU Otaku Society",                                                                                                           link: "https://www.facebook.com/CvSUOtakuSocietyMainCampus/" },
        { name: "CvSU Pre-Law Society",                                                                                                         link: "https://www.facebook.com/CvSUPreLawSoc/" },
        { name: "CvSU Red Cross Youth - Alalay",                                                                                               link: "https://www.facebook.com/cvsurcyalalay/" },
        { name: "CvSU Sustainable Development Goals Society",                                                                                   link: "https://www.facebook.com/profile.php?id=61550880856777" },
        { name: "CvSU The Asclepian Society",                                                                                                   link: "https://www.facebook.com/cvsu.asclepsoc" },
        { name: "DZSU Hayag Luntian",                                                                                                           link: "https://www.facebook.com/DZSUHayagLuntian/" },
        { name: "Foreign Student Association",                                                                                                  link: "https://www.facebook.com/p/Foreign-Students-Association-Cavite-State-University-Main-Campus-100067452203339/" },
        { name: "Kabsuhenyong Samahan ng Mga Mangagawa, Manlilikha at Manininda",                                                              link: "https://www.facebook.com/CvSUKASAMA3/" },
        { name: "Lipon ng Kagalingang Hanay ng Mga Artistikong Indibidwal",                                                                    link: "https://www.facebook.com/likhain.cvsumain/" },
        { name: "Mind Your Mind",                                                                                                               link: "https://www.facebook.com/mym.cvsu/" },
        { name: "Pagkakaisa ng Mga Mag-Aaral na Nagtataguyod ng Araling Panlipunan",                                                           link: "https://www.facebook.com/profile.php?id=61565298465112" },
        { name: "Sentro Pilipinas",                                                                                                             link: "https://www.facebook.com/SentroPilipinas/" },
        { name: "Sinagtala - Multimedia Arts Organization",                                                                                     link: "https://www.facebook.com/sinagtala.multimedia/" },
        { name: "Talesmiths Collective",                                                                                                        link: "https://www.facebook.com/Talesmiths.Collective/" },
        { name: "The Gazette - The Official Student Publication Unit of CvSU Main Campus",                                                     link: "https://www.facebook.com/TheGazetteCvSU" },
        { name: "The Pinnacle Esports Organization",                                                                                            link: "https://www.facebook.com/tpcvsu/" },
        { name: "University First Year - Student Council",                                                                                      link: "https://www.facebook.com/CvSUUFYSC" },
        { name: "University Irregular Organization",                                                                                            link: "https://www.facebook.com/profile.php?id=61580411671622" },
        { name: "Vanguard Institute of Practical and Combat Shooting, Empty Hand Combatives and Enhancement Training to Operational Readiness Skills", link: "https://www.facebook.com/profile.php?id=61580492938239" },
        { name: "Youth For Animals",                                                                                                            link: "https://www.facebook.com/YFA.CvSU/" },
        { name: "YTR Youth Organization Inc. (Youth on the Rock)",                                                                             link: "https://www.facebook.com/groups/886284947512124" }
    ],
    councils: [
        { name: "Central Student Government - Cavite State University Main (CSG)",                                                             link: "https://www.facebook.com/cvsu.csgmain2023" },
        { name: "College of Agriculture, Food, Environment and Natural Resources - Student Council (CAFENR-SC)",                               link: "https://www.facebook.com/cafenrsc" },
        { name: "College of Arts and Science - Student Council (CAS-SC)",                                                                      link: "https://www.facebook.com/CvSUCAS" },
        { name: "College of Criminal Justice - Student Council (CCJ-SC)",                                                                      link: "https://www.facebook.com/ccjstudentcouncil" },
        { name: "College of Education - Student Council (CED-SC)",                                                                             link: "https://www.facebook.com/cedsc.cvsu" },
        { name: "College of Economics, Management and Development Studies - Student Council (CEMDS-SC)",                                       link: "https://www.facebook.com/CEMDSKnights" },
        { name: "College of Engineering and Information Technology - Student Council (CEIT-SC)",                                               link: "https://www.facebook.com/ceitsc.cvsumain" },
        { name: "College of Nursing - Student Council (CON-SC)",                                                                               link: "https://www.facebook.com/CvSUCONSC" },
        { name: "College of Sports, Physical Education and Recreation - Student Council (CSPEAR-SC)",                                          link: "https://www.facebook.com/CspearSC/" },
        { name: "College of Veterinary Medicine and Biomedical Sciences - Student Council (CVMBS-SC)",                                        link: "https://www.facebook.com/CVMBSStudentCouncil" },
        { name: "College of Medicine - Student Council (COM-SC)",                                                                              link: "https://www.facebook.com/CvSUCollegeOfMedicineStudentCouncil" },
        { name: "College of Tourism and Hospitality Management - Student Council (CTHM-SC)",                                                   link: "https://www.facebook.com/cvsu.cthm.sc" }
    ],
    religious: [
        { name: "Breakthrough Generation",              link: "https://www.facebook.com/bgcvsumain" },
        { name: "Christian Brotherhood International",  link: "https://www.facebook.com/CFO.CBI" },
        { name: "CvSU Campus Link",                     link: "https://www.facebook.com/profile.php?id=61566140189279" },
        { name: "Every Nation Campus",                  link: "./EVERY NATION CAMPUS/Every Nation Campus.html", img: "./Images/Orgs/EveryNationCampusImg.jpg" },
        { name: "CvSU Found in Savior's Heart Generation", link: "https://www.facebook.com/official.cvsufishgen" },
        { name: "CvSU School Outreach Ministry",        link: "https://www.facebook.com/kkbcvsu" },
        { name: "Debtors to Saviour Mission",           link: "https://www.facebook.com/profile.php?id=100090594456568" },
        { name: "Lighthouse",                           link: "https://www.facebook.com/LighthouseIndang" },
        { name: "Wildfire-CvSU",                        link: "https://www.facebook.com/WildFireCvSU/" }
    ],
    performing: [
        { name: "CvSU Chorale Ensemble",        link: "https://www.facebook.com/CvSUChoraleEnsemble" },
        { name: "CvSU Cultural Dance Troupe",   link: "https://www.facebook.com/cvsu.indayog" },
        { name: "Prime Moverz and Primera Hija",link: "https://www.facebook.com/p/Prime-Moverz-61563542647091/" },
        { name: "Students Artiste Society",     link: "https://www.facebook.com/studentartistesociety" }
    ]
};

// SVG icons per category
const catIcons = {
    academic: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
    "non-academic": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    councils: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    religious: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0 0 4h5v5a2 2 0 0 0 4 0v-5h5a2 2 0 0 0 0-4h-5V4a2 2 0 0 0-2-2z"/></svg>`,
    performing: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`
};

// Build cards
function buildGrid(cat, items) {
    const grid = document.getElementById('grid-' + cat);
    items.forEach(item => {
        const name = item.name || item;
        const link = item.link || null;

        const card = document.createElement(link ? 'a' : 'div');
        card.className = 'org-card';
        card.setAttribute('data-cat', cat);
        if (link) {
            card.href = link;
            const isInternal = link.startsWith('./') || link.startsWith('../');
            if (!isInternal) {
                card.target = '_blank';
                card.rel = 'noopener noreferrer';
            }
        }
        const imgContent = item.img
            ? `<img src="${item.img}" alt="${name}" class="org-card-photo">`
            : `<div class="org-img-placeholder">${catIcons[cat]}</div>`;
        card.innerHTML = `
          <div class="org-card-img">${imgContent}</div>
          <div class="org-card-name">${name}</div>
        `;
        grid.appendChild(card);
    });
}

Object.keys(orgs).forEach(cat => {
  buildGrid(cat, orgs[cat]);
  buildAlphaFilter(cat, orgs[cat]);
});

// ---- NAVBAR SCROLL ----
const navbar = document.getElementById('navbar');
const hero = document.getElementById('hero');
function updateNavbar() {
    if (hero.getBoundingClientRect().bottom <= 0) {
        navbar.classList.add('navbar-visible');
    } else {
        navbar.classList.remove('navbar-visible');
    }
}
updateNavbar();
window.addEventListener('scroll', updateNavbar, { passive: true });

// ---- TAB SCROLL ----
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const target = document.getElementById(btn.dataset.target);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Highlight tab on scroll
const sections = ['academic', 'non-academic', 'councils', 'religious', 'performing'];
const tabBtns = document.querySelectorAll('.tab-btn');
window.addEventListener('scroll', () => {
    let current = sections[0];
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 130) current = id;
    });
    tabBtns.forEach(b => {
        b.classList.toggle('active', b.dataset.target === current);
    });
}, { passive: true });