'use strict';
//  Global state
const S = {
    virusAlive : true,
    virusGone : false,
    scanDone: false,
    scanHitVirus: false,
    windowsZ : 300,
    activeWin : null,
    openWins : {},
    recycleItems : [],
    cmdHistory : [],
    historyIdx : -1,
    glitchTimer : null,
    popupTimer : null,
    popupTimer : null,
    popupShowing : false
};

function showShutdown() {
    
    document.getElementById('start-menu').style.display = 'none';
    
    document.getElementById('sd-overlay').style.display = 'block';
    document.getElementById('sd-dialog').style.display  = 'block';
}

function closeShutdown() {
    document.getElementById('sd-overlay').style.display = 'none';
    document.getElementById('sd-dialog').style.display  = 'none';
}

function toggleStart() {
    const menu = document.getElementById('start-menu');
    if (menu.style.display === 'none') {
        menu.style.display = 'flex';
        menu.style.flexDirection = 'column';
    } else {
        menu.style.display = 'none';
    }
}
// the above code it for testing purpose:
// the below code is original.
const ICO = {
  folder:      mkSVG(`<path d='M2 8 Q2 6 4 6 L12 6 L14 8 L28 8 Q30 8 30 10 L30 26 Q30 28 28 28 L4 28 Q2 28 2 26 Z' fill='%23f5d020'/><path d='M2 10 L30 10 L30 26 Q30 28 28 28 L4 28 Q2 28 2 26 Z' fill='%23f7e060'/>`),
  txt:         mkSVG(`<rect x='4' y='2' width='20' height='28' rx='1' fill='white' stroke='%23808080'/><line x1='7' y1='9' x2='20' y2='9' stroke='%23888' stroke-width='1'/><line x1='7' y1='13' x2='20' y2='13' stroke='%23888' stroke-width='1'/><line x1='7' y1='17' x2='20' y2='17' stroke='%23888' stroke-width='1'/><line x1='7' y1='21' x2='16' y2='21' stroke='%23888' stroke-width='1'/>`),
  exe:         mkSVG(`<rect x='2' y='4' width='28' height='24' rx='2' fill='%23c0c0c0' stroke='%23808080'/><rect x='4' y='6' width='24' height='14' fill='%230000aa'/><rect x='4' y='20' width='24' height='6' fill='%23ddd'/><text x='7' y='16' font-family='monospace' font-size='6' fill='%2300ff00'>EXE</text>`),
  virusexe:    mkSVG(`<rect x='2' y='4' width='28' height='24' rx='2' fill='%23440000' stroke='%23cc0000' stroke-width='1.5'/><rect x='4' y='6' width='24' height='14' fill='%23880000'/><text x='4' y='17' font-family='monospace' font-size='7' fill='%23ff0000' font-weight='bold'>VIRUS</text><circle cx='26' cy='7' r='5' fill='%23ff0000'/><text x='23.5' y='9' font-family='monospace' font-size='6' fill='white' font-weight='bold'>!</text>`),
  dll:         mkSVG(`<rect x='2' y='4' width='28' height='24' rx='2' fill='%23e0f0e0' stroke='%23608060'/><text x='4' y='22' font-family='monospace' font-size='9' fill='%23406040' font-weight='bold'>DLL</text>`),
  dat:         mkSVG(`<rect x='4' y='2' width='20' height='28' rx='1' fill='%23f0f0f0' stroke='%23808080'/><text x='5' y='22' font-family='monospace' font-size='8' fill='%23666'>DAT</text>`),
  log:         mkSVG(`<rect x='4' y='2' width='20' height='28' rx='1' fill='%23fffff0' stroke='%23888'/><line x1='7' y1='8' x2='20' y2='8' stroke='%23888' stroke-width='1'/><line x1='7' y1='12' x2='20' y2='12' stroke='%23888' stroke-width='1'/><line x1='7' y1='16' x2='20' y2='16' stroke='%23888' stroke-width='1'/>`),
  drive:       mkSVG(`<rect x='2' y='6' width='28' height='20' rx='2' fill='%23c0c0c0' stroke='%23808080'/><rect x='4' y='8' width='24' height='14' rx='1' fill='%23a0a0a0'/><circle cx='24' cy='25' r='3' fill='%23808080'/><rect x='6' y='22' width='12' height='4' rx='1' fill='%23606060'/>`),
  mycomputer:  mkSVG16(`<rect x='1' y='2' width='14' height='10' rx='1' fill='%23c0c0c0' stroke='%23808080' stroke-width='0.5'/><rect x='2' y='3' width='12' height='8' fill='%230000aa'/><rect x='4' y='12' width='8' height='1' fill='%23a0a0a0'/><rect x='3' y='13' width='10' height='1' fill='%23808080'/>`),
  notepadico:  mkSVG16(`<rect x='2' y='1' width='10' height='14' rx='0.5' fill='white' stroke='%23808080' stroke-width='0.5'/><rect x='4' y='2' width='1' height='13' fill='%23c0e0ff'/><line x1='5' y1='4' x2='11' y2='4' stroke='%23808080' stroke-width='0.5'/><line x1='5' y1='7' x2='11' y2='7' stroke='%23808080' stroke-width='0.5'/><line x1='5' y1='10' x2='11' y2='10' stroke='%23808080' stroke-width='0.5'/><rect x='11' y='1' width='3' height='4' fill='%23ffff80' stroke='%23808080' stroke-width='0.5'/>`),
  scannerIco:  mkSVG16(`<circle cx='8' cy='8' r='6' fill='%23003a00' stroke='%2300ee00' stroke-width='0.5'/><circle cx='8' cy='8' r='4' fill='none' stroke='%2300cc00' stroke-width='0.5'/><circle cx='8' cy='8' r='2' fill='none' stroke='%2300aa00' stroke-width='0.5'/><line x1='8' y1='2' x2='8' y2='14' stroke='%2300ff00' stroke-width='0.4'/><line x1='2' y1='8' x2='14' y2='8' stroke='%2300ff00' stroke-width='0.4'/><circle cx='8' cy='8' r='1' fill='%2300ff00'/>`),
  terminalIco: mkSVG16(`<rect x='1' y='2' width='14' height='12' rx='0.5' fill='black' stroke='%23333' stroke-width='0.5'/><text x='3' y='9' font-family='monospace' font-size='5' fill='%2300ff00'>C:\&gt;</text><rect x='10' y='7' width='3' height='1' fill='%2300ff00'/>`),
  recycleIco:  mkSVG16(`<path d='M8 2 L10 5 L6 5 Z' fill='%23707070'/><path d='M10 5 Q14 5 13 9 L11 8 L12 12 L8 11 L9 9 L7 10 Z' fill='%23909090'/><path d='M6 5 Q2 5 3 9 L5 8 L4 12 L8 11 L7 9 L9 10 Z' fill='%23606060'/>`),
  shieldGreen: mkSVG16(`<path d='M8 1 L14 4 L14 9 Q14 13 8 15 Q2 13 2 9 L2 4 Z' fill='%23228822' stroke='%23006600' stroke-width='0.5'/><text x='5' y='11' font-family='monospace' font-size='7' fill='white' font-weight='bold'>✔</text>`),
  refresh:     mkSVG16(`<path d='M8 2 Q12 2 14 6' fill='none' stroke='%23555' stroke-width='1.5'/><path d='M14 6 L12 4 L16 4 Z' fill='%23555'/><path d='M8 14 Q4 14 2 10' fill='none' stroke='%23555' stroke-width='1.5'/><path d='M2 10 L4 12 L0 12 Z' fill='%23555'/>`),
  trayNet:     mkSVG16(`<rect x='2' y='10' width='4' height='4' fill='%23228833'/><rect x='6' y='7' width='4' height='7' fill='%232299aa'/><rect x='10' y='4' width='4' height='10' fill='%232255cc'/>`),
  trayVol:     mkSVG16(`<polygon points='3,5 7,5 11,2 11,14 7,11 3,11' fill='%23555'/><path d='M12 5 Q15 8 12 11' fill='none' stroke='%23555' stroke-width='1'/>`),
};
 
