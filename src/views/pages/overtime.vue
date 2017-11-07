<template>
    <div>
        <Row>
            <!-- 申请区域 -->
            <Col span="10">
                <Card>
                    <p slot="title">
                        <Icon type="clipboard"></Icon>
                        加班申请
                    </p>
                    <Form ref="applicationData" :label-width="100" :model="applicationData" :rules="rules">
                        <FormItem label="申请人：" prop="name">
                            <Input v-model="applicationData.name" type="text" style="width: 200px;" placeholder="申请人" disabled/>
                        </FormItem>
                        <FormItem label="部门：">
                            <Input v-model="applicationData.department" type="text" style="width: 200px;" placeholder="请选择部门" disabled/>
                        </FormItem>
                        <FormItem label="开始时间：" required prop="overtimeDateBegin">
                            <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss" @on-change="overtimeDateBeginChange" placeholder="选择开始时间" style="width: 200px"></DatePicker>
                        </FormItem>
                        <FormItem label="结束时间：" required>
                            <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss" @on-change="overtimeDateEndChange" placeholder="选择结束时间" style="width: 200px"></DatePicker>
                        </FormItem>
                        <FormItem label="加班原因：" required prop="overtimeReason">
                            <Input v-model="applicationData.overtimeReason" type="textarea" style="width: 200px;" placeholder="" />
                        </FormItem>
                        <FormItem label="审批人：">
                            <Input v-model="applicationData.immediateLeader" type="text" style="width:200px;" placeholder="审批人" disabled/>
                        </FormItem>
                        <FormItem label="">
                            <Button @click="handleSubmit" style="width:100px;" type="primary">提交</Button>
                        </FormItem>
                    </Form>
                </Card>
            </Col>
            <!-- 审批进度 -->
            <Col span="14" class="padding-left-10">
                <Card>
                    <p slot="title">
                        <Icon type="clipboard"></Icon>
                        审批进度
                    </p>
                    <Row>
                        <Table :columns="columns" :data="tableData"></Table>
                    </Row>
                </Card>
                <Card>
                    <p slot="title">
                        <Icon type="clipboard"></Icon>
                        待审批列表
                    </p>
                    <Row>
                        <Table :columns="columns2" :data="tableData2"></Table>
                    </Row>
                </Card>
                <Card>
                    <p slot="title">
                        <Icon type="clipboard"></Icon>
                        已审批列表
                    </p>
                    <Row>
                        <Table :columns="columns3" :data="tableData3"></Table>
                    </Row>
                </Card>
            </Col>
        </Row>
        <br>
    </div>
