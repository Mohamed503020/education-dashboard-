import{a as N,b as B,c as R,d as j,e as q,f as U,g as Y,l as G,m as H,n as J}from"./chunk-K2MEFKBR.js";import{g as D,i as I,j as z}from"./chunk-YWRECBJH.js";import{$ as V,Bb as k,Cb as o,Db as A,Eb as y,Ib as u,Jb as g,Kb as f,Mb as T,Na as l,Nb as F,W as w,Xa as L,a as O,b as E,bb as h,db as C,fb as M,ib as b,ja as s,ka as c,kb as S,lb as P,mb as i,nb as n,pc as W,rb as x,sb as p,tb as m}from"./chunk-IXPTXOMZ.js";var K=(a,_)=>_.id,Q=a=>["/courses",a];function X(a,_){if(a&1){let t=x();i(0,"div",14)(1,"h3",18)(2,"span",12),o(3,"edit_note"),n(),o(4," Lesson Information "),n(),i(5,"div",19)(6,"div",20)(7,"label",21),o(8,"Lesson Title *"),n(),i(9,"input",22),f("ngModelChange",function(e){s(t);let r=m();return g(r.lesson.title,e)||(r.lesson.title=e),c(e)}),n()(),i(10,"div",23)(11,"label",24),o(12,"Lesson Order *"),n(),i(13,"input",25),f("ngModelChange",function(e){s(t);let r=m();return g(r.lesson.order,e)||(r.lesson.order=e),c(e)}),n()(),i(14,"div",23)(15,"label",26),o(16,"Duration"),n(),i(17,"input",27),f("ngModelChange",function(e){s(t);let r=m();return g(r.lesson.duration,e)||(r.lesson.duration=e),c(e)}),n()(),i(18,"div",20)(19,"label",28),o(20,"Short Description *"),n(),i(21,"textarea",29),f("ngModelChange",function(e){s(t);let r=m();return g(r.lesson.description,e)||(r.lesson.description=e),c(e)}),n()(),i(22,"div",20)(23,"label",30),o(24,"Lesson Content"),n(),i(25,"textarea",31),f("ngModelChange",function(e){s(t);let r=m();return g(r.lesson.content,e)||(r.lesson.content=e),c(e)}),n()()()()}if(a&2){let t=m();l(9),u("ngModel",t.lesson.title),l(4),u("ngModel",t.lesson.order),l(4),u("ngModel",t.lesson.duration),l(4),u("ngModel",t.lesson.description),l(4),u("ngModel",t.lesson.content)}}function Z(a,_){if(a&1){let t=x();i(0,"div",34)(1,"span",12),o(2,"video_library"),n(),i(3,"p"),o(4,"No videos added yet"),n(),i(5,"button",16),p("click",function(){s(t);let e=m(2);return c(e.addVideo())}),o(6," Add Your First Video "),n()()}}function $(a,_){if(a&1){let t=x();i(0,"div",36)(1,"div",37)(2,"span",38)(3,"span",12),o(4,"play_circle"),n()(),i(5,"span",39),o(6),n(),i(7,"button",40),p("click",function(){let e=s(t).$implicit,r=m(3);return c(r.removeVideo(e.id))}),i(8,"span",12),o(9,"close"),n()()(),i(10,"div",41)(11,"div",23)(12,"label",42),o(13,"Video Title *"),n(),i(14,"input",43),f("ngModelChange",function(e){let r=s(t).$implicit;return g(r.title,e)||(r.title=e),c(e)}),n()(),i(15,"div",23)(16,"label",42),o(17,"Video URL *"),n(),i(18,"input",44),f("ngModelChange",function(e){let r=s(t).$implicit;return g(r.url,e)||(r.url=e),c(e)}),n()(),i(19,"div",23)(20,"label",42),o(21,"Duration"),n(),i(22,"input",45),f("ngModelChange",function(e){let r=s(t).$implicit;return g(r.duration,e)||(r.duration=e),c(e)}),n()()()()}if(a&2){let t=_.$implicit;l(6),y("Video ",t.id,""),l(8),u("ngModel",t.title),C("name","videoTitle"+t.id),l(4),u("ngModel",t.url),C("name","videoUrl"+t.id),l(4),u("ngModel",t.duration),C("name","videoDuration"+t.id)}}function ee(a,_){if(a&1&&(i(0,"div",35),S(1,$,23,7,"div",36,K),n()),a&2){let t=m(2);l(),P(t.videos)}}function ne(a,_){if(a&1){let t=x();i(0,"div",14)(1,"div",32)(2,"h3",18)(3,"span",12),o(4,"videocam"),n(),o(5," Lesson Videos "),n(),i(6,"button",33),p("click",function(){s(t);let e=m();return c(e.addVideo())}),i(7,"span",12),o(8,"add"),n(),o(9," Add Video "),n()(),h(10,Z,7,0,"div",34)(11,ee,3,0),n()}if(a&2){let t=m();l(10),b(10,t.videos.length===0?10:11)}}function te(a,_){if(a&1){let t=x();i(0,"div",34)(1,"span",12),o(2,"description"),n(),i(3,"p"),o(4,"No resources added yet"),n(),i(5,"button",16),p("click",function(){s(t);let e=m(2);return c(e.addPdf())}),o(6," Add Your First PDF "),n()()}}function ie(a,_){if(a&1&&(i(0,"span"),o(1),n()),a&2){let t=m().$implicit;l(),A(t.fileName)}}function oe(a,_){a&1&&(i(0,"span"),o(1,"Choose PDF file"),n())}function re(a,_){if(a&1){let t=x();i(0,"div",36)(1,"div",37)(2,"span",46)(3,"span",12),o(4,"picture_as_pdf"),n()(),i(5,"span",39),o(6),n(),i(7,"button",40),p("click",function(){let e=s(t).$implicit,r=m(3);return c(r.removePdf(e.id))}),i(8,"span",12),o(9,"close"),n()()(),i(10,"div",41)(11,"div",23)(12,"label",42),o(13,"Document Title *"),n(),i(14,"input",47),f("ngModelChange",function(e){let r=s(t).$implicit;return g(r.title,e)||(r.title=e),c(e)}),n()(),i(15,"div",23)(16,"label",42),o(17,"Upload PDF *"),n(),i(18,"div",48)(19,"input",49),p("change",function(e){let r=s(t).$implicit,v=m(3);return c(v.onFileSelect(e,r))}),n(),i(20,"label",50)(21,"span",12),o(22,"upload_file"),n(),h(23,ie,2,1,"span")(24,oe,2,0),n()()()()()}if(a&2){let t=_.$implicit;l(6),y("PDF ",t.id,""),l(8),u("ngModel",t.title),C("name","pdfTitle"+t.id),l(5),C("id","pdfFile"+t.id),l(),C("for","pdfFile"+t.id),l(3),b(23,t.fileName?23:24)}}function ae(a,_){if(a&1&&(i(0,"div",35),S(1,re,25,6,"div",36,K),n()),a&2){let t=m(2);l(),P(t.pdfs)}}function de(a,_){if(a&1){let t=x();i(0,"div",14)(1,"div",32)(2,"h3",18)(3,"span",12),o(4,"folder"),n(),o(5," Lesson Resources (PDFs) "),n(),i(6,"button",33),p("click",function(){s(t);let e=m();return c(e.addPdf())}),i(7,"span",12),o(8,"add"),n(),o(9," Add PDF "),n()(),h(10,te,7,0,"div",34)(11,ae,3,0),n()}if(a&2){let t=m();l(10),b(10,t.pdfs.length===0?10:11)}}var ge=(()=>{class a{constructor(){this.router=w(I),this.route=w(D),this.courseId="",this.activeSection=L("info"),this.lesson={title:"",description:"",duration:"",order:1,content:""},this.videos=[],this.pdfs=[],this.videoIdCounter=0,this.pdfIdCounter=0,this.courseId=this.route.snapshot.paramMap.get("courseId")||"1"}setActiveSection(t){this.activeSection.set(t)}addVideo(){this.videos.push({id:++this.videoIdCounter,title:"",url:"",duration:""})}removeVideo(t){this.videos=this.videos.filter(d=>d.id!==t)}addPdf(){this.pdfs.push({id:++this.pdfIdCounter,title:"",file:null,fileName:""})}removePdf(t){this.pdfs=this.pdfs.filter(d=>d.id!==t)}onFileSelect(t,d){let e=t.target;e.files&&e.files.length>0&&(d.file=e.files[0],d.fileName=e.files[0].name)}onSubmit(){let t=E(O({},this.lesson),{videos:this.videos.filter(d=>d.title&&d.url),pdfs:this.pdfs.filter(d=>d.title&&d.file)});console.log("Creating lesson:",t),this.router.navigate(["/courses",this.courseId])}onCancel(){this.router.navigate(["/courses",this.courseId])}static{this.\u0275fac=function(d){return new(d||a)}}static{this.\u0275cmp=V({type:a,selectors:[["app-add-lesson"]],standalone:!0,features:[T],decls:48,vars:15,consts:[["lessonForm","ngForm"],[1,"add-lesson"],[1,"add-lesson__header"],[1,"add-lesson__title-section"],[1,"add-lesson__title"],[1,"add-lesson__breadcrumb"],["routerLink","/dashboard"],["routerLink","/courses/all"],[3,"routerLink"],[1,"add-lesson__container"],[1,"section-tabs"],[1,"section-tabs__tab",3,"click"],[1,"material-icons"],[3,"ngSubmit"],[1,"form-section"],[1,"form-actions"],["type","button",1,"btn","btn--outline",3,"click"],["type","submit",1,"btn","btn--primary",3,"disabled"],[1,"form-section__title"],[1,"form-grid"],[1,"form-group","form-group--full"],["for","title",1,"form-label"],["type","text","id","title","name","title","required","","placeholder","Enter lesson title",1,"form-input",3,"ngModelChange","ngModel"],[1,"form-group"],["for","order",1,"form-label"],["type","number","id","order","name","order","required","","min","1",1,"form-input",3,"ngModelChange","ngModel"],["for","duration",1,"form-label"],["type","text","id","duration","name","duration","placeholder","e.g., 45 min",1,"form-input",3,"ngModelChange","ngModel"],["for","description",1,"form-label"],["id","description","name","description","required","","rows","3","placeholder","Brief description of what this lesson covers",1,"form-input","form-input--textarea",3,"ngModelChange","ngModel"],["for","content",1,"form-label"],["id","content","name","content","rows","10","placeholder","Full lesson content, notes, and instructions...",1,"form-input","form-input--textarea","form-input--large",3,"ngModelChange","ngModel"],[1,"form-section__header"],["type","button",1,"btn","btn--primary","btn--sm",3,"click"],[1,"empty-state"],[1,"items-list"],[1,"item-card"],[1,"item-card__header"],[1,"item-card__icon","item-card__icon--video"],[1,"item-card__label"],["type","button",1,"item-card__remove",3,"click"],[1,"item-card__body"],[1,"form-label"],["type","text","placeholder","Enter video title",1,"form-input",3,"ngModelChange","ngModel","name"],["type","url","placeholder","https://youtube.com/watch?v=...",1,"form-input",3,"ngModelChange","ngModel","name"],["type","text","placeholder","e.g., 12:34",1,"form-input",3,"ngModelChange","ngModel","name"],[1,"item-card__icon","item-card__icon--pdf"],["type","text","placeholder","Enter document title",1,"form-input",3,"ngModelChange","ngModel","name"],[1,"file-upload"],["type","file","accept",".pdf",1,"file-upload__input",3,"change","id"],[1,"file-upload__label",3,"for"]],template:function(d,e){if(d&1){let r=x();i(0,"div",1)(1,"div",2)(2,"div",3)(3,"h1",4),o(4,"Add New Lesson"),n(),i(5,"nav",5)(6,"a",6),o(7,"Dashboard"),n(),i(8,"span"),o(9,"/"),n(),i(10,"a",7),o(11,"Courses"),n(),i(12,"span"),o(13,"/"),n(),i(14,"a",8),o(15,"Course Details"),n(),i(16,"span"),o(17,"/"),n(),i(18,"span"),o(19,"Add Lesson"),n()()()(),i(20,"div",9)(21,"div",10)(22,"button",11),p("click",function(){return s(r),c(e.setActiveSection("info"))}),i(23,"span",12),o(24,"info"),n(),o(25," Lesson Info "),n(),i(26,"button",11),p("click",function(){return s(r),c(e.setActiveSection("videos"))}),i(27,"span",12),o(28,"videocam"),n(),o(29),n(),i(30,"button",11),p("click",function(){return s(r),c(e.setActiveSection("resources"))}),i(31,"span",12),o(32,"folder"),n(),o(33),n()(),i(34,"form",13,0),p("ngSubmit",function(){return s(r),c(e.onSubmit())}),h(36,X,26,5,"div",14)(37,ne,12,1,"div",14)(38,de,12,1,"div",14),i(39,"div",15)(40,"button",16),p("click",function(){return s(r),c(e.onCancel())}),i(41,"span",12),o(42,"close"),n(),o(43," Cancel "),n(),i(44,"button",17)(45,"span",12),o(46,"save"),n(),o(47," Save Lesson "),n()()()()()}if(d&2){let r=k(35);l(14),C("routerLink",F(13,Q,e.courseId)),l(8),M("section-tabs__tab--active",e.activeSection()==="info"),l(4),M("section-tabs__tab--active",e.activeSection()==="videos"),l(3),y(" Videos (",e.videos.length,") "),l(),M("section-tabs__tab--active",e.activeSection()==="resources"),l(3),y(" Resources (",e.pdfs.length,") "),l(3),b(36,e.activeSection()==="info"?36:-1),l(),b(37,e.activeSection()==="videos"?37:-1),l(),b(38,e.activeSection()==="resources"?38:-1),l(6),C("disabled",!r.valid)}},dependencies:[W,J,U,N,Y,B,R,H,G,q,j,z],styles:[`

.add-lesson[_ngcontent-%COMP%] {
  padding: 1.5rem;
}
.add-lesson__header[_ngcontent-%COMP%] {
  margin-bottom: 2rem;
}
.add-lesson__title[_ngcontent-%COMP%] {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.5rem;
}
.add-lesson__breadcrumb[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
}
.add-lesson__breadcrumb[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {
  color: var(--primary-color);
  text-decoration: none;
}
.add-lesson__breadcrumb[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {
  text-decoration: underline;
}
.add-lesson__container[_ngcontent-%COMP%] {
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}
.section-tabs[_ngcontent-%COMP%] {
  display: flex;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
}
.section-tabs__tab[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--text-secondary);
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
}
.section-tabs__tab[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {
  font-size: 1.25rem;
}
.section-tabs__tab[_ngcontent-%COMP%]:hover {
  color: var(--text-primary);
}
.section-tabs__tab--active[_ngcontent-%COMP%] {
  color: var(--primary-color);
  background: var(--card-bg);
}
.section-tabs__tab--active[_ngcontent-%COMP%]::after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--primary-color);
}
.form-section[_ngcontent-%COMP%] {
  padding: 2rem;
}
.form-section__header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}
.form-section__title[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}
.form-section__title[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {
  color: var(--primary-color);
}
.form-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}
@media (max-width: 768px) {
  .form-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
}
.form-group[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.form-group--full[_ngcontent-%COMP%] {
  grid-column: 1/-1;
}
.form-label[_ngcontent-%COMP%] {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
}
.form-input[_ngcontent-%COMP%] {
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 0.9375rem;
  color: var(--text-primary);
  background: var(--input-bg);
  transition: border-color 0.2s, box-shadow 0.2s;
}
.form-input[_ngcontent-%COMP%]::placeholder {
  color: var(--text-muted);
}
.form-input[_ngcontent-%COMP%]:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(var(--primary-rgb, 91, 95, 199), 0.1);
}
.form-input--textarea[_ngcontent-%COMP%] {
  resize: vertical;
  min-height: 80px;
  line-height: 1.6;
}
.form-input--large[_ngcontent-%COMP%] {
  min-height: 200px;
}
.btn[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}
.btn[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {
  font-size: 1.125rem;
}
.btn--primary[_ngcontent-%COMP%] {
  background: var(--primary-color);
  color: white;
}
.btn--primary[_ngcontent-%COMP%]:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
}
.btn--primary[_ngcontent-%COMP%]:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.btn--outline[_ngcontent-%COMP%] {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
}
.btn--outline[_ngcontent-%COMP%]:hover {
  background: var(--bg-secondary);
}
.btn--sm[_ngcontent-%COMP%] {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}
.empty-state[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  text-align: center;
  color: var(--text-muted);
}
.empty-state[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}
.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin-bottom: 1.5rem;
  font-size: 1rem;
}
.items-list[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.item-card[_ngcontent-%COMP%] {
  background: var(--bg-secondary);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--border-color);
}
.item-card__header[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  background: var(--card-bg);
  border-bottom: 1px solid var(--border-color);
}
.item-card__icon[_ngcontent-%COMP%] {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.item-card__icon--video[_ngcontent-%COMP%] {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}
.item-card__icon--pdf[_ngcontent-%COMP%] {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}
.item-card__icon[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {
  font-size: 1.25rem;
}
.item-card__label[_ngcontent-%COMP%] {
  flex: 1;
  font-weight: 600;
  color: var(--text-primary);
}
.item-card__remove[_ngcontent-%COMP%] {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}
.item-card__remove[_ngcontent-%COMP%]:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}
.item-card__body[_ngcontent-%COMP%] {
  padding: 1.25rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}
.file-upload[_ngcontent-%COMP%] {
  position: relative;
}
.file-upload__input[_ngcontent-%COMP%] {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
}
.file-upload__label[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: 2px dashed var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--text-secondary);
}
.file-upload__label[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {
  font-size: 1.5rem;
  color: var(--primary-color);
}
.file-upload__label[_ngcontent-%COMP%]:hover {
  border-color: var(--primary-color);
  background: rgba(var(--primary-rgb, 91, 95, 199), 0.05);
}
.form-actions[_ngcontent-%COMP%] {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem 2rem;
  border-top: 1px solid var(--border-color);
  background: var(--bg-secondary);
}
[dir=rtl][_nghost-%COMP%]   .add-lesson__breadcrumb[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .add-lesson__breadcrumb[_ngcontent-%COMP%] {
  direction: rtl;
}
[dir=rtl][_nghost-%COMP%]   .form-actions[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .form-actions[_ngcontent-%COMP%] {
  flex-direction: row-reverse;
}`]})}}return a})();export{ge as AddLessonComponent};