function mkSVG(inner) {
  return `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>${inner}</svg>`;
}
function mkSVG16(inner) {
  return `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'>${inner}</svg>`;
}
 
/* ─── FILESYSTEM ────────────────────────────────── */
const FS = {
  'C:': { type:'drive', children:{
    'Documents': { type:'folder', children:{
      'readme.txt': { type:'file', ext:'txt', content:'Welcome to XP.EXE.\n\nThis computer has been running slowly lately.\nI noticed some strange processes in Task Manager.\nIf you find anything suspicious, please remove it.\n\n— The previous user' },
      'notes.txt':  { type:'file', ext:'txt', content:'TODO:\n- Call IT support\n- Check System32 folder — URGENT\n- Something is wrong with this PC...\n- CPU fan is going crazy\n\nNote: saw a file called virus.exe in System32\nDont know what it does but it looks bad' },
      'log.txt':    { type:'file', ext:'txt', content:'[2024-01-15 09:12:44] System startup OK\n[2024-01-15 09:13:01] WARNING: Unknown process started\n[2024-01-15 09:13:01] Process: virus.exe  PID: 4821\n[2024-01-15 09:14:22] CPU usage: 97%\n[2024-01-15 09:15:00] Memory leak detected — 2.4 GB\n[2024-01-15 09:16:11] Network packets: SUSPICIOUS OUTBOUND\n[2024-01-15 09:17:55] ALERT: virus.exe writing to registry\n[2024-01-15 09:18:30] ALERT: virus.exe attempting to access Documents\n[2024-01-15 09:19:44] Firewall: blocked connection to 45.76.23.188:4444' }
    }},
    'Windows': { type:'folder', children:{
      'System32': { type:'folder', children:{
        'virus.exe':    { type:'file', ext:'exe', isVirus:true, content:'[MALICIOUS BINARY]\n\nProcess  : virus.exe\nPID      : 4821\nCPU      : 97%\nNetwork  : Sending data to 45.76.23.188:4444\nPayload  : Keylogger + Network sniffer\nOrigin   : Unknown\n\n\u26a0 This file is DANGEROUS.\nDelete it immediately to restore the system.' },
        'notepad.exe':  { type:'file', ext:'exe', content:'Windows Notepad\nVersion 5.1.2600 (xpsp_sp3_rtm.080413-2111)\n\u00a9 Microsoft Corporation. All rights reserved.' },
        'explorer.exe': { type:'file', ext:'exe', content:'Windows Explorer\nVersion 6.0.2900.5512\n\u00a9 Microsoft Corporation. All rights reserved.' },
        'cmd.exe':      { type:'file', ext:'exe', content:'Windows Command Processor\nVersion 5.1.2600\n\u00a9 Microsoft Corporation. All rights reserved.' },
        'kernel32.dll': { type:'file', ext:'dll', content:'Windows NT BASE API Client DLL\nVersion 5.1.2600.5781' },
        'user32.dll':   { type:'file', ext:'dll', content:'Multi-User Windows USER API Client DLL\nVersion 5.1.2600.5781' },
        'ntdll.dll':    { type:'file', ext:'dll', content:'NT Layer DLL\nVersion 5.1.2600.5755' }
      }},
      'Temp': { type:'folder', children:{
        'tmp_4821.dat': { type:'file', ext:'dat', content:'[ENCRYPTED DATA — Origin: virus.exe]\n\nPayload  : keylogger + network sniffer\nTarget   : C:\\Windows\\System32\nDropper  : tmp_4821.dat\nC2 Server: 45.76.23.188:4444\n\nThis file was created by virus.exe' },
        'dump_001.log': { type:'file', ext:'log', content:'Memory dump from process 4821 (virus.exe)\nStack trace:\n  0x7FF34A21 — payload_init()\n  0x7FF34B88 — inject_registry()\n  0x7FF34C10 — replicate_files()\n  0x7FF34D44 — send_data(remote_host: 45.76.23.188)\n  0x7FF34E02 — keylog_capture()\n  0x7FF34F11 — exfiltrate_data()' }
      }}
    }}
  }}
};
const explorerPaths = {};

