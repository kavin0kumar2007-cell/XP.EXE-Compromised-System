'use strict';
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
    systemLocked : true,
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
    document.addEventListener("mousedown", function(e){

    if(!S.virusAlive) return;

    const desktop = document.getElementById("desktop");

    if(desktop && desktop.contains(e.target)){
        playClick();
    }

});
});

function applyAllIcons() {
//    document.querySelectorAll('[data-icon]').forEach(el => {
 //       const key = el.getAttribute('data-icon');
//        if (ICO[key]) el.src = ICO[key];
  //  });
}


function startBoot() {
    const bar = document.querySelector('.boot-bar-fill');
    let progress = 0;

    const bootTimer = setInterval(() => {
        progress += Math.random() * 10;  

        if (progress >= 100) {
            progress = 100;
            clearInterval(bootTimer);
            finishBoot();
        }

        bar.style.width = progress + "%";

    }, 200);
}

function playStartupSound() {
    const sound = document.getElementById('startup-sound');
    if (!sound) return;
    sound.volume = 0.5;
    sound.play().catch(() => {
        document.addEventListener('click', () => {
            sound.play();
        }, { once: true });
    });
}

function startPuzzle() {

    openGenDialog(
        "Windows Security Challenge",

        `
        <div style="font-size:12px;line-height:1.7;width:260px">

        <p><strong>Security Verification Required</strong></p>

        <p>
        Malware removal requires a human verification step
        to ensure the system is controlled by a real user.
        </p>

        <br>

        <p><strong>Solve this problem:</strong></p>

        <div style="
        font-size:22px;
        text-align:center;
        margin:10px 0;
        font-weight:bold;
        ">
        100 - 100 = ?
        </div>

        <div style="text-align:center">

        <input id="puzzle-input"
        style="
        width:80px;
        padding:4px;
        border:1px solid #7f9db9;
        font-family:Tahoma;
        font-size:12px;
        text-align:center;
        ">

        </div>

        <br>

        <div style="text-align:center">
        <button onclick="submitPuzzle()" 
        style="
        padding:4px 14px;
        font-family:Tahoma;
        font-size:12px;
        cursor:pointer;
        ">
        Verify
        </button>
        </div>

        </div>
        `
    );
}
function submitPuzzle(){

    const ans = document.getElementById("puzzle-input").value.trim();

    if(ans === "0"){

        closeGenDialog();

        openGenDialog(
    "Windows Security Center",
    `
    <div style="
        font-family:Tahoma;
        font-size:14px;
        line-height:1.8;
        width:300px;
        padding:6px;
    ">

    <div style="
        font-size:16px;
        font-weight:bold;
        color:#003366;
        margin-bottom:8px;
    ">
    ✔ Virus Removed Successfully
    </div>

    <div>
    <strong>virus.exe</strong> has been removed from the system.
    </div>

    <br>

    <div style="
        font-weight:bold;
        color:#0a5a0a;
        font-size:15px;
        text-align:center;
    ">
    Restarting your device...
    </div>

    </div>
    `
);

        setTimeout(()=>{
            closeGenDialog();
            triggerDeletion();
        },4000);

    } else {

        alert("Incorrect answer. Virus still active.");

    }
}
function finishBoot() {
    const boot = document.getElementById('boot-screen');
    boot.style.transition = 'opacity 0.7s';
    boot.style.opacity ='0';
    setTimeout (()=> {
        boot.style.display = 'none';
        playStartupSound();
        showWelcome();
    },100);
}

function showWelcome() {
    const wlc = document.getElementById('welcome-screen');
    // start hidden
    wlc.style.opacity = '0';
    wlc.style.display = 'flex';
    wlc.style.flexDirection = 'column';
    // play sound at same moment
    playStartupSound();
    // short delay then fade in
    setTimeout(() => {
        wlc.classList.add('welcome-fadein');
    }, 100);
}


function startDesktop() {

        const sound = document.getElementById('startup-sound');
        if(sound) {
            sound.pause();
            sound.currentTime = 0;
        }
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
    document.getElementById('gen-dialog').style.display = 'block';

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
    if (S.systemLocked && appId !== 'scanner') {
    showVirusPopup();
    return;
}
    document.getElementById('start-menu').style.display = 'none';
    if(S.openWins[appId]) {
        if(S.openWins[appId].minimized) restoreWin(appId);
        focusWin(appId);
        return;
    }
    buildWindow(appId);
    if(appId === 'mycomputer') setTimeout(() => expNav('mycomputer','root'),20);
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
    delete S.openWins[appId];
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
    document.querySelectorAll('.xp-window').forEach(w => {
        w.classList.remove('active');w.classList.add('inactive');
    });
    document.querySelectorAll('.tb-btn').forEach(b=>b.classList.remove('active'));
    const w = document.getElementById('win-'+appId);
    if(w) {w.classList.remove('inactive');w.classList.add('active');w.style.zIndex = ++S.windowsZ;}
    const b = document.getElementById('tbtn-'+appId);
    if(b) b.classList.add('active');
    S.activeWin = appId;
}
document.getElementById('windows-container')?.addEventListener('mousedown',e => {
    const w = e.target.closest('.xp-window');
    if(w) focusWin(w.id.replace('win-',''));
},true);

