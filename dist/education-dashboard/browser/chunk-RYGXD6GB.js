import{a as J}from"./chunk-VMT66XCF.js";import{a as F,b as A,e as N,h as $,i as Q,j as V,n as W}from"./chunk-K2MEFKBR.js";import{d as B}from"./chunk-BJ2JVOKX.js";import{j as T}from"./chunk-YWRECBJH.js";import{$ as z,Cb as r,Db as l,Eb as g,Fb as D,Mb as I,Na as o,Nb as M,Ob as m,Pb as p,W as E,Xa as b,bb as P,db as d,eb as h,fb as C,gb as O,ib as y,jb as w,kb as f,lb as x,mb as t,nb as n,nc as L,ob as S,pc as j,sb as _,tb as k}from"./chunk-IXPTXOMZ.js";var Y=(i,s)=>s.name,G=(i,s)=>s.id,U=i=>["/courses",i],R=i=>["/courses/edit",i];function q(i,s){if(i&1&&(t(0,"div",22)(1,"div",23)(2,"span",7),r(3),n()(),t(4,"div",24)(5,"span",25),r(6),n(),t(7,"span",26),r(8),n()()()),i&2){let e=s.$implicit;h("--cat-color",e.color),o(3),l(e.icon),o(3),l(e.count),o(2),l(e.name)}}function X(i,s){if(i&1&&(t(0,"option",16),r(1),n()),i&2){let e=s.$implicit;d("value",e),o(),l(e)}}function H(i,s){if(i&1&&(t(0,"option",16),r(1),m(2,"titlecase"),n()),i&2){let e=s.$implicit;d("value",e),o(),l(p(2,2,e))}}function K(i,s){if(i&1&&(t(0,"div",36)(1,"span",7),r(2,"star"),n(),t(3,"span"),r(4),n()()),i&2){let e=k().$implicit;o(4),l(e.rating)}}function Z(i,s){if(i&1&&(t(0,"div",27)(1,"div",28),S(2,"div",29),t(3,"div",30)(4,"span",7),r(5,"menu_book"),n()(),t(6,"span",31),r(7),n(),t(8,"span",32),r(9),n()(),t(10,"div",33)(11,"div",34)(12,"span",35),r(13),m(14,"titlecase"),n(),P(15,K,5,1,"div",36),n(),t(16,"h3",37),r(17),n(),t(18,"p",38)(19,"span",7),r(20,"apartment"),n(),r(21),n(),t(22,"div",39)(23,"div",40)(24,"span",7),r(25,"play_circle"),n(),t(26,"span"),r(27),n()(),t(28,"div",40)(29,"span",7),r(30,"schedule"),n(),t(31,"span"),r(32),n()()(),t(33,"div",41)(34,"div",42),S(35,"div",43),n(),t(36,"div",44)(37,"span",7),r(38,"people"),n(),t(39,"span"),r(40),n()()(),t(41,"div",45)(42,"div",46)(43,"span",7),r(44,"person"),n()(),t(45,"span",47),r(46),n()()(),t(47,"div",48)(48,"div",49)(49,"span",7),r(50,"school"),n(),r(51),n(),t(52,"div",50)(53,"button",51)(54,"span",7),r(55,"visibility"),n()(),t(56,"button",52)(57,"span",7),r(58,"edit"),n()(),t(59,"button",53)(60,"span",7),r(61,"delete"),n()()()()()),i&2){let e=s.$implicit,c=k();h("--course-color",e.color),C("course-card--list",c.viewMode()==="list"),o(7),l(e.code),o(),O(c.getStatusClass(e.status)),o(),g(" ",e.status==="active"?"Active":e.status==="upcoming"?"Coming Soon":"Inactive"," "),o(3),O(c.getLevelBadgeClass(e.level)),o(),g(" ",p(14,25,e.level)," "),o(2),y(15,e.rating>0?15:-1),o(),d("routerLink",M(27,U,e.id)),o(),g(" ",e.name," "),o(4),g(" ",e.department," "),o(6),g("",e.lessons," Lessons"),o(5),l(e.duration),o(3),h("width",c.getEnrollmentPercentage(e),"%"),o(5),D("",e.students,"/",e.maxStudents," enrolled"),o(6),l(e.professor),o(5),g(" ",e.credits," Credits "),o(2),d("routerLink",M(29,U,e.id)),o(3),d("routerLink",M(31,R,e.id))}}function ee(i,s){i&1&&(t(0,"div",21)(1,"span",7),r(2,"search_off"),n(),t(3,"h3"),r(4,"No courses found"),n(),t(5,"p"),r(6,"Try adjusting your filters or search query"),n()())}var ge=(()=>{class i{constructor(){this.languageService=E(J),this.viewMode=b("grid"),this.searchQuery=b(""),this.selectedDepartment=b(""),this.selectedLevel=b(""),this.categoryStats=[{name:"Technology",count:128,icon:"computer",color:"#6366f1"},{name:"Science",count:86,icon:"science",color:"#10b981"},{name:"Business",count:72,icon:"business",color:"#f59e0b"},{name:"Arts",count:45,icon:"palette",color:"#ec4899"}],this.courses=[{id:1,name:"Advanced Web Development",code:"CS301",department:"Computer Science",credits:4,professor:"Dr. John Smith",students:245,maxStudents:300,status:"active",level:"advanced",rating:4.9,lessons:48,duration:"16 weeks",image:"assets/images/courses/web-dev.jpg",color:"#6366f1",progress:75},{id:2,name:"Machine Learning Fundamentals",code:"CS401",department:"Computer Science",credits:4,professor:"Dr. Sarah Johnson",students:180,maxStudents:200,status:"active",level:"intermediate",rating:4.8,lessons:36,duration:"12 weeks",image:"assets/images/courses/ml.jpg",color:"#10b981",progress:60},{id:3,name:"Data Science with Python",code:"CS302",department:"Computer Science",credits:3,professor:"Dr. Michael Brown",students:156,maxStudents:180,status:"active",level:"intermediate",rating:4.7,lessons:32,duration:"10 weeks",image:"assets/images/courses/python.jpg",color:"#f59e0b",progress:45},{id:4,name:"Digital Marketing Mastery",code:"BUS201",department:"Business",credits:3,professor:"Dr. Emily Davis",students:198,maxStudents:250,status:"active",level:"beginner",rating:4.6,lessons:28,duration:"8 weeks",image:"assets/images/courses/marketing.jpg",color:"#ec4899",progress:80},{id:5,name:"UI/UX Design Principles",code:"DES101",department:"Design",credits:3,professor:"Dr. Robert Wilson",students:142,maxStudents:150,status:"active",level:"beginner",rating:4.9,lessons:24,duration:"8 weeks",image:"assets/images/courses/uiux.jpg",color:"#8b5cf6",progress:92},{id:6,name:"Blockchain Development",code:"CS501",department:"Computer Science",credits:4,professor:"Dr. Lisa Anderson",students:98,maxStudents:120,status:"upcoming",level:"advanced",rating:0,lessons:40,duration:"14 weeks",image:"assets/images/courses/blockchain.jpg",color:"#14b8a6"},{id:7,name:"Financial Analysis",code:"FIN301",department:"Business",credits:3,professor:"Dr. James Taylor",students:165,maxStudents:200,status:"active",level:"intermediate",rating:4.5,lessons:30,duration:"10 weeks",image:"assets/images/courses/finance.jpg",color:"#22c55e",progress:55},{id:8,name:"Creative Writing Workshop",code:"ENG201",department:"Arts",credits:2,professor:"Dr. Maria Garcia",students:78,maxStudents:100,status:"active",level:"beginner",rating:4.7,lessons:20,duration:"6 weeks",image:"assets/images/courses/writing.jpg",color:"#ef4444",progress:88}],this.departments=["Computer Science","Business","Design","Arts","Science"],this.levels=["beginner","intermediate","advanced"]}setViewMode(e){this.viewMode.set(e)}get filteredCourses(){return this.courses.filter(e=>{let c=!this.searchQuery()||e.name.toLowerCase().includes(this.searchQuery().toLowerCase())||e.code.toLowerCase().includes(this.searchQuery().toLowerCase()),a=!this.selectedDepartment()||e.department===this.selectedDepartment(),u=!this.selectedLevel()||e.level===this.selectedLevel();return c&&a&&u})}getEnrollmentPercentage(e){return Math.round(e.students/e.maxStudents*100)}getLevelBadgeClass(e){return{beginner:"level-badge--beginner",intermediate:"level-badge--intermediate",advanced:"level-badge--advanced"}[e]||""}getStatusClass(e){return{active:"status-badge--active",inactive:"status-badge--inactive",upcoming:"status-badge--upcoming"}[e]||""}static{this.\u0275fac=function(c){return new(c||i)}}static{this.\u0275cmp=z({type:i,selectors:[["app-courses"]],standalone:!0,features:[I],decls:47,vars:25,consts:[[1,"courses"],[1,"courses__hero"],[1,"courses__hero-content"],[1,"courses__title"],[1,"courses__subtitle"],[1,"courses__hero-actions"],["routerLink","/courses/add",1,"btn","btn--primary","btn--glow"],[1,"material-icons"],[1,"courses__categories"],[1,"category-card",3,"--cat-color"],[1,"courses__filter-bar"],[1,"courses__search"],["type","text",3,"ngModelChange","placeholder","ngModel"],[1,"courses__filters"],[1,"filter-select",3,"ngModelChange","ngModel"],["value",""],[3,"value"],[1,"courses__view-toggle"],[1,"view-btn",3,"click"],[1,"courses__content"],[1,"course-card",3,"course-card--list","--course-color"],[1,"courses__empty"],[1,"category-card"],[1,"category-card__icon"],[1,"category-card__info"],[1,"category-card__count"],[1,"category-card__name"],[1,"course-card"],[1,"course-card__visual"],[1,"course-card__gradient"],[1,"course-card__icon"],[1,"course-card__code"],[1,"status-badge"],[1,"course-card__body"],[1,"course-card__header"],[1,"level-badge"],[1,"course-card__rating"],[1,"course-card__title",3,"routerLink"],[1,"course-card__department"],[1,"course-card__meta"],[1,"meta-item"],[1,"course-card__enrollment"],[1,"enrollment-bar"],[1,"enrollment-bar__fill"],[1,"enrollment-info"],[1,"course-card__instructor"],[1,"instructor-avatar"],[1,"instructor-name"],[1,"course-card__footer"],[1,"course-card__credits"],[1,"course-card__actions"],["title","View Details",1,"action-btn","action-btn--view",3,"routerLink"],["title","Edit Course",1,"action-btn","action-btn--edit",3,"routerLink"],["title","Delete Course",1,"action-btn","action-btn--delete"]],template:function(c,a){c&1&&(t(0,"div",0)(1,"div",1)(2,"div",2)(3,"h1",3),r(4),m(5,"translate"),n(),t(6,"p",4),r(7),m(8,"translate"),n()(),t(9,"div",5)(10,"button",6)(11,"span",7),r(12,"add"),n(),r(13),m(14,"translate"),n()()(),t(15,"div",8),f(16,q,9,5,"div",9,Y),n(),t(18,"div",10)(19,"div",11)(20,"span",7),r(21,"search"),n(),t(22,"input",12),m(23,"translate"),_("ngModelChange",function(v){return a.searchQuery.set(v)}),n()(),t(24,"div",13)(25,"select",14),_("ngModelChange",function(v){return a.selectedDepartment.set(v)}),t(26,"option",15),r(27),m(28,"translate"),n(),f(29,X,2,2,"option",16,w),n(),t(31,"select",14),_("ngModelChange",function(v){return a.selectedLevel.set(v)}),t(32,"option",15),r(33,"All Levels"),n(),f(34,H,3,4,"option",16,w),n()(),t(36,"div",17)(37,"button",18),_("click",function(){return a.setViewMode("grid")}),t(38,"span",7),r(39,"grid_view"),n()(),t(40,"button",18),_("click",function(){return a.setViewMode("list")}),t(41,"span",7),r(42,"view_list"),n()()()(),t(43,"div",19),f(44,Z,62,33,"div",20,G),n(),P(46,ee,7,0,"div",21),n()),c&2&&(o(4),l(p(5,15,"courses.title")),o(3),l(p(8,17,"courses.subtitle")),o(6),g(" ",p(14,19,"courses.addNew")," "),o(3),x(a.categoryStats),o(6),d("placeholder",p(23,21,"common.search"))("ngModel",a.searchQuery()),o(3),d("ngModel",a.selectedDepartment()),o(2),l(p(28,23,"courses.allDepartments")),o(2),x(a.departments),o(2),d("ngModel",a.selectedLevel()),o(3),x(a.levels),o(3),C("view-btn--active",a.viewMode()==="grid"),o(3),C("view-btn--active",a.viewMode()==="list"),o(3),C("courses__content--list",a.viewMode()==="list"),o(),x(a.filteredCourses),o(2),y(46,a.filteredCourses.length===0?46:-1))},dependencies:[j,L,T,W,Q,V,F,$,A,N,B],styles:[`

.courses[_ngcontent-%COMP%] {
  padding: 1.5rem;
  min-height: 100vh;
  background: var(--bg-primary);
}
.courses__hero[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2.5rem;
  background:
    linear-gradient(
      135deg,
      var(--primary-color) 0%,
      #8b5cf6 100%);
  border-radius: 20px;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
}
.courses__hero[_ngcontent-%COMP%]::before {
  content: "";
  position: absolute;
  top: -50%;
  right: -10%;
  width: 300px;
  height: 300px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
}
.courses__hero[_ngcontent-%COMP%]::after {
  content: "";
  position: absolute;
  bottom: -30%;
  left: 10%;
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
}
.courses__hero-content[_ngcontent-%COMP%] {
  position: relative;
  z-index: 1;
}
.courses__title[_ngcontent-%COMP%] {
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin: 0 0 0.5rem 0;
}
.courses__subtitle[_ngcontent-%COMP%] {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
}
.courses__hero-actions[_ngcontent-%COMP%] {
  position: relative;
  z-index: 1;
}
.courses__categories[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  margin-bottom: 2rem;
}
@media (max-width: 1200px) {
  .courses__categories[_ngcontent-%COMP%] {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 576px) {
  .courses__categories[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
}
.courses__filter-bar[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: var(--card-bg);
  border-radius: 14px;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-sm);
  flex-wrap: wrap;
}
.courses__search[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  min-width: 250px;
  padding: 0.75rem 1rem;
  background: var(--bg-secondary);
  border-radius: 10px;
}
.courses__search[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {
  color: var(--text-muted);
  font-size: 1.25rem;
}
.courses__search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 0.9375rem;
  color: var(--text-primary);
}
.courses__search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder {
  color: var(--text-muted);
}
.courses__search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {
  outline: none;
}
.courses__filters[_ngcontent-%COMP%] {
  display: flex;
  gap: 0.75rem;
}
.courses__view-toggle[_ngcontent-%COMP%] {
  display: flex;
  background: var(--bg-secondary);
  border-radius: 8px;
  padding: 0.25rem;
}
.courses__content[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.5rem;
}
.courses__content--list[_ngcontent-%COMP%] {
  grid-template-columns: 1fr;
}
.courses__empty[_ngcontent-%COMP%] {
  grid-column: 1/-1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}
.courses__empty[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {
  font-size: 4rem;
  color: var(--text-muted);
  margin-bottom: 1rem;
}
.courses__empty[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  font-size: 1.25rem;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
}
.courses__empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: var(--text-muted);
  margin: 0;
}
.category-card[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: var(--card-bg);
  border-radius: 14px;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.category-card[_ngcontent-%COMP%]::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--cat-color);
}
.category-card[_ngcontent-%COMP%]:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}
.category-card__icon[_ngcontent-%COMP%] {
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background:
    linear-gradient(
      135deg,
      var(--cat-color),
      var(--cat-color));
  opacity: 0.15;
  position: relative;
}
.category-card__icon[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {
  font-size: 1.5rem;
  color: var(--cat-color);
  position: absolute;
  opacity: 1;
}
.category-card__info[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
}
.category-card__count[_ngcontent-%COMP%] {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
}
.category-card__name[_ngcontent-%COMP%] {
  font-size: 0.875rem;
  color: var(--text-secondary);
}
.filter-select[_ngcontent-%COMP%] {
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  font-size: 0.875rem;
  color: var(--text-primary);
  background: var(--card-bg);
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
  transition: all 0.2s ease;
}
.filter-select[_ngcontent-%COMP%]:hover, .filter-select[_ngcontent-%COMP%]:focus {
  border-color: var(--primary-color);
  outline: none;
}
.view-btn[_ngcontent-%COMP%] {
  padding: 0.5rem;
  border: none;
  background: transparent;
  border-radius: 6px;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
}
.view-btn[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {
  font-size: 1.25rem;
}
.view-btn[_ngcontent-%COMP%]:hover {
  color: var(--text-primary);
}
.view-btn--active[_ngcontent-%COMP%] {
  background: var(--primary-color);
  color: white;
}
.btn[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 10px;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}
.btn[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {
  font-size: 1.25rem;
}
.btn--primary[_ngcontent-%COMP%] {
  background: white;
  color: var(--primary-color);
}
.btn--primary[_ngcontent-%COMP%]:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}
.btn--glow[_ngcontent-%COMP%] {
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3);
}
.course-card[_ngcontent-%COMP%] {
  background: var(--card-bg);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}
.course-card[_ngcontent-%COMP%]:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
}
.course-card[_ngcontent-%COMP%]:hover   .course-card__visual[_ngcontent-%COMP%]   .course-card__icon[_ngcontent-%COMP%] {
  transform: scale(1.1);
}
.course-card--list[_ngcontent-%COMP%] {
  flex-direction: row;
}
.course-card--list[_ngcontent-%COMP%]   .course-card__visual[_ngcontent-%COMP%] {
  width: 200px;
  min-height: 160px;
}
.course-card--list[_ngcontent-%COMP%]   .course-card__body[_ngcontent-%COMP%] {
  flex: 1;
  padding: 1.25rem;
}
.course-card--list[_ngcontent-%COMP%]   .course-card__footer[_ngcontent-%COMP%] {
  width: 180px;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  border-top: none;
  border-left: 1px solid var(--border-color);
}
.course-card__visual[_ngcontent-%COMP%] {
  position: relative;
  height: 140px;
  background:
    linear-gradient(
      135deg,
      var(--course-color),
      color-mix(in srgb, var(--course-color) 70%, #8b5cf6));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.course-card__gradient[_ngcontent-%COMP%] {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      180deg,
      transparent 0%,
      rgba(0, 0, 0, 0.3) 100%);
}
.course-card__icon[_ngcontent-%COMP%] {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  transition: transform 0.3s ease;
}
.course-card__icon[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {
  font-size: 2rem;
  color: white;
}
.course-card__code[_ngcontent-%COMP%] {
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.375rem 0.75rem;
  background: rgba(255, 255, 255, 0.2);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  letter-spacing: 0.5px;
}
.course-card__body[_ngcontent-%COMP%] {
  padding: 1.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.course-card__header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}
.course-card__rating[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #f59e0b;
}
.course-card__rating[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {
  font-size: 1rem;
}
.course-card__title[_ngcontent-%COMP%] {
  font-size: 1.0625rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
  cursor: pointer;
  transition: color 0.2s ease;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.course-card__title[_ngcontent-%COMP%]:hover {
  color: var(--primary-color);
}
.course-card__department[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  color: var(--text-secondary);
  margin: 0 0 1rem 0;
}
.course-card__department[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {
  font-size: 1rem;
  color: var(--text-muted);
}
.course-card__meta[_ngcontent-%COMP%] {
  display: flex;
  gap: 1.25rem;
  margin-bottom: 1rem;
}
.course-card__enrollment[_ngcontent-%COMP%] {
  margin-bottom: 1rem;
}
.course-card__instructor[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: auto;
}
.course-card__credits[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-secondary);
}
.course-card__credits[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {
  font-size: 1rem;
  color: var(--primary-color);
}
.course-card__footer[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  border-top: 1px solid var(--border-color);
  background: var(--bg-secondary);
}
.course-card__actions[_ngcontent-%COMP%] {
  display: flex;
  gap: 0.5rem;
}
.meta-item[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.8125rem;
  color: var(--text-muted);
}
.meta-item[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {
  font-size: 1rem;
}
.level-badge[_ngcontent-%COMP%] {
  padding: 0.25rem 0.625rem;
  border-radius: 6px;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.level-badge--beginner[_ngcontent-%COMP%] {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
}
.level-badge--intermediate[_ngcontent-%COMP%] {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}
.level-badge--advanced[_ngcontent-%COMP%] {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}
.status-badge[_ngcontent-%COMP%] {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.375rem 0.75rem;
  border-radius: 6px;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.status-badge--active[_ngcontent-%COMP%] {
  background: rgba(16, 185, 129, 0.9);
  color: white;
}
.status-badge--inactive[_ngcontent-%COMP%] {
  background: rgba(107, 114, 128, 0.9);
  color: white;
}
.status-badge--upcoming[_ngcontent-%COMP%] {
  background: rgba(99, 102, 241, 0.9);
  color: white;
}
.enrollment-bar[_ngcontent-%COMP%] {
  height: 6px;
  background: var(--bg-secondary);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}
.enrollment-bar__fill[_ngcontent-%COMP%] {
  height: 100%;
  background:
    linear-gradient(
      90deg,
      var(--primary-color),
      #8b5cf6);
  border-radius: 3px;
  transition: width 0.5s ease;
}
.enrollment-info[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.75rem;
  color: var(--text-muted);
}
.enrollment-info[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {
  font-size: 0.875rem;
}
.instructor-avatar[_ngcontent-%COMP%] {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-secondary);
  border-radius: 50%;
  color: var(--text-muted);
}
.instructor-avatar[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {
  font-size: 1.125rem;
}
.instructor-name[_ngcontent-%COMP%] {
  font-size: 0.8125rem;
  color: var(--text-secondary);
}
.action-btn[_ngcontent-%COMP%] {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  background: var(--card-bg);
  cursor: pointer;
  transition: all 0.2s ease;
}
.action-btn[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {
  font-size: 1.125rem;
}
.action-btn--view[_ngcontent-%COMP%] {
  color: var(--primary-color);
}
.action-btn--view[_ngcontent-%COMP%]:hover {
  background: rgba(var(--primary-rgb), 0.1);
}
.action-btn--edit[_ngcontent-%COMP%] {
  color: #f59e0b;
}
.action-btn--edit[_ngcontent-%COMP%]:hover {
  background: rgba(245, 158, 11, 0.1);
}
.action-btn--delete[_ngcontent-%COMP%] {
  color: #ef4444;
}
.action-btn--delete[_ngcontent-%COMP%]:hover {
  background: rgba(239, 68, 68, 0.1);
}
[dir=rtl][_nghost-%COMP%]   .courses__filter-bar[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .courses__filter-bar[_ngcontent-%COMP%] {
  direction: rtl;
}
[dir=rtl][_nghost-%COMP%]   .course-card--list[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .course-card--list[_ngcontent-%COMP%] {
  flex-direction: row-reverse;
}
[dir=rtl][_nghost-%COMP%]   .course-card--list[_ngcontent-%COMP%]   .course-card__footer[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .course-card--list[_ngcontent-%COMP%]   .course-card__footer[_ngcontent-%COMP%] {
  border-left: none;
  border-right: 1px solid var(--border-color);
  align-items: flex-start;
}
[dir=rtl][_nghost-%COMP%]   .course-card__code[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .course-card__code[_ngcontent-%COMP%] {
  left: auto;
  right: 1rem;
}
[dir=rtl][_nghost-%COMP%]   .status-badge[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .status-badge[_ngcontent-%COMP%] {
  right: auto;
  left: 1rem;
}
[dir=rtl][_nghost-%COMP%]   .category-card[_ngcontent-%COMP%]::before, [dir=rtl]   [_nghost-%COMP%]   .category-card[_ngcontent-%COMP%]::before {
  left: auto;
  right: 0;
}
[dir=rtl][_nghost-%COMP%]   .filter-select[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .filter-select[_ngcontent-%COMP%] {
  background-position: left 0.75rem center;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
}`]})}}return i})();export{ge as CoursesComponent};