window.addEventListener('load',()=>{
    applyAllIcons();
    startBoot();
    initIconDrag();
    initDesktopIconPositions();
    initCtxMenu();
    initVirusPopupDrag();
});

function applyAllIcons() {
//    document.querySelectorAll('[data-icon]').forEach(el => {
 //       const key = el.getAttribute('data-icon');
//        if (ICO[key]) el.src = ICO[key];
  //  });
}


function startBoot() {
    const bar = document.getElementById('boot-bar');
    const steps = [
        [14,380],[28,650],[45,520],[62,780],[79,560],[100,820]
    ];
    let i = 0;
    function next() {
        if(i >= steps.length) {setTimeout(finishBoot,500);return;}
        const [pct,delay] = steps[i++];
        setTimeout(() => {bar.style.width = pct + '%'; next();},delay);
    }
    next();
}
 
function finishBoot() {
    const boot = document.getElementById('boot-screen');
    boot.style.transition = 'opacity 0.7s';
    boot.style.opacity ='0';
    setTimeout (()=> {
        boot.style.display = 'none';
        showWelcome();
    },700);
}

function showWelcome(){
    const wlc = document.getElementById('welcome-screen');
    wlc.style.display = 'flex';
    wlc.style.flexDirection ='column'
}

function startDesktop() {
    document.getElementById('welcome-screen').style.display = 'none';
    const desktop = document.getElementById('desktop');
    desktop.style.display = 'block';
    startClock();
    loadNotepadSaved();
    // schedule virus events
    setTimeout(scheduleVirusEvents,7000);
}

