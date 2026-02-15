import{a as C}from"./chunk-VMT66XCF.js";import{d as f}from"./chunk-BJ2JVOKX.js";import{$ as x,Cb as e,Db as i,Mb as b,Na as a,Ob as c,Pb as l,W as h,hb as m,kb as _,lb as p,mb as n,nb as t,ob as v,pc as u}from"./chunk-IXPTXOMZ.js";var M=(r,d)=>d.label,P=(r,d)=>d.text,y=(r,d)=>d.title;function O(r,d){if(r&1&&(n(0,"div")(1,"div",31)(2,"span",11),e(3),t()(),n(4,"div",32)(5,"h3",33),e(6),t(),n(7,"p",34),e(8),c(9,"translate"),t()()()),r&2){let o=d.$implicit;m("stat-card stat-card--",o.color,""),a(3),i(o.icon),a(3),i(o.value),a(2),i(l(9,6,o.label))}}function S(r,d){if(r&1&&(n(0,"li",14)(1,"div")(2,"span",11),e(3),t()(),n(4,"div",35)(5,"p",36),e(6),t(),n(7,"span",37),e(8),t()()()),r&2){let o=d.$implicit;a(),m("activity-list__icon activity-list__icon--",o.color,""),a(2),i(o.icon),a(3),i(o.text),a(2),i(o.time)}}function w(r,d){if(r&1&&(n(0,"li",16)(1,"div",38)(2,"span",39),e(3),t(),n(4,"span",40),e(5),t()(),n(6,"div",41)(7,"h4",42),e(8),t(),n(9,"span",43),e(10),t()()()),r&2){let o=d.$implicit;a(3),i(o.date.split(" ")[1]),a(2),i(o.date.split(" ")[0]),a(3),i(o.title),a(2),i(o.type)}}var D=(()=>{class r{constructor(){this.languageService=h(C),this.stats=[{icon:"people",value:"2,450",label:"dashboard.totalStudents",color:"primary"},{icon:"school",value:"150",label:"dashboard.professors",color:"success"},{icon:"menu_book",value:"85",label:"dashboard.courses",color:"warning"},{icon:"apartment",value:"12",label:"dashboard.departments",color:"info"}],this.recentActivities=[{icon:"person_add",text:"New student registered",time:"2 min ago",color:"primary"},{icon:"edit",text:"Course updated",time:"15 min ago",color:"warning"},{icon:"payment",text:"Fee payment received",time:"1 hour ago",color:"success"},{icon:"event",text:"Event scheduled",time:"3 hours ago",color:"info"},{icon:"delete",text:"Record deleted",time:"5 hours ago",color:"danger"}],this.upcomingEvents=[{title:"Annual Sports Day",date:"Mar 15, 2024",type:"Sports"},{title:"Science Exhibition",date:"Mar 20, 2024",type:"Academic"},{title:"Parent Meeting",date:"Mar 25, 2024",type:"Meeting"},{title:"Cultural Festival",date:"Apr 01, 2024",type:"Cultural"}]}static{this.\u0275fac=function(s){return new(s||r)}}static{this.\u0275cmp=x({type:r,selectors:[["app-dashboard"]],standalone:!0,features:[b],decls:76,vars:24,consts:[[1,"dashboard"],[1,"dashboard__header"],[1,"dashboard__title"],[1,"dashboard__subtitle"],[1,"dashboard__stats"],[3,"class"],[1,"dashboard__grid"],[1,"dashboard__card"],[1,"dashboard__card-header"],[1,"dashboard__card-title"],[1,"dashboard__card-action"],[1,"material-icons"],[1,"dashboard__card-body"],[1,"activity-list"],[1,"activity-list__item"],[1,"event-list"],[1,"event-list__item"],[1,"dashboard__card","dashboard__card--wide"],[1,"dashboard__card-tabs"],[1,"dashboard__tab","dashboard__tab--active"],[1,"dashboard__tab"],[1,"chart-placeholder"],[1,"chart-placeholder__bars"],[1,"chart-placeholder__bar",2,"height","60%"],[1,"chart-placeholder__bar",2,"height","80%"],[1,"chart-placeholder__bar",2,"height","45%"],[1,"chart-placeholder__bar",2,"height","90%"],[1,"chart-placeholder__bar",2,"height","70%"],[1,"chart-placeholder__bar",2,"height","55%"],[1,"chart-placeholder__bar",2,"height","75%"],[1,"chart-placeholder__labels"],[1,"stat-card__icon"],[1,"stat-card__content"],[1,"stat-card__value"],[1,"stat-card__label"],[1,"activity-list__content"],[1,"activity-list__text"],[1,"activity-list__time"],[1,"event-list__date"],[1,"event-list__day"],[1,"event-list__month"],[1,"event-list__content"],[1,"event-list__title"],[1,"event-list__type"]],template:function(s,g){s&1&&(n(0,"div",0)(1,"div",1)(2,"h1",2),e(3),c(4,"translate"),t(),n(5,"p",3),e(6),c(7,"translate"),t()(),n(8,"div",4),_(9,O,10,8,"div",5,M),t(),n(11,"div",6)(12,"div",7)(13,"div",8)(14,"h3",9),e(15),c(16,"translate"),t(),n(17,"button",10)(18,"span",11),e(19,"more_vert"),t()()(),n(20,"div",12)(21,"ul",13),_(22,S,9,6,"li",14,P),t()()(),n(24,"div",7)(25,"div",8)(26,"h3",9),e(27),c(28,"translate"),t(),n(29,"button",10)(30,"span",11),e(31,"add"),t()()(),n(32,"div",12)(33,"ul",15),_(34,w,11,4,"li",16,y),t()()(),n(36,"div",17)(37,"div",8)(38,"h3",9),e(39),c(40,"translate"),t(),n(41,"div",18)(42,"button",19),e(43),c(44,"translate"),t(),n(45,"button",20),e(46),c(47,"translate"),t(),n(48,"button",20),e(49),c(50,"translate"),t()()(),n(51,"div",12)(52,"div",21)(53,"div",22),v(54,"div",23)(55,"div",24)(56,"div",25)(57,"div",26)(58,"div",27)(59,"div",28)(60,"div",29),t(),n(61,"div",30)(62,"span"),e(63,"Mon"),t(),n(64,"span"),e(65,"Tue"),t(),n(66,"span"),e(67,"Wed"),t(),n(68,"span"),e(69,"Thu"),t(),n(70,"span"),e(71,"Fri"),t(),n(72,"span"),e(73,"Sat"),t(),n(74,"span"),e(75,"Sun"),t()()()()()()()),s&2&&(a(3),i(l(4,8,"dashboard.title")),a(3),i(l(7,10,"dashboard.welcome")),a(3),p(g.stats),a(6),i(l(16,12,"dashboard.recentActivities")),a(7),p(g.recentActivities),a(5),i(l(28,14,"dashboard.upcomingEvents")),a(7),p(g.upcomingEvents),a(5),i(l(40,16,"dashboard.studentStatistics")),a(4),i(l(44,18,"common.weekly")),a(3),i(l(47,20,"common.monthly")),a(3),i(l(50,22,"common.yearly")))},dependencies:[u,f],styles:[`

.dashboard[_ngcontent-%COMP%] {
  padding: 24px;
}
.dashboard__header[_ngcontent-%COMP%] {
  margin-bottom: 24px;
}
.dashboard__title[_ngcontent-%COMP%] {
  font-size: 28px;
  font-weight: 600;
  color: var(--primary-color);
  margin: 0 0 8px;
}
.dashboard__subtitle[_ngcontent-%COMP%] {
  color: var(--text-muted);
  margin: 0;
  font-size: 14px;
}
.dashboard__stats[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
}
.dashboard__grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}
@media (max-width: 1200px) {
  .dashboard__grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
}
.dashboard__card[_ngcontent-%COMP%] {
  background: var(--bg-white);
  border-radius: 12px;
  box-shadow: var(--card-shadow);
  overflow: hidden;
}
.dashboard__card--wide[_ngcontent-%COMP%] {
  grid-column: span 2;
}
@media (max-width: 1200px) {
  .dashboard__card--wide[_ngcontent-%COMP%] {
    grid-column: span 1;
  }
}
.dashboard__card-header[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
}
.dashboard__card-title[_ngcontent-%COMP%] {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
  margin: 0;
}
.dashboard__card-action[_ngcontent-%COMP%] {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  border-radius: 8px;
  color: var(--text-muted);
  transition: all 0.2s;
}
.dashboard__card-action[_ngcontent-%COMP%]:hover {
  background: var(--bg-light);
  color: var(--primary-color);
}
.dashboard__card-action[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {
  font-size: 20px;
}
.dashboard__card-tabs[_ngcontent-%COMP%] {
  display: flex;
  gap: 8px;
}
.dashboard__tab[_ngcontent-%COMP%] {
  padding: 8px 16px;
  border: none;
  background: none;
  font-size: 13px;
  color: var(--text-muted);
  cursor: pointer;
  border-radius: 20px;
  transition: all 0.2s;
}
.dashboard__tab[_ngcontent-%COMP%]:hover {
  color: var(--primary-color);
}
.dashboard__tab--active[_ngcontent-%COMP%] {
  background: var(--primary-color);
  color: white;
}
.dashboard__card-body[_ngcontent-%COMP%] {
  padding: 24px;
}
.stat-card[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background: var(--bg-white);
  border-radius: 12px;
  box-shadow: var(--card-shadow);
  transition: transform 0.2s, box-shadow 0.2s;
}
.stat-card[_ngcontent-%COMP%]:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}
.stat-card__icon[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 12px;
}
.stat-card__icon[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {
  font-size: 28px;
  color: white;
}
.stat-card__content[_ngcontent-%COMP%] {
  flex: 1;
}
.stat-card__value[_ngcontent-%COMP%] {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-color);
  margin: 0 0 4px;
}
.stat-card__label[_ngcontent-%COMP%] {
  font-size: 14px;
  color: var(--text-muted);
  margin: 0;
}
.stat-card--primary[_ngcontent-%COMP%]   .stat-card__icon[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #5b5fc7 0%,
      #4a4eb8 100%);
}
.stat-card--success[_ngcontent-%COMP%]   .stat-card__icon[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #28a745 0%,
      #20963a 100%);
}
.stat-card--warning[_ngcontent-%COMP%]   .stat-card__icon[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #ffc107 0%,
      #e0a800 100%);
}
.stat-card--info[_ngcontent-%COMP%]   .stat-card__icon[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #17a2b8 0%,
      #138496 100%);
}
.stat-card--danger[_ngcontent-%COMP%]   .stat-card__icon[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #dc3545 0%,
      #c82333 100%);
}
.activity-list[_ngcontent-%COMP%] {
  list-style: none;
  padding: 0;
  margin: 0;
}
.activity-list__item[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border-color);
}
.activity-list__item[_ngcontent-%COMP%]:last-child {
  border-bottom: none;
  padding-bottom: 0;
}
.activity-list__item[_ngcontent-%COMP%]:first-child {
  padding-top: 0;
}
.activity-list__icon[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  flex-shrink: 0;
}
.activity-list__icon[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {
  font-size: 20px;
  color: white;
}
.activity-list__icon--primary[_ngcontent-%COMP%] {
  background: #5b5fc7;
}
.activity-list__icon--success[_ngcontent-%COMP%] {
  background: #28a745;
}
.activity-list__icon--warning[_ngcontent-%COMP%] {
  background: #ffc107;
}
.activity-list__icon--info[_ngcontent-%COMP%] {
  background: #17a2b8;
}
.activity-list__icon--danger[_ngcontent-%COMP%] {
  background: #dc3545;
}
.activity-list__content[_ngcontent-%COMP%] {
  flex: 1;
  min-width: 0;
}
.activity-list__text[_ngcontent-%COMP%] {
  font-size: 14px;
  color: var(--text-color);
  margin: 0 0 4px;
}
.activity-list__time[_ngcontent-%COMP%] {
  font-size: 12px;
  color: var(--text-muted);
}
.event-list[_ngcontent-%COMP%] {
  list-style: none;
  padding: 0;
  margin: 0;
}
.event-list__item[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border-color);
}
.event-list__item[_ngcontent-%COMP%]:last-child {
  border-bottom: none;
  padding-bottom: 0;
}
.event-list__item[_ngcontent-%COMP%]:first-child {
  padding-top: 0;
}
.event-list__date[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: var(--bg-light);
  border-radius: 10px;
  flex-shrink: 0;
}
.event-list__day[_ngcontent-%COMP%] {
  font-size: 16px;
  font-weight: 700;
  color: var(--primary-color);
  line-height: 1;
}
.event-list__month[_ngcontent-%COMP%] {
  font-size: 11px;
  color: var(--text-muted);
  text-transform: uppercase;
  margin-top: 2px;
}
.event-list__content[_ngcontent-%COMP%] {
  flex: 1;
  min-width: 0;
}
.event-list__title[_ngcontent-%COMP%] {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color);
  margin: 0 0 4px;
}
.event-list__type[_ngcontent-%COMP%] {
  font-size: 12px;
  color: var(--text-muted);
}
.chart-placeholder[_ngcontent-%COMP%] {
  height: 250px;
  display: flex;
  flex-direction: column;
}
.chart-placeholder__bars[_ngcontent-%COMP%] {
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  gap: 16px;
  padding-bottom: 16px;
}
.chart-placeholder__bar[_ngcontent-%COMP%] {
  flex: 1;
  max-width: 60px;
  background:
    linear-gradient(
      180deg,
      var(--primary-color) 0%,
      rgba(91, 95, 199, 0.5) 100%);
  border-radius: 8px 8px 0 0;
  transition: height 0.3s ease;
}
.chart-placeholder__bar[_ngcontent-%COMP%]:hover {
  opacity: 0.8;
}
.chart-placeholder__labels[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-around;
  padding-top: 12px;
  border-top: 1px solid var(--border-color);
}
.chart-placeholder__labels[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  font-size: 12px;
  color: var(--text-muted);
}
[dir=rtl][_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%] {
  flex-direction: row-reverse;
}
[dir=rtl][_ngcontent-%COMP%]   .activity-list__item[_ngcontent-%COMP%], [dir=rtl][_ngcontent-%COMP%]   .event-list__item[_ngcontent-%COMP%] {
  flex-direction: row-reverse;
}`]})}}return r})();export{D as DashboardComponent};