// taskbar buttons
 function addTbBtn(appId,title,icon) {
    const bar = document.getElementById('tb-items');
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
 function removeTbBtn(id) {document.getElementById('tbtn-'+id)?.remove();}

//  window drag

let _drag = null;
function winDragStart(e, appId) {
    // dont drag if clicking the control buttons
    if (e.target.closest('.xp-win-controls')) return;
    focusWin(appId);
    const w = document.getElementById('win-' + appId);
    if (w?._maxed) return;
    _drag = {
        w,
        sx: e.clientX,
        sy: e.clientY,
        ox: parseInt(w.style.left) || 0,
        oy: parseInt(w.style.top)  || 0
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


function initVirusPopupDrag() {
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
        el.style.left = (ev.clientX - d.sx) + 'px';
        el.style.top = (ev.clientY - d.sy) + 'px';
    }
    function mu() {document.removeEventListener('mousemove',mm); document.removeEventListener('mouseup',mu);}
    document.addEventListener('mousemove',mm);
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
function openRunDlg() {
    document.getElementById('start-menu').style.display = 'none';
    openGenDialog('Run',
        `<div style="font-size:12px;padding:4px;width:280px;">
           <p style="margin-bottom:10px;">Type the name of a program to open it.</p>
           <div style="display:flex;align-items:center;gap:8px;">
             <label>Open:</label>
             <input id="run-input" type="text" style="flex:1;padding:4px;border:1px solid #7f9db9;font-size:12px;font-family:Tahoma;"
               onkeydown="if(event.key==='Enter')doRun()">
           </div>
         </div>`,
        '<button onclick="doRun()">OK</button><button onclick="closeGenDialog()" style="margin-left:6px;">Cancel</button>'
    );
}

function doRun() {
    const val = (document.getElementById('run-input')?.value || '').toLowerCase().trim();
    closeGenDialog();
    if (val === 'cmd' || val === 'cmd.exe') { openApp('terminal'); return; }
    if (val === 'notepad' || val === 'notepad.exe') { openApp('notepad'); return; }
    if (val === 'explorer' || val === 'explorer.exe') { openApp('mycomputer'); return; }
    showNotice('Run', `Cannot find '${val}'. Check the name and try again.`, '⚠');
}
function expBack(eid) {
    const cur = explorerPaths[eid] || 'root';
    if (cur === 'root') return ;
    const parts = cur.split('/');
    parts.pop();
    expNav(eid,parts.length ? parts.join('/'):'root');
}
function getFSNode(path) {
    if (!path || path === 'root') return null;
    const parts = path.split('/');
    let node = FS;
    for (const p of parts) {
        if (node[p]) {node = node[p];continue;}
        if (node.children && node.children[p]) {node = node.children[p]; continue;}
        return null;
    }
    return node;
}

function renderExp(eid,path) {
    const mainEl  = document.getElementById('exp-main-'+eid);
    const crumbEl = document.getElementById('exp-crumb-'+eid);
    const statusEl = document.getElementById('exp-status-'+eid);
    const addrEl = document.getElementById('exp-addr');
    if (!mainEl) return;
    let items = [];
    if (path ==='root') {
        if(addrEl) addrEl.value = 'My Computer';
        items = [{name : 'local Disk (C:)',type:'drive',path:'C:'}];
        if(crumbEl) crumbEl.innerHTML = '<span onclick="expNav(\'mycomputer\',\'root\')">My Computer</span>';

    }else {
        const node = getFSNode(path);
        if(!node) return ;
        if (addrEl) addrEl.value = path.replace(/\//g,'\\');
        if (node.type === 'file') {openFileView(eid,path,node); return;}
        const ch = node.children || {};
        items = Object.entries(ch).map(([n,nd])=>({name:n, ...nd,path: path+'/'+n}));
        if (crumbEl) {
            const segs = path.split('/');
            crumbEl.innerHTML = segs.map((s,i) => {
                const p = segs.slice(0,i+1).join('/');
                return `<span onclick="expNav('${eid}','${p}')">${s}</span>`;
            }).join('►');
        }
    }
    if(statusEl) statusEl.innerHTML = `<span>${items.length} object${items.length!==1?'s':''}</span>`;
    mainEl.innerHTML = '';
    const grid = document.createElement('div');
    grid.className = 'exp-grid';
    items.forEach(item => {
        const isV = item.isVirus && S.virusAlive;
        const icoKey = isV ? 'virusexe'
        : item.type === 'drive' ? 'drive'
        : item.type === 'folder' ? 'folder'
        : (ICO[item.ext] ? item.ext : 'txt');
        const div = document.createElement('div');
        div.className = 'exp-item' + (isV?' is-virus': '');
        div.innerHTML = `<img src="${ICO[icoKey]||ICO.txt}" alt=""><span>${item.name}</span>`;
    div.onclick = () => { document.querySelectorAll('.exp-item').forEach(x=>x.classList.remove('selected')); div.classList.add('selected'); };
    div.ondblclick = () => {
      if (item.type==='folder'||item.type==='drive') expNav(eid, item.path);
      else openFileView(eid, item.path, item);
    };
    grid.appendChild(div);
  });
  mainEl.appendChild(grid);
}

function openFileView(eid, filePath, fileNode) {
  const fname = filePath.split('/').pop();
  const isV   = fileNode.isVirus && S.virusAlive;
  const vid   = 'fv_' + fname.replace(/\./g,'_');
  if (document.getElementById('win-'+vid)) { focusWin(vid); return; }
  const offset = Object.keys(S.openWins).length * 24;
  const w = document.createElement('div');
  w.className = 'xp-window active';
  w.id = 'win-' + vid;
  w.style.left = (180+offset)+'px'; w.style.top = (100+offset)+'px';
  w.style.width = '440px'; w.style.height = '320px';
  const titleStr = isV ? `⚠ ${fname} — VIRUS DETECTED` : fname;
  const icoSrc   = isV ? ICO.virusexe : (ICO[fileNode.ext]||ICO.txt);
  w.innerHTML = `
    <div class="xp-titlebar" onmousedown="winDragStart(event,'${vid}')">
      <img class="xp-win-icon" src="${icoSrc}" alt="">
      <span class="xp-win-title">${titleStr}</span>
      <div class="xp-win-controls">
        <button class="xp-wbtn xp-wbtn-min" onclick="minimizeWin('${vid}')">_</button>
        <button class="xp-wbtn xp-wbtn-max" onclick="maxRestoreWin('${vid}')">□</button>
        <button class="xp-wbtn xp-wbtn-close" onclick="closeWin('${vid}')">✕</button>
      </div>
    </div>
    <div class="xp-win-body fv-body">
      ${isV ? `<div class="fv-warn">⚠ WARNING: This file is malicious! Delete it to restore system health.</div>` : ''}
      <textarea class="fv-textarea" readonly>${fileNode.content||'(empty)'}</textarea>
      ${isV ? `
        <div class="fv-actions">
          <button class="fv-del-btn" onclick="deleteVirusFromFV('${vid}')">🗑 Delete virus.exe</button>
          <button class="fv-cancel" onclick="closeWin('${vid}')">Cancel</button>
        </div>` : ''}
    </div>`;
  document.getElementById('windows-container').appendChild(w);
  S.openWins[vid] = { minimized: false };
  addTbBtn(vid, fname, icoSrc);
  focusWin(vid);
}
function deleteVirusFromFV(vid) { closeWin(vid); triggerDeletion(); }
 
/* ─── NOTEPAD ────────────────────────────────────── */

function buildNotepad() {
    const saved = localStorage.getItem('xpexe_np') || '';
  return `
    <div class="xp-menubar">
      <span class="xp-menu-item" onclick="saveNotepad()">File</span>
      <span class="xp-menu-item">Edit</span>
      <span class="xp-menu-item">Format</span>
      <span class="xp-menu-item">View</span>
      <span class="xp-menu-item">Help</span>
    </div>
    <textarea class="np-textarea" id="np-area" oninput="saveNotepad()" style="flex:1;">${saved}</textarea>
    <div class="np-statusbar">
      <span>Ln 1, Col 1</span><span>UTF-8</span>
    </div>`;
}

function saveNotepad() {
    const ta = document.getElementById('np-area');
    if (ta) localStorage.setItem('xpexe_np',ta.value);
}
function loadNotepadSaved() {

}

// virus scanner

function buildScanner() {
    return `<div class="xp-menubar">
      <span class="xp-menu-item">Scan</span>
      <span class="xp-menu-item">Quarantine</span>
      <span class="xp-menu-item">Settings</span>
      <span class="xp-menu-item">Help</span>
    </div>
    <div class="scan-wrap">
      <div class="scan-logo">
        <h2>&#9679; XP Virus Scanner Pro</h2>
        <p>Real-Time Protection v4.2.1 &nbsp;|&nbsp; Definitions: 2024-01-15 &nbsp;|&nbsp; Engine: 8.0.1</p>
      </div>
      <div class="scan-info">
        <p><strong>Computer:</strong> DESKTOP-XP7B2K &nbsp;&nbsp; <strong>OS:</strong> Windows XP Professional SP3</p>
        <p><strong>Last scan:</strong> <span id="scan-last">${S.scanDone?'Just now':'Never'}</span>
           &nbsp;&nbsp; <strong>Status:</strong>
           <span id="scan-status-lbl" style="color:${S.scanHitVirus?'#cc0000':S.scanDone?'#006600':'#cc6600'};">
             ${S.scanHitVirus?'&#9888; THREAT FOUND':S.scanDone?'Clean':'Scan recommended'}
           </span></p>
      </div>
      <button class="scan-main-btn" id="scan-start-btn" onclick="doScan()">&#9654; Start Full System Scan</button>
      <div class="scan-prog-lbl" id="scan-prog-lbl">Ready.</div>
      <div class="scan-prog-track"><div class="scan-prog-fill" id="scan-prog-fill"></div></div>
      <div class="scan-log" id="scan-log-el"><div style="color:#00cc00;">[READY] XP Virus Scanner engine loaded. Click scan to begin.</div></div>
      <div class="scan-result" id="scan-result-el"></div>
      <div class="scan-actions" id="scan-actions-el" style="display:none;">
        <button class="scan-action-btn" onclick="scanGoToFile()">&#128270; Go to File Location</button>
        <button class="scan-action-btn" onclick="scanOpenTerminal()">&#9632; Open Terminal</button>
        <button class="scan-action-btn danger" onclick="startPuzzle()">Solve Puzzle to Delete Virus</button>
      </div>
    </div>`;
}

const SCAN_FILES = [
    'C:\\Windows\\System32\\kernel32.dll',
  'C:\\Windows\\System32\\ntdll.dll',
  'C:\\Windows\\System32\\user32.dll',
  'C:\\Windows\\Temp\\tmp_4821.dat',
  'C:\\Documents\\readme.txt',
  'C:\\Documents\\log.txt',
  'C:\\Windows\\System32\\explorer.exe',
  'C:\\Windows\\System32\\cmd.exe',
  'C:\\Windows\\System32\\notepad.exe',
  'C:\\Windows\\System32\\virus.exe'
];

function doScan() {
    const btn = document.getElementById('scan-start-btn');
    const fill = document.getElementById('scan-prog-fill');
    const lbl = document.getElementById('scan-prog-lbl');
    const log = document.getElementById('scan-log-el');
    const res = document.getElementById('scan-result-el');
    const acts = document.getElementById('scan-actions-el');
     
    if(!btn) return;
    btn.disabled = true;
    log.innerHTML = '';
    res.style.display = 'none';
    if (acts) acts.style.display = 'none';
    scanLog('[INFO] Initializing virus deginition database...','#00aaff');
    scanLog('[INFO] Mounting scan engine v4.2.1...','#00aaff');

    let i = 0;
    function next() {
        if (i >= SCAN_FILES.length) {
            fill.style.width = '100%';
            lbl.textContent = 'Scan complete.';
            btn.disabled = false;
            S.scanDone = true;
            document.getElementById('scan-last').textContent = 'Just Now';
            const statusEl = document.getElementById('scan-status-lbl');

            if(S.virusAlive) {
                S.scanHitVirus = true;
                scanLog('','');
                 S.scanHitVirus = true;
        scanLog('', '');
        scanLog('!! THREAT DETECTED !!', '#ff2222;font-weight:bold;font-size:13px');
        scanLog('[VIRUS] virus.exe  ——  Trojan.Generic.XP', '#ff5555');
        scanLog('[INFO ] Location: C:\\Windows\\System32\\virus.exe', '#ffaa00');
        scanLog('[INFO ] Process is currently running. PID: 4821', '#ffaa00');
        scanLog('[INFO ] Use the actions below to remove the threat.', '#ffaa00');
        res.style.display = 'block';
        res.className = 'scan-result found';
        res.innerHTML = `&#9888; <strong>THREAT FOUND:</strong> virus.exe — Trojan.Generic.XP<br>
          <small>Location: C:\\Windows\\System32\\virus.exe<br>
          The virus is actively running (PID: 4821). Use the options below:</small>`;
        if (acts) acts.style.display = 'flex';
        if (statusEl) { statusEl.textContent = '⚠ THREAT FOUND'; statusEl.style.color = '#cc0000';

                }
                document.getElementById('tray-virus').style.display = 'inline';
            
            }else {
                scanLog('[OK] No threats detected. System is clean.','#00ff00');
                res.style.display = 'block';
                res.className = 'scan-result clean';
                res.innerHTML = '&#10004; System is CLEAN — No threats detected.';
                if (statusEl) {
                    statusEl.textContent = 'clean'; statusEl.style.color ='#006600';
                }
            }
            return ;
        }
        const path = SCAN_FILES[i];
        const pct = Math.round((i+1) / SCAN_FILES.length * 100);
        fill.style.width = pct + '%';
        lbl.textContent = `Scanning... ${pct}%`;
        const isV  = path.includes('virus.exe') && S.virusAlive;
        scanLog(`${isV ? '[VIRUS]' : '[  OK ]'} ${path}`, isV ? '#ff5555' : '#00dd00');
        i++;
        setTimeout(next, isV ? 550 : 180 + Math.random() * 150);        
    }
    setTimeout(next,400);
}

function scanLog(txt, style) {
  const el = document.getElementById('scan-log-el');
  if (!el) return;
  const d = document.createElement('div');
  if (style) d.setAttribute('style', style.includes(':') ? style : `color:${style}`);
  d.textContent = txt || '\u00a0';
  el.appendChild(d);
  el.scrollTop = el.scrollHeight;
}
function scanGoToFile() {
  closeVirusPopup();
  openApp('mycomputer');
  setTimeout(() => expNav('mycomputer', 'C:/Windows/System32'), 60);
}
function scanOpenTerminal() {
  openApp('terminal');
  if (!S.openWins['terminal']) setTimeout(() => termPrint('[HINT] Type: delete virus.exe  to remove the threat.', 'tc-warn'), 200);
}
function scanDeleteDirect() {
  if (!S.virusAlive) { showNotice('Info', 'virus.exe has already been deleted.', 'ℹ'); return; }
  triggerDeletion();
}
// Terminal 


function buildTerminal() {
  return `
    <div class="term-area" id="term-area" onclick="termFocus()">
      <div class="term-line"><span class="tc-out">Microsoft Windows XP [Version 5.1.2600]</span></div>
      <div class="term-line"><span class="tc-out">(C) Copyright 1985-2001 Microsoft Corp.</span></div>
      <div class="term-line"><span class="tc-out">&nbsp;</span></div>
      <div class="term-line"><span class="tc-warn">WARNING: Abnormal process activity detected on startup.</span></div>
      <div class="term-line"><span class="tc-out">&nbsp;</span></div>
      <div id="term-lines"></div>
      <div class="term-iline">
        <span class="term-prompt-lbl">C:\\&gt;&nbsp;</span>
        <input class="term-inp" id="term-inp" type="text" autocomplete="off" spellcheck="false"
          onkeydown="termKey(event)">
      </div>
    </div>`;
}
function initTerminal() { setTimeout(() => document.getElementById('term-inp')?.focus(), 60); }
function termFocus()    { document.getElementById('term-inp')?.focus(); }
function termKey(e) {
  if (e.key === 'Enter') {
    const inp = document.getElementById('term-inp');
    const val = inp.value.trim();
    inp.value = '';
    S.cmdHistory.unshift(val);
    S.historyIdx = -1;
    runCmd(val);
  }
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    const inp = document.getElementById('term-inp');
    S.historyIdx = Math.min(S.historyIdx + 1, S.cmdHistory.length - 1);
    inp.value = S.cmdHistory[S.historyIdx] || '';
  }
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    const inp = document.getElementById('term-inp');
    S.historyIdx = Math.max(S.historyIdx - 1, -1);
    inp.value = S.historyIdx < 0 ? '' : (S.cmdHistory[S.historyIdx]||'');
  }
}
function termPrint(text, cls) {
  const lines = document.getElementById('term-lines');
  if (!lines) return;
  const div = document.createElement('div');
  div.className = 'term-line';
  div.innerHTML = `<span class="${cls||'tc-out'}">${text||'&nbsp;'}</span>`;
  lines.appendChild(div);
  document.getElementById('term-area')?.scrollTo(0, 99999);
}
function runCmd(raw) {
  if (!raw) { termPrint('&nbsp;', ''); return; }
  termPrint(`C:\\&gt; ${raw}`, 'tc-prompt');
  const cmd = raw.toLowerCase().trim();
 
  if (cmd === 'help') {
    termPrint('Available commands:', 'tc-out');
    termPrint('  help              — Show this list', 'tc-out');
    termPrint('  dir               — List current directory', 'tc-out');
    termPrint('  dir system32      — List System32 directory', 'tc-out');
    termPrint('  tasklist          — Show running processes', 'tc-out');
    termPrint('  scan              — Quick antivirus scan', 'tc-out');
    termPrint('  delete virus.exe  — DELETE THE VIRUS ◄◄', 'tc-warn');
    termPrint('  cls               — Clear screen', 'tc-out');
    termPrint('  whoami / ver      — System information', 'tc-out');
    termPrint('&nbsp;', '');
  } else if (cmd === 'cls' || cmd === 'clear') {
    document.getElementById('term-lines').innerHTML = '';
  } else if (cmd === 'dir' || cmd === 'ls') {
    termPrint(' Volume in drive C is OS &nbsp;&nbsp; Volume Serial Number is 4E21-7CA3', 'tc-out');
    termPrint(' Directory of C:\\', 'tc-out');
    termPrint('&nbsp;', '');
    termPrint('01/15/2024  09:00 AM    &lt;DIR&gt;    Documents', 'tc-out');
    termPrint('01/15/2024  09:00 AM    &lt;DIR&gt;    Windows', 'tc-out');
    termPrint('               2 Dir(s)   4,096 MB free', 'tc-out');
    termPrint('&nbsp;', '');
  } else if (cmd === 'dir system32' || cmd === 'dir c:\\windows\\system32' || cmd === 'ls system32') {
    termPrint(' Directory of C:\\Windows\\System32', 'tc-out');
    termPrint('&nbsp;', '');
    termPrint('01/15/2024  09:00    1,024,512  explorer.exe', 'tc-out');
    termPrint('01/15/2024  09:00       47,616  cmd.exe', 'tc-out');
    termPrint('01/15/2024  09:00      102,912  notepad.exe', 'tc-out');
    termPrint('01/15/2024  09:00      819,200  kernel32.dll', 'tc-out');
    termPrint('01/15/2024  09:00      558,080  user32.dll', 'tc-out');
    if (S.virusAlive) {
      termPrint('01/15/2024  09:13       ██████  virus.exe  &lt;&lt; SUSPICIOUS', 'tc-err');
      termPrint('&nbsp;', '');
      termPrint('&#9888; WARNING: virus.exe is present! Type: delete virus.exe', 'tc-warn');
    } else {
      termPrint('&nbsp;', '');
      termPrint('System32 is clean. No suspicious files found.', 'tc-ok');
    }
    termPrint('&nbsp;', '');
  } else if (cmd === 'tasklist' || cmd === 'ps') {
    termPrint('Image Name               PID    Mem Usage', 'tc-out');
    termPrint('======================== ====== ==========', 'tc-out');
    termPrint('System                       4        220 K', 'tc-out');
    termPrint('explorer.exe               428      8,452 K', 'tc-out');
    termPrint('svchost.exe                920      4,312 K', 'tc-out');
    termPrint('taskmgr.exe               1204      3,128 K', 'tc-out');
    if (S.virusAlive) {
      termPrint('virus.exe                 4821     97,432 K  &lt;&lt; MALICIOUS PROCESS', 'tc-err');
      termPrint('&nbsp;', '');
      termPrint('&#9888; virus.exe is consuming 97% CPU. Type: delete virus.exe', 'tc-warn');
    }
    termPrint('&nbsp;', '');
  } else if (cmd === 'scan') {
    termPrint('Running quick scan...', 'tc-out');
    setTimeout(()=>termPrint('Scanning C:\\...', 'tc-out'), 280);
    setTimeout(()=>termPrint('Scanning C:\\Windows\\...', 'tc-out'), 560);
    setTimeout(()=>termPrint('Scanning C:\\Windows\\System32\\...', 'tc-out'), 840);
    setTimeout(()=>{
      if (S.virusAlive) {
        termPrint('THREAT FOUND: virus.exe — C:\\Windows\\System32', 'tc-err');
        termPrint('Run: delete virus.exe', 'tc-warn');
      } else {
        termPrint('Scan complete. No threats found.', 'tc-ok');
      }
      termPrint('&nbsp;', '');
    }, 1200);
  } else if (
    cmd === 'delete virus.exe' || cmd === 'del virus.exe' ||
    cmd === 'rm virus.exe'     || cmd === 'remove virus.exe'
  ) {
    if (!S.virusAlive) {
      termPrint('The file virus.exe does not exist.', 'tc-err');
      termPrint('&nbsp;', '');
    } else {
      termPrint('Terminating process virus.exe (PID: 4821)...', 'tc-out');
      setTimeout(()=>termPrint('Process terminated successfully.', 'tc-ok'), 500);
      setTimeout(()=>termPrint('Deleting C:\\Windows\\System32\\virus.exe...', 'tc-out'), 900);
      setTimeout(()=>{
        termPrint('virus.exe — DELETED SUCCESSFULLY.', 'tc-ok');
        termPrint('&nbsp;', '');
        triggerDeletion();
      }, 1600);
    }
  } else if (cmd === 'whoami') {
    termPrint('DESKTOP-XP7B2K\\User', 'tc-out'); termPrint('&nbsp;','');
  } else if (cmd === 'ver') {
    termPrint('Microsoft Windows XP [Version 5.1.2600]', 'tc-out'); termPrint('&nbsp;','');
  } else if (cmd === 'ipconfig') {
    termPrint('Windows IP Configuration', 'tc-out'); termPrint('&nbsp;','');
    termPrint('Ethernet adapter Local Area Connection:', 'tc-out');
    termPrint('   Connection-specific DNS Suffix  . :', 'tc-out');
    termPrint('   IP Address. . . . . . . . . . . : 192.168.1.42', 'tc-out');
    termPrint('   Subnet Mask . . . . . . . . . . : 255.255.255.0', 'tc-out');
    termPrint('   Default Gateway . . . . . . . . : 192.168.1.1', 'tc-out');
    termPrint('&nbsp;','');
  } else if (cmd === 'date' || cmd === 'time') {
    const n = new Date();
    termPrint(`Current ${cmd === 'date'?'date':'time'}: ${n.toLocaleString()}`, 'tc-out');
    termPrint('&nbsp;','');
  } else {
    termPrint(`'${raw}' is not recognized as an internal or external command,`, 'tc-err');
    termPrint('operable program or batch file.', 'tc-err');
    termPrint("Type 'help' to see available commands.", 'tc-out');
    termPrint('&nbsp;', '');
  }
}
function buildRecycle() {
  return `
    <div class="xp-menubar">
      <span class="xp-menu-item">File</span>
      <span class="xp-menu-item">Edit</span>
      <span class="xp-menu-item">View</span>
      <span class="xp-menu-item">Help</span>
    </div>
    <div class="xp-toolbar">
      <button class="xp-tb-btn" onclick="emptyRecycle()">&#128465; Empty Recycle Bin</button>
    </div>
    <div class="xp-win-body" id="rb-body" style="background:white;overflow-y:auto;">
      ${renderRB()}
    </div>
    <div class="xp-statusbar" id="rb-status">${S.recycleItems.length} object(s)</div>`;
}
function renderRB() {
  if (!S.recycleItems.length) return '<div class="rb-empty">Recycle Bin is empty.</div>';
  return S.recycleItems.map(n =>
    `<div class="rb-item"><img src="${ICO.virusexe}" style="width:16px;height:16px;"> ${n}
     <span style="margin-left:auto;color:#888;">Deleted</span></div>`
  ).join('');
}
function emptyRecycle() {
  S.recycleItems = [];
  const b = document.getElementById('rb-body');
  const s = document.getElementById('rb-status');
  if (b) b.innerHTML = renderRB();
  if (s) s.textContent = '0 objects';
}
 
/* ─── VIRUS POPUP SYSTEM ─────────────────────────── */
const VIRUS_MSGS = [
  { txt: '<strong>Unknown process detected</strong><br><br>A program not recognized by Windows Security is running on your computer.<br><br>Process: <strong style="color:#cc0000">virus.exe</strong><br>Location: C:\\Windows\\System32<br>PID: 4821<br><br>It is recommended you scan immediately.' },
  { txt: '<strong>Security Breach Detected</strong><br><br>An unauthorized process is attempting to access your network connection.<br><br>Process: virus.exe → <strong>45.76.23.188:4444</strong><br>Status: BLOCKED (for now)<br><br>Your files may be at risk.' },
  { txt: '<strong>Performance Warning</strong><br><br>An unknown program is consuming <strong style="color:#cc0000">97% of your CPU</strong>.<br><br>Process: virus.exe (PID: 4821)<br>Memory: 97,432 K<br><br>Your computer may become unresponsive.' },
  { txt: '<strong>Registry Modification Alert</strong><br><br>virus.exe is attempting to write to the Windows Registry.<br><br>Key: HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run<br><br>This is a sign of persistent malware.' },
  { txt: '<strong>File System Warning</strong><br><br>An unauthorized process is attempting to read files in C:\\Documents.<br><br>This may indicate a keylogger or data-stealing trojan.<br><br>Scan now to protect your data.' },
];
let _vpIdx = 0;
 
function scheduleVirusEvents() {
  if (!S.virusAlive) return;

  setTimeout(() => showVirusPopup(), 400);

  setTimeout(() => {
    if (S.virusAlive) document.getElementById('tray-virus').style.display = 'inline';
  }, 8000);

 [8000, 1500, 2200, 3000, 3800].forEach((t) => {
    setTimeout(() => {
        if (S.virusAlive && !S.virusGone) showVirusPopup();
    }, t);
});

  setTimeout(startGlitch, 180);
}
 
function showVirusPopup() {
  if (!S.virusAlive || S.virusGone) return;
  const msg = VIRUS_MSGS[_vpIdx % VIRUS_MSGS.length];
  _vpIdx++;
  document.getElementById('vp-text').innerHTML = msg.txt;
  const vp = document.getElementById('virus-popup');
  vp.style.display = 'block';

  vp.style.top   = '60px';
  vp.style.right = '20px';
  vp.style.left  = 'auto';
  S.popupShowing = true;
  document.getElementById('virus-popup').classList.add('shake');
}
function closeVirusPopup() {
  document.getElementById('virus-popup').style.display = 'none';
  S.popupShowing = false;
}
function virusPopupScan() {
  closeVirusPopup();
  openApp('scanner');
  setTimeout(() => doScan(), 300);
}
 
function startGlitch() {
  if (!S.virusAlive || S.virusGone) return;
  const d = document.getElementById('desktop');
  let n = 0;
  function glitch() {
    if (!S.virusAlive || n > 8) return;
   d.style.filter =
`hue-rotate(${Math.random()*360}deg)
contrast(2)
saturate(2)
brightness(1.3)
blur(${Math.random()*2}px)`;
   setTimeout(() => {
    d.style.filter = '';
    n++;
    setTimeout(glitch, 2000 + Math.random()*3000);
}, 700);}
  glitch();
}
function startPuzzle() {

    const a = Math.floor(Math.random()*9)+1;
    const b = Math.floor(Math.random()*9)+1;

    openGenDialog(
        "Security Challenge",
        `
        <div style="font-size:13px;line-height:1.6;">
        Malware protection requires human verification.<br><br>

        <strong>Solve the puzzle:</strong><br><br>

        ${a} + ${b} = ?

        <br><br>

        <input id="puzzle-answer"
        style="width:80px;padding:4px;font-family:Tahoma">

        <button onclick="checkPuzzle(${a+b})"
        style="margin-left:10px">Submit</button>

        </div>
        `
    );

}
function playClick() {

    const snd = document.getElementById("click-sound");

    if(!snd) return;

    snd.currentTime = 0;
    snd.play().catch(()=>{});

}
function checkPuzzle(answer){

    const val = Number(document.getElementById('puzzle-answer').value);

    if(val !== answer){
        alert("Incorrect answer. Virus still active.");
        return;
    }

    closeGenDialog();

    openGenDialog(
        "Virus Removal",
        `
        <div style="font-size:13px">
        ✔ Puzzle verified<br><br>
        virus.exe removed successfully.<br><br>

        Restarting your device...
        </div>
        `
    );

    setTimeout(()=>{
        closeGenDialog();
        triggerDeletion();
    },2000);

}
// virus deletion sequence 
function triggerDeletion() {
    if (S.virusGone) return;
    S.virusAlive = false;
    S.virusGone = true;
    S.systemLocked = false;

    try{delete FS['C:'].children['Windows'].children['System32'].children['virus.exe'];} catch (e) {}
    S.recycleItems.push('virus.exe');

    closeVirusPopup();
    document.getElementById('tray-virus').style.display ='none';
    setTimeout(showBSOD , 1000);

}

function showBSOD() {
    document.getElementById('desktop').style.display = 'none';
        const bsod   = document.getElementById('bsod');
        const dotsEl = document.getElementById('bsod-dots');
        bsod.style.display = 'block';
        let n = 0;
        const iv = setInterval(() => { dotsEl.textContent = '.'.repeat((++n % 4) + 1); }, 350);
    setTimeout(() => {
        document.getElementById('bsod-done').style.display = 'block';

    },3000);
    setTimeout(() => {
        document.getElementById('bsod-reboot').style.display ='block';
    }, 5500);

    setTimeout(() => {
        bsod.style.transition = 'opacity 1.2s';
        bsod.style.opacity ='0';
        setTimeout(() => {
            bsod.style.display ='none';
            showCleanBoot();
        },1200)
    },7500);
}

// clean boot welcome
function showCleanBoot() {
    const boot = document.getElementById('boot-screen');
    boot.style.opacity ='1';
    boot.style.display = 'flex';
    boot.style.transition = '';
    const bar = document.getElementById('boot-bar');
    bar.style.width ='0%';

    const steps = [[22,320],[55,500],[100,600]];
    let i = 0;
    function next() {
        if (i >=steps.length) {
            setTimeout(()=> {
                boot.style.opacity = '0';
                setTimeout(() => {
                    boot.style.display ='none';
                    showCleanWelcome();
                },500);
            },400);
            return;
        }
        const[pct,d] = steps[i++];
        setTimeout(()=>{bar.style.width = pct + '%'; next();},d);
    }
    next();
}

function showCleanWelcome() {
  const wlc = document.getElementById('welcome-screen');
  wlc.style.display = 'flex';
  wlc.style.flexDirection = 'column';
  const userEl = document.querySelector('.wlc-user');
  if (userEl) userEl.onclick = showCleanDesktop;
}

function showCleanDesktop() {
  document.getElementById('welcome-screen').style.display = 'none';
  const desktop = document.getElementById('desktop');
  desktop.style.display = 'block';
  desktop.style.filter  = '';
  desktop.style.opacity = '1';
  startClock();
 
  
  Object.keys(S.openWins).forEach(id => closeWin(id));
 
  
  setTimeout(() => {
    const sp = document.getElementById('success-popup');
    sp.style.display = 'block';
    sp.style.top  = '50%';
    sp.style.left = '50%';
    sp.style.transform = 'translate(-50%,-50%)';
  }, 1000);
}