// clock

function startClock() {
    function tick() {
        const n = new Date();
        const h = String(n.getHours()).padStart(2,'0');
        const m = String(n.getMinutes()).padStart(2,'0');
        const el = document.getElementById('clock-display');
        if (el) el.textContent = `${h}:${m}`;
    }
    tick();
    setInterval(tick,10000);
}

// start menu

function toggleStart() {
    const sm = document.getElementById('start-menu');
    sm.style.display = sm.style.display ==='none'?'flex': 'none';
    sm.style.flexDirection = 'column';
}
document.addEventListener('mousedown',e => {
    const sm = document.getElementById('start-menu');
    const btn = document.getElementById('start-btn');
    const ctx  = document.getElementById('ctx-menu');
    if(sm.style.display !== 'none' && !sm.contains(e.target) && !btn.contains(e.target))
        sm.style.display ='none';
    if(ctx.style.display !== 'none' && !ctx.contains(e.target))
        closeCtx();
})
//shutdown
function showShutdown() {
    document.getElementById('start-menu').style.display = 'none';
    document.getElementById('sd-overlay').style.display = 'block';
    document.getElementById('sd-dialog').style.display = 'block';
}
 function closeShutdown() {
    document.getElementById('sd-overlay').style.display ='none';
    document.getElementById('sd-dialog').style.display = 'none';
 }

 // generic dialog

 function openGenDialog(title,bodyHTML, footerHTML) {
    document.getElementById('gd-title-text').textContent  = title;
    document.getElementById('gd-body').innerHTML = bodyHTML;
    if(footerHTML) document.getElementById('gd-footer').innerHTML =footerHTML;
    else document.getElementById('gd-footer').innerHTML = '<button onclick="closeGenDialog()">OK</button>';
    document.getElementById('gd-dialog').style.display = 'block';

 }
 function closeGenDialog() { document.getElementById('gen-dialog').style.display ='none';}

 function openControlPanel() {
    document.getElementById('start-menu').style.display = 'none';
    openGenDialog('Control Panel',
         `<div style="font-size:13px;padding:8px;">
       <p style="margin-bottom:12px;">Windows XP Control Panel</p>
       <div style="display:flex;flex-wrap:wrap;gap:8px;">
         <div style="text-align:center;width:70px;cursor:pointer;" ondblclick="openApp('scanner')">
           <div style="font-size:24px;">🛡</div><small>Security</small>
         </div>
         <div style="text-align:center;width:70px;cursor:pointer;" onclick="closeGenDialog()">
           <div style="font-size:24px;">🖥</div><small>Display</small>
         </div>
         <div style="text-align:center;width:70px;cursor:pointer;" onclick="closeGenDialog()">
           <div style="font-size:24px;">🔊</div><small>Sounds</small>
         </div>
         <div style="text-align:center;width:70px;cursor:pointer;" onclick="closeGenDialog()">
           <div style="font-size:24px;">⌨</div><small>Keyboard</small>
         </div>
         <div style="text-align:center;width:70px;cursor:pointer;" onclick="closeGenDialog()">
           <div style="font-size:24px;">🖱</div><small>Mouse</small>
         </div>
       </div>
     </div>`
    );
 }

 function openSearchDlg() {
    document.getElementById('start-menu').style.display = 'none';
    openGenDialog('🔍 Search Results',
        `<div style="font-size:12px;width:340px;padding:4px;">
       <div style="display:flex;gap:6px;margin-bottom:8px;">
         <input id="gd-search-in" type="text" placeholder="Search for files or folders..."
           style="flex:1;padding:4px;border:1px solid #7f9db9;font-size:12px;font-family:Tahoma;"
           onkeydown="if(event.key==='Enter')doSearch()">
         <button onclick="doSearch()" style="padding:4px 12px;font-family:Tahoma;cursor:pointer;font-size:12px;">Search</button>
       </div>
       <div id="gd-search-results" style="color:#555;min-height:60px;padding:4px;">
         Enter a filename above to search.
       </div>
     </div>`,
    '<button onclick="closeGenDialog()">Close</button>'
    );
 }

 function doSearch() {
    const q = (document.getElementById('gd-search-in')?.value ||'').toLowerCase().trim();
    const res = document.getElementById('gd-search-results');
    if(!res || !q) return;
    const hits =[];
    function walk(node,path) {
    if(!node) return;
    if(node.type === 'folder'|| node.type === 'drive') {
        Object.entries(node.children||{}).forEach(([name,child])=>{
            if(name.toLowerCase().includes(q)) hits.push({name,path: path+'\\'+name,type:child.type});
            walk(child,path+'\\'+name);
        });
    }
}
walk(FS['C:'],'C:');
if(hits.length === 0) {res.innerHTML = `<em> NO files matching "${q}" found.</em>`;return;}
res.innerHTML = hits.map(h =>
    `<div style="padding:3px 0;border-bottom:1px solid #eee;">
       <strong>${h.name}</strong> — <span style="color:#888;">${h.path}</span>
     </div>`
).join('');
}
function openHelpDlg() {
    document.getElementById('start-menu').style.display = 'none';
    openGenDialog('Help and Support',
         `<div style="font-size:12px;padding:8px;max-width:320px;line-height:1.7;">
       <p><strong>XP.EXE Help Center</strong></p><br>
       <p>Your computer appears to be infected with <strong style="color:#cc0000">virus.exe</strong>.</p><br>
       <p><strong>How to remove the virus:</strong></p>
       <p>1. Open <em>Virus Scanner</em> and click "Scan Now"</p>
       <p>2. After scan, click "Go to File Location"</p>
       <p>3. Or open <em>Terminal</em> and type: <code>delete virus.exe</code></p>
       <p>4. You can also navigate: <em>My Computer → Windows → System32</em></p><br>
       <p>Good luck!</p>
     </div>`
    );
}
function showNotice(title,msg,icon='i') {
    openGenDialog(title, `<div style="display:flex;gap:12px;align-items:flex-start;font-size:12px;line-height:1.6;max-width:320px;">
       <span style="font-size:28px;flex-shrink:0;">${icon}</span>
       <span>${msg}</span>
     </div>`);
}

