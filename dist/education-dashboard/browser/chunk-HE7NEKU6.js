import{a as S}from"./chunk-VMT66XCF.js";import{d as y}from"./chunk-BJ2JVOKX.js";import{$ as b,Cb as e,Db as o,Eb as s,Mb as O,Na as a,Ob as r,Pb as l,W as u,bb as f,db as v,hb as g,ib as C,kb as m,lb as _,mb as t,nb as n,ob as M,pc as h,tb as P}from"./chunk-IXPTXOMZ.js";var w=(d,p)=>p.label,E=(d,p)=>p.id;function I(d,p){if(d&1&&(t(0,"div")(1,"div",27)(2,"span",7),e(3),n()(),t(4,"div",28)(5,"h3",29),e(6),n(),t(7,"p",30),e(8),r(9,"translate"),n()()()),d&2){let i=p.$implicit;g("stat-card stat-card--",i.color,""),a(3),o(i.icon),a(3),o(i.value),a(2),o(l(9,6,i.label))}}function k(d,p){d&1&&(t(0,"button",37)(1,"span",7),e(2,"check_circle"),n()())}function T(d,p){if(d&1&&(t(0,"tr")(1,"td")(2,"div",31)(3,"div",32),e(4),n(),t(5,"span",33),e(6),n()()(),t(7,"td"),e(8),n(),t(9,"td"),e(10),n(),t(11,"td",34),e(12),n(),t(13,"td"),e(14),n(),t(15,"td")(16,"span"),e(17),n()(),t(18,"td")(19,"div",35)(20,"button",36)(21,"span",7),e(22,"visibility"),n()(),f(23,k,3,0,"button",37),t(24,"button",38)(25,"span",7),e(26,"receipt"),n()()()()()),d&2){let i=p.$implicit,c=P();a(4),o(c.getInitials(i.studentName)),a(2),o(i.studentName),a(2),o(i.studentId),a(2),o(i.type),a(2),s("$",c.formatAmount(i.amount),""),a(2),o(i.dueDate),a(2),g("status-badge status-badge--",i.status,""),a(),s(" ",i.status," "),a(6),C(23,i.status!=="paid"?23:-1)}}var j=(()=>{class d{constructor(){this.languageService=u(S),this.stats=[{icon:"account_balance",value:"$125,450",label:"fees.totalCollected",color:"primary"},{icon:"pending_actions",value:"$45,200",label:"fees.pending",color:"warning"},{icon:"error",value:"$12,800",label:"fees.overdue",color:"danger"},{icon:"people",value:"1,245",label:"fees.paidStudents",color:"success"}],this.fees=[{id:1,studentName:"John Doe",studentId:"STU001",type:"Tuition",amount:5e3,dueDate:"Mar 15, 2024",status:"paid"},{id:2,studentName:"Jane Smith",studentId:"STU002",type:"Library",amount:150,dueDate:"Mar 10, 2024",status:"pending"},{id:3,studentName:"Mike Johnson",studentId:"STU003",type:"Laboratory",amount:300,dueDate:"Feb 28, 2024",status:"overdue"},{id:4,studentName:"Emily Brown",studentId:"STU004",type:"Tuition",amount:5e3,dueDate:"Mar 15, 2024",status:"paid"},{id:5,studentName:"David Wilson",studentId:"STU005",type:"Sports",amount:200,dueDate:"Mar 20, 2024",status:"pending"}]}getInitials(i){return i.split(" ").map(c=>c[0]).join("")}formatAmount(i){return i.toLocaleString()}static{this.\u0275fac=function(c){return new(c||d)}}static{this.\u0275cmp=b({type:d,selectors:[["app-fees"]],standalone:!0,features:[O],decls:80,vars:42,consts:[[1,"fees"],[1,"fees__header"],[1,"fees__title-section"],[1,"fees__title"],[1,"fees__subtitle"],[1,"fees__actions"],[1,"btn","btn--outline"],[1,"material-icons"],[1,"btn","btn--primary"],[1,"fees__stats"],[3,"class"],[1,"fees__filters"],[1,"search-box"],[1,"material-icons","search-box__icon"],["type","text",1,"search-box__input",3,"placeholder"],[1,"filter-group"],[1,"filter-select"],["value",""],["value","tuition"],["value","library"],["value","laboratory"],["value","sports"],["value","paid"],["value","pending"],["value","overdue"],[1,"fees__table-container"],[1,"data-table"],[1,"stat-card__icon"],[1,"stat-card__content"],[1,"stat-card__value"],[1,"stat-card__label"],[1,"student-cell"],[1,"student-cell__avatar"],[1,"student-cell__name"],[1,"fees__amount"],[1,"action-buttons"],["title","View",1,"action-btn","action-btn--view"],["title","Mark as Paid",1,"action-btn","action-btn--pay"],["title","Receipt",1,"action-btn","action-btn--receipt"]],template:function(c,x){c&1&&(t(0,"div",0)(1,"div",1)(2,"div",2)(3,"h1",3),e(4),r(5,"translate"),n(),t(6,"p",4),e(7),r(8,"translate"),n()(),t(9,"div",5)(10,"button",6)(11,"span",7),e(12,"download"),n(),e(13),r(14,"translate"),n(),t(15,"button",8)(16,"span",7),e(17,"add"),n(),e(18),r(19,"translate"),n()()(),t(20,"div",9),m(21,I,10,8,"div",10,w),n(),t(23,"div",11)(24,"div",12)(25,"span",13),e(26,"search"),n(),M(27,"input",14),r(28,"translate"),n(),t(29,"div",15)(30,"select",16)(31,"option",17),e(32),r(33,"translate"),n(),t(34,"option",18),e(35,"Tuition"),n(),t(36,"option",19),e(37,"Library"),n(),t(38,"option",20),e(39,"Laboratory"),n(),t(40,"option",21),e(41,"Sports"),n()(),t(42,"select",16)(43,"option",17),e(44),r(45,"translate"),n(),t(46,"option",22),e(47,"Paid"),n(),t(48,"option",23),e(49,"Pending"),n(),t(50,"option",24),e(51,"Overdue"),n()()()(),t(52,"div",25)(53,"table",26)(54,"thead")(55,"tr")(56,"th"),e(57),r(58,"translate"),n(),t(59,"th"),e(60),r(61,"translate"),n(),t(62,"th"),e(63),r(64,"translate"),n(),t(65,"th"),e(66),r(67,"translate"),n(),t(68,"th"),e(69),r(70,"translate"),n(),t(71,"th"),e(72),r(73,"translate"),n(),t(74,"th"),e(75),r(76,"translate"),n()()(),t(77,"tbody"),m(78,T,27,11,"tr",null,E),n()()()()),c&2&&(a(4),o(l(5,14,"fees.title")),a(3),o(l(8,16,"fees.subtitle")),a(6),s(" ",l(14,18,"common.export")," "),a(5),s(" ",l(19,20,"fees.addPayment")," "),a(3),_(x.stats),a(6),v("placeholder",l(28,22,"fees.searchStudent")),a(5),o(l(33,24,"fees.allTypes")),a(12),o(l(45,26,"common.allStatus")),a(13),o(l(58,28,"fees.studentName")),a(3),o(l(61,30,"fees.studentId")),a(3),o(l(64,32,"fees.feeType")),a(3),o(l(67,34,"fees.amount")),a(3),o(l(70,36,"fees.dueDate")),a(3),o(l(73,38,"common.status")),a(3),o(l(76,40,"common.actions")),a(3),_(x.fees))},dependencies:[h,y],styles:[`

.fees[_ngcontent-%COMP%] {
  padding: 24px;
}
.fees__header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}
.fees__title[_ngcontent-%COMP%] {
  font-size: 24px;
  font-weight: 600;
  color: var(--primary-color);
  margin: 0 0 4px;
}
.fees__subtitle[_ngcontent-%COMP%] {
  font-size: 14px;
  color: var(--text-muted);
  margin: 0;
}
.fees__actions[_ngcontent-%COMP%] {
  display: flex;
  gap: 12px;
}
.fees__stats[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
}
.fees__filters[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}
.fees__table-container[_ngcontent-%COMP%] {
  background: var(--bg-white);
  border-radius: 12px;
  box-shadow: var(--card-shadow);
  overflow: hidden;
}
.fees__amount[_ngcontent-%COMP%] {
  font-weight: 600;
  color: var(--primary-color);
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
  opacity: 0.9;
}
.btn--outline[_ngcontent-%COMP%] {
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-color);
}
.btn--outline[_ngcontent-%COMP%]:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}
.stat-card[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: var(--bg-white);
  border-radius: 12px;
  box-shadow: var(--card-shadow);
}
.stat-card__icon[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 12px;
}
.stat-card__icon[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {
  font-size: 24px;
  color: white;
}
.stat-card__value[_ngcontent-%COMP%] {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-color);
  margin: 0 0 4px;
}
.stat-card__label[_ngcontent-%COMP%] {
  font-size: 13px;
  color: var(--text-muted);
  margin: 0;
}
.stat-card--primary[_ngcontent-%COMP%]   .stat-card__icon[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #5b5fc7,
      #4a4eb8);
}
.stat-card--success[_ngcontent-%COMP%]   .stat-card__icon[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #28a745,
      #20963a);
}
.stat-card--warning[_ngcontent-%COMP%]   .stat-card__icon[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #ffc107,
      #e0a800);
}
.stat-card--danger[_ngcontent-%COMP%]   .stat-card__icon[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #dc3545,
      #c82333);
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
.student-cell[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
}
.student-cell__avatar[_ngcontent-%COMP%] {
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
.student-cell__name[_ngcontent-%COMP%] {
  font-weight: 500;
}
.status-badge[_ngcontent-%COMP%] {
  display: inline-flex;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  text-transform: capitalize;
}
.status-badge--paid[_ngcontent-%COMP%] {
  background: rgba(40, 167, 69, 0.1);
  color: #28a745;
}
.status-badge--pending[_ngcontent-%COMP%] {
  background: rgba(255, 193, 7, 0.1);
  color: #e0a800;
}
.status-badge--overdue[_ngcontent-%COMP%] {
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
.action-btn--pay[_ngcontent-%COMP%] {
  color: #28a745;
}
.action-btn--pay[_ngcontent-%COMP%]:hover {
  background: rgba(40, 167, 69, 0.1);
}
.action-btn--receipt[_ngcontent-%COMP%] {
  color: #6f42c1;
}
.action-btn--receipt[_ngcontent-%COMP%]:hover {
  background: rgba(111, 66, 193, 0.1);
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
[dir=rtl][_ngcontent-%COMP%]   .student-cell[_ngcontent-%COMP%] {
  flex-direction: row-reverse;
}
@media (max-width: 768px) {
  .fees__header[_ngcontent-%COMP%] {
    flex-direction: column;
    gap: 16px;
  }
  .fees__actions[_ngcontent-%COMP%] {
    width: 100%;
    justify-content: flex-end;
  }
  .fees__filters[_ngcontent-%COMP%] {
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
}`]})}}return d})();export{j as FeesComponent};
