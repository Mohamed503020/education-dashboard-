import{a as h}from"./chunk-VMT66XCF.js";import{d as O}from"./chunk-BJ2JVOKX.js";import{$ as u,Cb as t,Db as r,Eb as _,Fb as M,Mb as C,Na as a,Ob as c,Pb as l,W as x,db as b,hb as p,kb as g,lb as m,mb as e,nb as n,ob as f,pc as P}from"./chunk-IXPTXOMZ.js";var y=(o,d)=>d.label,E=(o,d)=>d.id;function S(o,d){if(o&1&&(e(0,"div")(1,"div",26)(2,"span",7),t(3),n()(),e(4,"div",27)(5,"h3",28),t(6),n(),e(7,"p",29),t(8),c(9,"translate"),n()()()),o&2){let i=d.$implicit;p("stat-card stat-card--",i.color,""),a(3),r(i.icon),a(3),r(i.value),a(2),r(l(9,6,i.label))}}function w(o,d){if(o&1&&(e(0,"div",25)(1,"div",30)(2,"span"),t(3),n(),e(4,"span"),t(5),n()(),e(6,"h3",31),t(7),n(),e(8,"div",32)(9,"div",33)(10,"span",7),t(11,"calendar_today"),n(),e(12,"span"),t(13),n()(),e(14,"div",33)(15,"span",7),t(16,"schedule"),n(),e(17,"span"),t(18),n()(),e(19,"div",33)(20,"span",7),t(21,"location_on"),n(),e(22,"span"),t(23),n()(),e(24,"div",33)(25,"span",7),t(26,"person"),n(),e(27,"span"),t(28),n()()(),e(29,"div",34)(30,"div",35)(31,"span",7),t(32,"people"),n(),e(33,"span"),t(34),c(35,"translate"),n()(),e(36,"div",36)(37,"button",37)(38,"span",7),t(39,"visibility"),n()(),e(40,"button",38)(41,"span",7),t(42,"edit"),n()(),e(43,"button",39)(44,"span",7),t(45,"delete"),n()()()()()),o&2){let i=d.$implicit;a(2),p("event-card__category event-card__category--",i.category,""),a(),_(" ",i.category," "),a(),p("event-card__status event-card__status--",i.status,""),a(),_(" ",i.status," "),a(2),r(i.title),a(6),r(i.date),a(5),r(i.time),a(5),r(i.location),a(5),r(i.organizer),a(6),M("",i.attendees," ",l(35,15,"events.attendees"),"")}}var j=(()=>{class o{constructor(){this.languageService=x(h),this.stats=[{icon:"event",value:"24",label:"events.totalEvents",color:"primary"},{icon:"event_available",value:"12",label:"events.upcoming",color:"success"},{icon:"pending",value:"3",label:"events.ongoing",color:"warning"},{icon:"event_busy",value:"9",label:"events.completed",color:"info"}],this.events=[{id:1,title:"Annual Sports Day",date:"Mar 15, 2024",time:"9:00 AM",location:"Sports Ground",organizer:"Sports Dept.",category:"sports",status:"upcoming",attendees:500},{id:2,title:"Science Exhibition",date:"Mar 20, 2024",time:"10:00 AM",location:"Main Hall",organizer:"Science Club",category:"academic",status:"upcoming",attendees:300},{id:3,title:"Faculty Meeting",date:"Mar 10, 2024",time:"2:00 PM",location:"Conference Room",organizer:"Admin",category:"meeting",status:"ongoing",attendees:50},{id:4,title:"Cultural Festival",date:"Apr 01, 2024",time:"5:00 PM",location:"Auditorium",organizer:"Cultural Club",category:"cultural",status:"upcoming",attendees:800},{id:5,title:"Career Fair",date:"Feb 28, 2024",time:"11:00 AM",location:"Campus Plaza",organizer:"Placement Cell",category:"academic",status:"completed",attendees:450}]}static{this.\u0275fac=function(s){return new(s||o)}}static{this.\u0275cmp=u({type:o,selectors:[["app-event-management"]],standalone:!0,features:[C],decls:50,vars:18,consts:[[1,"events"],[1,"events__header"],[1,"events__title-section"],[1,"events__title"],[1,"events__subtitle"],[1,"events__actions"],[1,"btn","btn--primary"],[1,"material-icons"],[1,"events__stats"],[3,"class"],[1,"events__filters"],[1,"search-box"],[1,"material-icons","search-box__icon"],["type","text",1,"search-box__input",3,"placeholder"],[1,"filter-group"],[1,"filter-select"],["value",""],["value","academic"],["value","sports"],["value","cultural"],["value","meeting"],["value","upcoming"],["value","ongoing"],["value","completed"],[1,"events__grid"],[1,"event-card"],[1,"stat-card__icon"],[1,"stat-card__content"],[1,"stat-card__value"],[1,"stat-card__label"],[1,"event-card__header"],[1,"event-card__title"],[1,"event-card__details"],[1,"event-card__detail"],[1,"event-card__footer"],[1,"event-card__attendees"],[1,"event-card__actions"],["title","View",1,"event-card__btn"],["title","Edit",1,"event-card__btn"],["title","Delete",1,"event-card__btn","event-card__btn--delete"]],template:function(s,v){s&1&&(e(0,"div",0)(1,"div",1)(2,"div",2)(3,"h1",3),t(4),c(5,"translate"),n(),e(6,"p",4),t(7),c(8,"translate"),n()(),e(9,"div",5)(10,"button",6)(11,"span",7),t(12,"add"),n(),t(13),c(14,"translate"),n()()(),e(15,"div",8),g(16,S,10,8,"div",9,y),n(),e(18,"div",10)(19,"div",11)(20,"span",12),t(21,"search"),n(),f(22,"input",13),c(23,"translate"),n(),e(24,"div",14)(25,"select",15)(26,"option",16),t(27),c(28,"translate"),n(),e(29,"option",17),t(30,"Academic"),n(),e(31,"option",18),t(32,"Sports"),n(),e(33,"option",19),t(34,"Cultural"),n(),e(35,"option",20),t(36,"Meeting"),n()(),e(37,"select",15)(38,"option",16),t(39),c(40,"translate"),n(),e(41,"option",21),t(42,"Upcoming"),n(),e(43,"option",22),t(44,"Ongoing"),n(),e(45,"option",23),t(46,"Completed"),n()()()(),e(47,"div",24),g(48,w,46,17,"div",25,E),n()()),s&2&&(a(4),r(l(5,6,"events.title")),a(3),r(l(8,8,"events.subtitle")),a(6),_(" ",l(14,10,"events.addNew")," "),a(3),m(v.stats),a(6),b("placeholder",l(23,12,"events.searchEvents")),a(5),r(l(28,14,"events.allCategories")),a(12),r(l(40,16,"common.allStatus")),a(9),m(v.events))},dependencies:[P,O],styles:[`

.events[_ngcontent-%COMP%] {
  padding: 24px;
}
.events__header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}
.events__title[_ngcontent-%COMP%] {
  font-size: 24px;
  font-weight: 600;
  color: var(--primary-color);
  margin: 0 0 4px;
}
.events__subtitle[_ngcontent-%COMP%] {
  font-size: 14px;
  color: var(--text-muted);
  margin: 0;
}
.events__stats[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
}
.events__filters[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}
.events__grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 24px;
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
.event-card[_ngcontent-%COMP%] {
  background: var(--bg-white);
  border-radius: 12px;
  padding: 20px;
  box-shadow: var(--card-shadow);
  transition: transform 0.2s, box-shadow 0.2s;
}
.event-card[_ngcontent-%COMP%]:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}
.event-card__header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.event-card__category[_ngcontent-%COMP%] {
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 12px;
  text-transform: uppercase;
}
.event-card__category--academic[_ngcontent-%COMP%] {
  background: rgba(91, 95, 199, 0.1);
  color: #5b5fc7;
}
.event-card__category--sports[_ngcontent-%COMP%] {
  background: rgba(40, 167, 69, 0.1);
  color: #28a745;
}
.event-card__category--cultural[_ngcontent-%COMP%] {
  background: rgba(111, 66, 193, 0.1);
  color: #6f42c1;
}
.event-card__category--meeting[_ngcontent-%COMP%] {
  background: rgba(255, 193, 7, 0.1);
  color: #e0a800;
}
.event-card__category--other[_ngcontent-%COMP%] {
  background: rgba(108, 117, 125, 0.1);
  color: #6c757d;
}
.event-card__status[_ngcontent-%COMP%] {
  font-size: 11px;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 12px;
  text-transform: capitalize;
}
.event-card__status--upcoming[_ngcontent-%COMP%] {
  background: rgba(23, 162, 184, 0.1);
  color: #17a2b8;
}
.event-card__status--ongoing[_ngcontent-%COMP%] {
  background: rgba(255, 193, 7, 0.1);
  color: #e0a800;
}
.event-card__status--completed[_ngcontent-%COMP%] {
  background: rgba(40, 167, 69, 0.1);
  color: #28a745;
}
.event-card__status--cancelled[_ngcontent-%COMP%] {
  background: rgba(220, 53, 69, 0.1);
  color: #dc3545;
}
.event-card__title[_ngcontent-%COMP%] {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
  margin: 0 0 16px;
}
.event-card__details[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-color);
}
.event-card__detail[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-muted);
}
.event-card__detail[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {
  font-size: 16px;
  color: var(--primary-color);
}
.event-card__footer[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.event-card__attendees[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--text-muted);
}
.event-card__attendees[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {
  font-size: 18px;
}
.event-card__actions[_ngcontent-%COMP%] {
  display: flex;
  gap: 4px;
}
.event-card__btn[_ngcontent-%COMP%] {
  padding: 6px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s;
}
.event-card__btn[_ngcontent-%COMP%]:hover {
  background: var(--bg-light);
  color: var(--primary-color);
}
.event-card__btn--delete[_ngcontent-%COMP%]:hover {
  color: #dc3545;
}
.event-card__btn[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {
  font-size: 18px;
}
[dir=rtl][_ngcontent-%COMP%]   .search-box__icon[_ngcontent-%COMP%] {
  left: auto;
  right: 12px;
}
[dir=rtl][_ngcontent-%COMP%]   .search-box__input[_ngcontent-%COMP%] {
  padding: 10px 40px 10px 12px;
}
[dir=rtl][_ngcontent-%COMP%]   .event-card__header[_ngcontent-%COMP%] {
  flex-direction: row-reverse;
}
[dir=rtl][_ngcontent-%COMP%]   .event-card__detail[_ngcontent-%COMP%] {
  flex-direction: row-reverse;
}
[dir=rtl][_ngcontent-%COMP%]   .event-card__footer[_ngcontent-%COMP%] {
  flex-direction: row-reverse;
}
[dir=rtl][_ngcontent-%COMP%]   .event-card__attendees[_ngcontent-%COMP%] {
  flex-direction: row-reverse;
}
[dir=rtl][_ngcontent-%COMP%]   .event-card__actions[_ngcontent-%COMP%] {
  flex-direction: row-reverse;
}
@media (max-width: 768px) {
  .events__header[_ngcontent-%COMP%] {
    flex-direction: column;
    gap: 16px;
  }
  .events__filters[_ngcontent-%COMP%] {
    flex-direction: column;
    align-items: stretch;
  }
  .events__grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
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
}`]})}}return o})();export{j as EventManagementComponent};