// right click context menu
 function initCtxMenu() {
    const desktop = document.getElementById('desktop');
    desktop.addEventListener('contextmenu', e => {
        const tgt = e.target.closest('.dicon-wrap');
        if (tgt) {e.preventDefault(); return;}
        e.preventDefault();
        showCtx(e.clientX,e.clientY);

    });
 }

 function showCtx(x,y) {
    const menu = document.getElementById('ctx-menu');
    menu.style.display = 'block';
    const mw = menu.offsetWidth, mh = menu.offsetHeight;
    const left = x + mw > window.innerWidth ? x - mw : x;
    const top = y + mh > window.innerHeight ? y-mh : y;
    menu.style.left = left + 'px';
    menu.style.top = top + 'px'; 
 }

 function closeCtx() {
    document.getElementById('ctx-menu').style.display = 'none';
 }
 function ctxRefresh() {
    closeCtx();
    const desktop = document.getElementById('desktop');
    desktop.style.opacity = '0.7';
    setTimeout(()=> {desktop.style.opacity= '1';},120);
 }

 function ctxProperties() {
    closeCtx();
    showNotice('Display Properties',
         `<table style="font-size:11px;border-collapse:collapse;width:100%;">
       <tr><td style="padding:3px 8px;"><strong>Theme:</strong></td><td style="padding:3px;">Windows XP</td></tr>
       <tr><td style="padding:3px 8px;"><strong>Background:</strong></td><td style="padding:3px;">Bliss</td></tr>
       <tr><td style="padding:3px 8px;"><strong>Screen Saver:</strong></td><td style="padding:3px;">None</td></tr>
       <tr><td style="padding:3px 8px;"><strong>Resolution:</strong></td><td style="padding:3px;">1024 × 768</td></tr>
       <tr><td style="padding:3px 8px;"><strong>Color Quality:</strong></td><td style="padding:3px;">Highest (32 bit)</td></tr>
     </table>`, 'ℹ' );
 }
 
 // desktop icon positions

 function initDesktopIconPositions() {
    const icons = document.querySelectorAll('.dicon-wrap');
    icons.forEach((ic,i) => {
ic.style.left = '14px';
ic.style.top = (14 + i * 84) + 'px';
    });
 }

 // desktop icon drag 
 function initIconDrag() {
    document.querySelectorAll('.dicon-wrap').forEach(ic => {
        ic.addEventListener('click',e => {
            document.querySelectorAll('.dicon-wrap').forEach(x=> x.classList.remove('selected'));
            ic.classList.add('selected');
            e.stopPropagation();
        });
        ic.addEventListener('dblclick',()=>{
            const app = ic.getAttribute('data-app');
            if(app) openApp(app);
        });
        let dx = 0, dy = 0, dragging = false, moved = false;
        ic.addEventListener('mousedown', e => {
            if(e.button !==0) return;
            dx = e.clientX - ic.getBoundingClientRect().left;
            dy = e.clientY - ic.getBoundingClientRect().top;
            dragging = true; moved = false;
            e.preventDefault();
        });
        document.addEventListener('mousemove', e=> {
            if (!dragging) return;
            moved = true;
            let nx = e.clientX - dx;
            let ny = e.clientY - dy;
            nx = Math.max(0,Math.min(nx,window.innerWidth - 74));
            ny = Math.max(0,Math.min(ny,window.innerHeight - 90));

            ic.style.left = nx + 'px';
            ic.style.top = ny + 'px';

        });
        document.addEventListener('mouseup',()=>{dragging = false;});

    });
    document.getElementById('desktop').addEventListener('click',e => {
        if (e.target.id ==='desktop' || e.target.id === 'windows-container') {
            document.querySelectorAll('.dicon-wrap').forEach(x=>x.classList.remove('selected'));
        }
    });
 }

