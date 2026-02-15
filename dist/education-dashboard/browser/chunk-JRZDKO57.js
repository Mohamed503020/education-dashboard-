import{a as M}from"./chunk-VMT66XCF.js";import{d as C}from"./chunk-BJ2JVOKX.js";import{$ as x,Cb as e,Db as a,Eb as s,Mb as u,Na as i,Ob as o,Pb as r,W as m,db as g,hb as f,kb as b,lb as _,mb as n,nb as t,ob as v,pc as h}from"./chunk-IXPTXOMZ.js";var O=(c,d)=>d.id;function S(c,d){if(c&1&&(n(0,"tr")(1,"td")(2,"div",23)(3,"div",24),e(4),t(),n(5,"span",25),e(6),t()()(),n(7,"td"),e(8),t(),n(9,"td"),e(10),t(),n(11,"td"),e(12),t(),n(13,"td"),e(14),t(),n(15,"td"),e(16),t(),n(17,"td")(18,"span"),e(19),o(20,"translate"),o(21,"translate"),t()(),n(22,"td")(23,"div",26)(24,"button",27)(25,"span",7),e(26,"visibility"),t()(),n(27,"button",28)(28,"span",7),e(29,"edit"),t()(),n(30,"button",29)(31,"span",7),e(32,"delete"),t()()()()()),c&2){let l=d.$implicit;i(4),a(l.avatar),i(2),a(l.name),i(2),a(l.email),i(2),a(l.phone),i(2),a(l.role),i(2),a(l.department),i(2),a(l.joinDate),i(2),f("status-badge status-badge--",l.status,""),i(),s(" ",l.status==="active"?r(20,11,"common.active"):r(21,13,"common.inactive")," ")}}var D=(()=>{class c{constructor(){this.languageService=m(M),this.staff=[{id:1,name:"Alice Thompson",email:"alice.t@edu.com",phone:"+1 234 567 890",role:"Administrator",department:"Administration",joinDate:"Jan 15, 2020",status:"active",avatar:"AT"},{id:2,name:"Bob Martinez",email:"bob.m@edu.com",phone:"+1 234 567 891",role:"Accountant",department:"Finance",joinDate:"Mar 20, 2019",status:"active",avatar:"BM"},{id:3,name:"Carol White",email:"carol.w@edu.com",phone:"+1 234 567 892",role:"Librarian",department:"Library",joinDate:"Sep 10, 2018",status:"active",avatar:"CW"},{id:4,name:"David Lee",email:"david.l@edu.com",phone:"+1 234 567 893",role:"IT Support",department:"IT",joinDate:"Jun 05, 2021",status:"active",avatar:"DL"},{id:5,name:"Eva Garcia",email:"eva.g@edu.com",phone:"+1 234 567 894",role:"Receptionist",department:"Administration",joinDate:"Nov 12, 2022",status:"inactive",avatar:"EG"}]}static{this.\u0275fac=function(p){return new(p||c)}}static{this.\u0275cmp=x({type:c,selectors:[["app-staff"]],standalone:!0,features:[u],decls:75,vars:48,consts:[[1,"staff"],[1,"staff__header"],[1,"staff__title-section"],[1,"staff__title"],[1,"staff__subtitle"],[1,"staff__actions"],[1,"btn","btn--primary"],[1,"material-icons"],[1,"staff__filters"],[1,"search-box"],[1,"material-icons","search-box__icon"],["type","text",1,"search-box__input",3,"placeholder"],[1,"filter-group"],[1,"filter-select"],["value",""],["value","admin"],["value","finance"],["value","library"],["value","it"],["value","active"],["value","inactive"],[1,"staff__table-container"],[1,"data-table"],[1,"user-cell"],[1,"user-cell__avatar"],[1,"user-cell__name"],[1,"action-buttons"],["title","View",1,"action-btn","action-btn--view"],["title","Edit",1,"action-btn","action-btn--edit"],["title","Delete",1,"action-btn","action-btn--delete"]],template:function(p,P){p&1&&(n(0,"div",0)(1,"div",1)(2,"div",2)(3,"h1",3),e(4),o(5,"translate"),t(),n(6,"p",4),e(7),o(8,"translate"),t()(),n(9,"div",5)(10,"button",6)(11,"span",7),e(12,"add"),t(),e(13),o(14,"translate"),t()()(),n(15,"div",8)(16,"div",9)(17,"span",10),e(18,"search"),t(),v(19,"input",11),o(20,"translate"),t(),n(21,"div",12)(22,"select",13)(23,"option",14),e(24),o(25,"translate"),t(),n(26,"option",15),e(27,"Administration"),t(),n(28,"option",16),e(29,"Finance"),t(),n(30,"option",17),e(31,"Library"),t(),n(32,"option",18),e(33,"IT"),t()(),n(34,"select",13)(35,"option",14),e(36),o(37,"translate"),t(),n(38,"option",19),e(39),o(40,"translate"),t(),n(41,"option",20),e(42),o(43,"translate"),t()()()(),n(44,"div",21)(45,"table",22)(46,"thead")(47,"tr")(48,"th"),e(49),o(50,"translate"),t(),n(51,"th"),e(52),o(53,"translate"),t(),n(54,"th"),e(55),o(56,"translate"),t(),n(57,"th"),e(58),o(59,"translate"),t(),n(60,"th"),e(61),o(62,"translate"),t(),n(63,"th"),e(64),o(65,"translate"),t(),n(66,"th"),e(67),o(68,"translate"),t(),n(69,"th"),e(70),o(71,"translate"),t()()(),n(72,"tbody"),b(73,S,33,15,"tr",null,O),t()()()()),p&2&&(i(4),a(r(5,16,"staff.title")),i(3),a(r(8,18,"staff.subtitle")),i(6),s(" ",r(14,20,"staff.addNew")," "),i(6),g("placeholder",r(20,22,"common.search")),i(5),a(r(25,24,"staff.allDepartments")),i(12),a(r(37,26,"common.allStatus")),i(3),a(r(40,28,"common.active")),i(3),a(r(43,30,"common.inactive")),i(7),a(r(50,32,"common.name")),i(3),a(r(53,34,"common.email")),i(3),a(r(56,36,"common.phone")),i(3),a(r(59,38,"staff.role")),i(3),a(r(62,40,"staff.department")),i(3),a(r(65,42,"staff.joinDate")),i(3),a(r(68,44,"common.status")),i(3),a(r(71,46,"common.actions")),i(3),_(P.staff))},dependencies:[h,C],styles:[`

.staff[_ngcontent-%COMP%] {
  padding: 24px;
}
.staff__header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}
.staff__title[_ngcontent-%COMP%] {
  font-size: 24px;
  font-weight: 600;
  color: var(--primary-color);
  margin: 0 0 4px;
}
.staff__subtitle[_ngcontent-%COMP%] {
  font-size: 14px;
  color: var(--text-muted);
  margin: 0;
}
.staff__filters[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}
.staff__table-container[_ngcontent-%COMP%] {
  background: var(--bg-white);
  border-radius: 12px;
  box-shadow: var(--card-shadow);
  overflow: hidden;
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
}
.btn--primary[_ngcontent-%COMP%] {
  background: var(--primary-color);
  color: white;
}
.btn--primary[_ngcontent-%COMP%]:hover {
  opacity: 0.9;
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
}
.search-box__input[_ngcontent-%COMP%] {
  width: 100%;
  padding: 10px 12px 10px 40px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 14px;
  background: var(--bg-white);
  color: var(--text-color);
}
.search-box__input[_ngcontent-%COMP%]:focus {
  outline: none;
  border-color: var(--primary-color);
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
  background: var(--bg-light);
}
.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
  font-size: 14px;
  color: var(--text-color);
}
.data-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {
  background: var(--bg-light);
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
[dir=rtl][_ngcontent-%COMP%]   .search-box__icon[_ngcontent-%COMP%] {
  left: auto;
  right: 12px;
}
[dir=rtl][_ngcontent-%COMP%]   .search-box__input[_ngcontent-%COMP%] {
  padding: 10px 40px 10px 12px;
}
[dir=rtl][_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], [dir=rtl][_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
  text-align: right;
}
[dir=rtl][_ngcontent-%COMP%]   .user-cell[_ngcontent-%COMP%] {
  flex-direction: row-reverse;
}
@media (max-width: 768px) {
  .staff__header[_ngcontent-%COMP%] {
    flex-direction: column;
    gap: 16px;
  }
  .staff__filters[_ngcontent-%COMP%] {
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
}`]})}}return c})();export{D as StaffComponent};
