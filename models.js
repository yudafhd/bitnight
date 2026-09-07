import * as T from 'three';
export function makeSword(kind){
 const root=new T.Group(), pivot=new T.Group();root.add(pivot);
 const mat=(color,metalness=0,roughness=.5)=>new T.MeshPhysicalNodeMaterial({color,metalness,roughness,clearcoat:.35});
 const steel=mat(0xc3ced7,.95,.23),dark=mat(0x455d68,.55,.38),brass=mat(0xc0a470,.8,.3),leather=mat(0x564237,0,.65);
 const c=document.createElement('canvas');c.width=256;c.height=1024;const ctx=c.getContext('2d');ctx.fillStyle='#a77843';ctx.fillRect(0,0,256,1024);
 for(let i=0;i<160;i++){ctx.strokeStyle=i%3?'rgba(62,28,8,.15)':'rgba(240,200,136,.23)';ctx.lineWidth=1+i%3;ctx.beginPath();for(let y=0;y<=1024;y+=8){const x=i*1.7+Math.sin(y*.008+i)*3+Math.sin(y*.024+i)*1.2;y?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.stroke()}
 const tex=new T.CanvasTexture(c);tex.colorSpace=T.SRGBColorSpace;const wood=mat(0xffffff,0,.56);wood.map=tex;
 const energy=new T.MeshPhysicalNodeMaterial({color:0x84ffff,emissive:0x00ddff,emissiveIntensity:3,roughness:.15,metalness:.15});
 function add(geo,m,x=0,y=0,z=0,parent=pivot){const o=new T.Mesh(geo,m);o.position.set(x,y,z);parent.add(o);return o}
 function box(w,h,d,m,x,y,z=0){return add(new T.BoxGeometry(w,h,d),m,x,y,z)}
 function shape(points,depth,m){const s=new T.Shape();points.forEach(([x,y],i)=>i?s.lineTo(x,y):s.moveTo(x,y));s.closePath();const g=new T.ExtrudeGeometry(s,{depth,bevelEnabled:true,bevelSize:.025,bevelThickness:.025,bevelSegments:2,steps:1});g.translate(0,0,-depth/2);return add(g,m)}
 const bladeMat=kind===0?wood:kind===1?steel:dark;
 shape(kind===2?[[-.24,.18],[.24,.18],[.24,2.5],[.10,3.15],[-.24,2.88]]:[[-.22,.18],[.22,.18],[.16,2.6],[0,3.07],[-.16,2.6]],kind===0?.15:.10,bladeMat);
 if(kind===1){for(const z of [-.085,.085])box(.047,2.15,.015,mat(0x606f7e,.9,.29),0,1.38,z);}
 if(kind===2){for(const z of [-.09,.09]){box(.07,2.52,.02,energy,.09,1.48,z);for(let j=0;j<4;j++){const o=box(.19,.045,.035,steel,-.11,.55+j*.47,z);o.rotation.z=-.3}}box(.07,2.38,.12,energy,-.25,1.40);for(let j=0;j<3;j++)box(.10,.16,.20,dark,-.28,.28+j*.23);}
 const guardMat=kind===0?wood:kind===1?steel:dark;
 shape(kind===2?[[-.65,.10],[-.5,.28],[-.2,.2],[.18,.2],[.6,.06],[.58,-.07],[.16,.02],[-.18,.02],[-.63,-.08]]:[[-.68,.06],[-.65,.21],[-.28,.14],[.28,.14],[.65,.21],[.68,.06],[.25,-.01],[-.25,-.01]],.19,guardMat);
 add(new T.CylinderGeometry(.11,.12,.78,12),kind===0?wood:leather,0,-.42);
 for(let j=0;j<10;j++){const ring=add(new T.TorusGeometry(.12,.016,6,24),kind===0?mat(0x5c422e):kind===1?mat(0x574339):dark,0,-.09-j*.073);ring.rotation.x=Math.PI/2;ring.rotation.y=.10}
 add(new T.CylinderGeometry(.15,.15,.08,16),kind===0?wood:kind===1?brass:steel,0,-.03);
 const pommel=add(new T.SphereGeometry(.185,24,16),kind===0?wood:kind===1?steel:dark,0,-.96);pommel.scale.set(1,.78,.65);
 if(kind===1){for(const z of [-.13,.13]){const medal=add(new T.CylinderGeometry(.09,.09,.02,24),brass,0,-.96,z);medal.rotation.x=Math.PI/2}}
 if(kind===2){box(.13,.09,.26,energy,0,-.88);box(.20,.055,.22,energy,0,.07);}
 const trail=new T.Group();pivot.add(trail);for(let i=0;i<6;i++){const m=new T.MeshBasicNodeMaterial({color:0x26eaff,transparent:true,opacity:0,depthWrite:false,side:T.DoubleSide});const o=add(new T.PlaneGeometry(.035,2.9),m,-.16-i*.075,1.5,-.06,trail);o.rotation.z=-i*.022}trail.visible=false;
 root.rotation.set(.03,kind===0?-.35:kind===1?.3:-.3,kind===0?-.18:kind===1?.14:-.15);
 return {root,pivot,trail,energy};
}
