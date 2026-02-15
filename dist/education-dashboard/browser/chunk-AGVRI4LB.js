import{$ as _,Cb as x,Eb as C,Ja as f,Mb as M,Na as i,bb as v,db as r,gb as d,ja as l,ka as g,mb as s,mc as O,nb as o,ob as m,pc as P,rb as u,sb as h,tb as c}from"./chunk-IXPTXOMZ.js";function b(t,p){if(t&1){let n=u();s(0,"img",3),h("error",function(){l(n);let a=c();return g(a.onImageError())}),o()}if(t&2){let n=c();r("src",n.src,f)("alt",n.alt)}}function w(t,p){if(t&1&&(s(0,"span",4),x(1),o()),t&2){let n=c();i(),C(" ",n.displayInitials," ")}}function y(t,p){t&1&&m(0,"span",5)}var k=(()=>{class t{constructor(){this.alt="Avatar",this.size="md"}get avatarClasses(){return["avatar",`avatar--${this.size}`,this.status?`avatar--${this.status}`:""].filter(Boolean).join(" ")}get displayInitials(){return this.initials?this.initials.substring(0,2).toUpperCase():this.alt.substring(0,2).toUpperCase()}onImageError(){this.src=void 0}static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275cmp=_({type:t,selectors:[["app-avatar"]],inputs:{src:"src",alt:"alt",size:"size",initials:"initials",status:"status"},standalone:!0,features:[M],decls:4,vars:5,consts:[["class","avatar__image",3,"src","alt","error",4,"ngIf"],["class","avatar__initials",4,"ngIf"],["class","avatar__status",4,"ngIf"],[1,"avatar__image",3,"error","src","alt"],[1,"avatar__initials"],[1,"avatar__status"]],template:function(e,a){e&1&&(s(0,"div"),v(1,b,1,2,"img",0)(2,w,2,1,"span",1)(3,y,1,0,"span",2),o()),e&2&&(d(a.avatarClasses),i(),r("ngIf",a.src),i(),r("ngIf",!a.src),i(),r("ngIf",a.status))},dependencies:[P,O],styles:[`

.avatar[_ngcontent-%COMP%] {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #7c7fe6;
  color: #ffffff;
  font-weight: 500;
  overflow: hidden;
}
.avatar__image[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.avatar__initials[_ngcontent-%COMP%] {
  text-transform: uppercase;
}
.avatar__status[_ngcontent-%COMP%] {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid #ffffff;
}
.avatar--xs[_ngcontent-%COMP%] {
  width: 24px;
  height: 24px;
  font-size: 10px;
}
.avatar--xs[_ngcontent-%COMP%]   .avatar__status[_ngcontent-%COMP%] {
  width: 6px;
  height: 6px;
}
.avatar--sm[_ngcontent-%COMP%] {
  width: 32px;
  height: 32px;
  font-size: 12px;
}
.avatar--sm[_ngcontent-%COMP%]   .avatar__status[_ngcontent-%COMP%] {
  width: 8px;
  height: 8px;
}
.avatar--md[_ngcontent-%COMP%] {
  width: 40px;
  height: 40px;
  font-size: 14px;
}
.avatar--lg[_ngcontent-%COMP%] {
  width: 56px;
  height: 56px;
  font-size: 18px;
}
.avatar--lg[_ngcontent-%COMP%]   .avatar__status[_ngcontent-%COMP%] {
  width: 12px;
  height: 12px;
}
.avatar--xl[_ngcontent-%COMP%] {
  width: 80px;
  height: 80px;
  font-size: 24px;
}
.avatar--xl[_ngcontent-%COMP%]   .avatar__status[_ngcontent-%COMP%] {
  width: 14px;
  height: 14px;
  bottom: 4px;
  right: 4px;
}
.avatar--online[_ngcontent-%COMP%]   .avatar__status[_ngcontent-%COMP%] {
  background-color: #10b981;
}
.avatar--offline[_ngcontent-%COMP%]   .avatar__status[_ngcontent-%COMP%] {
  background-color: #adb5bd;
}
.avatar--away[_ngcontent-%COMP%]   .avatar__status[_ngcontent-%COMP%] {
  background-color: #f59e0b;
}
.avatar--busy[_ngcontent-%COMP%]   .avatar__status[_ngcontent-%COMP%] {
  background-color: #ef4444;
}`]})}}return t})();export{k as a};
