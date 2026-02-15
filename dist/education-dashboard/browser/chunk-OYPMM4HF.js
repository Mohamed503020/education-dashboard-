import{a as v}from"./chunk-VMT66XCF.js";import{d as u}from"./chunk-BJ2JVOKX.js";import{$ as h,Cb as t,Db as i,Eb as _,Fb as M,Mb as f,Na as a,Ob as r,Pb as d,W as m,hb as s,kb as x,lb as b,mb as n,nb as e,ob as c,pc as C}from"./chunk-IXPTXOMZ.js";var P=(l,g)=>g.id;function O(l,g){if(l&1&&(n(0,"div")(1,"div",17)(2,"span",18),t(3),e(),n(4,"span",19),t(5),e()(),n(6,"div",20)(7,"h3",21),t(8),e(),n(9,"p",22),t(10),e()(),n(11,"div",23)(12,"span"),t(13),e()(),n(14,"div",24)(15,"button",25)(16,"span",7),t(17,"edit"),e()(),n(18,"button",26)(19,"span",7),t(20,"delete"),e()()()()),l&2){let o=g.$implicit;s("holiday-card holiday-card--",o.type,""),a(3),i(o.date),a(2),i(o.day),a(3),i(o.name),a(2),i(o.description),a(2),s("type-badge type-badge--",o.type,""),a(),i(o.type)}}var z=(()=>{class l{constructor(){this.languageService=m(v),this.currentYear=new Date().getFullYear(),this.holidays=[{id:1,name:"New Year's Day",date:"January 1",day:"Monday",type:"national",description:"Celebration of the new year"},{id:2,name:"Martin Luther King Jr. Day",date:"January 15",day:"Monday",type:"national",description:"Honoring MLK Jr."},{id:3,name:"Spring Break",date:"March 11-15",day:"Mon-Fri",type:"academic",description:"Academic spring break"},{id:4,name:"Easter",date:"March 31",day:"Sunday",type:"religious",description:"Easter Sunday"},{id:5,name:"Memorial Day",date:"May 27",day:"Monday",type:"national",description:"Remembering fallen soldiers"},{id:6,name:"Independence Day",date:"July 4",day:"Thursday",type:"national",description:"US Independence Day"},{id:7,name:"Labor Day",date:"September 2",day:"Monday",type:"national",description:"Celebrating workers"},{id:8,name:"Thanksgiving",date:"November 28",day:"Thursday",type:"national",description:"Thanksgiving Day"},{id:9,name:"Winter Break",date:"December 23 - January 3",day:"Various",type:"academic",description:"Winter academic break"},{id:10,name:"Christmas Day",date:"December 25",day:"Wednesday",type:"religious",description:"Christmas celebration"}]}static{this.\u0275fac=function(p){return new(p||l)}}static{this.\u0275cmp=h({type:l,selectors:[["app-holiday"]],standalone:!0,features:[f],decls:44,vars:25,consts:[[1,"holiday"],[1,"holiday__header"],[1,"holiday__title-section"],[1,"holiday__title"],[1,"holiday__subtitle"],[1,"holiday__actions"],[1,"btn","btn--outline"],[1,"material-icons"],[1,"btn","btn--primary"],[1,"holiday__legend"],[1,"legend-item"],[1,"legend-dot","legend-dot--national"],[1,"legend-dot","legend-dot--religious"],[1,"legend-dot","legend-dot--academic"],[1,"legend-dot","legend-dot--other"],[1,"holiday__list"],[3,"class"],[1,"holiday-card__date"],[1,"holiday-card__date-text"],[1,"holiday-card__day"],[1,"holiday-card__content"],[1,"holiday-card__name"],[1,"holiday-card__description"],[1,"holiday-card__type"],[1,"holiday-card__actions"],[1,"holiday-card__btn"],[1,"holiday-card__btn","holiday-card__btn--delete"]],template:function(p,y){p&1&&(n(0,"div",0)(1,"div",1)(2,"div",2)(3,"h1",3),t(4),r(5,"translate"),e(),n(6,"p",4),t(7),r(8,"translate"),e()(),n(9,"div",5)(10,"button",6)(11,"span",7),t(12,"download"),e(),t(13),r(14,"translate"),e(),n(15,"button",8)(16,"span",7),t(17,"add"),e(),t(18),r(19,"translate"),e()()(),n(20,"div",9)(21,"div",10),c(22,"span",11),n(23,"span"),t(24),r(25,"translate"),e()(),n(26,"div",10),c(27,"span",12),n(28,"span"),t(29),r(30,"translate"),e()(),n(31,"div",10),c(32,"span",13),n(33,"span"),t(34),r(35,"translate"),e()(),n(36,"div",10),c(37,"span",14),n(38,"span"),t(39),r(40,"translate"),e()()(),n(41,"div",15),x(42,O,21,11,"div",16,P),e()()),p&2&&(a(4),i(d(5,9,"holiday.title")),a(3),M("",d(8,11,"holiday.subtitle")," ",y.currentYear,""),a(6),_(" ",d(14,13,"common.export")," "),a(5),_(" ",d(19,15,"holiday.addNew")," "),a(6),i(d(25,17,"holiday.national")),a(5),i(d(30,19,"holiday.religious")),a(5),i(d(35,21,"holiday.academic")),a(5),i(d(40,23,"holiday.other")),a(3),b(y.holidays))},dependencies:[C,u],styles:[`

.holiday[_ngcontent-%COMP%] {
  padding: 24px;
}
.holiday__header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}
.holiday__title[_ngcontent-%COMP%] {
  font-size: 24px;
  font-weight: 600;
  color: var(--primary-color);
  margin: 0 0 4px;
}
.holiday__subtitle[_ngcontent-%COMP%] {
  font-size: 14px;
  color: var(--text-muted);
  margin: 0;
}
.holiday__actions[_ngcontent-%COMP%] {
  display: flex;
  gap: 12px;
}
.holiday__legend[_ngcontent-%COMP%] {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  padding: 16px;
  background: var(--bg-white);
  border-radius: 12px;
  box-shadow: var(--card-shadow);
}
.holiday__list[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 16px;
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
.legend-item[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--text-color);
}
.legend-dot[_ngcontent-%COMP%] {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.legend-dot--national[_ngcontent-%COMP%] {
  background: #5b5fc7;
}
.legend-dot--religious[_ngcontent-%COMP%] {
  background: #6f42c1;
}
.legend-dot--academic[_ngcontent-%COMP%] {
  background: #28a745;
}
.legend-dot--other[_ngcontent-%COMP%] {
  background: #6c757d;
}
.holiday-card[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 20px 24px;
  background: var(--bg-white);
  border-radius: 12px;
  box-shadow: var(--card-shadow);
  border-left: 4px solid transparent;
  transition: transform 0.2s, box-shadow 0.2s;
}
.holiday-card[_ngcontent-%COMP%]:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.holiday-card--national[_ngcontent-%COMP%] {
  border-left-color: #5b5fc7;
}
.holiday-card--religious[_ngcontent-%COMP%] {
  border-left-color: #6f42c1;
}
.holiday-card--academic[_ngcontent-%COMP%] {
  border-left-color: #28a745;
}
.holiday-card--other[_ngcontent-%COMP%] {
  border-left-color: #6c757d;
}
.holiday-card__date[_ngcontent-%COMP%] {
  min-width: 140px;
  text-align: center;
  padding-right: 24px;
  border-right: 1px solid var(--border-color);
}
.holiday-card__date-text[_ngcontent-%COMP%] {
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
}
.holiday-card__day[_ngcontent-%COMP%] {
  display: block;
  font-size: 13px;
  color: var(--text-muted);
  margin-top: 4px;
}
.holiday-card__content[_ngcontent-%COMP%] {
  flex: 1;
  min-width: 0;
}
.holiday-card__name[_ngcontent-%COMP%] {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
  margin: 0 0 4px;
}
.holiday-card__description[_ngcontent-%COMP%] {
  font-size: 13px;
  color: var(--text-muted);
  margin: 0;
}
.holiday-card__type[_ngcontent-%COMP%] {
  min-width: 100px;
}
.holiday-card__actions[_ngcontent-%COMP%] {
  display: flex;
  gap: 8px;
}
.holiday-card__btn[_ngcontent-%COMP%] {
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s;
}
.holiday-card__btn[_ngcontent-%COMP%]:hover {
  background: var(--bg-light);
  color: var(--primary-color);
}
.holiday-card__btn--delete[_ngcontent-%COMP%]:hover {
  color: #dc3545;
}
.holiday-card__btn[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {
  font-size: 18px;
}
.type-badge[_ngcontent-%COMP%] {
  display: inline-flex;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  text-transform: capitalize;
}
.type-badge--national[_ngcontent-%COMP%] {
  background: rgba(91, 95, 199, 0.1);
  color: #5b5fc7;
}
.type-badge--religious[_ngcontent-%COMP%] {
  background: rgba(111, 66, 193, 0.1);
  color: #6f42c1;
}
.type-badge--academic[_ngcontent-%COMP%] {
  background: rgba(40, 167, 69, 0.1);
  color: #28a745;
}
.type-badge--other[_ngcontent-%COMP%] {
  background: rgba(108, 117, 125, 0.1);
  color: #6c757d;
}
[dir=rtl][_ngcontent-%COMP%]   .holiday-card[_ngcontent-%COMP%] {
  flex-direction: row-reverse;
  border-left: none;
  border-right: 4px solid transparent;
}
[dir=rtl][_ngcontent-%COMP%]   .holiday-card--national[_ngcontent-%COMP%] {
  border-right-color: #5b5fc7;
}
[dir=rtl][_ngcontent-%COMP%]   .holiday-card--religious[_ngcontent-%COMP%] {
  border-right-color: #6f42c1;
}
[dir=rtl][_ngcontent-%COMP%]   .holiday-card--academic[_ngcontent-%COMP%] {
  border-right-color: #28a745;
}
[dir=rtl][_ngcontent-%COMP%]   .holiday-card--other[_ngcontent-%COMP%] {
  border-right-color: #6c757d;
}
[dir=rtl][_ngcontent-%COMP%]   .holiday-card[_ngcontent-%COMP%]:hover {
  transform: translateX(-4px);
}
[dir=rtl][_ngcontent-%COMP%]   .holiday-card__date[_ngcontent-%COMP%] {
  padding-right: 0;
  padding-left: 24px;
  border-right: none;
  border-left: 1px solid var(--border-color);
}
[dir=rtl][_ngcontent-%COMP%]   .holiday__legend[_ngcontent-%COMP%] {
  flex-direction: row-reverse;
}
[dir=rtl][_ngcontent-%COMP%]   .legend-item[_ngcontent-%COMP%] {
  flex-direction: row-reverse;
}
@media (max-width: 768px) {
  .holiday__header[_ngcontent-%COMP%] {
    flex-direction: column;
    gap: 16px;
  }
  .holiday__actions[_ngcontent-%COMP%] {
    width: 100%;
    justify-content: flex-end;
  }
  .holiday__legend[_ngcontent-%COMP%] {
    flex-wrap: wrap;
    gap: 16px;
  }
  .holiday-card[_ngcontent-%COMP%] {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  .holiday-card__date[_ngcontent-%COMP%] {
    border-right: none;
    border-bottom: 1px solid var(--border-color);
    padding-right: 0;
    padding-bottom: 16px;
    width: 100%;
    text-align: left;
  }
  .holiday-card__actions[_ngcontent-%COMP%] {
    width: 100%;
    justify-content: flex-end;
  }
}`]})}}return l})();export{z as HolidayComponent};
