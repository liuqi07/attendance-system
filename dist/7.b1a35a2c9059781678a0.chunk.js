webpackJsonp([7],{674:function(t,e,a){var i=a(34)(a(733),a(779),null,null);i.options.__file="E:\\workspace\\temp\\attendance-system\\src\\views\\pages\\overtime.vue",i.esModule&&Object.keys(i.esModule).some(function(t){return"default"!==t&&"__esModule"!==t})&&console.error("named exports are not supported in *.vue files."),i.options.functional&&console.error("[vue-loader] overtime.vue: functional components are not supported with templates, they should use render functions."),t.exports=i.exports},680:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a(250),r=function(t){return t&&t.__esModule?t:{default:t}}(i),o={env:r.default,devBaseUrl:"http://172.17.43.55:3000/api"};e.default=o},733:function(t,e,a){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=a(101),o=i(r),n=a(680),l=i(n),s=a(56),p=i(s);e.default={data:function(){var t=this;return{applicationData:{},rules:{overtimeDateBegin:[{required:!0,type:"date",message:"请选择开始时间",trigger:"blur"}],overtimeDateEnd:[{required:!0,type:"date",message:"请选择结束时间",trigger:"blur"}],overtimeReason:[{required:!0,message:"请填写加班原因",trigger:"blur"}]},columns:[{title:"姓名",key:"name",align:"center"},{title:"申请时间",key:"applicationDate",width:140,align:"center"},{title:"加班日期",key:"overtimeDate",align:"center"},{title:"加班原因",key:"overtimeReason",align:"center"},{title:"审批进度",key:"overtimeProgress",align:"center"},{title:"操作",key:"action",width:130,align:"center",render:function(e,a){return e("div",[e("Button",{props:{type:"primary",size:"small"},style:{marginRight:"5px"},on:{click:function(){t.show(a.index)}}},"查看"),e("Poptip",{props:{confirm:!0,title:"确认删除此条申请？",transfer:!0},on:{"on-ok":function(){t.del(a.row._id)}}},[e("Button",{props:{type:"error",size:"small",placement:"top"}},"删除")])])}}],tableData:[],columns2:[{title:"姓名",key:"name",align:"center"},{title:"部门",key:"department",align:"center"},{title:"申请时间",key:"applicationDate",align:"center",width:140},{title:"申请日期",key:"overtimeDate",align:"center"},{title:"加班原因",key:"overtimeReason",align:"center"},{title:"操作",key:"action",align:"center",width:130,render:function(e,a){return e("div",[e("Poptip",{props:{confirm:!0,title:"确认同意申请？",transfer:!0},on:{"on-ok":function(){t.agreeApplication(a.row._id,a.row.role)}}},[e("Button",{props:{type:"primary",size:"small",placement:"top"},style:{marginRight:"5px"}},"同意")]),e("Poptip",{props:{confirm:!0,title:"拒绝申请？",transfer:!0},on:{"on-ok":function(){t.refuseApplication(a.row._id,a.row.role)}}},[e("Button",{props:{type:"error",size:"small",placement:"top"}},"拒绝")])])}}],tableData2:[],columns3:[{title:"姓名",key:"name",align:"center"},{title:"部门",key:"department",align:"center"},{title:"申请时间",key:"applicationDate",align:"center",width:140},{title:"加班日期",key:"overtimeDate",align:"center"},{title:"加班原因",key:"overtimeReason",align:"center"},{title:"状态",key:"action",alicn:"center"}],tableData3:[]}},methods:{init:function(){var t=this;(0,o.default)({url:l.default.devBaseUrl+"/staff/query",params:{id:this.getCurrentStaffId()}}).then(function(e){if(1==e.data.status){var a=e.data.result.list[0],i={};i.id=a.id,i.name=a.name,i.userName=a.userName,i.department=a.department,i.immediateLeaderId=a.immediateLeaderId,i.immediateLeader=a.immediateLeader,i.role=a.role,t.applicationData=i,console.log(i)}else alert(e.data.msg)}).catch(function(t){console.log(t)})},handleSubmit:function(){var t=this,e=0;for(var a in this.applicationData)this.applicationData[a]&&e++;10===e?(this.applicationData.applicationDate=p.default.formatDate("yyyy-MM-dd hh:mm:ss",(new Date).getTime()),this.applicationData.type=2,o.default.post(l.default.devBaseUrl+"/application/addOvertimeApplication",this.applicationData).then(function(e){1===e.data.status&&(t.$Message.success(e.data.msg),t.queryRecord())}).catch(function(t){console.log(t.message)})):this.$Message.error("提交信息有误")},queryRecord:function(){var t=this;o.default.get(l.default.devBaseUrl+"/application/queryOvertimeRecord?id="+this.getCurrentStaffId()+"&type=2&pageSize=5").then(function(e){if(1==e.data.status){e.data.result.list.forEach(function(t){switch(t.applicationDate=p.default.formatDate("MM-dd hh:mm",parseInt(t.applicationDate)),t.overtimeDate=p.default.formatDate("MM-dd hh:mm",t.overtimeDateBegin)+" / "+p.default.formatDate("MM-dd hh:mm",t.overtimeDateEnd),t.overtimeProgress){case 1:t.overtimeProgress="待主管审批";break;case 2:t.overtimeProgress="待总监审批";break;case 3:t.overtimeProgress="审批通过";break;case 0:t.overtimeProgress="审批被拒绝"}}),t.tableData=e.data.result.list}else t.tableData=[]})},show:function(t){},del:function(t){var e=this;o.default.post(l.default.devBaseUrl+"/application/delOvertimeApplication",{_id:t}).then(function(t){1===t.data.status?(e.$Message.success(t.data.msg),e.queryRecord()):e.$Message.error(t.data.msg)})},queryNotApprove:function(){var t=this;o.default.post(l.default.devBaseUrl+"/application/queryOvertimeNotApprove",{id:this.getCurrentStaffId(),role:this.getCurrentRole()}).then(function(e){if(1===e.data.status){var a=e.data.result.list;a.forEach(function(t){t.applicationDate=p.default.formatDate("MM-dd hh:mm",parseInt(t.applicationDate)),t.overtimeDate=p.default.formatDate("MM-dd hh:mm",t.overtimeDateBegin)+" / "+p.default.formatDate("MM-dd hh:mm",t.overtimeDateEnd)}),t.tableData2=a}})},agreeApplication:function(t,e,a){var i=this;o.default.post(l.default.devBaseUrl+"/application/overtimeApprove",{_id:t,role:this.getCurrentRole(),action:1}).then(function(t){1===t.data.status&&(i.$Message.success(t.data.msg),i.queryNotApprove(),i.queryApprove())})},refuseApplication:function(t,e,a){var i=this;o.default.post(l.default.devBaseUrl+"/application/overtimeApprove",{_id:t,role:this.getCurrentRole(),action:0}).then(function(t){1===t.data.status&&(i.$Message.success(t.data.msg),i.queryNotApprove(),i.queryApprove())})},queryApprove:function(){var t=this;o.default.post(l.default.devBaseUrl+"/application/queryOvertimeApprove",{id:this.getCurrentStaffId(),role:this.getCurrentRole()}).then(function(e){if(1===e.data.status){var a=e.data.result.list;a.forEach(function(t){switch(t.applicationDate=p.default.formatDate("MM-dd hh:mm",parseInt(t.applicationDate)),t.overtimeDate=p.default.formatDate("MM-dd hh:mm",t.overtimeDateBegin)+" / "+p.default.formatDate("MM-dd hh:mm",t.overtimeDateEnd),t.overtimeProgress){case 0:t.action="未通过";break;case 3:t.action="已通过";break;default:t.action="审批中"}}),t.tableData3=a}})},getCurrentStaffId:function(){return sessionStorage.getItem("id")},getCurrentRole:function(){return sessionStorage.getItem("role")},overtimeDateBeginChange:function(t){this.applicationData.overtimeDateBegin=t},overtimeDateEndChange:function(t){this.applicationData.overtimeDateEnd=t}},mounted:function(){this.init(),this.queryRecord(),this.queryNotApprove(),this.queryApprove()}}},779:function(t,e,a){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Row",[a("Col",{attrs:{span:"10"}},[a("Card",[a("p",{attrs:{slot:"title"},slot:"title"},[a("Icon",{attrs:{type:"clipboard"}}),t._v("\n                    加班申请\n                ")],1),t._v(" "),a("Form",{ref:"applicationData",attrs:{"label-width":100,model:t.applicationData,rules:t.rules}},[a("FormItem",{attrs:{label:"申请人：",prop:"name"}},[a("Input",{staticStyle:{width:"200px"},attrs:{type:"text",placeholder:"申请人",disabled:""},model:{value:t.applicationData.name,callback:function(e){t.$set(t.applicationData,"name",e)},expression:"applicationData.name"}})],1),t._v(" "),a("FormItem",{attrs:{label:"部门："}},[a("Input",{staticStyle:{width:"200px"},attrs:{type:"text",placeholder:"请选择部门",disabled:""},model:{value:t.applicationData.department,callback:function(e){t.$set(t.applicationData,"department",e)},expression:"applicationData.department"}})],1),t._v(" "),a("FormItem",{attrs:{label:"开始时间：",required:"",prop:"overtimeDateBegin"}},[a("DatePicker",{staticStyle:{width:"200px"},attrs:{type:"datetime",format:"yyyy-MM-dd HH:mm:ss",placeholder:"选择开始时间"},on:{"on-change":t.overtimeDateBeginChange}})],1),t._v(" "),a("FormItem",{attrs:{label:"结束时间：",required:""}},[a("DatePicker",{staticStyle:{width:"200px"},attrs:{type:"datetime",format:"yyyy-MM-dd HH:mm:ss",placeholder:"选择结束时间"},on:{"on-change":t.overtimeDateEndChange}})],1),t._v(" "),a("FormItem",{attrs:{label:"加班原因：",required:"",prop:"overtimeReason"}},[a("Input",{staticStyle:{width:"200px"},attrs:{type:"textarea",placeholder:""},model:{value:t.applicationData.overtimeReason,callback:function(e){t.$set(t.applicationData,"overtimeReason",e)},expression:"applicationData.overtimeReason"}})],1),t._v(" "),a("FormItem",{attrs:{label:"审批人："}},[a("Input",{staticStyle:{width:"200px"},attrs:{type:"text",placeholder:"审批人",disabled:""},model:{value:t.applicationData.immediateLeader,callback:function(e){t.$set(t.applicationData,"immediateLeader",e)},expression:"applicationData.immediateLeader"}})],1),t._v(" "),a("FormItem",{attrs:{label:""}},[a("Button",{staticStyle:{width:"100px"},attrs:{type:"primary"},on:{click:t.handleSubmit}},[t._v("提交")])],1)],1)],1)],1),t._v(" "),a("Col",{staticClass:"padding-left-10",attrs:{span:"14"}},[a("Card",[a("p",{attrs:{slot:"title"},slot:"title"},[a("Icon",{attrs:{type:"clipboard"}}),t._v("\n                    审批进度\n                ")],1),t._v(" "),a("Row",[a("Table",{attrs:{columns:t.columns,data:t.tableData}})],1)],1),t._v(" "),a("Card",[a("p",{attrs:{slot:"title"},slot:"title"},[a("Icon",{attrs:{type:"clipboard"}}),t._v("\n                    待审批列表\n                ")],1),t._v(" "),a("Row",[a("Table",{attrs:{columns:t.columns2,data:t.tableData2}})],1)],1),t._v(" "),a("Card",[a("p",{attrs:{slot:"title"},slot:"title"},[a("Icon",{attrs:{type:"clipboard"}}),t._v("\n                    已审批列表\n                ")],1),t._v(" "),a("Row",[a("Table",{attrs:{columns:t.columns3,data:t.tableData3}})],1)],1)],1)],1),t._v(" "),a("br")],1)},staticRenderFns:[]},t.exports.render._withStripped=!0}});