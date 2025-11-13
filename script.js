// JS: Regler steuert die Animationsdauer (Sekunden pro Umdrehung)
(function(){
  const baguette = document.querySelector('.baguette');
  const speed = document.getElementById('speed');
  if(!baguette || !speed) return;
  function setSpeed(v){ baguette.style.setProperty('--speed', v + 's'); }
  // initial
  setSpeed(speed.value);
  speed.addEventListener('input', e => setSpeed(e.target.value));
  // accessibility: reduce motion respect
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  if(mq.matches){ baguette.style.animationPlayState = 'paused'; }
})();
