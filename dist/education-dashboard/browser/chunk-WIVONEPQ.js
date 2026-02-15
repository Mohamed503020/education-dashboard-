import{a as k,b as T,c as L,d as j,e as q,f as D,g as I,h as z,i as F,j as R,k as Q,l as Y,m as G,n as J}from"./chunk-K2MEFKBR.js";import{d as N}from"./chunk-BJ2JVOKX.js";import{i as A,j as B}from"./chunk-YWRECBJH.js";import{$ as E,Bb as O,Cb as o,Db as u,Ib as m,Jb as p,Kb as g,Mb as W,Na as i,Ob as _,Pb as y,W as v,db as b,ja as s,jb as h,ka as l,kb as w,lb as P,mb as t,nb as n,pc as V,rb as x,sb as S}from"./chunk-IXPTXOMZ.js";function H(f,C){if(f&1&&(t(0,"option",26),o(1),n()),f&2){let c=C.$implicit;b("value",c),i(),u(c)}}function K(f,C){if(f&1&&(t(0,"option",26),o(1),n()),f&2){let c=C.$implicit;b("value",c),i(),u(c)}}var oe=(()=>{class f{constructor(){this.router=v(A),this.professor={firstName:"",lastName:"",email:"",phone:"",department:"",subject:"",qualification:"",experience:0,joinDate:"",salary:0,address:"",city:"",country:"",bio:"",status:"active"},this.departments=["Computer Science","Mathematics","Physics","Chemistry","Biology","Engineering","Business","Arts & Languages"],this.qualifications=["Ph.D.","M.Sc.","M.A.","M.B.A.","M.Tech.","B.Sc.","B.A."]}onSubmit(){console.log("Submitting professor:",this.professor),this.router.navigate(["/professors/all"])}onReset(){this.professor={firstName:"",lastName:"",email:"",phone:"",department:"",subject:"",qualification:"",experience:0,joinDate:"",salary:0,address:"",city:"",country:"",bio:"",status:"active"}}static{this.\u0275fac=function(M){return new(M||f)}}static{this.\u0275cmp=E({type:f,selectors:[["app-add-professor"]],standalone:!0,features:[W],decls:136,vars:28,consts:[["professorForm","ngForm"],[1,"add-professor"],[1,"add-professor__header"],[1,"add-professor__title-section"],[1,"add-professor__title"],[1,"add-professor__breadcrumb"],["routerLink","/dashboard"],["routerLink","/professors/all"],[1,"add-professor__form-container"],[3,"ngSubmit"],[1,"form-section"],[1,"form-section__title"],[1,"material-icons"],[1,"form-grid"],[1,"form-group"],["for","firstName",1,"form-label"],["type","text","id","firstName","name","firstName","required","","placeholder","Enter first name",1,"form-input",3,"ngModelChange","ngModel"],["for","lastName",1,"form-label"],["type","text","id","lastName","name","lastName","required","","placeholder","Enter last name",1,"form-input",3,"ngModelChange","ngModel"],["for","email",1,"form-label"],["type","email","id","email","name","email","required","","placeholder","professor@example.com",1,"form-input",3,"ngModelChange","ngModel"],["for","phone",1,"form-label"],["type","tel","id","phone","name","phone","required","","placeholder","+1 234 567 8900",1,"form-input",3,"ngModelChange","ngModel"],["for","department",1,"form-label"],["id","department","name","department","required","",1,"form-input",3,"ngModelChange","ngModel"],["value",""],[3,"value"],["for","subject",1,"form-label"],["type","text","id","subject","name","subject","required","","placeholder","e.g., Data Structures",1,"form-input",3,"ngModelChange","ngModel"],["for","qualification",1,"form-label"],["id","qualification","name","qualification","required","",1,"form-input",3,"ngModelChange","ngModel"],["for","experience",1,"form-label"],["type","number","id","experience","name","experience","min","0","max","50",1,"form-input",3,"ngModelChange","ngModel"],["for","joinDate",1,"form-label"],["type","date","id","joinDate","name","joinDate",1,"form-input",3,"ngModelChange","ngModel"],["for","salary",1,"form-label"],["type","number","id","salary","name","salary","min","0","placeholder","Annual salary",1,"form-input",3,"ngModelChange","ngModel"],["for","status",1,"form-label"],["id","status","name","status",1,"form-input",3,"ngModelChange","ngModel"],["value","active"],["value","inactive"],["value","on-leave"],[1,"form-group","form-group--wide"],["for","address",1,"form-label"],["type","text","id","address","name","address","placeholder","Street address",1,"form-input",3,"ngModelChange","ngModel"],["for","city",1,"form-label"],["type","text","id","city","name","city","placeholder","City",1,"form-input",3,"ngModelChange","ngModel"],["for","country",1,"form-label"],["type","text","id","country","name","country","placeholder","Country",1,"form-input",3,"ngModelChange","ngModel"],[1,"form-group","form-group--full"],["for","bio",1,"form-label"],["id","bio","name","bio","rows","4","placeholder","Brief biography of the professor",1,"form-input","form-input--textarea",3,"ngModelChange","ngModel"],[1,"form-actions"],["type","button",1,"btn","btn--outline",3,"click"],["type","submit",1,"btn","btn--primary",3,"disabled"]],template:function(M,r){if(M&1){let a=x();t(0,"div",1)(1,"div",2)(2,"div",3)(3,"h1",4),o(4),_(5,"translate"),n(),t(6,"nav",5)(7,"a",6),o(8),_(9,"translate"),n(),t(10,"span"),o(11,"/"),n(),t(12,"a",7),o(13),_(14,"translate"),n(),t(15,"span"),o(16,"/"),n(),t(17,"span"),o(18),_(19,"translate"),n()()()(),t(20,"div",8)(21,"form",9,0),S("ngSubmit",function(){return s(a),l(r.onSubmit())}),t(23,"div",10)(24,"h3",11)(25,"span",12),o(26,"person"),n(),o(27," Personal Information "),n(),t(28,"div",13)(29,"div",14)(30,"label",15),o(31,"First Name *"),n(),t(32,"input",16),g("ngModelChange",function(e){return s(a),p(r.professor.firstName,e)||(r.professor.firstName=e),l(e)}),n()(),t(33,"div",14)(34,"label",17),o(35,"Last Name *"),n(),t(36,"input",18),g("ngModelChange",function(e){return s(a),p(r.professor.lastName,e)||(r.professor.lastName=e),l(e)}),n()(),t(37,"div",14)(38,"label",19),o(39,"Email *"),n(),t(40,"input",20),g("ngModelChange",function(e){return s(a),p(r.professor.email,e)||(r.professor.email=e),l(e)}),n()(),t(41,"div",14)(42,"label",21),o(43,"Phone *"),n(),t(44,"input",22),g("ngModelChange",function(e){return s(a),p(r.professor.phone,e)||(r.professor.phone=e),l(e)}),n()()()(),t(45,"div",10)(46,"h3",11)(47,"span",12),o(48,"school"),n(),o(49," Academic Information "),n(),t(50,"div",13)(51,"div",14)(52,"label",23),o(53,"Department *"),n(),t(54,"select",24),g("ngModelChange",function(e){return s(a),p(r.professor.department,e)||(r.professor.department=e),l(e)}),t(55,"option",25),o(56,"Select Department"),n(),w(57,H,2,2,"option",26,h),n()(),t(59,"div",14)(60,"label",27),o(61,"Subject *"),n(),t(62,"input",28),g("ngModelChange",function(e){return s(a),p(r.professor.subject,e)||(r.professor.subject=e),l(e)}),n()(),t(63,"div",14)(64,"label",29),o(65,"Qualification *"),n(),t(66,"select",30),g("ngModelChange",function(e){return s(a),p(r.professor.qualification,e)||(r.professor.qualification=e),l(e)}),t(67,"option",25),o(68,"Select Qualification"),n(),w(69,K,2,2,"option",26,h),n()(),t(71,"div",14)(72,"label",31),o(73,"Experience (Years)"),n(),t(74,"input",32),g("ngModelChange",function(e){return s(a),p(r.professor.experience,e)||(r.professor.experience=e),l(e)}),n()()()(),t(75,"div",10)(76,"h3",11)(77,"span",12),o(78,"work"),n(),o(79," Employment Details "),n(),t(80,"div",13)(81,"div",14)(82,"label",33),o(83,"Join Date"),n(),t(84,"input",34),g("ngModelChange",function(e){return s(a),p(r.professor.joinDate,e)||(r.professor.joinDate=e),l(e)}),n()(),t(85,"div",14)(86,"label",35),o(87,"Salary"),n(),t(88,"input",36),g("ngModelChange",function(e){return s(a),p(r.professor.salary,e)||(r.professor.salary=e),l(e)}),n()(),t(89,"div",14)(90,"label",37),o(91,"Status"),n(),t(92,"select",38),g("ngModelChange",function(e){return s(a),p(r.professor.status,e)||(r.professor.status=e),l(e)}),t(93,"option",39),o(94,"Active"),n(),t(95,"option",40),o(96,"Inactive"),n(),t(97,"option",41),o(98,"On Leave"),n()()()()(),t(99,"div",10)(100,"h3",11)(101,"span",12),o(102,"location_on"),n(),o(103," Address Information "),n(),t(104,"div",13)(105,"div",42)(106,"label",43),o(107,"Address"),n(),t(108,"input",44),g("ngModelChange",function(e){return s(a),p(r.professor.address,e)||(r.professor.address=e),l(e)}),n()(),t(109,"div",14)(110,"label",45),o(111,"City"),n(),t(112,"input",46),g("ngModelChange",function(e){return s(a),p(r.professor.city,e)||(r.professor.city=e),l(e)}),n()(),t(113,"div",14)(114,"label",47),o(115,"Country"),n(),t(116,"input",48),g("ngModelChange",function(e){return s(a),p(r.professor.country,e)||(r.professor.country=e),l(e)}),n()()()(),t(117,"div",10)(118,"h3",11)(119,"span",12),o(120,"description"),n(),o(121," Biography "),n(),t(122,"div",13)(123,"div",49)(124,"label",50),o(125,"Bio"),n(),t(126,"textarea",51),g("ngModelChange",function(e){return s(a),p(r.professor.bio,e)||(r.professor.bio=e),l(e)}),n()()()(),t(127,"div",52)(128,"button",53),S("click",function(){return s(a),l(r.onReset())}),t(129,"span",12),o(130,"refresh"),n(),o(131," Reset "),n(),t(132,"button",54)(133,"span",12),o(134,"save"),n(),o(135," Save Professor "),n()()()()()}if(M&2){let a=O(22);i(4),u(y(5,20,"professors.addNew")),i(4),u(y(9,22,"nav.dashboard")),i(5),u(y(14,24,"nav.professors")),i(5),u(y(19,26,"professors.addNew")),i(14),m("ngModel",r.professor.firstName),i(4),m("ngModel",r.professor.lastName),i(4),m("ngModel",r.professor.email),i(4),m("ngModel",r.professor.phone),i(10),m("ngModel",r.professor.department),i(3),P(r.departments),i(5),m("ngModel",r.professor.subject),i(4),m("ngModel",r.professor.qualification),i(3),P(r.qualifications),i(5),m("ngModel",r.professor.experience),i(10),m("ngModel",r.professor.joinDate),i(4),m("ngModel",r.professor.salary),i(4),m("ngModel",r.professor.status),i(16),m("ngModel",r.professor.address),i(4),m("ngModel",r.professor.city),i(4),m("ngModel",r.professor.country),i(10),m("ngModel",r.professor.bio),i(6),b("disabled",!a.valid)}},dependencies:[V,J,D,F,R,k,I,z,T,L,G,Y,Q,q,j,B,N],styles:[`

.add-professor[_ngcontent-%COMP%] {
  padding: 1.5rem;
}
.add-professor__header[_ngcontent-%COMP%] {
  margin-bottom: 2rem;
}
.add-professor__title-section[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.add-professor__title[_ngcontent-%COMP%] {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}
.add-professor__breadcrumb[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
}
.add-professor__breadcrumb[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {
  color: var(--primary-color);
  text-decoration: none;
  transition: color 0.2s ease;
}
.add-professor__breadcrumb[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {
  text-decoration: underline;
}
.add-professor__breadcrumb[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  color: var(--text-muted);
}
.add-professor__form-container[_ngcontent-%COMP%] {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: var(--shadow-sm);
}
.form-section[_ngcontent-%COMP%] {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border-color);
}
.form-section[_ngcontent-%COMP%]:last-of-type {
  margin-bottom: 1.5rem;
  padding-bottom: 0;
  border-bottom: none;
}
.form-section__title[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 1.5rem 0;
}
.form-section__title[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {
  color: var(--primary-color);
  font-size: 1.25rem;
}
.form-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
@media (max-width: 992px) {
  .form-grid[_ngcontent-%COMP%] {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 576px) {
  .form-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
}
.form-group[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.form-group--wide[_ngcontent-%COMP%] {
  grid-column: span 2;
}
@media (max-width: 576px) {
  .form-group--wide[_ngcontent-%COMP%] {
    grid-column: span 1;
  }
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
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.form-input[_ngcontent-%COMP%]::placeholder {
  color: var(--text-muted);
}
.form-input[_ngcontent-%COMP%]:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.1);
}
.form-input[_ngcontent-%COMP%]:disabled {
  background: var(--bg-secondary);
  cursor: not-allowed;
}
.form-input--textarea[_ngcontent-%COMP%] {
  resize: vertical;
  min-height: 100px;
}
select.form-input[_ngcontent-%COMP%] {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
  padding-right: 2.5rem;
}
.form-actions[_ngcontent-%COMP%] {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1rem;
}
.btn[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
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
  background: var(--primary-hover);
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
  color: var(--text-primary);
}
[dir=rtl][_nghost-%COMP%]   .add-professor__breadcrumb[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .add-professor__breadcrumb[_ngcontent-%COMP%] {
  direction: rtl;
}
[dir=rtl][_nghost-%COMP%]   select.form-input[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   select.form-input[_ngcontent-%COMP%] {
  background-position: left 0.75rem center;
  padding-right: 1rem;
  padding-left: 2.5rem;
}
[dir=rtl][_nghost-%COMP%]   .form-actions[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .form-actions[_ngcontent-%COMP%] {
  flex-direction: row-reverse;
}`]})}}return f})();export{oe as AddProfessorComponent};
