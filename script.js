const cur=document.getElementById('cur'),curt=document.getElementById('curt');
let mx=0,my=0,tx=0,ty=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px'});
(function l(){tx+=(mx-tx)*.12;ty+=(my-ty)*.12;curt.style.left=tx+'px';curt.style.top=ty+'px';requestAnimationFrame(l)})();
document.querySelectorAll('a,button,.fc,.fqi,.rc,.soc').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cur.style.width='20px';cur.style.height='20px';curt.style.width='60px';curt.style.height='60px';curt.style.borderColor='rgba(255,92,0,.9)'});
  el.addEventListener('mouseleave',()=>{cur.style.width='12px';cur.style.height='12px';curt.style.width='40px';curt.style.height='40px';curt.style.borderColor='rgba(255,92,0,.5)'});
});
const canvas=document.getElementById('bgc'),ctx=canvas.getContext('2d');
let W,H;
function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight}
resize();window.addEventListener('resize',resize);
const pts=Array.from({length:90},()=>({x:Math.random()*1920,y:Math.random()*1080,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,sz:Math.random()*1.5+.3,op:Math.random()*.35+.05,gl:Math.random()>.85}));
let f=0;
function draw(){
  ctx.clearRect(0,0,W,H);f++;
  const t=f*.003;
  const g1=ctx.createRadialGradient(W*(.3+.12*Math.sin(t)),H*(.35+.1*Math.cos(t*.7)),0,W*.5,H*.5,W*.85);
  g1.addColorStop(0,'rgba(255,92,0,.07)');g1.addColorStop(.6,'rgba(255,92,0,.01)');g1.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=g1;ctx.fillRect(0,0,W,H);
  const g2=ctx.createRadialGradient(W*(.72+.1*Math.cos(t*1.3)),H*(.68+.1*Math.sin(t)),0,W*.7,H*.7,W*.55);
  g2.addColorStop(0,'rgba(255,92,0,.05)');g2.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=g2;ctx.fillRect(0,0,W,H);
  ctx.strokeStyle='rgba(255,255,255,.022)';ctx.lineWidth=1;
  for(let x=0;x<W;x+=80){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke()}
  for(let y=0;y<H;y+=80){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke()}
  pts.forEach(p=>{
    p.x+=p.vx;p.y+=p.vy;
    if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;
    if(p.gl){ctx.shadowBlur=10;ctx.shadowColor='rgba(255,92,0,.9)';ctx.fillStyle=`rgba(255,92,0,${p.op})`}
    else{ctx.shadowBlur=0;ctx.fillStyle=`rgba(255,255,255,${p.op})`}
    ctx.beginPath();ctx.arc(p.x,p.y,p.sz,0,Math.PI*2);ctx.fill();
  });
  ctx.shadowBlur=0;ctx.lineWidth=.5;
  for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){
    const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);
    if(d<110){ctx.globalAlpha=(1-d/110)*.25;ctx.strokeStyle='rgba(255,255,255,1)';ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.stroke()}
  }
  ctx.globalAlpha=1;
  requestAnimationFrame(draw);
}
draw();
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>60));
const revs=document.querySelectorAll('.rev');
const obs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');obs.unobserve(e.target)}})},{threshold:.1});
revs.forEach(r=>obs.observe(r));