</template>
<script>
    // import staffData from './staffData.js';
    import axios from 'axios'
    import util from '../../libs/util'
    export default {
        data () {
            return {
                applicationData: {},
                rules: {
                    overtimeDateBegin: [
                        {required: true, type: 'date', message: '请选择开始时间', trigger: 'blur'}
                    ],
                    overtimeDateEnd: [
                        {required: true, type: 'date', message: '请选择结束时间', trigger: 'blur'}
                    ],
                    overtimeReason: [
                        {required: true, message: '请填写加班原因', trigger: 'blur'}
                    ]
                },
                columns: [
                    {
                        title: '姓名',
                        key: 'name',
                        align: 'center'
                    },{
                        title: '申请时间',
                        key: 'applicationDate',
                        width: 140,
                        align: 'center'
                    },{
                        title: '加班日期',
                        key: 'overtimeDate',
                        align: 'center'
                    },{
                        title: '加班原因',
                        key: 'overtimeReason',
                        align: 'center'
                    },{
                        title: '审批进度',
                        key: 'overtimeProgress',
                        align: 'center'
                    },{
                        title: '操作',
                        key: 'action',
                        width: 130,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index);
                                        }
                                    }
                                }, '查看'), h('Poptip', {
                                    props: {
                                        confirm: true,
                                        title: '确认删除此条申请？',
                                        transfer: true
                                    },
                                    on: {
                                        'on-ok' : () => {
                                            this.del(params.row['_id']);
                                        }
                                    }
                                }, [
                                    h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small',
                                            placement: 'top'
                                        }
                                    }, '删除')
                                ])
                            ])
                        }
                    }
                ],
                tableData: [],
                columns2: [
                    {
                        title: '姓名',
                        key: 'name',
                        align: 'center'
                    },{
                        title: '部门',
                        key: 'department',
                        align: 'center'
                    },{
                        title: '申请时间',
                        key: 'applicationDate',
                        align: 'center',
                        width: 140
                    },{
                        title: '申请日期',
                        key: 'overtimeDate',
                        align: 'center'
                    },{
                        title: '加班原因',
                        key: 'overtimeReason',
                        align: 'center'
                    },{
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        width: 130,
                        render: (h, params) => {
                            return h('div', [
                                h('Poptip', {
                                    props: {
                                        confirm: true,
                                        title: '确认同意申请？',
                                        transfer: true
                                    },
                                    on: {
                                        'on-ok': () => {
                                            this.agreeApplication(params.row['_id'], params.row.role);
                                        }
                                    }
                                }, [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small',
                                            placement: 'top'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        }
                                    }, '同意')
                                ]),
                                h('Poptip', {
                                    props: {
                                        confirm: true,
                                        title: '拒绝申请？',
                                        transfer: true
                                    },
                                    on: {
                                        'on-ok': () => {
                                            this.refuseApplication(params.row['_id'], params.row.role);
                                        }
                                    }
                                }, [
                                    h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small',
                                            placement: 'top'
                                        }
                                    }, '拒绝')
                                ])
                            ])
                        }
                    }
                ],
                tableData2: [],
                columns3: [
                    {
                        title: '姓名',
                        key: 'name',
                        align: 'center'
                    },{
                        title: '部门',
                        key: 'department',
                        align: 'center'
                    },{
                        title: '申请时间',
                        key: 'applicationDate',
                        align: 'center',
                        width: 140
                    },{
                        title: '加班日期',
                        key: 'leaveDate',
                        align: 'center'
                    },{
                        title: '加班原因',
                        key: 'leaveReason',
                        align: 'center'
                    },{
                        title: '状态',
                        key: 'action',
                        alicn: 'center'
                    }
                ],
                tableData3: []
            }
        },
        methods: {
            // 初始化，表单数据回显
            init () {
                axios({
                    url: 'http://10.0.133.78:8080/api/staff/query',
                    params: {id: this.getCurrentStaffId()}
                })
                .then((res) => {
                    if(res.data.status == 1) {
                        let result = res.data.result.list[0];
                        let applicationData = {};
//                    let {id, name, userName, department, immediateLeader, immediateLeaderId, leaveDateBegin, leaveDateEnd, successor, leaveReason, leaveType} = result;
                        applicationData.id = result.id;
                        applicationData.name = result.name;
                        applicationData.userName = result.userName;
                        applicationData.department = result.department;
                        applicationData.immediateLeaderId = result.immediateLeaderId;
                        applicationData.immediateLeader = result.immediateLeader;
                        applicationData.role = result.role;
                        this.applicationData = applicationData;
                        console.log(applicationData)
                    }else{
                        alert(res.data.msg);
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
            // 提交表单
            handleSubmit () {
                let Count = 0;
                for(var item in this.applicationData){
                    if(this.applicationData[item]) Count ++;
                }
                // 申请条件9个
                if(Count === 10){
                    this.applicationData.applicationDate = util.formatDate('yyyy-MM-dd hh:mm:ss', new Date().getTime());
                    this.applicationData.type = 2; // type: 1 请假 2 加班
                    axios.post('http://10.0.133.78:8080/api/application/addOvertimeApplication', this.applicationData)
                    .then((res) => {
                        if(res.data.status === 1){
                            this.$Message.success(res.data.msg);
                            this.queryRecord();
                        }
                    })
                    .catch((err) => {
                        console.log(err.message)
                    })
                }else {
                    this.$Message.error('提交信息有误')
                }
            },
            // 查询申请记录
            queryRecord() {
                axios.get('http://10.0.133.78:8080/api/application/queryOvertimeRecord?id='+this.getCurrentStaffId()+'&type=2&pageSize=5')
                .then((res) => {
                    if(res.data.status == 1) {
                        let result = res.data.result.list;
                        result.forEach((item) => {
                            item.applicationDate = util.formatDate('MM-dd hh:mm', parseInt(item.applicationDate))
                            item.overtimeDate = util.formatDate('MM-dd hh:mm', item.overtimeDateBegin) + ' / ' + util.formatDate('MM-dd hh:mm', item.overtimeDateEnd);
                            switch(item.overtimeProgress){
                                case 1: item.overtimeProgress = '待主管审批'; break;
                                case 2: item.overtimeProgress = '待总监审批'; break;
                                case 3: item.overtimeProgress = '审批通过'; break;
                                case 0: item.overtimeProgress = '审批被拒绝'; break;
                            }
                        })
                        this.tableData = res.data.result.list;
                    }else {
                        this.tableData = [];
                    }
                })
            },
            show (index) {

            },
            del (_id) {
                axios.post('http://10.0.133.78:8080/api/application/delOvertimeApplication', {_id})
                .then((res) => {
                    if(res.data.status===1){
                        this.$Message.success(res.data.msg);
                        this.queryRecord();
                    }else {
                        this.$Message.error(res.data.msg);
                    }
                })
            },
            // 查询待审批记录
            queryNotApprove () {
                axios.post('http://10.0.133.78:8080/api/application/queryOvertimeNotApprove', {id: this.getCurrentStaffId(), role: this.getCurrentRole()})
                .then((res) => {
                    if(res.data.status===1){
                        let result = res.data.result.list;
                        result.forEach((item) => {
                            item.applicationDate = util.formatDate('MM-dd hh:mm', parseInt(item.applicationDate))
                            item.overtimeDate = util.formatDate('MM-dd hh:mm', item.overtimeDateBegin) + ' / ' + util.formatDate('MM-dd hh:mm', item.overtimeDateEnd);
                        })
//                  this.$Message.success(res.data.msg)
                        this.tableData2 = result;
                    }
                })
            },
            // 同意申请
            agreeApplication (_id,id,role) {
                axios.post('http://10.0.133.78:8080/api/application/overtimeApprove', {_id, role: this.getCurrentRole(), action: 1})
                .then((res) => {
                    if(res.data.status===1){
                        this.$Message.success(res.data.msg);
                        this.queryNotApprove();
                        this.queryApprove();
                    }
                })
            },
            // 拒绝申请
            refuseApplication (_id,id,role) {
                axios.post('http://10.0.133.78:8080/api/application/overtimeApprove', {_id, role: this.getCurrentRole(), action: 0})
                .then((res) => {
                    if(res.data.status===1){
                        this.$Message.success(res.data.msg);
                        this.queryNotApprove();
                        this.queryApprove();
                    }
                })
            },
            // 查询名下已审批记录
            queryApprove () {
                axios.post('http://10.0.133.78:8080/api/application/queryOvertimeApprove', {id: this.getCurrentStaffId(), role: this.getCurrentRole()})
                .then((res) => {
                    if(res.data.status===1){
                        let result = res.data.result.list;
                        result.forEach((item) => {
                            item.applicationDate = util.formatDate('MM-dd hh:mm', parseInt(item.applicationDate))
                            item.overtimeDate = util.formatDate('MM-dd hh:mm', item.overtimeDateBegin) + ' / ' + util.formatDate('MM-dd hh:mm', item.overtimeDateEnd);
                            switch (item.overtimeProgress) {
                                case 0: item.action = '未通过'; break;
                                case 3: item.action = '已通过'; break;
                                default: item.action = '审批中'; break;
                            }
                        });
                        this.tableData3 = result;
                    }
                })
            },
            getCurrentStaffId () {
                let id = sessionStorage.getItem('id');
                return id;
            },
            getCurrentRole () {
                let role = sessionStorage.getItem('role');
                return role;
            },
            overtimeDateBeginChange (date) {
                this.applicationData.overtimeDateBegin = date;
            },
            overtimeDateEndChange (date) {
                this.applicationData.overtimeDateEnd = date;
            }
        },
        mounted () {
            this.init();
            this.queryRecord();
            this.queryNotApprove();
            this.queryApprove();
        }
    }
</script>