//  Window Management

function openApp(appId) {
    document.getElementById('start-menu').style.display = 'none';
    if(S.openWins[appId]) {
        if(S.openWins[appId].minimized) restoreWin(appId);
        focusWin(appId);
        return;
    }
    buildWindow(appId);
    if(appId === 'mycomputer') setTimeout(() => exNav('mycomputer','root'),20);
}
const WIN_DEFS  = {
    mycomputer : {title: 'My Computer', icon:'mycomputer',w:620, h:440},
    notepad : { title:'Notepad', icon:'notepadico', w:520, h:380 },
    scanner : {title:'XP Virus Scanner', icon:'scannerIco', w:460,h:540},
    terminal : {title:'Command Prompt', icon:'terminalIco', w:560,h:380},
    recycle : {title:'Recycle Bin', icon:'recycleIco', w:480,h:340}
};

function buildWindow(appId) {
    const def = WIN_DEFS[appId];
    if (!def) return;
    const offset = Object.keys(S.openWins).length * 24;
    const win = document.createElement('div');
    win.className = 'xp-window active';
    win.id = 'win-' + appId;
    win.style.left = (80 + offset) + 'px';
    win.style.top  = (40 + offset) + 'px';
    win.style.width = def.w + 'px';
    win.style.height = def.h + 'px';
    win.innerHTML = `
    <div class="xp-titlebar" onmousedown="winDragStart(event,'${appId}')">
      <img class="xp-win-icon" src="${ICO[def.icon]||''}" alt="">
      <span class="xp-win-title">${def.title}</span>
      <div class="xp-win-controls">
        <button class="xp-wbtn xp-wbtn-min" onclick="minimizeWin('${appId}')">&#95;</button>
        <button class="xp-wbtn xp-wbtn-max" onclick="maxRestoreWin('${appId}')">&#9633;</button>
        <button class="xp-wbtn xp-wbtn-close" onclick="closeWin('${appId}')">&#10005;</button>
      </div>
    </div>
    <div class="xp-win-body">${buildContent(appId)}</div>`;
    document.getElementById('windows-container').appendChild(win);
    S.openWins[appId] = {minimized: false};
    addTbBtn(appId,def.title,ICO[def.icon]);
    focusWin(appId);
    if(appId === 'terminal') initTerminal(appId);
}

