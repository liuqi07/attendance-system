<template>
    <div>
        <Row>
            <!-- 申请区域 -->
            <Col span="14">
                <Card>
                    <p slot="title">
                        <Icon type="clipboard"></Icon>
                        调休申请
                    </p>
                    <Row>
                        <Col span="12">
                            <Form :label-width="100" :model="currStaffData" :rules="rules">
                                <FormItem label="申请人：" prop="name">
                                    <Input v-model="currStaffData.name" type="text" style="width: 200px;" placeholder="申请人" disabled/>
                                </FormItem>
                                <FormItem label="开始时间：" required prop="leaveDateBegin">
                                <DatePicker type="datetime" v-model="currStaffData.leaveDateBegin" placeholder="选择开始时间" style="width: 200px"></DatePicker>
                                </FormItem>
                                <FormItem label="工作承接人：" required prop="successor">
                                    <Input v-model="currStaffData.successor" type="text" style="width: 200px;" placeholder="" />
                                </FormItem>
                                <FormItem label="请假理由：" required prop="leaveReason">
                                    <Input v-model="currStaffData.leaveReason" type="textarea" style="width: 200px;" placeholder="" />
                                </FormItem>
                                <FormItem label="请假类型：" required prop="leaveType">
                                    <RadioGroup v-model="currStaffData.leaveType">
                                        <Radio label="调休" value=1></Radio>
                                        <Radio label="事假" value=2></Radio>
                                        <Radio label="病假" value=3></Radio>
                                        <Radio label="婚假" value=4></Radio>
                                    </RadioGroup>
                                </FormItem>
                                <FormItem label="审批人：">
                                    <Input v-model="currStaffData.immediatedLeader" type="text" style="width:200px;" placeholder="审批人" disabled/>
                                </FormItem>
                                <FormItem label="">
                                    <Button @click="handleSubmit" style="width:100px;" type="primary">提交</Button>
                                </FormItem>
                            </Form>
                        </Col>
                        <Col span="12">
                            <Form :label-width="100">
                                <FormItem label="部门：">
                                    <Input v-model="currStaffData.department" type="text" style="width: 200px;" placeholder="请选择部门" disabled/>
                                </FormItem>
                                    <FormItem label="结束时间：" required prop="leaveDateEnd">
                                    <DatePicker type="datetime" v-model="currStaffData.leaveDateEnd" placeholder="选择结束时间" style="width: 200px"></DatePicker>
                                </FormItem>
                            </Form>
                        </Col>
                    </Row>
                </Card>
            </Col>
            <!-- 审批进度 -->
            <Col span="10" class="padding-left-10">
                <Card>
                    <p slot="title">
                        <Icon type="clipboard"></Icon>
                        审批进度
                    </p>
                    <Row>
                        <Table :columns="columns" :data="tableData"></Table>
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
export default {
    data () {
        return {
            currStaffData: {},
            immediatedLeaderId: null, // 上级id
            applicationData: {},
            hasSubmit: false,
            columns: [
                {
                    type: 'index',
                    width: 60,
                    align: 'center'
                },{
                    title: '姓名',
                    key: 'name',
                    width: 80,
                    align: 'center'
                },{
                    title: '申请时间',
                    key: 'applicationDate',
                    width: 200,
                    align: 'center'
                },{
                    title: '审批进度',
                    key: 'progressCode'
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
                            }, '查看'), h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.del(params.index);
                                    }
                                }
                            }, '删除')
                        ])
                    }
                }
            ],
            tableData: [
                {
                    name: '刘奇',
                    applicationDate: '2017-10-27 10:27:00',
                    progressCode: '主管已批'
                },
                {
                    name: '刘奇',
                    applicationDate: '2017-10-27 10:27:00',
                    progressCode: '已审批'
                },
                {
                    name: '刘奇',
                    applicationDate: '2017-10-27 10:27:00',
                    progressCode: '待审批'
                }
            ],
            rules: {
                leaveDateBegin: [
                    {required: true, type: 'date', message: '请选择开始时间', trigger: 'change'}
                ],
                leaveDateEnd: [
                    {required: true, type: 'date', message: '请选择结束时间', trigger: 'change'}
                ],
                leaveReason: [
                    {required: true, message: '请填写请假理由', trigger: 'blur'},
                    {type: 'string'}
                ],
                successor: [
                    {required: true, message: '请填写工作承接人', trigger: 'blur'}
                ],
                leaveType: [
                    {required: true, message: '请选择请假类型', trigger: 'blur'}
                ]
            }
        };
    },
    computed: {

    },
    methods: {
        init () {
            axios.get('http://127.0.0.1:3000/staff?id='+this.getCurrentStaffId()).then((res) => {
                console.log(res.data);
                if(res.data.status == 1) {
                    this.currStaffData = res.data.result.list[0];
                }else{
                    alert(res.data.msg);
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        // 获取当前登录用户id
        getCurrentStaffId () {
            let id = 1;
            return id;
        },
        show (index) {

        },
        del (index) {

        },
        handleSubmit () {
            console.log(this.currStaffData)
        }
    },
    mounted () {
        this.init();
    }
}
</script>