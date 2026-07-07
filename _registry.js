(function(){
'use strict';
const {simpleModule,input,list,Data,Defaults,Exporter}=PV.Module; const esc=PV.safe;
function stats(){return ['songs','notes','blocks','todos','projects','posts'].map(k=>`<div class="card"><b>${Data.all(k).length}</b><br>${k}</div>`).join('')}
function form(k,fields,btn='Speichern'){return `<form data-save="${k}" class="grid">${fields.join('')}<button class="primary">${btn}</button></form>`}
function items(k){return list(k,x=>`<div class="item"><b>${esc(x.title||x.name||x.date||'Eintrag')}</b><p>${esc(x.text||x.note||x.desc||x.tags||'')}</p><button data-remove="${x.id}" data-key="${k}" class="danger">Löschen</button></div>`)}
function today(){return new Date().toISOString().slice(0,10)}
function calendar(){let d=new Date(),y=d.getFullYear(),m=d.getMonth(),first=new Date(y,m,1),last=new Date(y,m+1,0).getDate(),pad=(first.getDay()+6)%7,html='';for(let i=0;i<pad;i++)html+='<div></div>';for(let day=1;day<=last;day++){let date=`${y}-${String(m+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`,t=Data.all('todos').filter(x=>x.date===date).length;html+=`<button class="day ${date===today()?'today':''}" onclick="document.querySelector('[name=date]')&&(document.querySelector('[name=date]').value='${date}')"><b>${day}</b><br><small>${t} Aufgaben</small></button>`}return html}
function chipList(k){return Data.all(k).map(x=>`<span class="chip">${esc(x.name)}</span>`).join('')}
window.PV_REGISTRY=[
simpleModule({id:'start',title:'Start',icon:'⌂',purpose:'Einstieg, Status, Suche, Schnellaktionen und Sicherung.',grid:'9',panels:[
{ id:'quick',title:'Schnellstart',html:'<div class="grid"><button onclick="PV.App.render(\'songwriter\')">Neuer Suno-Song</button><button onclick="PV.App.render(\'generator\')">Genres erzeugen</button><button onclick="PV.App.render(\'export\')">Daten sichern</button></div>'},
{ id:'stats',title:'Statistik',html:`<div class="grid two">${stats()}</div>`},
{ id:'search',title:'Globale Suche',html:'<p>Strg+K öffnet die Kommandopalette für Module und Inhalte.</p>'},
{ id:'today',title:'Heute',html:`<div class="list">${Data.all('todos').filter(x=>x.date===today()).map(x=>`<div class=item>${esc(x.title)}</div>`).join('')||'<p class=muted>Heute nichts eingetragen.</p>'}</div>`},
{ id:'defaults',title:'Standarddaten',html:`<p>Genres: ${Data.all('genres').length}, Stimmungen: ${Data.all('moods').length}, Stile: ${Data.all('styles').length}</p><button onclick="PV.Data.seed();PV.UI.toast('Defaults ergänzt','ok')">Defaults ergänzen</button>`},
{ id:'help',title:'Erste Schritte',html:'<ol><li>Modul wählen.</li><li>In Formular eintragen.</li><li>Speichern oder kopieren.</li><li>Export sichern.</li></ol>'},
{ id:'safety',title:'Daten',html:'<p>Daten bleiben im Browser. Kein Tracking. Kein CDN. Keine Cloudpflicht.</p>'},
{ id:'changes',title:'Letzte Änderungen',html:`<div class=list>${items('logs')}</div>`},
{ id:'status',title:'Systemstatus',html:'<p class="card">Offline bereit. Vanilla HTML/CSS/JS.</p>'}
]}),
simpleModule({id:'songwriter',title:'Songwriter',icon:'✍',purpose:'Songs schreiben, strukturieren, speichern und exportieren.',grid:'9',panels:[
{ id:'meta',title:'Metadaten',html:form('songs',[input('title','Titel'),input('project','Projekt'),input('bpm','BPM','number'),input('genres','Genres / Stimmung')],'Song speichern')},
{ id:'editor',title:'Songtext',html:input('text','Songtext','textarea','Kurze Suno-Blöcke: INTRO, VERSE, HOOK, DROP.')},
{ id:'preview',title:'Live-Vorschau',html:'<div class="preview">Nach dem Speichern erscheint der Song im Archiv.</div>'},
{ id:'archive',title:'Gespeicherte Songs',html:items('songs')},
{ id:'structures',title:'Strukturen',html:'<button data-copy="[INTRO:]\n[BUILD-UP:]\n[VERSE 1:]\n[PRE-HOOK:]\n[HOOK:]\n[DROP:]\n[OUTRO:]">Suno Struktur kopieren</button>'},
{ id:'snips',title:'Textbausteine',html:items('blocks')},
{ id:'export',title:'Export',html:'<button data-export="songs">Songs exportieren</button>'},
{ id:'help',title:'Hilfe',html:'<p>Schreibe links, nutze rechts Bausteine und exportiere regelmäßig.</p>'},
{ id:'snap',title:'Snapshots',html:'<p class=muted>Versionen entstehen über JSON-Export.</p>'}
]}),
simpleModule({id:'generator',title:'Generator',icon:'⚙',purpose:'Genres, Stimmungen und Stile mischen.',grid:'9',panels:[
{ id:'quick',title:'Schnelltaster',html:'<div class=row><button data-random="3">3</button><button data-random="6">6</button><button data-random="9">9</button><button data-random="12">12</button></div>'},
{ id:'out',title:'Ausgabe',html:'<div id="genout" class="preview">Noch nicht generiert.</div><button onclick="navigator.clipboard.writeText(document.getElementById(\'genout\').textContent)">Kopieren</button>'},
{ id:'genres',title:'Genres',html:chipList('genres')},
{ id:'moods',title:'Stimmungen',html:chipList('moods')},
{ id:'styles',title:'Stile',html:chipList('styles')},
{ id:'own',title:'Eigene Begriffe',html:form('genres',[input('name','Neuer Genre/Stil')],'Begriff speichern')},
{ id:'history',title:'Verlauf',html:items('history')},
{ id:'standard',title:'Standardbibliothek',html:'<p>Hard Techno, Acid, Schranz, Doom Pop, Punk Rap, Industrial, Glitch...</p>'},
{ id:'export',title:'Export',html:'<button data-export="history">Verlauf exportieren</button>'}
]}),
simpleModule({id:'blocks',title:'Bausteine',icon:'▦',purpose:'Textbausteine als große Kopierbuttons.',grid:'9',panels:[
{ id:'new',title:'Baustein anlegen',html:form('blocks',[input('name','Titel'),input('category','Kategorie'),input('text','Text','textarea')])},
{ id:'buttons',title:'Button-Raster',html:Data.all('blocks').map(x=>`<button data-copy="${esc(x.text)}">${esc(x.name)}</button>`).join('')},
{ id:'search',title:'Suche',html:'<p>Strg+K durchsucht Bausteine.</p>'},
{ id:'cats',title:'Kategorien',html:[...new Set(Data.all('blocks').map(x=>x.category||'ohne'))].map(x=>`<span class=chip>${esc(x)}</span>`).join('')},
{ id:'list',title:'Liste',html:items('blocks')},{id:'preview',title:'Vorschau',html:'<div class=preview>Button anklicken kopiert Text.</div>'},{id:'import',title:'Import/Export',html:'<button data-export="blocks">Export</button>'},{id:'stats',title:'Nutzung',html:'<p>Nutzung wird als nächste Stufe vertieft.</p>'},{id:'help',title:'Hilfe',html:'<p>Kurze Bausteine sparen Zeit bei Hook, Bridge, Outro, SEO und Prompts.</p>'}
]}),
simpleModule({id:'notes',title:'Notizen',icon:'☷',purpose:'Schnellnotizen mit Suche und Export.',grid:'9',panels:[
{ id:'new',title:'Neue Notiz',html:form('notes',[input('title','Titel'),input('tags','Tags'),input('text','Notiz','textarea')])},{id:'list',title:'Notizliste',html:items('notes')},{id:'search',title:'Suche',html:'<p>Strg+K durchsucht Notizen.</p>'},{id:'tags',title:'Tags',html:Data.all('notes').flatMap(x=>(x.tags||'').split(',')).filter(Boolean).map(x=>`<span class=chip>${esc(x.trim())}</span>`).join('')},{id:'project',title:'Projektfilter',html:'<p>Projektzuordnung über Tags möglich.</p>'},{id:'export',title:'Export TXT/JSON',html:'<button data-export="notes">JSON Export</button>'},{id:'quick',title:'Schnellspeichern',html:'<p>Eintragen, speichern, weiterarbeiten.</p>'},{id:'preview',title:'Vorschau',html:'<div class=preview>Archiv bleibt lokal.</div>'},{id:'archive',title:'Archiv',html:'<p class=muted>Gelöschte Notizen sind nur über vorherigen Export wiederherstellbar.</p>'}
]}),
simpleModule({id:'todo',title:'ToDo / Kalender',icon:'◴',purpose:'Aufgaben, Monatsansicht und vier Kalenderfarben.',grid:'9',panels:[
{ id:'new',title:'Aufgabe anlegen',html:form('todos',[input('title','Aufgabe'),input('date','Datum','date'),input('color','Farbe'),input('text','Notiz','textarea')])},{id:'day',title:'Tagesliste',html:items('todos')},{id:'month',title:'Monatskalender',html:`<div class="calendar">${calendar()}</div>`},{id:'colors',title:'Farblegende',html:PV.Defaults.colors.map(c=>`<button onclick="document.querySelector('[name=color]')&&(document.querySelector('[name=color]').value='${c[0]}')">${c[0]}</button>`).join('')},{id:'filter',title:'Filter',html:'<p>Strg+K sucht Aufgaben.</p>'},{id:'open',title:'Offene Aufgaben',html:items('todos')},{id:'done',title:'Erledigt',html:items('done')},{id:'archive',title:'Archiv',html:'<p>Vor Löschung Export sichern.</p>'},{id:'export',title:'Export',html:'<button data-export="todos">Aufgaben exportieren</button>'}
]}),
simpleModule({id:'prompts',title:'Prompt-Bibliothek',icon:'⌘',purpose:'Megaprompts, Satzbausteine und Entwickleraufträge.',grid:'6',panels:[{id:'new',title:'Prompt anlegen',html:form('prompts',[input('name','Titel'),input('category','Kategorie'),input('text','Prompt','textarea')])},{id:'list',title:'Prompts',html:Data.all('prompts').map(x=>`<button data-copy="${esc(x.text)}">${esc(x.name)}</button>`).join('')},{id:'cats',title:'Kategorien',html:'<span class=chip>Songwriting</span><span class=chip>SEO</span><span class=chip>Bild</span><span class=chip>Entwicklung</span>'},{id:'export',title:'Export',html:'<button data-export="prompts">Prompts exportieren</button>'}]}),
simpleModule({id:'hashtags',title:'Hashtags',icon:'#',purpose:'Hashtags, Suchtags und SEO-Gruppen.',grid:'6',panels:[{id:'new',title:'Taggruppe anlegen',html:form('hashtags',[input('name','Gruppe'),input('tags','Tags')])},{id:'list',title:'Taggruppen',html:items('hashtags')},{id:'defaults',title:'Standards',html:'<button data-copy="#provoware #pppoppi #hardtechno #suno #satire">Musik-Set kopieren</button>'},{id:'export',title:'Export',html:'<button data-export="hashtags">Tags exportieren</button>'}]}),
simpleModule({id:'planner',title:'Media-Planer',icon:'◎',purpose:'Veröffentlichungen für YouTube, TikTok und Instagram planen.',grid:'6',panels:[{id:'new',title:'Post planen',html:form('posts',[input('title','Titel'),input('platform','Plattform'),input('date','Datum','date'),input('text','Beschreibung','textarea')])},{id:'list',title:'Geplante Posts',html:items('posts')},{id:'check',title:'Release-Check',html:'<ul><li>Titel</li><li>Beschreibung</li><li>Tags</li><li>Bild</li><li>Export</li></ul>'},{id:'export',title:'Export',html:'<button data-export="posts">Plan exportieren</button>'}]}),
simpleModule({id:'projects',title:'Projekte',icon:'▣',purpose:'Projektstatus, nächste Schritte und Dateien dokumentieren.',grid:'6',panels:[{id:'new',title:'Projekt anlegen',html:form('projects',[input('title','Projekt'),input('status','Status'),input('text','Nächster Schritt','textarea')])},{id:'list',title:'Projektliste',html:items('projects')},{id:'next',title:'Nächste Schritte',html:'<p>Pro Projekt klaren nächsten Schritt notieren.</p>'},{id:'export',title:'Export',html:'<button data-export="projects">Projekte exportieren</button>'}]}),
simpleModule({id:'export',title:'Export-Center',icon:'⇩',purpose:'Zentrale Sicherung und Wiederherstellung.',grid:'4',panels:[{id:'global',title:'Globaler Export',html:'<button class="primary" onclick="PV.Exporter.save()">Alles als JSON sichern</button><p>Daten bleiben lokal.</p>'},{id:'import',title:'Import',html:'<textarea id="imp" placeholder="Export-JSON einfügen"></textarea><button onclick="try{PV.Exporter.importText(document.getElementById(\'imp\').value);PV.UI.toast(\'Import erledigt\',\'ok\');PV.App.render(\'export\')}catch(e){PV.UI.toast(e.message,\'err\')}">Import prüfen und einspielen</button>'},{id:'backup',title:'Backup vor Import',html:'<p>Vor Import wird automatisch backup.beforeImport gespeichert.</p>'},{id:'help',title:'Regel',html:'<p>Regelmäßig JSON sichern. Browserdaten-Löschung löscht sonst lokale Daten.</p>'}]}),
simpleModule({id:'settings',title:'Einstellungen',icon:'⚑',purpose:'Darstellung, Schriftgrößen und Modus.',grid:'4',panels:[{id:'theme',title:'Design',html:'<p>Theme oben rechts wählen: Dark, Light, Kontrast.</p>'},{id:'mode',title:'Laien/Profi',html:'<button onclick="PV.Store.set(\'mode\',\'easy\')">Laienmodus</button><button onclick="PV.Store.set(\'mode\',\'pro\')">Profi-Modus</button>'},{id:'fonts',title:'Schriftgrößen',html:'<p>CSS-Variablen --ui, --head, --body, --ed zentral vorbereitet.</p>'},{id:'reset',title:'Zurücksetzen',html:'<button class="danger" onclick="confirm(\'Layoutdaten löschen?\')&&[...Object.keys(localStorage)].filter(k=>k.includes(\'layout.\')).forEach(k=>localStorage.removeItem(k));PV.App.render(\'settings\')">Layouts zurücksetzen</button>'}]}),
simpleModule({id:'help',title:'Hilfe',icon:'?',purpose:'Kurz erklärt: Start, Speichern, Export, Fehler.',grid:'4',panels:[{id:'start',title:'Was zuerst?',html:'<ol><li>Start öffnen.</li><li>Modul wählen.</li><li>Speichern.</li><li>Export sichern.</li></ol>'},{id:'data',title:'Wo sind Daten?',html:'<p>Im Browser-localStorage. Keine Cloud, kein Tracking.</p>'},{id:'keys',title:'Tastatur',html:'<p>Strg+K Suche/Kommandos. Escape schließt Dialoge.</p>'},{id:'errors',title:'Fehler',html:'<p>Bei Importfehlern Format prüfen. Bei Browserproblemen start_linux.sh nutzen.</p>'}]})
];
})();