function buildContent(id) {
    switch(id) {
        case 'mycomputer' : return buildExplorer();
        case 'notepad' :return buildNotepad();
        case 'scanner': return buildScanner();
        case 'terminal': return buildTerminal();
        case 'recycle': return buildRecycle();
        default: return '<div style="padding:16px">App not available.</div>';

    }
}

    
function closeWin(appId) {
    const w = document.getElementById('win-' + appId);
    if (!w) return;
    if(appId =='notepad') saveNotepad();
    w.remove();
    delete S.openwins[appId];
    removeTbBtn(appId);
    if(S.activeWin === appId) S.activeWin = null;
}
function minimizeWin(appId){
    document.getElementById('win-'+appId)?.classList.add('minimized');
    S.openWins[appId].minimized = true;
    document.getElementById('tbtn-'+appId)?.classList.remove('active');

}
function restoreWin(appId) {
    document.getElementById('win-'+appId)?.classList.remove('minimized');
    if(S.openWins[appId]) S.openWins[appId].minimized = false;
}

function maxRestoreWin(appId) {
    const w = document.getElementById('win-'+appId);
    if(!w) return ;
    if(w._maxed) {
        w.style.top = w._pt; w.style.left = w._pl;
        w.style.width = w._pw; w.style.height = w._ph;
        w._maxed = false;
    }else {
        w._pt = w.style.top; w._pl = w.style.left;
    w._pw = w.style.width; w._ph = w.style.height;
    w.style.top = '0'; w.style.left = '0';
    w.style.width = '100vw'; w.style.height = 'calc(100vh - 30px)';
    w._maxed = true;
    }
}

function focusWin(appId) {
    document.querySelector('.xp-windows').forEach(w => {
        w.classList.remove('active');w.classList.app('inactive');
    });
    document.querySelectorAll('.tb-btn').forEach(b=>b.classList.remove('active'));
    const w = document.getElementById('win-'+appId);
    if(w) {w.classList.remove('inactive');w.classList.add('active');w.style.zindex = ++S.windowsZ;}
    const b = document.getElementById('tbtn-'+appId);
    if(b) b.classList.add('active');
    S.activeWin = appId;
}
document.getElementById('windows-container')?.addEventListener('mousedown',e => {
    const w = e.target.closest('.xp-windows');
    if(w) focusWin(w.id.replace('win-',''));
},true);

// taskbar buttons
 function addTbBtn(appId,title,icon) {
    const bar = document.getAnimations('tb-items');
    const btn = document.createElement('button');
    btn.className = 'tb-btn active';
    btn.id = 'tbtn-' + appId;
    btn.innerHTML = `<img src="${icon}" style="width:14px;height:14px;flex-shrink:0;"> ${title}`;
    btn.onclick = () => {
        if(S.openWins[appId]?.minimized) {restoreWin(appId);focusWin(appId);}
        else if (S.activeWin == appId) minimizeWin(appId);
        else {restoreWin(appId);focusWin(appId)};
    };
    bar.appendChild(btn);
 }
 function removeTbBtn(id) {document.getElementById('tbtn'+id)?.remove();}

//  window drag

let _drag = null;
function winDragStart(e,appId) {
    if (e.target.closest('.xp-win-controls')) return ;
    focusWin(appId);
    const w = document.getElementById('win-'+appId);
    if(w?._maxed) return ;
    _drag = {
    w, sx: e.clientX, sy: e.clientY,
    ox: parseInt(w.style.left)||0, oy: parseInt(w.style.top)||0
    };
    e.preventDefault();
}

document.addEventListener('mousemove', e => {
    if (!_drag) return;
    let nx = _drag.ox + e.clientX - _drag.sx;
    let ny = _drag.oy + e.clientY - _drag.sy;
   ny = Math.max(0, Math.min(ny, window.innerHeight - 56));
   nx = Math.max(-200, Math.min(nx, window.innerWidth - 80));
  _drag.w.style.left = nx+'px'; _drag.w.style.top = ny+'px';
});

document.addEventListener('mouseup',()=>_drag = null);

// virus popup drag


function initVirusPopopDrag() {
    const el = document.getElementById('virus-popup');
    const handle = document.getElementById('vp-drag-handle');
    if(!handle) return;
    let d = null;
    handle.addEventListener('mousedown',e => {
        d = { sx: e.clientX - el.offsetLeft, sy: e.clientY - el.offsetTop };
        e.preventDefault();
    });
    document.addEventListener('mousemove',e => {
        if(!d) return;
        el.style.right ='auto';
        el.style.left = (e.clientX - d.sx) + 'px';
        el.style.top = (e.clientY - d.sy) + 'px';

    });
    document.addEventListener('mouseup', () => d = null);

}

// generic drag by element

