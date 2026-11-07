(()=>{
  'use strict';
  const cfg=window.SITE_CONFIG||{};
  const grid=document.getElementById('video-grid');
  const covers={
    choir:'assets/choir.webp',
    dance:'assets/dance.webp'
  };
  const safeUrl=(v)=>{try{const u=new URL(v);return u.protocol==='https:'?u.href:null}catch{return null}};
  (cfg.recordings||[]).forEach((r,index)=>{
    const href=safeUrl(r.href);
    if(!href)return;
    const a=document.createElement('a');
    a.className=`video-card cover-${r.cover||'abstract'}`;
    a.href=href;a.target='_blank';a.rel='noopener noreferrer';
    a.setAttribute('aria-label',`${r.title}. Смотреть полную запись в Google Диске`);
    const visual=document.createElement('div');visual.className='video-visual';
    if(covers[r.cover]){
      const img=document.createElement('img');img.src=covers[r.cover];img.alt='';img.loading='lazy';visual.appendChild(img);
    }else{
      const decor=document.createElement('span');decor.className='abstract-icon';decor.textContent=r.icon||'♫';visual.appendChild(decor);
    }
    const play=document.createElement('span');play.className='play-pill';play.innerHTML='<span aria-hidden="true">▷</span> СМОТРЕТЬ ПОЛНОСТЬЮ';visual.appendChild(play);
    const content=document.createElement('div');content.className='video-copy';
    const meta=document.createElement('div');meta.className='video-meta';
    const tag=document.createElement('span');tag.textContent=r.tag||'ВЫСТУПЛЕНИЕ';
    const num=document.createElement('span');num.textContent=String(index+1).padStart(2,'0')+' / '+String((cfg.recordings||[]).length).padStart(2,'0');
    meta.append(tag,num);
    const h=document.createElement('h3');h.textContent=r.title;
    const desc=document.createElement('p');desc.textContent=r.description||'';
    content.append(meta,h,desc);a.append(visual,content);grid.appendChild(a);
  });
  const contacts=cfg.contacts||{};
  const socials=document.getElementById('socials');
  const socialItems=[['Telegram',contacts.telegram],['ВКонтакте',contacts.vk]];
  for(const [name,url] of socialItems){
    const href=safeUrl(url);if(!href)continue;
    const a=document.createElement('a');a.className='pill-button social-button';a.href=href;a.target='_blank';a.rel='noopener noreferrer';a.textContent=name+' ↗';socials.appendChild(a);
  }
  if(socials.childElementCount){document.getElementById('contacts').hidden=false;document.getElementById('nav-contact').hidden=false}
})();
