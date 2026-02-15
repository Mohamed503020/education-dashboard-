import{a as P}from"./chunk-VMT66XCF.js";import{d as M}from"./chunk-BJ2JVOKX.js";import{$ as u,Cb as e,Db as a,Eb as s,Mb as y,Na as i,Ob as r,Pb as o,W as x,db as v,hb as b,kb as g,lb as m,mb as t,nb as n,ob as C,pc as h}from"./chunk-IXPTXOMZ.js";var f=(c,d)=>d.label,O=(c,d)=>d.id;function S(c,d){if(c&1&&(t(0,"div")(1,"div",26)(2,"span",7),e(3),n()(),t(4,"div",27)(5,"h3",28),e(6),n(),t(7,"p",29),e(8),r(9,"translate"),n()()()),c&2){let l=d.$implicit;b("stat-card stat-card--",l.color,""),i(3),a(l.icon),i(3),a(l.value),i(2),a(o(9,6,l.label))}}function k(c,d){if(c&1&&(t(0,"tr")(1,"td")(2,"div",30)(3,"span",31),e(4,"menu_book"),n(),t(5,"span",32),e(6),n()()(),t(7,"td"),e(8),n(),t(9,"td"),e(10),n(),t(11,"td"),e(12),n(),t(13,"td"),e(14),n(),t(15,"td"),e(16),n(),t(17,"td")(18,"span"),e(19),n()(),t(20,"td")(21,"div",33)(22,"button",34)(23,"span",7),e(24,"visibility"),n()(),t(25,"button",35)(26,"span",7),e(27,"edit"),n()(),t(28,"button",36)(29,"span",7),e(30,"bookmark_add"),n()()()()()),c&2){let l=d.$implicit;i(6),a(l.title),i(2),a(l.author),i(2),a(l.isbn),i(2),a(l.category),i(2),a(l.copies),i(2),a(l.available),i(2),b("status-badge status-badge--",l.status,""),i(),s(" ",l.status," ")}}var L=(()=>{class c{constructor(){this.languageService=x(P),this.stats=[{icon:"menu_book",value:"12,450",label:"library.totalBooks",color:"primary"},{icon:"people",value:"890",label:"library.activeMembers",color:"success"},{icon:"bookmark",value:"145",label:"library.borrowedToday",color:"warning"},{icon:"assignment_return",value:"78",label:"library.returnedToday",color:"info"}],this.books=[{id:1,title:"Introduction to Algorithms",author:"Thomas H. Cormen",isbn:"978-0262033848",category:"Computer Science",copies:15,available:8,status:"available"},{id:2,title:"Calculus: Early Transcendentals",author:"James Stewart",isbn:"978-1285741550",category:"Mathematics",copies:20,available:5,status:"limited"},{id:3,title:"Physics for Scientists",author:"Paul A. Tipler",isbn:"978-1429201247",category:"Physics",copies:12,available:0,status:"unavailable"},{id:4,title:"Organic Chemistry",author:"Paula Yurkanis Bruice",isbn:"978-0134042282",category:"Chemistry",copies:10,available:4,status:"limited"},{id:5,title:"Molecular Biology of the Cell",author:"Bruce Alberts",isbn:"978-0815344322",category:"Biology",copies:8,available:6,status:"available"}]}static{this.\u0275fac=function(p){return new(p||c)}}static{this.\u0275cmp=u({type:c,selectors:[["app-library"]],standalone:!0,features:[y],decls:80,vars:42,consts:[[1,"library"],[1,"library__header"],[1,"library__title-section"],[1,"library__title"],[1,"library__subtitle"],[1,"library__actions"],[1,"btn","btn--outline"],[1,"material-icons"],[1,"btn","btn--primary"],[1,"library__stats"],[3,"class"],[1,"library__filters"],[1,"search-box"],[1,"material-icons","search-box__icon"],["type","text",1,"search-box__input",3,"placeholder"],[1,"filter-group"],[1,"filter-select"],["value",""],["value","cs"],["value","math"],["value","physics"],["value","available"],["value","limited"],["value","unavailable"],[1,"library__table-container"],[1,"data-table"],[1,"stat-card__icon"],[1,"stat-card__content"],[1,"stat-card__value"],[1,"stat-card__label"],[1,"book-cell"],[1,"material-icons","book-cell__icon"],[1,"book-cell__title"],[1,"action-buttons"],["title","View",1,"action-btn","action-btn--view"],["title","Edit",1,"action-btn","action-btn--edit"],["title","Issue",1,"action-btn","action-btn--issue"]],template:function(p,_){p&1&&(t(0,"div",0)(1,"div",1)(2,"div",2)(3,"h1",3),e(4),r(5,"translate"),n(),t(6,"p",4),e(7),r(8,"translate"),n()(),t(9,"div",5)(10,"button",6)(11,"span",7),e(12,"download"),n(),e(13),r(14,"translate"),n(),t(15,"button",8)(16,"span",7),e(17,"add"),n(),e(18),r(19,"translate"),n()()(),t(20,"div",9),g(21,S,10,8,"div",10,f),n(),t(23,"div",11)(24,"div",12)(25,"span",13),e(26,"search"),n(),C(27,"input",14),r(28,"translate"),n(),t(29,"div",15)(30,"select",16)(31,"option",17),e(32),r(33,"translate"),n(),t(34,"option",18),e(35,"Computer Science"),n(),t(36,"option",19),e(37,"Mathematics"),n(),t(38,"option",20),e(39,"Physics"),n()(),t(40,"select",16)(41,"option",17),e(42),r(43,"translate"),n(),t(44,"option",21),e(45,"Available"),n(),t(46,"option",22),e(47,"Limited"),n(),t(48,"option",23),e(49,"Unavailable"),n()()()(),t(50,"div",24)(51,"table",25)(52,"thead")(53,"tr")(54,"th"),e(55),r(56,"translate"),n(),t(57,"th"),e(58),r(59,"translate"),n(),t(60,"th"),e(61,"ISBN"),n(),t(62,"th"),e(63),r(64,"translate"),n(),t(65,"th"),e(66),r(67,"translate"),n(),t(68,"th"),e(69),r(70,"translate"),n(),t(71,"th"),e(72),r(73,"translate"),n(),t(74,"th"),e(75),r(76,"translate"),n()()(),t(77,"tbody"),g(78,k,31,10,"tr",null,O),n()()()()),p&2&&(i(4),a(o(5,14,"library.title")),i(3),a(o(8,16,"library.subtitle")),i(6),s(" ",o(14,18,"common.export")," "),i(5),s(" ",o(19,20,"library.addBook")," "),i(3),m(_.stats),i(6),v("placeholder",o(28,22,"library.searchBooks")),i(5),a(o(33,24,"library.allCategories")),i(10),a(o(43,26,"library.allStatus")),i(13),a(o(56,28,"library.bookTitle")),i(3),a(o(59,30,"library.author")),i(5),a(o(64,32,"library.category")),i(3),a(o(67,34,"library.copies")),i(3),a(o(70,36,"library.available")),i(3),a(o(73,38,"common.status")),i(3),a(o(76,40,"common.actions")),i(3),m(_.books))},dependencies:[h,M],styles:[`

.library[_ngcontent-%COMP%] {
  padding: 24px;
}
.library__header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}
.library__title[_ngcontent-%COMP%] {
  font-size: 24px;
  font-weight: 600;
  color: var(--primary-color);
  margin: 0 0 4px;
}
.library__subtitle[_ngcontent-%COMP%] {
  font-size: 14px;
  color: var(--text-muted);
  margin: 0;
}
.library__actions[_ngcontent-%COMP%] {
  display: flex;
  gap: 12px;
}
.library__stats[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
}
.library__filters[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}
.library__table-container[_ngcontent-%COMP%] {
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
.stat-card--info[_ngcontent-%COMP%]   .stat-card__icon[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #17a2b8,
      #138496);
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
.book-cell[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
}
.book-cell__icon[_ngcontent-%COMP%] {
  color: var(--primary-color);
}
.book-cell__title[_ngcontent-%COMP%] {
  font-weight: 500;
}
.status-badge[_ngcontent-%COMP%] {
  display: inline-flex;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}
.status-badge--available[_ngcontent-%COMP%] {
  background: rgba(40, 167, 69, 0.1);
  color: #28a745;
}
.status-badge--limited[_ngcontent-%COMP%] {
  background: rgba(255, 193, 7, 0.1);
  color: #e0a800;
}
.status-badge--unavailable[_ngcontent-%COMP%] {
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
.action-btn--issue[_ngcontent-%COMP%] {
  color: #28a745;
}
.action-btn--issue[_ngcontent-%COMP%]:hover {
  background: rgba(40, 167, 69, 0.1);
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
[dir=rtl][_ngcontent-%COMP%]   .book-cell[_ngcontent-%COMP%] {
  flex-direction: row-reverse;
}
@media (max-width: 768px) {
  .library__header[_ngcontent-%COMP%] {
    flex-direction: column;
    gap: 16px;
  }
  .library__actions[_ngcontent-%COMP%] {
    width: 100%;
    justify-content: flex-end;
  }
  .library__filters[_ngcontent-%COMP%] {
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
}`]})}}return c})();export{L as LibraryComponent};
