/* eslint-disable no-undef */
/* portfolio.js - dynamic rendering + accessibility enhancements
   Keep this file at end of body (deferred). */

// loader helper (existing)
function portfolio_loader(bool) {
  const el = document.getElementById("portfolio_loader");
  if (el) el.style.display = (bool ? "flex" : "none");
}
portfolio_loader(true);

// wait for DOM content
document.addEventListener("DOMContentLoaded", () => {
  // hide loader
  portfolio_loader(false);

  // ----- THEME HANDLING -----
  (function themeInit() {
    const root = document.documentElement;
    const toggleBtn = document.getElementById('theme-toggle');

    const stored = localStorage.getItem('theme'); // 'dark' or 'light'
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored ? stored : (prefersDark ? 'dark' : 'light');
    root.setAttribute('data-theme', initial);
    if (toggleBtn) toggleBtn.setAttribute('aria-pressed', initial === 'dark');

    function updateTheme(theme) {
      root.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      if (toggleBtn) {
        toggleBtn.setAttribute('aria-pressed', theme === 'dark');
        const icon = toggleBtn.querySelector('i');
        if (icon) {
          icon.classList.toggle('fa-sun', theme === 'light');
          icon.classList.toggle('fa-moon', theme === 'dark');
        }
      }
    }
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const cur = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        updateTheme(cur === 'dark' ? 'light' : 'dark');
      });
    }

    // keyboard shortcut: "t" toggles theme (if not typing)
    window.addEventListener('keydown', (e) => {
      const tag = document.activeElement.tagName;
      if (e.key.toLowerCase() === 't' && tag !== 'INPUT' && tag !== 'TEXTAREA') {
        const cur = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        updateTheme(cur === 'dark' ? 'light' : 'dark');
      }
    });

  })();


  // ----- TOASTS (accessible) -----
  function init_toast(message = "", id = "my_toast") {
    const toast = document.querySelector(`.toast#${id}`);
    if (!toast) return;
    toast.style.zIndex = '10000';
    if (message) {
      const bodyMsg = id === 'my_toast_offline' ? document.querySelector(`#${id} #message_offline`) : document.querySelector(`#${id} #message`);
      if (bodyMsg) bodyMsg.innerText = message;
    }
    try {
      const toaster = new bootstrap.Toast(toast);
      toaster.show();
    } catch (err) {
      // fallback: console
      console.log('Toast:', message);
    }
  }

  window.addEventListener("offline", () => init_toast("You are offline.", "my_toast_offline"));
  window.addEventListener("online", () => init_toast("You're back online.", "my_toast_offline"));

  // ----- AJAX form submit (keeps original behavior) -----
  $("#connect-form").on('submit', function (e) {
    e.preventDefault();
    const $form = $(this);
    const data = $form.serialize();

    $.ajax({
      type: "POST",
      url: "https://sis107.infinityfreeapp.com/Portfolio/assets/php/connect_form_handle.php",
      data: data,
      success: function (response, status, jxhr) {
        if (jxhr.status == 200) {
          init_toast("Message sent! I'll respond soon.");
          setTimeout(() => { $form.trigger('reset'); }, 500);
        } else {
          init_toast("Sent (unknown status).");
        }
      },
      error: function (xhr, status, error) {
        init_toast(`Sorry! There's an error. We'll figure this out.`);
        setTimeout(() => { $form.trigger('reset'); }, 500);
      }
    });
  });

  // ----- small UI helpers -----
  // collapse mobile nav when link clicked
  document.querySelectorAll(".navbar-nav li").forEach(element => {
    element.addEventListener("click", (e) => {
      const target = e.target;
      if (target && target.classList.contains('nav-link')) {
        setTimeout(() => {
          const collapse = document.querySelector('#portfolionav');
          if (collapse && collapse.classList.contains('show')) {
            const bsCollapse = bootstrap.Collapse.getInstance(collapse);
            if (bsCollapse) bsCollapse.hide();
          }
        }, 150);
      }
    });
  });

  // lazy images & ensure alt
  document.querySelectorAll('img').forEach(img => {
    if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
    if (!img.alt || img.alt.trim() === '') img.alt = 'Portfolio image - Muthukrishnan';
  });

  // form accessibility: attach aria-describedby if small exists
  document.querySelectorAll('.form-group').forEach(group => {
    const input = group.querySelector('input, textarea, select');
    const small = group.querySelector('small');
    if (input && small) {
      const id = input.id || 'f_' + Math.random().toString(36).slice(2, 8);
      input.id = id;
      small.id = id + '_hint';
      input.setAttribute('aria-describedby', small.id);
    }
  });

  // toparrow visibility
  document.addEventListener("scroll", () => {
    const top = document.getElementById("toparrow");
    if (!top) return;
    if (window.scrollY > 30) {
      top.style.opacity = "1";
      top.style.right = "0.5rem";
    } else {
      top.style.opacity = "0";
      top.style.right = "-3rem";
    }
  });

  // ----- progress circles (education) -----
  function startprog(circ) {
    let n = parseFloat(circ.dataset.value) || 0;
    let p = 0;
    if (n > 100) n = 100;
    if (n < 0) n = 0;
    function circprogress() {
      circ.style.background = `conic-gradient(${getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()} ${p}%, rgba(206,203,203,0.6) 0%)`;
      circ.querySelector('span').innerText = p + "%";
      if (p < n) {
        p++;
        window.requestAnimationFrame(circprogress);
      }
    }
    circprogress();
  }
  function initprogall() {
    const circs = document.querySelectorAll(".circprogress");
    circs.forEach(element => {
      startprog(element);
    });
  }
  initprogall();

  // ----- safe renderer helper -----
  function safeRenderList(container, itemsHtml) {
    if (!container) return;
    container.innerHTML = '';
    const frag = document.createDocumentFragment();
    const temp = document.createElement('div');
    temp.innerHTML = itemsHtml;
    Array.from(temp.children).forEach(ch => frag.appendChild(ch));
    container.appendChild(frag);
  }

  // ----- Dynamic Data (kept from original index.html) -----
  // projects, skills, education, social arrays (original content preserved)
  const project_data = [
    {
      id: 1,
      project_title: 'Student Information and Support System',
      project_image: 'assets/images/back-to-school.jpg',
      project_description: `The <b>Student Information and Support System (SIS)</b> is a web-based application designed to manage and streamline the administrative processes of an educational institution.`,
      project_link: "https://sis107.infinityfreeapp.com/SIS/",
      stacks_used: ['HTML', 'CSS', 'JS', 'PHP', 'MySQL', 'Bootstrap', 'Chart JS'],
      project_features: [
        { feature_head: 'User Roles', feature_body: "Secure logins for admins, teachers, and students." },
        { feature_head: 'Course & Grade Tracking', feature_body: "Teachers can manage course details and record student grades." },
        { feature_head: 'Attendance & Notices', feature_body: "Real-time monitoring of student attendance with notices." }
      ]
    },
    {
      id: 2,
      project_title: 'Vote System',
      project_image: 'assets/images/online-voting.png',
      project_description: `The <b>Vote System</b> is a web-based application designed for college elections with multiple voting booths connected via LAN.`,
      project_link: "https://github.com/muthuabi/Vote_System/",
      stacks_used: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript','Bootstrap','AJAX'],
      project_features: [
        { feature_head: 'Multiple Voting Booths', feature_body: "Booths connected through the same LAN network." },
        { feature_head: 'Admin Control', feature_body: "Admins can start and end polls, perform CRUD on positions & candidates." }
      ]
    }
  ];

  const skill_data = [
    { id:1, skill:"HTML", icon:"fab fa-html5", level:"Advanced", description:["Self-taught with practice.","Proficient in HTML5 elements.","Responsive layouts."]},
    { id:2, skill:"JavaScript", icon:"fab fa-js", level:"Intermediate", description:["Strong JS fundamentals.","DOM manipulation & events.","APIs like Fetch/AJAX."]},
    { id:3, skill:"PHP", icon:"fab fa-php", level:"Advanced", description:["Hands-on PHP projects.","File handling & DB integration."]},
    { id:4, skill:"SQL", icon:"fas fa-database", level:"Intermediate", description:["CRUD & JOINs","Aggregate functions."]},
    { id:5, skill:"React", icon:"fab fa-react", level:"Beginner", description:["Basic React & JSX knowledge."]},
    { id:6, skill:"Bootstrap", icon:"fab fa-bootstrap", level:"Intermediate", description:["Layout & components."]},
    { id:7, skill:"Java", icon:"fab fa-java", level:"Basic", description:["OOP basics."]},
    { id:8, skill:"Python", icon:"fab fa-python", level:"Core", description:["Data structures & scripting."]},
    { id:9, skill:"C & C++", icon:"fas fa-code", level:"Core", description:["OOP & DS fundamentals."]}
  ];

  const education_data = [
    { id:1, degree:'B.Sc. Computer Science', institution:"St Xavier's College - Palayamkottai", start_date:'Sep 2021', end_date:'May 2024', score:'CGPA - 8.6', data_value:'86', skills_learned:['C&C++','Java','Python','SQL','PHP']},
    { id:2, degree:'H.S.E - Computer Science', institution:"Margoschis Higher Secondary School - Nazareth", start_date:'2020', end_date:'2021', score:'Percentage - 92.6%', data_value:'92.6', skills_learned:['C++','SQL','Python']},
    { id:3, degree:'S.S.L.C', institution:"Margoschis Higher Secondary School - Nazareth", start_date:'2018', end_date:'2019', score:'Percentage - 80.8%', data_value:'80.8', skills_learned:[]}
  ];

  const social_media_data = [
    { platform:"WhatsApp", url:"https://wa.me/+919025190054/", icon:"fab fa-whatsapp" },
    { platform:"Twitter", url:"https://twitter.com/M_Krish_Abi_07/", icon:"fab fa-twitter" },
    { platform:"LinkedIn", url:"https://www.linkedin.com/in/muthukrishnan-m-800bb7274/", icon:"fab fa-linkedin" },
    { platform:"Quora", url:"https://www.quora.com/profile/Muthukrishnan-M-36", icon:"fab fa-quora" },
    { platform:"Instagram", url:"https://www.instagram.com/m.krish_abi_07", icon:"fab fa-instagram" }
  ];

  // containers
  const projects_list = document.querySelector("#projects_container");
  const skills_list = document.querySelector("#skills_container");
  const education_list = document.querySelector("#education_container");
  const social_media_containers = document.querySelectorAll(".social-outer");

  // render skills
  if (skills_list && Array.isArray(skill_data)) {
    const skillHtml = skill_data.map(s => {
      const desc = (s.description||[]).map(d => `<li class="list-group-item">${d}</li>`).join('');
      return `<div class="col-md-3 skill-card-item" id="skill_card${s.id}" role="listitem" tabindex="0">
        <div class="skill-card-pop" aria-hidden="true">
          <div class="hexagon"><div class="inner-hex"><i class="${s.icon} skill-icon" aria-hidden="true"></i></div></div>
        </div>
        <div class="skill-card-body">
          <h3 class="skill-card-head">${s.skill}</h3>
          <p class="lead">(${s.level})</p>
          <ul class="list-group" aria-label="${s.skill} details">${desc}</ul>
        </div>
      </div>`;
    }).join('');
    safeRenderList(skills_list, skillHtml);
  }

  // render projects
  if (projects_list && Array.isArray(project_data)) {
    const active_id = project_data[0] ? project_data[0].id : null;
    const projectHtml = project_data.map((p, idx) => {
      const stacks = (p.stacks_used||[]).map(st => `<li class='skill-list-item'>${st}</li>`).join('');
      const features = (p.project_features||[]).map(f => `<li><b>${f.feature_head}</b><p>${f.feature_body}</p></li>`).join('');
      return `<div class="${p.id == active_id ? 'active' : ''} c-item carousel-item" id="project_card${p.id}" role="group" aria-roledescription="slide" aria-label="${p.project_title}">
        <div class="project-card">
          <div class="p-2"><img src="${p.project_image}" alt="${p.project_title} screenshot" class="img-fluid rounded"></div>
          <div class="project-description">
            <h4 class="sub-head-text">${p.project_title}</h4>
            <div class="px-md-3 px-2 d-flex flex-column gap-1">
              <p class="mb-1 text-justify">${p.project_description}</p>
              <a class="btn btn-dark" href="${p.project_link}" target="_blank" rel="noopener noreferrer" aria-label="Open ${p.project_title} in new tab">View Project</a>
              <b>Stacks Used</b>
              <div class="w-100 d-flex flex-wrap p-2 gap-md-3 gap-2 align-items-center">${stacks}</div>
              <div class="accordion">
                <div class="accordion-item" style="border:none">
                  <button class="accordion-header accordion-button w-100" type="button" aria-expanded="false" aria-controls="Accord${p.id}" data-bs-target="#Accord${p.id}" data-bs-toggle="collapse">
                    <b class="pl-1">Features</b>
                  </button>
                  <div class="accordion-collapse collapse" id="Accord${p.id}">
                    <ul class="project-card-list">${features}</ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    }).join('');
    safeRenderList(projects_list, projectHtml);
  }

  // render education
  if (education_list && Array.isArray(education_data)) {
    const educationHtml = education_data.map(d => {
      const skillsLearned = (d.skills_learned || []).map(s => `<li class='skill-list-item'>${s}</li>`).join('');
      return `<div class="edu-card" id='edu-card${d.id}'>
        <div class="d-flex align-items-center">
          <div>
            <div class="circprogress" data-value="${d.data_value || 0}" aria-hidden="true">
              <span>0%</span>
            </div>
          </div>
          <div class="sub-content">
            <h5 class="sub-head-text">${d.degree}</h5>
            <b style="color:rgb(92, 89, 89)">${d.institution}</b>
            <h6><time>${d.start_date}</time> - <time>${d.end_date}</time></h6>
            <strong>${d.score}</strong>
          </div>
        </div>
        ${(d.skills_learned && d.skills_learned.length > 0) ? `<div class="w-100 d-flex px-2 gap-md-4 gap-2 align-items-center" style="flex-wrap: wrap;"><b class="lead">Skills Learned</b>${skillsLearned}</div>` : ''}
      </div>`;
    }).join('');
    safeRenderList(education_list, educationHtml);
    // start progress after render
    initprogall();
  }

  // render socials
  if (social_media_containers && social_media_containers.length && Array.isArray(social_media_data)) {
    const social_list = social_media_data.map(s => `<a href="${s.url}" target="_blank" rel="noopener noreferrer" aria-label="${s.platform}"><div class="socials"><i class="${s.icon} social-icon" aria-hidden="true"></i></div></a>`).join('');
    social_media_containers.forEach(el => el.innerHTML += social_list);
  }
});
