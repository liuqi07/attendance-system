<template>
    <div>
        <Row>
            <Col>
                <Card>
                    <Form ref="queryData" :model="queryData" :rules="ruleInline" inline>
                        <FormItem prop="userName">
                            <Input type="text" v-model="queryData.userName" placeholder="用户名"></Input>
                        </FormItem>
                        <FormItem prop="name">
                            <Input type="text" v-model="queryData.name" placeholder="姓名"></Input>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="query">查询</Button>
                            <Button type="primary" @click="add">新增</Button>
                        </FormItem>
                    </Form>
                    <Row>
                        <Table refs="table2" :columns="columns" :data="data"></Table>
                    </Row>
                    <!-- 修改个人信息弹框 -->
                    <Modal width="600" v-model="showInfoFlag" title="修改个人信息" @on-ok="ok" @on-cancel="cancel">
                        <Form :label-width="150">
                            <FormItem label="用户名：">
                                <Input disabled v-model="currStaffData.userName" type="text" style="width: 300px;" placeholder="用户名"/>
                            </FormItem>
                            <FormItem label="姓名：">
                                <Input v-model="currStaffData.name" type="text" style="width: 300px;" placeholder="姓名" />
                            </FormItem>
                            <FormItem label="工号：">
                                <Input v-model="currStaffData.staffId" type="text" style="width: 300px;" placeholder="工号" />
                            </FormItem>
                        </Form>
                    </Modal>
                    <!-- 新增个人信息弹框 -->
                    <Modal width="600" v-model="addInfoFlag" title="添加用户" @on-cancel="cancel">
                        <Form ref="addStaffData" :label-width="150" :model="addStaffData" :rules="addStaffRules">
                            <FormItem label="姓名：" prop="name" required>
                                <Input v-model="addStaffData.name" style="width: 300px;" placeholder="请输入姓名" />
                            </FormItem>
                            <FormItem label="工号：" prop="staffId" required>
                                <Input v-model="addStaffData.staffId" style="width: 300px;" placeholder="请输入工号" />
                            </FormItem>
                            <FormItem label="用户名：" prop="userName" required>
                                <Input v-model="addStaffData.userName" style="width: 300px;" placeholder="请输入用户名" />
                            </FormItem>
                            <FormItem label="密码：" prop="pwd" required>
                                <Input v-model="addStaffData.pwd" type="password" style="width: 300px;" placeholder="请输入密码" />
                            </FormItem>
                            <FormItem label="角色：" required>
                                <Select clearable style="width:200px" @on-change="onChangeRole" placeholder="请选择角色">
                                    <Option v-for="item in roleList" :value="item.id" :key="item.id">{{ item.roleName }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="部门：" required>
                                <Select clearable style="width:200px" @on-change="onChangeGroup" placeholder="请选择部门">
                                    <Option v-for="(item,i) in groupList" :value="item.groupName" :key="item.groupName">{{ item.groupName }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem>
                                <Button type="ghost" style="margin: 15px 10px 15px 50px;">取消</Button>
                                <Button type="primary" @click="handleSubmit('addStaffData')" style="margin: 15px 0;">提交</Button>
                            </FormItem>
                        </Form>
                        <div slot="footer"></div>
                    </Modal>
                </Card>
            </Col>
        </Row>
    </div>
</template>
<script type="text/javascript">

import axios from 'axios';
import config from '../../config/config';
import asyncValidator from 'async-validator';
import md5 from 'md5';
import util from '../../libs/util';
export default {
    data () {
        const validatePass = (rule, value, callback) => {
            if (value == '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.addStaffData.pwdCheck !== '') {
                    // 对第二个密码框单独验证
                    // this.$refs.addStaffData.validateField('pwdCheck');
                }
                callback();
            }
        };
        const validatePassCheck = (rule, value, callback) => {
            if (value == '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.addStaffData.pwd) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            queryData: {
                userName: null,
                name: null
            },
            ruleInline: {
                userName: [],
                name: []
            },
            currStaffData: {
                userName: '',
                name: '',
                staffId: ''
            },
            addStaffData: {},
            addStaffRules: {
                userName: [
                    {required: true, message: '用户名不能为空', trigger: 'blur'},
                    {type: 'string', min: 2, max: 20, message: '长度请在2-20个字符之间', trigger: 'blur'}
                ],
                name: [
                    {required: true, message: '姓名不能为空', trigger: 'blur'},
                ],
                staffId: [
                    {required: true, message: '工号不能为空', trigger: 'blur'},
                ],
                pwd: [
//                    {validator: validatePass, trigger: 'blur'},
                    {required: true, message: '密码不能为空', trigger: 'blur'}
                ]
            },
            columns: [
                {
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '用户名',
                    key: 'userName',
                    align: 'center',
                    editable: true
                },
                {
                    title: '姓名',
                    key: 'name',
                    align: 'center',
                    editable: true
                },
                {
                    title: '工号',
                    key: 'staffId',
                    align: 'center',
                    sortable: true
                },
                {
                    title: '部门',
                    key: 'department',
                    align: 'center',
                },
                {
                    title: '直属上级',
                    key: 'immediateLeader',
                    align: 'center'
                },
                {
                    title: '操作',
                    key: 'action',
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
                                        this.update(params.index);
                                    }
                                }
                            }, '修改'), h('Poptip', {
                                props: {
                                    confirm: true,
                                    title: '确认删除这条数据？',
                                    transfer: true
                                },
                                on: {
                                    'on-ok': () => {
                                        this.isDeleting = true;
                                        this.del(params.row.id);
                                    }
                                }
                            }, [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small',
                                        placement: 'top',
                                        loading: this.isDeleting
                                    }
                                }, '删除')
                            ])
                        ])
                    }
                }
            ],
            data: [
                {
                    userName: 'liuqi',
                    name: '刘奇',
                    staffId: 'YG0005242',
                    position: '前端开发',
                    department: '前端组'
                },{
                    userName: 'liuqi',
                    name: '刘奇',
                    staffId: 'YG0005242',
                    position: '前端开发',
                    department: '前端组'
                },{
                    userName: 'liuqi',
                    name: '刘奇',
                    staffId: 'YG0005242',
                    position: '前端开发',
                    department: '前端组'
                }
            ],
            showInfoFlag: false,
            addInfoFlag: false,
            index: null,
            isDeleting: false,
            roleList: [],
            groupList: []
        }
    },
    methods: {
        init () {
            axios.get(config.devBaseUrl + '/staff/query').then((res) => {
                if(res.data.status===1){
                    this.data = res.data.result.list;
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        // 查询用户
        query () {
            axios({
                    url: config.devBaseUrl + '/staff/query',
                    params: this.queryData
                })
                .then((res) => {
                    if(res.data.status==1){
                        this.$Message.info(res.data.msg);
                        this.data = res.data.result.list;
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        },
        // 弹出添加用户谈框
        add () {
            this.addInfoFlag = true;
            this.getRoleList();
            this.getGroupList();
        },
        // 添加用户确定提交按钮
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
//                    this.addStaffData.pwd = this.getmd5(this.addStaffData.pwd);
                    this.addStaffData.pwd = this.md5(this.addStaffData.pwd);
                    axios.post(config.devBaseUrl + '/staff/add',this.addStaffData)
                        .then((res) => {
                            console.log(res)
                            if(res.data.status==1){
                                this.$Message.success('提交成功!');
                                this.addInfoFlag = false;
                                this.init();
                            }else{
                                this.$Message.error(res.data.msg);
                            }
                        })
                } else {
                    this.$Message.error('请检查输入是否正确!');
                }
            })
        },
        update (index) {
            this.showInfoFlag = true;
            this.currStaffData = this.data[index];
            this.index = index;
        },
        // 删除操作
        del (id) {
            axios.post(config.devBaseUrl+'/staff/del', {id})
                .then((res) => {
                    console.log(res);
                    if(res.data.status==1)this.$Message.info(res.data.msg);
                    this.init();
                })
                .catch((err) => {
                    console.log(err);
                })
            this.isDeleting = false;
        },
        // 修改用户信息
        ok () {
            console.log(this.currStaffData);
            const {id,name,staffId} = this.currStaffData;
            axios.post(config.devBaseUrl+'/staff/update', {id,name,staffId})
                .then((res) => {
                    console.log(res);
                    this.$Message.info('点击了确定');
                    this.init();
                })
                .catch((err) => {
                    console.log(err);
                })
        },
        cancel () {
            this.addInfoFlag = false;
            this.$Message.info('点击了取消');
        },
        // 角色列表回显
        getRoleList () {
            axios.get(config.devBaseUrl+'/role/query')
            .then((res) => {
                if(res.data.status===1){
//                    let result = res.data.result.list;
                    this.roleList = res.data.result.list;
                }else{
                    this.$Message.error(res.data.msg);
                }
            })
        },
        // 组列表回显
        getGroupList () {
            axios.get(config.devBaseUrl+'/group/query')
            .then((res) => {
                if(res.data.status===1){
                    this.groupList = res.data.result.list;
                    
                }else{
                    this.$Message.error(res.data.msg);
                }
            })
        },
        onChangeRole (data) {
            this.addStaffData.role = data;
        },
        onChangeGroup (data) {
            this.addStaffData.department = data;
            this.groupList.forEach((item) => {
                if(item.groupName==data){
                    this.addStaffData.immediateLeaderId = item.groupLeaderId;
                    this.addStaffData.immediateLeader = item.groupLeader;
                }
            })
        },
        // md5 加密
        md5 (pwd) {
            return md5(pwd);
        }

    },
    mounted () {
        this.init();
    }
}
</script>
<style lang="less">
    @import '../../styles/common.less';
    @import '../tables/components/table.less';
</style>