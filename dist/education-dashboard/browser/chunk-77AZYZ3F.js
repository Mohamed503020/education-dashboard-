import{a as z}from"./chunk-VMT66XCF.js";import{d as j}from"./chunk-BJ2JVOKX.js";import{j as I}from"./chunk-YWRECBJH.js";import{$ as h,Cb as t,Db as a,Eb as _,Fb as w,Mb as E,Na as i,Nb as k,Ob as r,Pb as s,W as u,db as d,fb as C,hb as P,ja as f,ka as v,kb as M,lb as O,mb as e,nb as n,ob as S,pc as B,rb as y,sb as g,tb as x}from"./chunk-IXPTXOMZ.js";var L=(c,m)=>m.id,T=c=>["/professors/edit",c];function A(c,m){if(c&1){let o=y();e(0,"tr")(1,"td",24)(2,"input",25),g("change",function(){let p=f(o).$implicit,b=x();return v(b.toggleSelect(p.id))}),n()(),e(3,"td")(4,"div",34)(5,"div",35),t(6),n(),e(7,"span",36),t(8),n()()(),e(9,"td"),t(10),n(),e(11,"td"),t(12),n(),e(13,"td"),t(14),n(),e(15,"td"),t(16),n(),e(17,"td")(18,"span"),t(19),r(20,"translate"),r(21,"translate"),n()(),e(22,"td")(23,"div",37)(24,"button",38)(25,"span",7),t(26,"visibility"),n()(),e(27,"a",39)(28,"span",7),t(29,"edit"),n()(),e(30,"button",40)(31,"span",7),t(32,"delete"),n()()()()()}if(c&2){let o=m.$implicit,l=x();C("selected",l.isSelected(o.id)),i(2),d("checked",l.isSelected(o.id)),i(4),a(o.avatar),i(2),a(o.name),i(2),a(o.email),i(2),a(o.phone),i(2),a(o.department),i(2),a(o.subject),i(2),P("status-badge status-badge--",o.status,""),i(),_(" ",o.status==="active"?s(20,14,"common.active"):s(21,16,"common.inactive")," "),i(8),d("routerLink",k(18,T,o.id))}}var N=(()=>{class c{constructor(){this.languageService=u(z),this.professors=[{id:1,name:"Dr. John Smith",email:"john.smith@edu.com",phone:"+1 234 567 890",department:"Computer Science",subject:"Algorithms",status:"active",avatar:"JS"},{id:2,name:"Dr. Sarah Johnson",email:"sarah.j@edu.com",phone:"+1 234 567 891",department:"Mathematics",subject:"Calculus",status:"active",avatar:"SJ"},{id:3,name:"Dr. Michael Brown",email:"m.brown@edu.com",phone:"+1 234 567 892",department:"Physics",subject:"Quantum Mechanics",status:"active",avatar:"MB"},{id:4,name:"Dr. Emily Davis",email:"e.davis@edu.com",phone:"+1 234 567 893",department:"Chemistry",subject:"Organic Chemistry",status:"inactive",avatar:"ED"},{id:5,name:"Dr. Robert Wilson",email:"r.wilson@edu.com",phone:"+1 234 567 894",department:"Biology",subject:"Genetics",status:"active",avatar:"RW"},{id:6,name:"Dr. Lisa Anderson",email:"l.anderson@edu.com",phone:"+1 234 567 895",department:"English",subject:"Literature",status:"active",avatar:"LA"}],this.selectedProfessors=[]}toggleSelectAll(o){o.target.checked?this.selectedProfessors=this.professors.map(p=>p.id):this.selectedProfessors=[]}toggleSelect(o){let l=this.selectedProfessors.indexOf(o);l===-1?this.selectedProfessors.push(o):this.selectedProfessors.splice(l,1)}isSelected(o){return this.selectedProfessors.includes(o)}get allSelected(){return this.professors.length>0&&this.selectedProfessors.length===this.professors.length}static{this.\u0275fac=function(l){return new(l||c)}}static{this.\u0275cmp=h({type:c,selectors:[["app-professors"]],standalone:!0,features:[E],decls:98,vars:52,consts:[[1,"professors"],[1,"professors__header"],[1,"professors__title-section"],[1,"professors__title"],[1,"professors__subtitle"],[1,"professors__actions"],["routerLink","/professors/add",1,"btn","btn--primary"],[1,"material-icons"],[1,"professors__filters"],[1,"search-box"],[1,"material-icons","search-box__icon"],["type","text",1,"search-box__input",3,"placeholder"],[1,"filter-group"],[1,"filter-select"],["value",""],["value","cs"],["value","math"],["value","physics"],["value","chemistry"],["value","biology"],["value","active"],["value","inactive"],[1,"professors__table-container"],[1,"data-table"],[1,"data-table__check"],["type","checkbox",3,"change","checked"],[3,"selected"],[1,"professors__pagination"],[1,"pagination-info"],[1,"pagination-controls"],["disabled","",1,"pagination-btn"],[1,"pagination-btn","pagination-btn--active"],[1,"pagination-btn"],[1,"pagination-ellipsis"],[1,"user-cell"],[1,"user-cell__avatar"],[1,"user-cell__name"],[1,"action-buttons"],["title","View",1,"action-btn","action-btn--view"],["title","Edit",1,"action-btn","action-btn--edit",3,"routerLink"],["title","Delete",1,"action-btn","action-btn--delete"]],template:function(l,p){l&1&&(e(0,"div",0)(1,"div",1)(2,"div",2)(3,"h1",3),t(4),r(5,"translate"),n(),e(6,"p",4),t(7),r(8,"translate"),n()(),e(9,"div",5)(10,"button",6)(11,"span",7),t(12,"add"),n(),t(13),r(14,"translate"),n()()(),e(15,"div",8)(16,"div",9)(17,"span",10),t(18,"search"),n(),S(19,"input",11),r(20,"translate"),n(),e(21,"div",12)(22,"select",13)(23,"option",14),t(24),r(25,"translate"),n(),e(26,"option",15),t(27,"Computer Science"),n(),e(28,"option",16),t(29,"Mathematics"),n(),e(30,"option",17),t(31,"Physics"),n(),e(32,"option",18),t(33,"Chemistry"),n(),e(34,"option",19),t(35,"Biology"),n()(),e(36,"select",13)(37,"option",14),t(38),r(39,"translate"),n(),e(40,"option",20),t(41),r(42,"translate"),n(),e(43,"option",21),t(44),r(45,"translate"),n()()()(),e(46,"div",22)(47,"table",23)(48,"thead")(49,"tr")(50,"th",24)(51,"input",25),g("change",function(D){return p.toggleSelectAll(D)}),n()(),e(52,"th"),t(53),r(54,"translate"),n(),e(55,"th"),t(56),r(57,"translate"),n(),e(58,"th"),t(59),r(60,"translate"),n(),e(61,"th"),t(62),r(63,"translate"),n(),e(64,"th"),t(65),r(66,"translate"),n(),e(67,"th"),t(68),r(69,"translate"),n(),e(70,"th"),t(71),r(72,"translate"),n()()(),e(73,"tbody"),M(74,A,33,20,"tr",26,L),n()()(),e(76,"div",27)(77,"div",28),t(78),r(79,"translate"),r(80,"translate"),n(),e(81,"div",29)(82,"button",30)(83,"span",7),t(84,"chevron_left"),n()(),e(85,"button",31),t(86,"1"),n(),e(87,"button",32),t(88,"2"),n(),e(89,"button",32),t(90,"3"),n(),e(91,"span",33),t(92,"..."),n(),e(93,"button",32),t(94,"25"),n(),e(95,"button",32)(96,"span",7),t(97,"chevron_right"),n()()()()()),l&2&&(i(4),a(s(5,18,"professors.title")),i(3),a(s(8,20,"professors.subtitle")),i(6),_(" ",s(14,22,"professors.addNew")," "),i(6),d("placeholder",s(20,24,"common.search")),i(5),a(s(25,26,"professors.allDepartments")),i(14),a(s(39,28,"common.allStatus")),i(3),a(s(42,30,"common.active")),i(3),a(s(45,32,"common.inactive")),i(7),d("checked",p.allSelected),i(2),a(s(54,34,"common.name")),i(3),a(s(57,36,"common.email")),i(3),a(s(60,38,"common.phone")),i(3),a(s(63,40,"professors.department")),i(3),a(s(66,42,"professors.subject")),i(3),a(s(69,44,"common.status")),i(3),a(s(72,46,"common.actions")),i(3),O(p.professors),i(4),w(" ",s(79,48,"common.showing")," 1-6 ",s(80,50,"common.of")," 150 "))},dependencies:[B,I,j],styles:[`

.professors[_ngcontent-%COMP%] {
  padding: 24px;
}
.professors__header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}
.professors__title[_ngcontent-%COMP%] {
  font-size: 24px;
  font-weight: 600;
  color: var(--primary-color);
  margin: 0 0 4px;
}
.professors__subtitle[_ngcontent-%COMP%] {
  font-size: 14px;
  color: var(--text-muted);
  margin: 0;
}
.professors__filters[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}
.professors__table-container[_ngcontent-%COMP%] {
  background: var(--bg-white);
  border-radius: 12px;
  box-shadow: var(--card-shadow);
  overflow: hidden;
  margin-bottom: 24px;
}
.professors__pagination[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btn[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}
.btn[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {
  font-size: 20px;
}
.btn--primary[_ngcontent-%COMP%] {
  background: var(--primary-color);
  color: white;
}
.btn--primary[_ngcontent-%COMP%]:hover {
  background: var(--primary-dark);
}
.search-box[_ngcontent-%COMP%] {
  position: relative;
  width: 300px;
}
.search-box__icon[_ngcontent-%COMP%] {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  font-size: 20px;
}
.search-box__input[_ngcontent-%COMP%] {
  width: 100%;
  padding: 10px 12px 10px 40px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 14px;
  background: var(--bg-white);
  color: var(--text-color);
  transition: border-color 0.2s;
}
.search-box__input[_ngcontent-%COMP%]:focus {
  outline: none;
  border-color: var(--primary-color);
}
.search-box__input[_ngcontent-%COMP%]::placeholder {
  color: var(--text-muted);
}
.filter-group[_ngcontent-%COMP%] {
  display: flex;
  gap: 12px;
}
.filter-select[_ngcontent-%COMP%] {
  padding: 10px 32px 10px 12px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 14px;
  background: var(--bg-white);
  color: var(--text-color);
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%236c757d' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
}
.filter-select[_ngcontent-%COMP%]:focus {
  outline: none;
  border-color: var(--primary-color);
}
.data-table[_ngcontent-%COMP%] {
  width: 100%;
  border-collapse: collapse;
}
.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
  padding: 16px;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}
.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: var(--bg-light);
}
.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
  font-size: 14px;
  color: var(--text-color);
}
.data-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {
  transition: background 0.2s;
}
.data-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {
  background: var(--bg-light);
}
.data-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.selected[_ngcontent-%COMP%] {
  background: rgba(91, 95, 199, 0.05);
}
.data-table__check[_ngcontent-%COMP%] {
  width: 40px;
}
.data-table__check[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}
.user-cell[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
}
.user-cell__avatar[_ngcontent-%COMP%] {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
}
.user-cell__name[_ngcontent-%COMP%] {
  font-weight: 500;
}
.status-badge[_ngcontent-%COMP%] {
  display: inline-flex;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}
.status-badge--active[_ngcontent-%COMP%] {
  background: rgba(40, 167, 69, 0.1);
  color: #28a745;
}
.status-badge--inactive[_ngcontent-%COMP%] {
  background: rgba(220, 53, 69, 0.1);
  color: #dc3545;
}
.action-buttons[_ngcontent-%COMP%] {
  display: flex;
  gap: 8px;
}
.action-btn[_ngcontent-%COMP%] {
  padding: 8px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  background: transparent;
}
.action-btn[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {
  font-size: 18px;
}
.action-btn--view[_ngcontent-%COMP%] {
  color: #17a2b8;
}
.action-btn--view[_ngcontent-%COMP%]:hover {
  background: rgba(23, 162, 184, 0.1);
}
.action-btn--edit[_ngcontent-%COMP%] {
  color: #ffc107;
}
.action-btn--edit[_ngcontent-%COMP%]:hover {
  background: rgba(255, 193, 7, 0.1);
}
.action-btn--delete[_ngcontent-%COMP%] {
  color: #dc3545;
}
.action-btn--delete[_ngcontent-%COMP%]:hover {
  background: rgba(220, 53, 69, 0.1);
}
.pagination-info[_ngcontent-%COMP%] {
  font-size: 14px;
  color: var(--text-muted);
}
.pagination-controls[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 4px;
}
.pagination-btn[_ngcontent-%COMP%] {
  min-width: 36px;
  height: 36px;
  padding: 0 12px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-white);
  color: var(--text-color);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pagination-btn[_ngcontent-%COMP%]:hover:not(:disabled) {
  border-color: var(--primary-color);
  color: var(--primary-color);
}
.pagination-btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.pagination-btn--active[_ngcontent-%COMP%] {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}
.pagination-btn[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {
  font-size: 20px;
}
.pagination-ellipsis[_ngcontent-%COMP%] {
  padding: 0 8px;
  color: var(--text-muted);
}
[dir=rtl][_ngcontent-%COMP%]   .search-box__icon[_ngcontent-%COMP%] {
  left: auto;
  right: 12px;
}
[dir=rtl][_ngcontent-%COMP%]   .search-box__input[_ngcontent-%COMP%] {
  padding: 10px 40px 10px 12px;
}
[dir=rtl][_ngcontent-%COMP%]   .filter-select[_ngcontent-%COMP%] {
  background-position: left 8px center;
  padding: 10px 12px 10px 32px;
}
[dir=rtl][_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], [dir=rtl][_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
  text-align: right;
}
[dir=rtl][_ngcontent-%COMP%]   .user-cell[_ngcontent-%COMP%] {
  flex-direction: row-reverse;
}
[dir=rtl][_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%] {
  flex-direction: row-reverse;
}
@media (max-width: 768px) {
  .professors__header[_ngcontent-%COMP%] {
    flex-direction: column;
    gap: 16px;
  }
  .professors__filters[_ngcontent-%COMP%] {
    flex-direction: column;
    align-items: stretch;
  }
  .search-box[_ngcontent-%COMP%] {
    width: 100%;
  }
  .filter-group[_ngcontent-%COMP%] {
    flex-direction: column;
  }
  .filter-select[_ngcontent-%COMP%] {
    width: 100%;
  }
  .data-table[_ngcontent-%COMP%] {
    display: block;
    overflow-x: auto;
  }
  .professors__pagination[_ngcontent-%COMP%] {
    flex-direction: column;
    gap: 16px;
  }
}`]})}}return c})();export{N as ProfessorsComponent};