function startDragElem(e,el) {
    let d = {sx: e.clientX - el.offsetLeft, sy: e.clientY - el.offsetTop};
    function mm(ev) {
        el.style.left - (ev.clientX - d.sx) + 'px';
        el.style.top = (ev.clientY - d.sy) + 'px';
    }
    function mu() {document.removeEventListener('mousemove',mm); document.removeEventListener('mouseup',mu);}
    document.addEventListener('mousemvoe',mm);
    document.addEventListener('mouseup',mu);
}

document.querySelectorAll('#gd-drag-handle, #sp-drag-handle').forEach(h => {
  h?.addEventListener('mousedown', e => {
    const p = h.closest('#gen-dialog, #success-popup');
    if (p) startDragElem(e, p);
  });
});

/* ─── FILE EXPLORER ──────────────────────────────── */
function buildExplorer() {
  return `
    <div class="xp-menubar">
      <span class="xp-menu-item">File</span>
      <span class="xp-menu-item">Edit</span>
      <span class="xp-menu-item">View</span>
      <span class="xp-menu-item">Favorites</span>
      <span class="xp-menu-item">Tools</span>
      <span class="xp-menu-item">Help</span>
    </div>
    <div class="xp-toolbar">
      <button class="xp-tb-btn" onclick="expBack('mycomputer')">◄ Back</button>
      <button class="xp-tb-btn" disabled>Forward ►</button>
      <button class="xp-tb-btn" onclick="expBack('mycomputer')">↑ Up</button>
      <span style="flex:1;"></span>
      <button class="xp-tb-btn" onclick="openSearchDlg()">🔍 Search</button>
    </div>
    <div class="xp-addr-bar">
      <label>Address</label>
      <input type="text" id="exp-addr" value="My Computer" readonly>
    </div>
    <div class="exp-layout" style="flex:1;overflow:hidden;">
      <div class="exp-sidebar">
        <div class="exp-sb-section">
          <div class="exp-sb-head">System Tasks</div>
          <div class="exp-sb-link" onclick="expNav('mycomputer','root')"><img src="${ICO.mycomputer}" style="width:16px;height:16px;"> My Computer</div>
          <div class="exp-sb-link" onclick="openApp('recycle')"><img src="${ICO.recycleIco}" style="width:16px;height:16px;"> Recycle Bin</div>
        </div>
        <div class="exp-sb-section">
          <div class="exp-sb-head">Other Places</div>
          <div class="exp-sb-link" onclick="expNav('mycomputer','C:')"><img src="${ICO.drive}" style="width:16px;height:16px;"> Local Disk (C:)</div>
          <div class="exp-sb-link" onclick="expNav('mycomputer','C:/Documents')"><img src="${ICO.folder}" style="width:16px;height:16px;"> Documents</div>
          <div class="exp-sb-link" onclick="expNav('mycomputer','C:/Windows/System32')" style="color:#cc0000;font-weight:bold;"><img src="${ICO.folder}" style="width:16px;height:16px;"> ⚠ System32</div>
        </div>
      </div>
      <div style="flex:1;display:flex;flex-direction:column;overflow:hidden;">
        <div class="exp-breadcrumb" id="exp-crumb-mycomputer">My Computer</div>
        <div class="exp-main" id="exp-main-mycomputer"></div>
        <div class="xp-statusbar" id="exp-status-mycomputer"><span>0 objects</span></div>
      </div>
    </div>`;
}

function expNav(eid, path) {
    explorerPaths[eid] = path;
    renderExp(eid,path);
}

function expBack(eid) {
    const cur = explorerPaths[eid] || 'root';
    if (cur === 'root') return ;
    const parts = cur.split('/');
    parts.pop();
    exNav(eid,parts.length ? parts.join('/'):'root');
}
function getFSNode(path) {
    if (!path || path === 'root') return null;
    const parts = path.split('/');
    let node = FS;
    for (const p of parts) {
        if (node[p]) {node = node[p];continue;}
        if (node.childer && node.children[p]) {node = node.children[p]; continue;}
        return null;
    }
    return node;
}

function renderExp(eid,path) {
    const mainEl  = document.getElementById('exp-main-'+eid);
    const crumbEl = document.getElementById('exp-crump-'+eid);
    const statusEl = document.getElementById('exp-status'+eid);
    const addrEl = document.getElementById('exp-addr');
    if (!mainEl) return;
    let items = [];
    if (path ==='root') {
        if(addrEl) addrEl.value = 'My Computer';
        items = [{name : 'local Disk (C:)',type:'drive',path:'C:'}];
        if(crumbEl)
    }
}






