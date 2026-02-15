import{a as N,b as R,c as j,d as U,e as H,f as K,g as G,h as J,i as Y,j as Q,k as X,l as Z,m as $,n as ee}from"./chunk-K2MEFKBR.js";import{d as q}from"./chunk-BJ2JVOKX.js";import{g as z,i as F,j as A}from"./chunk-YWRECBJH.js";import{$ as T,Bb as B,Cb as o,Db as g,Eb as C,Fb as V,Ib as f,Jb as x,Kb as h,Mb as L,Na as r,Ob as p,Pb as _,W as I,Xa as W,bb as P,db as b,fb as E,ib as w,ja as c,jb as k,ka as m,kb as y,lb as S,mb as n,nb as e,pc as D,rb as M,sb as v,tb as s}from"./chunk-IXPTXOMZ.js";var O=(l,u)=>u.id;function te(l,u){if(l&1&&(n(0,"option",28),o(1),e()),l&2){let t=u.$implicit;b("value",t),r(),g(t)}}function ne(l,u){if(l&1&&(n(0,"option",28),o(1),e()),l&2){let t=u.$implicit;b("value",t),r(),g(t)}}function ie(l,u){if(l&1){let t=M();n(0,"form",15,0),v("ngSubmit",function(){c(t);let i=s();return m(i.onSubmit())}),n(2,"div",16)(3,"h3",17)(4,"span",11),o(5,"info"),e(),o(6," Basic Information "),e(),n(7,"div",18)(8,"div",19)(9,"label",20),o(10,"Course Code *"),e(),n(11,"input",21),h("ngModelChange",function(i){c(t);let d=s();return x(d.course.code,i)||(d.course.code=i),m(i)}),e()(),n(12,"div",22)(13,"label",23),o(14,"Course Name *"),e(),n(15,"input",24),h("ngModelChange",function(i){c(t);let d=s();return x(d.course.name,i)||(d.course.name=i),m(i)}),e()(),n(16,"div",19)(17,"label",25),o(18,"Department *"),e(),n(19,"select",26),h("ngModelChange",function(i){c(t);let d=s();return x(d.course.department,i)||(d.course.department=i),m(i)}),n(20,"option",27),o(21,"Select Department"),e(),y(22,te,2,2,"option",28,k),e()(),n(24,"div",19)(25,"label",29),o(26,"Credits *"),e(),n(27,"input",30),h("ngModelChange",function(i){c(t);let d=s();return x(d.course.credits,i)||(d.course.credits=i),m(i)}),e()(),n(28,"div",19)(29,"label",31),o(30,"Professor *"),e(),n(31,"select",32),h("ngModelChange",function(i){c(t);let d=s();return x(d.course.professor,i)||(d.course.professor=i),m(i)}),n(32,"option",27),o(33,"Select Professor"),e(),y(34,ne,2,2,"option",28,k),e()(),n(36,"div",19)(37,"label",33),o(38,"Max Students"),e(),n(39,"input",34),h("ngModelChange",function(i){c(t);let d=s();return x(d.course.maxStudents,i)||(d.course.maxStudents=i),m(i)}),e()()()(),n(40,"div",16)(41,"h3",17)(42,"span",11),o(43,"description"),e(),o(44," Course Details "),e(),n(45,"div",18)(46,"div",35)(47,"label",36),o(48,"Description"),e(),n(49,"textarea",37),h("ngModelChange",function(i){c(t);let d=s();return x(d.course.description,i)||(d.course.description=i),m(i)}),e()(),n(50,"div",35)(51,"label",38),o(52,"Prerequisites"),e(),n(53,"input",39),h("ngModelChange",function(i){c(t);let d=s();return x(d.course.prerequisites,i)||(d.course.prerequisites=i),m(i)}),e()()()(),n(54,"div",16)(55,"h3",17)(56,"span",11),o(57,"schedule"),e(),o(58," Schedule "),e(),n(59,"div",18)(60,"div",19)(61,"label",40),o(62,"Class Schedule"),e(),n(63,"input",41),h("ngModelChange",function(i){c(t);let d=s();return x(d.course.schedule,i)||(d.course.schedule=i),m(i)}),e()(),n(64,"div",19)(65,"label",42),o(66,"Start Date"),e(),n(67,"input",43),h("ngModelChange",function(i){c(t);let d=s();return x(d.course.startDate,i)||(d.course.startDate=i),m(i)}),e()(),n(68,"div",19)(69,"label",44),o(70,"End Date"),e(),n(71,"input",45),h("ngModelChange",function(i){c(t);let d=s();return x(d.course.endDate,i)||(d.course.endDate=i),m(i)}),e()(),n(72,"div",19)(73,"label",46),o(74,"Status"),e(),n(75,"select",47),h("ngModelChange",function(i){c(t);let d=s();return x(d.course.status,i)||(d.course.status=i),m(i)}),n(76,"option",48),o(77,"Active"),e(),n(78,"option",49),o(79,"Inactive"),e(),n(80,"option",50),o(81,"Upcoming"),e()()()()(),n(82,"div",14)(83,"button",51),v("click",function(){c(t);let i=s();return m(i.onCancel())}),n(84,"span",11),o(85,"close"),e(),o(86),p(87,"translate"),e(),n(88,"button",52),v("click",function(){c(t);let i=s();return m(i.onReset())}),n(89,"span",11),o(90,"refresh"),e(),o(91," Reset "),e(),n(92,"button",53)(93,"span",11),o(94,"save"),e(),o(95),p(96,"translate"),e()()()}if(l&2){let t=B(1),a=s();r(11),f("ngModel",a.course.code),r(4),f("ngModel",a.course.name),r(4),f("ngModel",a.course.department),r(3),S(a.departments),r(5),f("ngModel",a.course.credits),r(4),f("ngModel",a.course.professor),r(3),S(a.professors),r(5),f("ngModel",a.course.maxStudents),r(10),f("ngModel",a.course.description),r(4),f("ngModel",a.course.prerequisites),r(10),f("ngModel",a.course.schedule),r(4),f("ngModel",a.course.startDate),r(4),f("ngModel",a.course.endDate),r(4),f("ngModel",a.course.status),r(11),C(" ",_(87,15,"common.cancel")," "),r(6),b("disabled",!t.valid),r(3),C(" ",_(96,17,"editCourse.saveChanges")," ")}}function oe(l,u){l&1&&(n(0,"div",63)(1,"span",11),o(2,"menu_book"),e(),n(3,"p"),o(4),p(5,"translate"),e()()),l&2&&(r(4),g(_(5,1,"editCourse.noLessons")))}function re(l,u){if(l&1){let t=M();n(0,"div",64)(1,"div",65)(2,"div",66),o(3),e(),n(4,"div",67)(5,"h4",68),o(6),e(),n(7,"p",69),o(8),e()(),n(9,"div",70)(10,"span",71)(11,"span",11),o(12,"schedule"),e(),o(13),e(),n(14,"span",72)(15,"span",11),o(16,"play_circle"),e(),o(17),e(),n(18,"span",72)(19,"span",11),o(20,"description"),e(),o(21),e()(),n(22,"button",73),v("click",function(){let i=c(t).$implicit,d=s(3);return m(d.removeLesson(i.id))}),n(23,"span",11),o(24,"delete"),e()()()()}if(l&2){let t=u.$implicit,a=s(3);r(3),g(t.order),r(3),g(t.title),r(2),g(t.description),r(5),C(" ",t.duration," "),r(4),C(" ",a.getVideosForLesson(t.id).length," videos "),r(4),C(" ",a.getPdfsForLesson(t.id).length," PDFs ")}}function ae(l,u){if(l&1&&y(0,re,25,6,"div",64,O),l&2){let t=s(2);S(t.lessons)}}function de(l,u){if(l&1){let t=M();n(0,"div",13)(1,"div",54)(2,"h4",55)(3,"span",11),o(4,"add_circle"),e(),o(5),p(6,"translate"),e(),n(7,"div",56)(8,"div",19)(9,"label",57),o(10),p(11,"translate"),e(),n(12,"input",58),h("ngModelChange",function(i){c(t);let d=s();return x(d.newLesson.title,i)||(d.newLesson.title=i),m(i)}),e()(),n(13,"div",19)(14,"label",57),o(15),p(16,"translate"),e(),n(17,"input",59),h("ngModelChange",function(i){c(t);let d=s();return x(d.newLesson.duration,i)||(d.newLesson.duration=i),m(i)}),e()(),n(18,"div",35)(19,"label",57),o(20),p(21,"translate"),e(),n(22,"textarea",60),h("ngModelChange",function(i){c(t);let d=s();return x(d.newLesson.description,i)||(d.newLesson.description=i),m(i)}),e()()(),n(23,"button",61),v("click",function(){c(t);let i=s();return m(i.addLesson())}),n(24,"span",11),o(25,"add"),e(),o(26),p(27,"translate"),e()(),n(28,"div",62),P(29,oe,6,3,"div",63)(30,ae,2,0),e()()}if(l&2){let t=s();r(5),C(" ",_(6,10,"editCourse.addLesson")," "),r(5),C("",_(11,12,"editCourse.lessonTitle")," *"),r(2),f("ngModel",t.newLesson.title),r(3),g(_(16,14,"editCourse.lessonDuration")),r(2),f("ngModel",t.newLesson.duration),r(3),g(_(21,16,"editCourse.lessonDescription")),r(2),f("ngModel",t.newLesson.description),r(),b("disabled",!t.newLesson.title),r(3),C(" ",_(27,18,"common.add")," "),r(3),w(29,t.lessons.length===0?29:30)}}function le(l,u){if(l&1&&(n(0,"option",76),o(1),e()),l&2){let t=u.$implicit;b("ngValue",t.id),r(),g(t.title)}}function se(l,u){l&1&&(n(0,"div",63)(1,"span",11),o(2,"play_circle"),e(),n(3,"p"),o(4),p(5,"translate"),e()()),l&2&&(r(4),g(_(5,1,"editCourse.noVideos")))}function ce(l,u){if(l&1){let t=M();n(0,"div",79)(1,"div",80)(2,"span",11),o(3,"play_circle"),e()(),n(4,"div",67)(5,"h4",68),o(6),e(),n(7,"p",81),o(8),e()(),n(9,"div",70)(10,"span",71)(11,"span",11),o(12,"schedule"),e(),o(13),e(),n(14,"span",82),o(15),e()(),n(16,"button",73),v("click",function(){let i=c(t).$implicit,d=s(3);return m(d.removeVideo(i.id))}),n(17,"span",11),o(18,"delete"),e()()()}if(l&2){let t=u.$implicit;r(6),g(t.title),r(2),g(t.url),r(5),C(" ",t.duration," "),r(2),C(" Lesson ",t.lessonId," ")}}function me(l,u){if(l&1&&y(0,ce,19,4,"div",79,O),l&2){let t=s(2);S(t.videos)}}function pe(l,u){if(l&1){let t=M();n(0,"div",13)(1,"div",54)(2,"h4",55)(3,"span",11),o(4,"add_circle"),e(),o(5),p(6,"translate"),e(),n(7,"div",56)(8,"div",19)(9,"label",57),o(10),p(11,"translate"),e(),n(12,"input",74),h("ngModelChange",function(i){c(t);let d=s();return x(d.newVideo.title,i)||(d.newVideo.title=i),m(i)}),e()(),n(13,"div",19)(14,"label",57),o(15),p(16,"translate"),e(),n(17,"select",75),h("ngModelChange",function(i){c(t);let d=s();return x(d.newVideo.lessonId,i)||(d.newVideo.lessonId=i),m(i)}),n(18,"option",76),o(19,"Select a lesson"),e(),y(20,le,2,2,"option",76,O),e()(),n(22,"div",19)(23,"label",57),o(24),p(25,"translate"),e(),n(26,"input",77),h("ngModelChange",function(i){c(t);let d=s();return x(d.newVideo.url,i)||(d.newVideo.url=i),m(i)}),e()(),n(27,"div",19)(28,"label",57),o(29),p(30,"translate"),e(),n(31,"input",78),h("ngModelChange",function(i){c(t);let d=s();return x(d.newVideo.duration,i)||(d.newVideo.duration=i),m(i)}),e()()(),n(32,"button",61),v("click",function(){c(t);let i=s();return m(i.addVideo())}),n(33,"span",11),o(34,"add"),e(),o(35),p(36,"translate"),e()(),n(37,"div",62),P(38,se,6,3,"div",63)(39,me,2,0),e()()}if(l&2){let t=s();r(5),C(" ",_(6,13,"editCourse.addVideo")," "),r(5),C("",_(11,15,"editCourse.videoTitle")," *"),r(2),f("ngModel",t.newVideo.title),r(3),C("",_(16,17,"editCourse.selectLesson")," *"),r(2),f("ngModel",t.newVideo.lessonId),r(),b("ngValue",0),r(2),S(t.lessons),r(4),C("",_(25,19,"editCourse.videoUrl")," *"),r(2),f("ngModel",t.newVideo.url),r(3),g(_(30,21,"editCourse.videoDuration")),r(2),f("ngModel",t.newVideo.duration),r(),b("disabled",!t.newVideo.title||!t.newVideo.url||!t.newVideo.lessonId),r(3),C(" ",_(36,23,"common.add")," "),r(3),w(38,t.videos.length===0?38:39)}}function _e(l,u){if(l&1&&(n(0,"option",76),o(1),e()),l&2){let t=u.$implicit;b("ngValue",t.id),r(),g(t.title)}}function ue(l,u){l&1&&(n(0,"div",63)(1,"span",11),o(2,"picture_as_pdf"),e(),n(3,"p"),o(4),p(5,"translate"),e()()),l&2&&(r(4),g(_(5,1,"editCourse.noPdfs")))}function ge(l,u){if(l&1){let t=M();n(0,"div",87)(1,"div",80)(2,"span",11),o(3,"picture_as_pdf"),e()(),n(4,"div",67)(5,"h4",68),o(6),e(),n(7,"p",88),o(8),e()(),n(9,"div",70)(10,"span",89),o(11),e(),n(12,"span",82),o(13),e()(),n(14,"button",73),v("click",function(){let i=c(t).$implicit,d=s(3);return m(d.removePdf(i.id))}),n(15,"span",11),o(16,"delete"),e()()()}if(l&2){let t=u.$implicit;r(6),g(t.title),r(2),g(t.fileName),r(3),g(t.size),r(2),C(" Lesson ",t.lessonId," ")}}function Ce(l,u){if(l&1&&y(0,ge,17,4,"div",87,O),l&2){let t=s(2);S(t.pdfs)}}function fe(l,u){if(l&1){let t=M();n(0,"div",13)(1,"div",54)(2,"h4",55)(3,"span",11),o(4,"add_circle"),e(),o(5),p(6,"translate"),e(),n(7,"div",56)(8,"div",19)(9,"label",57),o(10),p(11,"translate"),e(),n(12,"input",83),h("ngModelChange",function(i){c(t);let d=s();return x(d.newPdf.title,i)||(d.newPdf.title=i),m(i)}),e()(),n(13,"div",19)(14,"label",57),o(15),p(16,"translate"),e(),n(17,"select",75),h("ngModelChange",function(i){c(t);let d=s();return x(d.newPdf.lessonId,i)||(d.newPdf.lessonId=i),m(i)}),n(18,"option",76),o(19,"Select a lesson"),e(),y(20,_e,2,2,"option",76,O),e()(),n(22,"div",35)(23,"label",57),o(24),p(25,"translate"),e(),n(26,"div",84)(27,"input",85),v("change",function(i){c(t);let d=s();return m(d.onFileSelect(i))}),e(),n(28,"label",86)(29,"span",11),o(30,"cloud_upload"),e(),n(31,"span"),o(32),p(33,"translate"),e()()()()(),n(34,"button",61),v("click",function(){c(t);let i=s();return m(i.addPdf())}),n(35,"span",11),o(36,"add"),e(),o(37),p(38,"translate"),e()(),n(39,"div",62),P(40,ue,6,3,"div",63)(41,Ce,2,0),e()()}if(l&2){let t=s();r(5),C(" ",_(6,11,"editCourse.addPdf")," "),r(5),C("",_(11,13,"editCourse.pdfTitle")," *"),r(2),f("ngModel",t.newPdf.title),r(3),C("",_(16,15,"editCourse.selectLesson")," *"),r(2),f("ngModel",t.newPdf.lessonId),r(),b("ngValue",0),r(2),S(t.lessons),r(4),g(_(25,17,"editCourse.uploadPdf")),r(8),g(_(33,19,(t.newPdf.file==null?null:t.newPdf.file.name)||"editCourse.dragDrop")),r(2),b("disabled",!t.newPdf.title||!t.newPdf.lessonId),r(3),C(" ",_(38,21,"common.add")," "),r(3),w(40,t.pdfs.length===0?40:41)}}function xe(l,u){if(l&1){let t=M();n(0,"div",14)(1,"button",51),v("click",function(){c(t);let i=s();return m(i.onCancel())}),n(2,"span",11),o(3,"close"),e(),o(4),p(5,"translate"),e(),n(6,"button",90),v("click",function(){c(t);let i=s();return m(i.onSubmit())}),n(7,"span",11),o(8,"save"),e(),o(9),p(10,"translate"),e()()}l&2&&(r(4),C(" ",_(5,2,"common.cancel")," "),r(5),C(" ",_(10,4,"editCourse.saveChanges")," "))}var Ee=(()=>{class l{constructor(){this.route=I(z),this.router=I(F),this.courseId="",this.activeSection=W("info"),this.course={code:"",name:"",department:"",credits:3,professor:"",maxStudents:50,description:"",prerequisites:"",schedule:"",startDate:"",endDate:"",status:"active"},this.lessons=[],this.videos=[],this.pdfs=[],this.newLesson={title:"",description:"",duration:"",order:1},this.newVideo={title:"",url:"",duration:"",lessonId:0},this.newPdf={title:"",lessonId:0},this.departments=["Computer Science","Mathematics","Physics","Chemistry","Biology","Engineering","Business","Arts & Languages"],this.professors=["Dr. Ahmed Hassan","Dr. Sarah Johnson","Dr. Mohammed Ali","Dr. Emily Chen","Dr. Robert Smith","Dr. Fatima Al-Rashid"]}ngOnInit(){this.courseId=this.route.snapshot.paramMap.get("id")||"",this.loadCourseData()}loadCourseData(){this.course={code:"CS101",name:"Introduction to Programming",department:"Computer Science",credits:3,professor:"Dr. Ahmed Hassan",maxStudents:60,description:"An introductory course covering fundamental programming concepts using Python. Topics include variables, control structures, functions, and basic data structures.",prerequisites:"",schedule:"Mon/Wed 9:00-10:30",startDate:"2024-01-15",endDate:"2024-05-15",status:"active"},this.lessons=[{id:1,title:"Introduction to Python",description:"Getting started with Python basics",duration:"45 min",order:1},{id:2,title:"Variables and Data Types",description:"Understanding variables and data types",duration:"60 min",order:2},{id:3,title:"Control Structures",description:"If statements, loops, conditions",duration:"75 min",order:3}],this.videos=[{id:1,title:"Python Setup Tutorial",url:"https://youtube.com/watch?v=xxx",duration:"12:34",lessonId:1},{id:2,title:"First Python Program",url:"https://youtube.com/watch?v=yyy",duration:"18:45",lessonId:1},{id:3,title:"Working with Variables",url:"https://youtube.com/watch?v=zzz",duration:"22:10",lessonId:2}],this.pdfs=[{id:1,title:"Python Cheat Sheet",fileName:"python-basics.pdf",size:"1.2 MB",lessonId:1},{id:2,title:"Variables Reference",fileName:"variables.pdf",size:"856 KB",lessonId:2}]}setActiveSection(t){this.activeSection.set(t)}addLesson(){if(this.newLesson.title){let t=this.lessons.length>0?Math.max(...this.lessons.map(a=>a.id))+1:1;this.lessons.push({id:t,title:this.newLesson.title||"",description:this.newLesson.description||"",duration:this.newLesson.duration||"",order:this.lessons.length+1}),this.newLesson={title:"",description:"",duration:"",order:this.lessons.length+1}}}removeLesson(t){this.lessons=this.lessons.filter(a=>a.id!==t),this.videos=this.videos.filter(a=>a.lessonId!==t),this.pdfs=this.pdfs.filter(a=>a.lessonId!==t)}addVideo(){if(this.newVideo.title&&this.newVideo.url&&this.newVideo.lessonId){let t=this.videos.length>0?Math.max(...this.videos.map(a=>a.id))+1:1;this.videos.push({id:t,title:this.newVideo.title||"",url:this.newVideo.url||"",duration:this.newVideo.duration||"",lessonId:this.newVideo.lessonId||0}),this.newVideo={title:"",url:"",duration:"",lessonId:0}}}removeVideo(t){this.videos=this.videos.filter(a=>a.id!==t)}addPdf(){if(this.newPdf.title&&this.newPdf.lessonId){let t=this.pdfs.length>0?Math.max(...this.pdfs.map(a=>a.id))+1:1;this.pdfs.push({id:t,title:this.newPdf.title||"",fileName:this.newPdf.file?.name||"document.pdf",size:this.newPdf.file?this.formatFileSize(this.newPdf.file.size):"0 KB",lessonId:this.newPdf.lessonId||0,file:this.newPdf.file}),this.newPdf={title:"",lessonId:0}}}removePdf(t){this.pdfs=this.pdfs.filter(a=>a.id!==t)}onFileSelect(t){let a=t.target;a.files&&a.files[0]&&(this.newPdf.file=a.files[0])}formatFileSize(t){return t<1024?t+" B":t<1048576?(t/1024).toFixed(1)+" KB":(t/1048576).toFixed(1)+" MB"}getVideosForLesson(t){return this.videos.filter(a=>a.lessonId===t)}getPdfsForLesson(t){return this.pdfs.filter(a=>a.lessonId===t)}onSubmit(){console.log("Updating course:",this.course),console.log("Lessons:",this.lessons),console.log("Videos:",this.videos),console.log("PDFs:",this.pdfs),this.router.navigate(["/courses/all"])}onCancel(){this.router.navigate(["/courses/all"])}onReset(){this.loadCourseData()}static{this.\u0275fac=function(a){return new(a||l)}}static{this.\u0275cmp=T({type:l,selectors:[["app-edit-course"]],standalone:!0,features:[L],decls:49,vars:41,consts:[["courseForm","ngForm"],[1,"edit-course"],[1,"edit-course__header"],[1,"edit-course__title-section"],[1,"edit-course__title"],[1,"edit-course__breadcrumb"],["routerLink","/dashboard"],["routerLink","/courses/all"],[1,"edit-course__id-badge"],[1,"section-tabs"],[1,"section-tabs__tab",3,"click"],[1,"material-icons"],[1,"edit-course__form-container"],[1,"content-section"],[1,"form-actions"],[3,"ngSubmit"],[1,"form-section"],[1,"form-section__title"],[1,"form-grid"],[1,"form-group"],["for","code",1,"form-label"],["type","text","id","code","name","code","required","","placeholder","e.g., CS101",1,"form-input",3,"ngModelChange","ngModel"],[1,"form-group","form-group--wide"],["for","name",1,"form-label"],["type","text","id","name","name","name","required","","placeholder","Enter course name",1,"form-input",3,"ngModelChange","ngModel"],["for","department",1,"form-label"],["id","department","name","department","required","",1,"form-input",3,"ngModelChange","ngModel"],["value",""],[3,"value"],["for","credits",1,"form-label"],["type","number","id","credits","name","credits","required","","min","1","max","6",1,"form-input",3,"ngModelChange","ngModel"],["for","professor",1,"form-label"],["id","professor","name","professor","required","",1,"form-input",3,"ngModelChange","ngModel"],["for","maxStudents",1,"form-label"],["type","number","id","maxStudents","name","maxStudents","min","1","max","500",1,"form-input",3,"ngModelChange","ngModel"],[1,"form-group","form-group--full"],["for","description",1,"form-label"],["id","description","name","description","rows","4","placeholder","Enter course description",1,"form-input","form-input--textarea",3,"ngModelChange","ngModel"],["for","prerequisites",1,"form-label"],["type","text","id","prerequisites","name","prerequisites","placeholder","e.g., CS100, MATH101",1,"form-input",3,"ngModelChange","ngModel"],["for","schedule",1,"form-label"],["type","text","id","schedule","name","schedule","placeholder","e.g., Mon/Wed 9:00-10:30",1,"form-input",3,"ngModelChange","ngModel"],["for","startDate",1,"form-label"],["type","date","id","startDate","name","startDate",1,"form-input",3,"ngModelChange","ngModel"],["for","endDate",1,"form-label"],["type","date","id","endDate","name","endDate",1,"form-input",3,"ngModelChange","ngModel"],["for","status",1,"form-label"],["id","status","name","status",1,"form-input",3,"ngModelChange","ngModel"],["value","active"],["value","inactive"],["value","upcoming"],["type","button",1,"btn","btn--outline",3,"click"],["type","button",1,"btn","btn--secondary",3,"click"],["type","submit",1,"btn","btn--primary",3,"disabled"],[1,"add-form-card"],[1,"add-form-card__title"],[1,"add-form-grid"],[1,"form-label"],["type","text","placeholder","Enter lesson title",1,"form-input",3,"ngModelChange","ngModel"],["type","text","placeholder","e.g., 45 min",1,"form-input",3,"ngModelChange","ngModel"],["rows","2","placeholder","Enter lesson description",1,"form-input",3,"ngModelChange","ngModel"],[1,"btn","btn--primary","btn--sm",3,"click","disabled"],[1,"items-list"],[1,"empty-state"],[1,"item-card","item-card--lesson"],[1,"item-card__header"],[1,"item-card__order"],[1,"item-card__info"],[1,"item-card__title"],[1,"item-card__description"],[1,"item-card__meta"],[1,"item-card__duration"],[1,"item-card__counts"],[1,"item-card__delete",3,"click"],["type","text","placeholder","Enter video title",1,"form-input",3,"ngModelChange","ngModel"],[1,"form-input",3,"ngModelChange","ngModel"],[3,"ngValue"],["type","url","placeholder","https://youtube.com/watch?v=...",1,"form-input",3,"ngModelChange","ngModel"],["type","text","placeholder","e.g., 12:34",1,"form-input",3,"ngModelChange","ngModel"],[1,"item-card","item-card--video"],[1,"item-card__icon"],[1,"item-card__url"],[1,"item-card__lesson-badge"],["type","text","placeholder","Enter PDF title",1,"form-input",3,"ngModelChange","ngModel"],[1,"file-upload"],["type","file","accept",".pdf","id","pdfFile",3,"change"],["for","pdfFile",1,"file-upload__label"],[1,"item-card","item-card--pdf"],[1,"item-card__filename"],[1,"item-card__size"],["type","button",1,"btn","btn--primary",3,"click"]],template:function(a,i){a&1&&(n(0,"div",1)(1,"div",2)(2,"div",3)(3,"h1",4),o(4),p(5,"translate"),e(),n(6,"nav",5)(7,"a",6),o(8),p(9,"translate"),e(),n(10,"span"),o(11,"/"),e(),n(12,"a",7),o(13),p(14,"translate"),e(),n(15,"span"),o(16,"/"),e(),n(17,"span"),o(18),p(19,"translate"),e()()(),n(20,"div",8),o(21),e()(),n(22,"div",9)(23,"button",10),v("click",function(){return i.setActiveSection("info")}),n(24,"span",11),o(25,"info"),e(),o(26),p(27,"translate"),e(),n(28,"button",10),v("click",function(){return i.setActiveSection("lessons")}),n(29,"span",11),o(30,"menu_book"),e(),o(31),p(32,"translate"),e(),n(33,"button",10),v("click",function(){return i.setActiveSection("videos")}),n(34,"span",11),o(35,"play_circle"),e(),o(36),p(37,"translate"),e(),n(38,"button",10),v("click",function(){return i.setActiveSection("pdfs")}),n(39,"span",11),o(40,"picture_as_pdf"),e(),o(41),p(42,"translate"),e()(),n(43,"div",12),P(44,ie,97,19,"form")(45,de,31,20,"div",13)(46,pe,40,25,"div",13)(47,fe,42,23,"div",13)(48,xe,11,6,"div",14),e()()),a&2&&(r(4),g(_(5,25,"editCourse.title")),r(4),g(_(9,27,"nav.dashboard")),r(5),g(_(14,29,"nav.courses")),r(5),g(_(19,31,"editCourse.title")),r(3),C(" Course ID: ",i.courseId," "),r(2),E("section-tabs__tab--active",i.activeSection()==="info"),r(3),C(" ",_(27,33,"editCourse.courseInfo")," "),r(2),E("section-tabs__tab--active",i.activeSection()==="lessons"),r(3),V(" ",_(32,35,"editCourse.lessonsTab")," (",i.lessons.length,") "),r(2),E("section-tabs__tab--active",i.activeSection()==="videos"),r(3),V(" ",_(37,37,"editCourse.videosTab")," (",i.videos.length,") "),r(2),E("section-tabs__tab--active",i.activeSection()==="pdfs"),r(3),V(" ",_(42,39,"editCourse.pdfsTab")," (",i.pdfs.length,") "),r(3),w(44,i.activeSection()==="info"?44:-1),r(),w(45,i.activeSection()==="lessons"?45:-1),r(),w(46,i.activeSection()==="videos"?46:-1),r(),w(47,i.activeSection()==="pdfs"?47:-1),r(),w(48,i.activeSection()!=="info"?48:-1))},dependencies:[D,ee,K,Y,Q,N,G,J,R,j,$,Z,X,H,U,A,q],styles:[`

.edit-course[_ngcontent-%COMP%] {
  padding: 1.5rem;
}
.edit-course__header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}
.edit-course__title-section[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.edit-course__title[_ngcontent-%COMP%] {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}
.edit-course__breadcrumb[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
}
.edit-course__breadcrumb[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {
  color: var(--primary-color);
  text-decoration: none;
  transition: color 0.2s ease;
}
.edit-course__breadcrumb[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {
  text-decoration: underline;
}
.edit-course__breadcrumb[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  color: var(--text-muted);
}
.edit-course__id-badge[_ngcontent-%COMP%] {
  padding: 0.5rem 1rem;
  background: var(--bg-secondary);
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
}
.edit-course__form-container[_ngcontent-%COMP%] {
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
.btn--secondary[_ngcontent-%COMP%] {
  background: var(--bg-secondary);
  color: var(--text-primary);
}
.btn--secondary[_ngcontent-%COMP%]:hover {
  background: var(--border-color);
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
.section-tabs[_ngcontent-%COMP%] {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  padding: 0.5rem;
  background: var(--bg-secondary);
  border-radius: 12px;
  flex-wrap: wrap;
}
.section-tabs__tab[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border: none;
  background: transparent;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
}
.section-tabs__tab[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {
  font-size: 1.125rem;
}
.section-tabs__tab[_ngcontent-%COMP%]:hover {
  background: var(--card-bg);
  color: var(--text-primary);
}
.section-tabs__tab--active[_ngcontent-%COMP%] {
  background: var(--card-bg);
  color: var(--primary-color);
  box-shadow: var(--shadow-sm);
}
.section-tabs__tab--active[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {
  color: var(--primary-color);
}
.content-section[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.add-form-card[_ngcontent-%COMP%] {
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 1.5rem;
  border: 2px dashed var(--border-color);
}
.add-form-card__title[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 1.25rem 0;
}
.add-form-card__title[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {
  color: var(--primary-color);
}
.add-form-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
}
@media (max-width: 768px) {
  .add-form-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
}
.add-form-grid[_ngcontent-%COMP%]   .form-group--full[_ngcontent-%COMP%] {
  grid-column: 1/-1;
}
.items-list[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.empty-state[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  background: var(--bg-secondary);
  border-radius: 12px;
  color: var(--text-muted);
}
.empty-state[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}
.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 1rem;
}
.item-card[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: var(--bg-secondary);
  border-radius: 10px;
  transition: all 0.2s ease;
}
.item-card[_ngcontent-%COMP%]:hover {
  background: var(--hover-bg);
}
.item-card__order[_ngcontent-%COMP%] {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-color);
  color: white;
  border-radius: 50%;
  font-weight: 600;
  font-size: 0.875rem;
  flex-shrink: 0;
}
.item-card__icon[_ngcontent-%COMP%] {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  flex-shrink: 0;
}
.item-card__icon[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {
  font-size: 1.5rem;
}
.item-card--video[_ngcontent-%COMP%]   .item-card__icon[_ngcontent-%COMP%] {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}
.item-card--pdf[_ngcontent-%COMP%]   .item-card__icon[_ngcontent-%COMP%] {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
}
.item-card__info[_ngcontent-%COMP%] {
  flex: 1;
  min-width: 0;
}
.item-card__title[_ngcontent-%COMP%] {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.25rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item-card__description[_ngcontent-%COMP%], .item-card__url[_ngcontent-%COMP%], .item-card__filename[_ngcontent-%COMP%] {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item-card__meta[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}
.item-card__duration[_ngcontent-%COMP%], .item-card__size[_ngcontent-%COMP%], .item-card__counts[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8125rem;
  color: var(--text-muted);
}
.item-card__duration[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%], .item-card__size[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%], .item-card__counts[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {
  font-size: 1rem;
}
.item-card__lesson-badge[_ngcontent-%COMP%] {
  padding: 0.25rem 0.75rem;
  background: var(--primary-color);
  color: white;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 500;
}
.item-card__delete[_ngcontent-%COMP%] {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: var(--text-muted);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}
.item-card__delete[_ngcontent-%COMP%]:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}
.item-card__delete[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {
  font-size: 1.25rem;
}
.item-card--lesson[_ngcontent-%COMP%]   .item-card__header[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
}
.file-upload[_ngcontent-%COMP%] {
  position: relative;
}
.file-upload[_ngcontent-%COMP%]   input[type=file][_ngcontent-%COMP%] {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
.file-upload__label[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border: 2px dashed var(--border-color);
  border-radius: 8px;
  background: var(--card-bg);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
}
.file-upload__label[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
}
.file-upload__label[_ngcontent-%COMP%]:hover {
  border-color: var(--primary-color);
  background: rgba(var(--primary-rgb), 0.05);
}
.btn--sm[_ngcontent-%COMP%] {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}
.btn--sm[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {
  font-size: 1rem;
}
[dir=rtl][_nghost-%COMP%]   .edit-course__breadcrumb[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .edit-course__breadcrumb[_ngcontent-%COMP%] {
  direction: rtl;
}
[dir=rtl][_nghost-%COMP%]   select.form-input[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   select.form-input[_ngcontent-%COMP%] {
  background-position: left 0.75rem center;
  padding-right: 1rem;
  padding-left: 2.5rem;
}
[dir=rtl][_nghost-%COMP%]   .form-actions[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .form-actions[_ngcontent-%COMP%] {
  flex-direction: row-reverse;
}
[dir=rtl][_nghost-%COMP%]   .section-tabs[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .section-tabs[_ngcontent-%COMP%] {
  direction: rtl;
}
[dir=rtl][_nghost-%COMP%]   .item-card[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .item-card[_ngcontent-%COMP%] {
  direction: rtl;
}
[dir=rtl][_nghost-%COMP%]   .item-card__meta[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .item-card__meta[_ngcontent-%COMP%] {
  flex-direction: row-reverse;
}`]})}}return l})();export{Ee as EditCourseComponent};
