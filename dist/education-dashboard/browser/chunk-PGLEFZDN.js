import{a as Z}from"./chunk-AGVRI4LB.js";import{a as R,b as J,e as K,h as U,i as Y,j as q,n as X}from"./chunk-K2MEFKBR.js";import{j as $,m as G}from"./chunk-YWRECBJH.js";import{$ as C,Cb as r,Db as P,Eb as b,Ib as z,Ja as j,Jb as I,Kb as V,Mb as h,Na as s,Q as B,W as N,Xa as y,a as D,b as A,bb as f,db as c,fb as O,gb as F,ja as _,ka as g,lc as w,mb as i,mc as S,nb as o,ob as E,pb as H,pc as x,qb as W,rb as M,sa as v,sb as p,tb as d,ub as L,vb as Q}from"./chunk-IXPTXOMZ.js";var tt=(()=>{class n{constructor(){this.students=y(this.getMockStudents())}getStudents(){return this.students()}getStudentsPaginated(t,a){let e=this.students(),l=(t-1)*a,u=l+a;return{students:e.slice(l,u),totalCount:e.length,currentPage:t,pageSize:a}}searchStudents(t){let a=t.toLowerCase();return this.students().filter(e=>e.name.toLowerCase().includes(a)||e.email.toLowerCase().includes(a)||e.rollNo.toLowerCase().includes(a))}addStudent(t){let a=A(D({},t),{id:this.students().length+1});this.students.update(e=>[...e,a])}updateStudent(t,a){this.students.update(e=>e.map(l=>l.id===t?D(D({},l),a):l))}deleteStudent(t){this.students.update(a=>a.filter(e=>e.id!==t))}getMockStudents(){return[{id:1,rollNo:"01",name:"Tiger Nixon",email:"info@example.com",mobile:"123 456 7890",education:"M.COM, P.H.D.",admissionDate:"2011/04/25",avatar:"assets/images/avatars/avatar-1.jpg"},{id:2,rollNo:"02",name:"Garrett Winters",email:"info@example.com",mobile:"987 654 3210",education:"M.COM, P.H.D.",admissionDate:"2011/07/25",avatar:"assets/images/avatars/avatar-2.jpg"},{id:3,rollNo:"03",name:"Ashton Cox",email:"info@example.com",mobile:"(123) 4567 890",education:"B.COM, M.COM.",admissionDate:"2009/01/12",avatar:"assets/images/avatars/avatar-3.jpg"},{id:4,rollNo:"04",name:"Cedric Kelly",email:"info@example.com",mobile:"123 456 7890",education:"B.COM, M.COM.",admissionDate:"2012/03/29",avatar:"assets/images/avatars/avatar-4.jpg"},{id:5,rollNo:"05",name:"Airi Satou",email:"info@example.com",mobile:"987 654 3210",education:"B.A, B.C.A",admissionDate:"2008/11/28",avatar:"assets/images/avatars/avatar-5.jpg"},{id:6,rollNo:"06",name:"Brielle Williamson",email:"info@example.com",mobile:"123 456 7890",education:"B.COM, M.COM.",admissionDate:"2012/12/02",avatar:"assets/images/avatars/avatar-6.jpg"},{id:7,rollNo:"07",name:"Herrod Chandler",email:"info@example.com",mobile:"987 654 3210",education:"B.A, B.C.A",admissionDate:"2012/08/06",avatar:"assets/images/avatars/avatar-7.jpg"},{id:8,rollNo:"08",name:"Rhona Davidson",email:"info@example.com",mobile:"(123) 4567890",education:"B.TACH, M.TACH",admissionDate:"2010/10/14",avatar:"assets/images/avatars/avatar-8.jpg"},{id:9,rollNo:"09",name:"Colleen Hurst",email:"info@example.com",mobile:"(123) 4567 890",education:"B.A, B.C.A",admissionDate:"2009/09/15",avatar:"assets/images/avatars/avatar-9.jpg"},{id:10,rollNo:"10",name:"Sonya Frost",email:"info@example.com",mobile:"123 456 7890",education:"B.COM, M.COM.",admissionDate:"2008/12/13",avatar:"assets/images/avatars/avatar-10.jpg"},{id:11,rollNo:"11",name:"Jena Gaines",email:"info@example.com",mobile:"(123) 4567 890",education:"B.COM, M.COM.",admissionDate:"2008/12/19",avatar:"assets/images/avatars/avatar-1.jpg"},{id:12,rollNo:"12",name:"Quinn Flynn",email:"info@example.com",mobile:"987 654 3210",education:"B.A, B.C.A",admissionDate:"2013/03/03",avatar:"assets/images/avatars/avatar-2.jpg"},{id:13,rollNo:"13",name:"Charde Marshall",email:"info@example.com",mobile:"123 456 7890",education:"B.COM, M.COM.",admissionDate:"2008/10/16",avatar:"assets/images/avatars/avatar-3.jpg"},{id:14,rollNo:"14",name:"Haley Kennedy",email:"info@example.com",mobile:"(123) 4567 890",education:"B.TACH, M.TACH",admissionDate:"2012/12/18",avatar:"assets/images/avatars/avatar-4.jpg"},{id:15,rollNo:"15",name:"Tatyana Fitzpatrick",email:"info@example.com",mobile:"987 654 3210",education:"M.COM, P.H.D.",admissionDate:"2010/03/17",avatar:"assets/images/avatars/avatar-5.jpg"},{id:16,rollNo:"16",name:"Michael Silva",email:"info@example.com",mobile:"123 456 7890",education:"B.COM, M.COM.",admissionDate:"2012/11/27",avatar:"assets/images/avatars/avatar-6.jpg"},{id:17,rollNo:"17",name:"Paul Byrd",email:"info@example.com",mobile:"(123) 4567 890",education:"B.A, B.C.A",admissionDate:"2010/06/09",avatar:"assets/images/avatars/avatar-7.jpg"},{id:18,rollNo:"18",name:"Gloria Little",email:"info@example.com",mobile:"987 654 3210",education:"B.TACH, M.TACH",admissionDate:"2009/04/10",avatar:"assets/images/avatars/avatar-8.jpg"},{id:19,rollNo:"19",name:"Bradley Greer",email:"info@example.com",mobile:"123 456 7890",education:"M.COM, P.H.D.",admissionDate:"2012/10/13",avatar:"assets/images/avatars/avatar-9.jpg"},{id:20,rollNo:"20",name:"Dai Rios",email:"info@example.com",mobile:"(123) 4567 890",education:"B.COM, M.COM.",admissionDate:"2012/09/26",avatar:"assets/images/avatars/avatar-10.jpg"},{id:21,rollNo:"21",name:"Jenette Caldwell",email:"info@example.com",mobile:"987 654 3210",education:"B.A, B.C.A",admissionDate:"2011/09/03",avatar:"assets/images/avatars/avatar-1.jpg"},{id:22,rollNo:"22",name:"Yuri Berry",email:"info@example.com",mobile:"123 456 7890",education:"B.TACH, M.TACH",admissionDate:"2009/06/25",avatar:"assets/images/avatars/avatar-2.jpg"},{id:23,rollNo:"23",name:"Caesar Vance",email:"info@example.com",mobile:"(123) 4567 890",education:"M.COM, P.H.D.",admissionDate:"2011/12/12",avatar:"assets/images/avatars/avatar-3.jpg"},{id:24,rollNo:"24",name:"Doris Wilder",email:"info@example.com",mobile:"987 654 3210",education:"B.COM, M.COM.",admissionDate:"2010/09/20",avatar:"assets/images/avatars/avatar-4.jpg"},{id:25,rollNo:"25",name:"Angelica Ramos",email:"info@example.com",mobile:"123 456 7890",education:"B.A, B.C.A",admissionDate:"2009/10/09",avatar:"assets/images/avatars/avatar-5.jpg"},{id:26,rollNo:"26",name:"Gavin Joyce",email:"info@example.com",mobile:"(123) 4567 890",education:"B.TACH, M.TACH",admissionDate:"2010/12/22",avatar:"assets/images/avatars/avatar-6.jpg"},{id:27,rollNo:"27",name:"Jennifer Chang",email:"info@example.com",mobile:"987 654 3210",education:"M.COM, P.H.D.",admissionDate:"2010/11/14",avatar:"assets/images/avatars/avatar-7.jpg"},{id:28,rollNo:"28",name:"Brenden Wagner",email:"info@example.com",mobile:"123 456 7890",education:"B.COM, M.COM.",admissionDate:"2011/06/07",avatar:"assets/images/avatars/avatar-8.jpg"},{id:29,rollNo:"29",name:"Fiona Green",email:"info@example.com",mobile:"(123) 4567 890",education:"B.A, B.C.A",admissionDate:"2010/03/11",avatar:"assets/images/avatars/avatar-9.jpg"},{id:30,rollNo:"30",name:"Shou Itou",email:"info@example.com",mobile:"987 654 3210",education:"B.TACH, M.TACH",admissionDate:"2011/08/14",avatar:"assets/images/avatars/avatar-10.jpg"}]}static{this.\u0275fac=function(a){return new(a||n)}}static{this.\u0275prov=B({token:n,factory:n.\u0275fac,providedIn:"root"})}}return n})();function st(n,m){if(n&1&&(i(0,"a",5),r(1),o()),n&2){let t=d().$implicit;c("routerLink",t.route),s(),b(" ",t.label," ")}}function lt(n,m){if(n&1&&(i(0,"span",6),r(1),o()),n&2){let t=d(),a=t.$implicit,e=t.last;O("breadcrumb__item--active",e),s(),b(" ",a.label," ")}}function ct(n,m){n&1&&(i(0,"span",7)(1,"span",8),r(2,"chevron_right"),o()())}function dt(n,m){if(n&1&&(H(0),f(1,st,2,2,"a",2)(2,lt,2,3,"span",3)(3,ct,3,0,"span",4),W()),n&2){let t=m.$implicit,a=m.last;s(),c("ngIf",t.route&&!a),s(),c("ngIf",!t.route||a),s(),c("ngIf",!a)}}var et=(()=>{class n{constructor(){this.items=[]}static{this.\u0275fac=function(a){return new(a||n)}}static{this.\u0275cmp=C({type:n,selectors:[["app-breadcrumb"]],inputs:{items:"items"},standalone:!0,features:[h],decls:2,vars:1,consts:[[1,"breadcrumb"],[4,"ngFor","ngForOf"],["class","breadcrumb__item breadcrumb__item--link",3,"routerLink",4,"ngIf"],["class","breadcrumb__item",3,"breadcrumb__item--active",4,"ngIf"],["class","breadcrumb__separator",4,"ngIf"],[1,"breadcrumb__item","breadcrumb__item--link",3,"routerLink"],[1,"breadcrumb__item"],[1,"breadcrumb__separator"],[1,"material-icons"]],template:function(a,e){a&1&&(i(0,"nav",0),f(1,dt,4,3,"ng-container",1),o()),a&2&&(s(),c("ngForOf",e.items))},dependencies:[x,w,S,G,$],styles:[`

.breadcrumb[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
}
.breadcrumb__item[_ngcontent-%COMP%] {
  color: #6c757d;
}
.breadcrumb__item--link[_ngcontent-%COMP%] {
  text-decoration: none;
  transition: all 0.3s ease;
}
.breadcrumb__item--link[_ngcontent-%COMP%]:hover {
  color: #5b5fc7;
}
.breadcrumb__item--active[_ngcontent-%COMP%] {
  color: #5b5fc7;
  font-weight: 500;
}
.breadcrumb__separator[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
}
.breadcrumb__separator[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {
  font-size: 18px;
}`]})}}return n})();var nt=(()=>{class n{constructor(){this.activeView="list",this.viewChange=new v}setView(t){this.activeView=t,this.viewChange.emit(t)}static{this.\u0275fac=function(a){return new(a||n)}}static{this.\u0275cmp=C({type:n,selectors:[["app-view-toggle"]],inputs:{activeView:"activeView"},outputs:{viewChange:"viewChange"},standalone:!0,features:[h],decls:5,vars:4,consts:[[1,"view-toggle"],[1,"view-toggle__btn",3,"click"]],template:function(a,e){a&1&&(i(0,"div",0)(1,"button",1),p("click",function(){return e.setView("list")}),r(2," List View "),o(),i(3,"button",1),p("click",function(){return e.setView("grid")}),r(4," Grid View "),o()()),a&2&&(s(),O("view-toggle__btn--active",e.activeView==="list"),s(2),O("view-toggle__btn--active",e.activeView==="grid"))},dependencies:[x],styles:[`

.view-toggle[_ngcontent-%COMP%] {
  display: inline-flex;
  background-color: #f8f9fc;
  border-radius: 8px;
  overflow: hidden;
}
.view-toggle__btn[_ngcontent-%COMP%] {
  padding: 8px 16px;
  font-family: "Poppins", sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #6c757d;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}
.view-toggle__btn[_ngcontent-%COMP%]:hover:not(.view-toggle__btn--active) {
  color: #5b5fc7;
}
.view-toggle__btn--active[_ngcontent-%COMP%] {
  background-color: #5b5fc7;
  color: #ffffff;
}`]})}}return n})();var pt=["*"];function mt(n,m){if(n&1&&(i(0,"span",3),r(1),o()),n&2){let t=d();s(),b(" ",t.icon," ")}}function ut(n,m){if(n&1&&(i(0,"span",3),r(1),o()),n&2){let t=d();s(),b(" ",t.icon," ")}}var it=(()=>{class n{constructor(){this.variant="primary",this.size="md",this.disabled=!1,this.fullWidth=!1,this.iconPosition="left",this.type="button"}get buttonClasses(){return["button",`button--${this.variant}`,`button--${this.size}`,this.fullWidth?"button--full-width":"",this.icon?"button--with-icon":"",this.disabled?"button--disabled":""].filter(Boolean).join(" ")}static{this.\u0275fac=function(a){return new(a||n)}}static{this.\u0275cmp=C({type:n,selectors:[["app-button"]],inputs:{variant:"variant",size:"size",disabled:"disabled",fullWidth:"fullWidth",icon:"icon",iconPosition:"iconPosition",type:"type"},standalone:!0,features:[h],ngContentSelectors:pt,decls:5,vars:6,consts:[[3,"type","disabled"],["class","button__icon material-icons",4,"ngIf"],[1,"button__content"],[1,"button__icon","material-icons"]],template:function(a,e){a&1&&(L(),i(0,"button",0),f(1,mt,2,1,"span",1),i(2,"span",2),Q(3),o(),f(4,ut,2,1,"span",1),o()),a&2&&(F(e.buttonClasses),c("type",e.type)("disabled",e.disabled),s(),c("ngIf",e.icon&&e.iconPosition==="left"),s(3),c("ngIf",e.icon&&e.iconPosition==="right"))},dependencies:[x,S],styles:[`

.button[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  gap: 8px;
}
.button[_ngcontent-%COMP%]:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.button__icon[_ngcontent-%COMP%] {
  font-size: 18px;
  line-height: 1;
}
.button__content[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
}
.button--primary[_ngcontent-%COMP%] {
  background-color: var(--primary-color, #5b5fc7);
  color: #ffffff;
}
.button--primary[_ngcontent-%COMP%]:hover:not(:disabled) {
  background-color: var(--primary-hover, #4547a9);
}
.button--secondary[_ngcontent-%COMP%] {
  background-color: #6c757d;
  color: #ffffff;
}
.button--secondary[_ngcontent-%COMP%]:hover:not(:disabled) {
  background-color: #495057;
}
.button--success[_ngcontent-%COMP%] {
  background-color: #10b981;
  color: #ffffff;
}
.button--success[_ngcontent-%COMP%]:hover:not(:disabled) {
  background-color: #0c8a60;
}
.button--danger[_ngcontent-%COMP%] {
  background-color: #ef4444;
  color: #ffffff;
}
.button--danger[_ngcontent-%COMP%]:hover:not(:disabled) {
  background-color: #eb1515;
}
.button--warning[_ngcontent-%COMP%] {
  background-color: #f59e0b;
  color: #ffffff;
}
.button--warning[_ngcontent-%COMP%]:hover:not(:disabled) {
  background-color: #c57f08;
}
.button--info[_ngcontent-%COMP%] {
  background-color: #3b82f6;
  color: #ffffff;
}
.button--info[_ngcontent-%COMP%]:hover:not(:disabled) {
  background-color: #0b63f3;
}
.button--outline[_ngcontent-%COMP%] {
  background-color: transparent;
  color: var(--primary-color, #5b5fc7);
  border: 1px solid var(--primary-color, #5b5fc7);
}
.button--outline[_ngcontent-%COMP%]:hover:not(:disabled) {
  background-color: var(--primary-color, #5b5fc7);
  color: #ffffff;
}
.button--sm[_ngcontent-%COMP%] {
  padding: 4px 8px;
  font-size: 12px;
}
.button--md[_ngcontent-%COMP%] {
  padding: 8px 16px;
  font-size: 14px;
}
.button--lg[_ngcontent-%COMP%] {
  padding: 16px 24px;
  font-size: 16px;
}
.button--full-width[_ngcontent-%COMP%] {
  width: 100%;
}
.button--disabled[_ngcontent-%COMP%] {
  opacity: 0.6;
  cursor: not-allowed;
}`]})}}return n})();function _t(n,m){if(n&1){let t=M();i(0,"button",4),p("click",function(){_(t);let e=d();return g(e.onView())}),i(1,"span",5),r(2,"visibility"),o()()}}function gt(n,m){if(n&1){let t=M();i(0,"button",6),p("click",function(){_(t);let e=d();return g(e.onEdit())}),i(1,"span",5),r(2,"edit"),o()()}}function ft(n,m){if(n&1){let t=M();i(0,"button",7),p("click",function(){_(t);let e=d();return g(e.onDelete())}),i(1,"span",5),r(2,"delete"),o()()}}var at=(()=>{class n{constructor(){this.showEdit=!0,this.showDelete=!0,this.showView=!1,this.edit=new v,this.delete=new v,this.view=new v}onEdit(){this.edit.emit()}onDelete(){this.delete.emit()}onView(){this.view.emit()}static{this.\u0275fac=function(a){return new(a||n)}}static{this.\u0275cmp=C({type:n,selectors:[["app-action-buttons"]],inputs:{showEdit:"showEdit",showDelete:"showDelete",showView:"showView"},outputs:{edit:"edit",delete:"delete",view:"view"},standalone:!0,features:[h],decls:4,vars:3,consts:[[1,"action-buttons"],["class","action-buttons__btn action-buttons__btn--view","title","View",3,"click",4,"ngIf"],["class","action-buttons__btn action-buttons__btn--edit","title","Edit",3,"click",4,"ngIf"],["class","action-buttons__btn action-buttons__btn--delete","title","Delete",3,"click",4,"ngIf"],["title","View",1,"action-buttons__btn","action-buttons__btn--view",3,"click"],[1,"material-icons"],["title","Edit",1,"action-buttons__btn","action-buttons__btn--edit",3,"click"],["title","Delete",1,"action-buttons__btn","action-buttons__btn--delete",3,"click"]],template:function(a,e){a&1&&(i(0,"div",0),f(1,_t,3,0,"button",1)(2,gt,3,0,"button",2)(3,ft,3,0,"button",3),o()),a&2&&(s(),c("ngIf",e.showView),s(),c("ngIf",e.showEdit),s(),c("ngIf",e.showDelete))},dependencies:[x,S],styles:[`

.action-buttons[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.action-buttons__btn[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.action-buttons__btn[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {
  font-size: 18px;
}
.action-buttons__btn--view[_ngcontent-%COMP%] {
  background-color: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}
.action-buttons__btn--view[_ngcontent-%COMP%]:hover {
  background-color: #3b82f6;
  color: #ffffff;
}
.action-buttons__btn--edit[_ngcontent-%COMP%] {
  background-color: rgba(var(--primary-rgb, 91, 95, 199), 0.1);
  color: var(--primary-color, #5b5fc7);
}
.action-buttons__btn--edit[_ngcontent-%COMP%]:hover {
  background-color: var(--primary-color, #5b5fc7);
  color: #ffffff;
}
.action-buttons__btn--delete[_ngcontent-%COMP%] {
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}
.action-buttons__btn--delete[_ngcontent-%COMP%]:hover {
  background-color: #ef4444;
  color: #ffffff;
}`]})}}return n})();function bt(n,m){if(n&1){let t=M();i(0,"button",5),p("click",function(){let e=_(t).$implicit,l=d();return g(l.goToPage(e))}),r(1),o()}if(n&2){let t=m.$implicit,a=d();O("pagination__btn--active",t===a.currentPage),s(),b(" ",t," ")}}var ot=(()=>{class n{constructor(){this.currentPage=1,this.totalPages=1,this.totalItems=0,this.pageSize=10,this.pageChange=new v}get pages(){let t=[],e=Math.max(1,this.currentPage-Math.floor(1.5)),l=Math.min(this.totalPages,e+3-1);l-e+1<3&&(e=Math.max(1,l-3+1));for(let u=e;u<=l;u++)t.push(u);return t}get startItem(){return(this.currentPage-1)*this.pageSize+1}get endItem(){return Math.min(this.currentPage*this.pageSize,this.totalItems)}goToPage(t){t>=1&&t<=this.totalPages&&t!==this.currentPage&&this.pageChange.emit(t)}previousPage(){this.goToPage(this.currentPage-1)}nextPage(){this.goToPage(this.currentPage+1)}static{this.\u0275fac=function(a){return new(a||n)}}static{this.\u0275cmp=C({type:n,selectors:[["app-pagination"]],inputs:{currentPage:"currentPage",totalPages:"totalPages",totalItems:"totalItems",pageSize:"pageSize"},outputs:{pageChange:"pageChange"},standalone:!0,features:[h],decls:18,vars:6,consts:[[1,"pagination"],[1,"pagination__info"],[1,"pagination__controls"],[1,"pagination__btn",3,"click","disabled"],["class","pagination__btn pagination__btn--page",3,"pagination__btn--active","click",4,"ngFor","ngForOf"],[1,"pagination__btn","pagination__btn--page",3,"click"]],template:function(a,e){a&1&&(i(0,"div",0)(1,"span",1),r(2," Showing "),i(3,"strong"),r(4),o(),r(5," to "),i(6,"strong"),r(7),o(),r(8," of "),i(9,"strong"),r(10),o(),r(11," entries "),o(),i(12,"div",2)(13,"button",3),p("click",function(){return e.previousPage()}),r(14," Previous "),o(),f(15,bt,2,3,"button",4),i(16,"button",3),p("click",function(){return e.nextPage()}),r(17," Next "),o()()()),a&2&&(s(4),P(e.startItem),s(3),P(e.endItem),s(3),P(e.totalItems),s(3),c("disabled",e.currentPage===1),s(2),c("ngForOf",e.pages),s(),c("disabled",e.currentPage===e.totalPages))},dependencies:[x,w],styles:[`

.pagination[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px 0;
}
.pagination__info[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #6c757d;
}
.pagination__info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  color: #1e293b;
}
.pagination__controls[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 4px;
}
.pagination__btn[_ngcontent-%COMP%] {
  padding: 8px 16px;
  font-family: "Poppins", sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #6c757d;
  background-color: #f8f9fc;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.pagination__btn[_ngcontent-%COMP%]:hover:not(:disabled):not(.pagination__btn--active) {
  background-color: #e6eaf4;
  color: var(--primary-color, #5b5fc7);
}
.pagination__btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.pagination__btn--page[_ngcontent-%COMP%] {
  min-width: 36px;
  padding: 8px;
}
.pagination__btn--active[_ngcontent-%COMP%] {
  background-color: var(--primary-color, #5b5fc7);
  color: #ffffff;
}`]})}}return n})();function Ct(n,m){if(n&1&&(i(0,"option",13),r(1),o()),n&2){let t=m.$implicit;c("value",t),s(),P(t)}}function vt(n,m){if(n&1){let t=M();i(0,"tr",14)(1,"td",15),E(2,"app-avatar",16),o(),i(3,"td",17),r(4),o(),i(5,"td",15)(6,"a",18),r(7),o()(),i(8,"td",19),r(9),o(),i(10,"td",20),r(11),o(),i(12,"td",15)(13,"a",21),r(14),o()(),i(15,"td",15),r(16),o(),i(17,"td",15)(18,"app-action-buttons",22),p("edit",function(){let e=_(t).$implicit,l=d();return g(l.onEdit(e))})("delete",function(){let e=_(t).$implicit,l=d();return g(l.onDelete(e))}),o()()()}if(n&2){let t=m.$implicit;s(2),c("src",t.avatar)("alt",t.name),s(2),b(" ",t.rollNo," "),s(3),P(t.name),s(2),b(" ",t.education," "),s(2),b(" ",t.mobile," "),s(3),P(t.email),s(2),b(" ",t.admissionDate," ")}}var rt=(()=>{class n{constructor(){this.students=[],this.totalItems=0,this.currentPage=1,this.pageSize=10,this.edit=new v,this.delete=new v,this.pageChange=new v,this.pageSizeChange=new v,this.search=new v,this.searchQuery="",this.pageSizeOptions=[10,25,50,100]}get totalPages(){return Math.ceil(this.totalItems/this.pageSize)}onSearch(){this.search.emit(this.searchQuery)}onPageSizeChange(){this.pageSizeChange.emit(this.pageSize)}onPageChange(t){this.pageChange.emit(t)}onEdit(t){this.edit.emit(t)}onDelete(t){this.delete.emit(t)}static{this.\u0275fac=function(a){return new(a||n)}}static{this.\u0275cmp=C({type:n,selectors:[["app-students-table"]],inputs:{students:"students",totalItems:"totalItems",currentPage:"currentPage",pageSize:"pageSize"},outputs:{edit:"edit",delete:"delete",pageChange:"pageChange",pageSizeChange:"pageSizeChange",search:"search"},standalone:!0,features:[h],decls:52,vars:8,consts:[[1,"students-table"],[1,"students-table__controls"],[1,"students-table__entries"],[1,"students-table__select",3,"ngModelChange","change","ngModel"],[3,"value",4,"ngFor","ngForOf"],[1,"students-table__search"],["type","text",1,"students-table__search-input",3,"ngModelChange","input","ngModel"],[1,"students-table__wrapper"],[1,"students-table__table"],[1,"students-table__th"],[1,"material-icons","students-table__sort"],["class","students-table__row",4,"ngFor","ngForOf"],[3,"pageChange","currentPage","totalPages","totalItems","pageSize"],[3,"value"],[1,"students-table__row"],[1,"students-table__td"],["size","sm",3,"src","alt"],[1,"students-table__td","students-table__td--roll"],[1,"students-table__name-link"],[1,"students-table__td","students-table__td--education"],[1,"students-table__td","students-table__td--phone"],[1,"students-table__email-link"],[3,"edit","delete"]],template:function(a,e){a&1&&(i(0,"div",0)(1,"div",1)(2,"div",2)(3,"span"),r(4,"Show"),o(),i(5,"select",3),V("ngModelChange",function(u){return I(e.pageSize,u)||(e.pageSize=u),u}),p("change",function(){return e.onPageSizeChange()}),f(6,Ct,2,2,"option",4),o(),i(7,"span"),r(8,"entries"),o()(),i(9,"div",5)(10,"label"),r(11,"Search:"),o(),i(12,"input",6),V("ngModelChange",function(u){return I(e.searchQuery,u)||(e.searchQuery=u),u}),p("input",function(){return e.onSearch()}),o()()(),i(13,"div",7)(14,"table",8)(15,"thead")(16,"tr")(17,"th",9),r(18," Profile "),i(19,"span",10),r(20,"unfold_more"),o()(),i(21,"th",9),r(22," Roll No. "),i(23,"span",10),r(24,"unfold_more"),o()(),i(25,"th",9),r(26," Name "),i(27,"span",10),r(28,"unfold_more"),o()(),i(29,"th",9),r(30," Education "),i(31,"span",10),r(32,"unfold_more"),o()(),i(33,"th",9),r(34," Mobile "),i(35,"span",10),r(36,"unfold_more"),o()(),i(37,"th",9),r(38," Email "),i(39,"span",10),r(40,"unfold_more"),o()(),i(41,"th",9),r(42," Admission Date "),i(43,"span",10),r(44,"unfold_more"),o()(),i(45,"th",9),r(46," Action "),i(47,"span",10),r(48,"unfold_more"),o()()()(),i(49,"tbody"),f(50,vt,19,8,"tr",11),o()()(),i(51,"app-pagination",12),p("pageChange",function(u){return e.onPageChange(u)}),o()()),a&2&&(s(5),z("ngModel",e.pageSize),s(),c("ngForOf",e.pageSizeOptions),s(6),z("ngModel",e.searchQuery),s(38),c("ngForOf",e.students),s(),c("currentPage",e.currentPage)("totalPages",e.totalPages)("totalItems",e.totalItems)("pageSize",e.pageSize))},dependencies:[x,w,X,Y,q,R,U,J,K,Z,at,ot],styles:[`

.students-table__controls[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
}
.students-table__entries[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  font-size: 12px;
  color: #6c757d;
}
.students-table__select[_ngcontent-%COMP%] {
  padding: 4px 16px;
  font-family: "Poppins", sans-serif;
  font-size: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background-color: #ffffff;
  cursor: pointer;
}
.students-table__select[_ngcontent-%COMP%]:focus {
  outline: none;
  border-color: var(--primary-color, #5b5fc7);
}
.students-table__search[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  font-size: 12px;
  color: #6c757d;
}
.students-table__search-input[_ngcontent-%COMP%] {
  padding: 4px 8px;
  font-family: "Poppins", sans-serif;
  font-size: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  min-width: 200px;
  transition: all 0.3s ease;
}
.students-table__search-input[_ngcontent-%COMP%]:focus {
  outline: none;
  border-color: var(--primary-color, #5b5fc7);
  box-shadow: 0 0 0 2px rgba(var(--primary-rgb, 91, 95, 199), 0.1);
}
.students-table__wrapper[_ngcontent-%COMP%] {
  overflow-x: auto;
  border-radius: 8px;
}
.students-table__table[_ngcontent-%COMP%] {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}
.students-table__th[_ngcontent-%COMP%] {
  padding: 16px;
  text-align: left;
  font-weight: 500;
  color: #1e293b;
  background-color: #f8f9fc;
  border-bottom: 1px solid #e2e8f0;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.3s ease;
}
.students-table__th[_ngcontent-%COMP%]:hover {
  background-color: #edf0f7;
}
.students-table__sort[_ngcontent-%COMP%] {
  font-size: 16px;
  vertical-align: middle;
  color: #94a3b8;
  margin-left: 4px;
}
.students-table__row[_ngcontent-%COMP%] {
  transition: all 0.3s ease;
}
.students-table__row[_ngcontent-%COMP%]:hover {
  background-color: rgba(var(--primary-rgb, 91, 95, 199), 0.02);
}
.students-table__row[_ngcontent-%COMP%]:not(:last-child) {
  border-bottom: 1px solid #f1f5f9;
}
.students-table__td[_ngcontent-%COMP%] {
  padding: 16px;
  color: #6c757d;
  vertical-align: middle;
}
.students-table__td--roll[_ngcontent-%COMP%] {
  font-weight: 500;
  color: #1e293b;
}
.students-table__td--education[_ngcontent-%COMP%] {
  color: var(--primary-color, #5b5fc7);
}
.students-table__td--phone[_ngcontent-%COMP%] {
  color: #10b981;
}
.students-table__name-link[_ngcontent-%COMP%] {
  color: var(--primary-color, #5b5fc7);
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}
.students-table__name-link[_ngcontent-%COMP%]:hover {
  color: var(--primary-hover, #4547a9);
  text-decoration: underline;
}
.students-table__email-link[_ngcontent-%COMP%] {
  color: #3b82f6;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
}
.students-table__email-link[_ngcontent-%COMP%]:hover {
  color: #0b63f3;
  text-decoration: underline;
}`]})}}return n})();function ht(n,m){if(n&1){let t=M();i(0,"app-students-table",14),p("edit",function(e){_(t);let l=d();return g(l.onEditStudent(e))})("delete",function(e){_(t);let l=d();return g(l.onDeleteStudent(e))})("pageChange",function(e){_(t);let l=d();return g(l.onPageChange(e))})("pageSizeChange",function(e){_(t);let l=d();return g(l.onPageSizeChange(e))})("search",function(e){_(t);let l=d();return g(l.onSearch(e))}),o()}if(n&2){let t=d();c("students",t.tableData.students)("totalItems",t.tableData.totalCount)("currentPage",t.tableData.currentPage)("pageSize",t.tableData.pageSize)}}function xt(n,m){if(n&1){let t=M();i(0,"div",17)(1,"div",18)(2,"div",19),E(3,"img",20),o(),i(4,"h3",21),r(5),o(),i(6,"p",22),r(7),o(),i(8,"p",23)(9,"span",24),r(10,"phone"),o(),r(11),o(),i(12,"p",23)(13,"span",24),r(14,"email"),o(),r(15),o(),i(16,"div",25)(17,"button",26),p("click",function(){let e=_(t).$implicit,l=d(2);return g(l.onEditStudent(e))}),i(18,"span",24),r(19,"edit"),o()(),i(20,"button",27),p("click",function(){let e=_(t).$implicit,l=d(2);return g(l.onDeleteStudent(e))}),i(21,"span",24),r(22,"delete"),o()()()()()}if(n&2){let t=m.$implicit;s(3),c("src",t.avatar,j)("alt",t.name),s(2),P(t.name),s(2),P(t.education),s(4),b(" ",t.mobile," "),s(4),b(" ",t.email," ")}}function Mt(n,m){if(n&1&&(i(0,"div",15),f(1,xt,23,6,"div",16),o()),n&2){let t=d();s(),c("ngForOf",t.tableData.students)}}var fe=(()=>{class n{constructor(){this.studentService=N(tt),this.breadcrumbs=[{label:"Students",route:"/students"},{label:"All Student"}],this.viewMode=y("list"),this.currentPage=y(1),this.pageSize=y(10),this.searchQuery=y("")}get tableData(){let t=this.studentService.getStudentsPaginated(this.currentPage(),this.pageSize());if(this.searchQuery()){let a=this.studentService.searchStudents(this.searchQuery()),e=(this.currentPage()-1)*this.pageSize(),l=e+this.pageSize();return{students:a.slice(e,l),totalCount:a.length,currentPage:this.currentPage(),pageSize:this.pageSize()}}return t}onViewChange(t){this.viewMode.set(t)}onPageChange(t){this.currentPage.set(t)}onPageSizeChange(t){this.pageSize.set(t),this.currentPage.set(1)}onSearch(t){this.searchQuery.set(t),this.currentPage.set(1)}onEditStudent(t){console.log("Edit student:",t)}onDeleteStudent(t){confirm(`Are you sure you want to delete ${t.name}?`)&&this.studentService.deleteStudent(t.id)}onAddNew(){console.log("Add new student")}static{this.\u0275fac=function(a){return new(a||n)}}static{this.\u0275cmp=C({type:n,selectors:[["app-all-students"]],standalone:!0,features:[h],decls:17,vars:4,consts:[[1,"all-students"],[1,"all-students__header"],[1,"all-students__title"],[3,"items"],[1,"all-students__toolbar"],[3,"viewChange","activeView"],[1,"all-students__content"],[1,"all-students__card"],[1,"all-students__card-header"],[1,"all-students__card-title"],["variant","primary","icon","add",3,"click"],[1,"all-students__card-body"],[3,"students","totalItems","currentPage","pageSize","edit","delete","pageChange","pageSizeChange","search",4,"ngIf"],["class","all-students__grid",4,"ngIf"],[3,"edit","delete","pageChange","pageSizeChange","search","students","totalItems","currentPage","pageSize"],[1,"all-students__grid"],["class","all-students__grid-item",4,"ngFor","ngForOf"],[1,"all-students__grid-item"],[1,"student-card"],[1,"student-card__avatar"],[3,"src","alt"],[1,"student-card__name"],[1,"student-card__education"],[1,"student-card__info"],[1,"material-icons"],[1,"student-card__actions"],[1,"student-card__btn","student-card__btn--edit",3,"click"],[1,"student-card__btn","student-card__btn--delete",3,"click"]],template:function(a,e){a&1&&(i(0,"div",0)(1,"div",1)(2,"h1",2),r(3,"All Student"),o(),E(4,"app-breadcrumb",3),o(),i(5,"div",4)(6,"app-view-toggle",5),p("viewChange",function(u){return e.onViewChange(u)}),o()(),i(7,"div",6)(8,"div",7)(9,"div",8)(10,"h2",9),r(11,"All Students List"),o(),i(12,"app-button",10),p("click",function(){return e.onAddNew()}),r(13," Add new "),o()(),i(14,"div",11),f(15,ht,1,4,"app-students-table",12)(16,Mt,2,1,"div",13),o()()()()),a&2&&(s(4),c("items",e.breadcrumbs),s(2),c("activeView",e.viewMode()),s(9),c("ngIf",e.viewMode()==="list"),s(),c("ngIf",e.viewMode()==="grid"))},dependencies:[x,w,S,et,nt,it,rt],styles:[`

.all-students__header[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
}
.all-students__title[_ngcontent-%COMP%] {
  font-size: 24px;
  font-weight: 600;
  color: var(--primary-color, #5b5fc7);
  margin: 0;
}
.all-students__toolbar[_ngcontent-%COMP%] {
  margin-bottom: 24px;
}
.all-students__content[_ngcontent-%COMP%] {
  position: relative;
}
.all-students__card[_ngcontent-%COMP%] {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  overflow: hidden;
}
.all-students__card-header[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  border-bottom: 1px solid #f1f5f9;
  flex-wrap: wrap;
  gap: 16px;
}
.all-students__card-title[_ngcontent-%COMP%] {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}
.all-students__card-body[_ngcontent-%COMP%] {
  padding: 24px;
}
.all-students__grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}
.all-students__grid-item[_ngcontent-%COMP%] {
  display: block;
}
.student-card[_ngcontent-%COMP%] {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  padding: 24px;
  text-align: center;
  transition: all 0.3s ease;
}
.student-card[_ngcontent-%COMP%]:hover {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}
.student-card__avatar[_ngcontent-%COMP%] {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 16px;
  border: 3px solid #7c7fe6;
}
.student-card__avatar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.student-card__name[_ngcontent-%COMP%] {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 4px;
}
.student-card__education[_ngcontent-%COMP%] {
  font-size: 12px;
  color: var(--primary-color, #5b5fc7);
  margin: 0 0 16px;
}
.student-card__info[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 12px;
  color: #6c757d;
  margin: 0 0 4px;
}
.student-card__info[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {
  font-size: 16px;
  color: #94a3b8;
}
.student-card__actions[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f1f5f9;
}
.student-card__btn[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.student-card__btn[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {
  font-size: 18px;
}
.student-card__btn--edit[_ngcontent-%COMP%] {
  background-color: rgba(var(--primary-rgb, 91, 95, 199), 0.1);
  color: var(--primary-color, #5b5fc7);
}
.student-card__btn--edit[_ngcontent-%COMP%]:hover {
  background-color: var(--primary-color, #5b5fc7);
  color: #ffffff;
}
.student-card__btn--delete[_ngcontent-%COMP%] {
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}
.student-card__btn--delete[_ngcontent-%COMP%]:hover {
  background-color: #ef4444;
  color: #ffffff;
}`]})}}return n})();export{fe as AllStudentsComponent};
