const menuButton=document.querySelector('.menu-toggle');const navigation=document.querySelector('.nav-links');
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));navigation.classList.toggle('open',open)});
navigation.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{navigation.classList.remove('open');menuButton.setAttribute('aria-expanded','false')}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){navigation.classList.remove('open');menuButton.setAttribute('aria-expanded','false')}});
document.querySelectorAll('.filter-btn').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter-btn').forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));document.querySelectorAll('.project-card').forEach(card=>card.hidden=btn.dataset.filter!=='all'&&card.dataset.category!==btn.dataset.filter)}));
const tabs=Array.from(document.querySelectorAll('.workflow-tab'));const panel=document.querySelector('.workflow-panel');
function selectTab(tab){tabs.forEach(t=>{const active=t===tab;t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1});panel.innerHTML=document.getElementById(tab.dataset.template).innerHTML;panel.setAttribute('aria-labelledby',tab.id)}
tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>selectTab(tab));tab.addEventListener('keydown',e=>{let n;if(e.key==='ArrowDown'||e.key==='ArrowRight')n=(i+1)%tabs.length;if(e.key==='ArrowUp'||e.key==='ArrowLeft')n=(i+tabs.length-1)%tabs.length;if(e.key==='Home')n=0;if(e.key==='End')n=tabs.length-1;if(n!==undefined){e.preventDefault();selectTab(tabs[n]);tabs[n].focus()}})});
const dialog=document.querySelector('dialog');let opener;
document.querySelectorAll('[data-project]').forEach(btn=>btn.addEventListener('click',()=>{opener=btn;document.querySelector('.dialog-content').innerHTML=document.getElementById('project-'+btn.dataset.project).innerHTML;dialog.showModal()}));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});dialog.addEventListener('close',()=>opener?.focus());
const links=Array.from(navigation.querySelectorAll('a'));const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)links.forEach(a=>a.classList.toggle('active',a.hash==='#'+entry.target.id))})},{rootMargin:'-15% 0px -55% 0px'});document.querySelectorAll('main section[id]').forEach(s=>observer.observe(s));
document.querySelector('.lang').addEventListener('click',e=>{const link=e.currentTarget;if(location.hash)link.href+=location.hash});
// Motion is decorative; every section remains readable without JavaScript.
const progress=document.querySelector('.reading-progress');
function updateProgress(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${max>0?scrollY/max:0})`;}
addEventListener('scroll',updateProgress,{passive:true});addEventListener('resize',updateProgress);updateProgress();
if(!matchMedia('(prefers-reduced-motion: reduce)').matches){const reveals=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-in-view');reveals.unobserve(entry.target);}}),{threshold:.08});document.querySelectorAll('.project-card,.journey-stat,.service').forEach(el=>{el.classList.add('in-view-ready');reveals.observe(el);});}
const whatsappFloat=document.querySelector('.whatsapp-float');
new IntersectionObserver(entries=>{whatsappFloat.classList.toggle('contact-visible',entries[0].isIntersecting)},{threshold:0}).observe(document.querySelector('#contact'));
// Fine-pointer motion adds depth without affecting touch navigation or reading order.
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reducedMotion){
 const sectionReveals=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>{if(isIntersecting){target.classList.add('is-in-view');sectionReveals.unobserve(target)}}),{threshold:.12});
 document.querySelectorAll('.section-heading,.about-copy,.journey-top,.automation-intro,.process-grid,.cv-row,.company-tile').forEach((el,i)=>{el.classList.add('in-view-ready');if(el.classList.contains('company-tile'))el.style.transitionDelay=`${i%5*55}ms`;sectionReveals.observe(el)});
 if(matchMedia('(pointer:fine)').matches){document.querySelectorAll('[data-tilt]').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(1200px) rotateX(${-y*4}deg) rotateY(${x*5}deg)`});el.addEventListener('pointerleave',()=>{el.style.transform=''})})}
 const counterObserver=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>{if(!isIntersecting)return;counterObserver.unobserve(target);const original=target.textContent,value=Number(original.replaceAll(',',''));if(!Number.isFinite(value))return;const start=performance.now();function tick(now){const t=Math.min(1,(now-start)/1400);target.textContent=t===1?original:Math.round(value*(1-Math.pow(1-t,3))).toLocaleString('en-US');if(t<1)requestAnimationFrame(tick)}requestAnimationFrame(tick)}),{threshold:.8});document.querySelectorAll('.journey-stat strong').forEach(el=>counterObserver.observe(el));
}
dialog.addEventListener('close',()=>document.body.style.overflow='');document.querySelectorAll('[data-project]').forEach(btn=>btn.addEventListener('click',()=>{document.body.style.overflow='hidden';dialog.scrollTop=0}));
