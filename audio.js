let context;let enabled=true;
export function setSound(v){enabled=v}
export function playSwing(kind){if(!enabled)return;try{
 context??=new(window.AudioContext||window.webkitAudioContext)();context.resume();const t=context.currentTime;
 const length=[.3,.46,.34][kind],buffer=context.createBuffer(1,Math.ceil(context.sampleRate*length),context.sampleRate),data=buffer.getChannelData(0);for(let i=0;i<data.length;i++)data[i]=(Math.random()*2-1);
 const source=context.createBufferSource();source.buffer=buffer;const filter=context.createBiquadFilter();filter.type='bandpass';filter.Q.value=.7;filter.frequency.setValueAtTime([1000,650,1800][kind],t);filter.frequency.exponentialRampToValueAtTime([230,110,330][kind],t+length);
 const gain=context.createGain();gain.gain.setValueAtTime(.001,t);gain.gain.exponentialRampToValueAtTime(.3,t+.07);gain.gain.exponentialRampToValueAtTime(.001,t+length);source.connect(filter).connect(gain).connect(context.destination);source.start(t);source.stop(t+length);
 if(kind>0){const o=context.createOscillator(),g=context.createGain();o.type=kind===2?'triangle':'sine';o.frequency.setValueAtTime(kind===2?700:1080,t);o.frequency.exponentialRampToValueAtTime(kind===2?130:880,t+.5);g.gain.setValueAtTime(.001,t);g.gain.exponentialRampToValueAtTime(.06,t+.04);g.gain.exponentialRampToValueAtTime(.001,t+.65);o.connect(g).connect(context.destination);o.start(t);o.stop(t+.7)}
 }catch{}}
