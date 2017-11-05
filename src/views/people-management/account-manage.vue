<template>
    <div>
        <Row type="flex" justify="start">
            <Col Span="22">
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
                    <Modal width="600" v-model="addInfoFlag" title="添加用户" @on-ok="handleSubmit('addStaffData')" @on-cancel="cancel">
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
                            <!--<FormItem label="密码：" prop="pwd" required>-->
                                <!--<Input v-model="addStaffData.pwd" style="width: 300px;" placeholder="请输入密码" />-->
                            <!--</FormItem>-->
                            <!--<FormItem label="确认密码：" prop="pwdCheck" required>-->
                                <!--<Input v-model="addStaffData.pwdCheck" style="width: 300px;" placeholder="请再次确认密码" />-->
                            <!--</FormItem>-->
                            <FormItem label="手机号：" prop="phone" required>
                                <Input v-model="addStaffData.phone" style="width: 300px;" placeholder="请输入手机号" />
                            </FormItem>
                            <FormItem label="邮箱：" prop="email" required>
                                <Input v-model="addStaffData.email" style="width: 300px;" placeholder="请输入邮箱" />
                            </FormItem>

                            <!-- <FormItem label="职位：" prop="position">
                                <Input v-model="addStaffData.position" type="text" style="width: 300px;" placeholder="请选择职位" />
                            </FormItem>
                            <FormItem label="部门：" prop="department">
                                <Input v-model="addStaffData.department" type="text" style="width: 300px;" placeholder="请选择部门" />
                            </FormItem> -->
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
import asyncValidator from 'async-validator';
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
//                pwd: [
//                    {validator: validatePass, trigger: 'blur'},
//                ],
//                pwdCheck: [
//                    {validator: validatePassCheck, trigger: 'blur' }
//                ],
                phone: [
                    {required: true, message: '手机号不能为空', trigger: 'blur'},
                    // {pattern: '/^(14[7]|13[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/', message: '请输入正确的手机号', trigger: 'blur'}
                    // {type: 'number', message: '请输入正确的手机号', trigger: 'blur'}
                ],
                email: [
                    {required: true, message: '邮箱不能为空', trgger: 'blur'},
                    {type: 'email', message: '请输入正确的邮箱号', trigger: 'blur'}
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
                    width: 150,
                    editable: true
                },
                {
                    title: '姓名',
                    key: 'name',
                    align: 'center',
                    width: 150,
                    editable: true
                },
                {
                    title: '工号',
                    key: 'staffId',
                    align: 'center',
                    width: 150,
                    sortable: true
                },
                {
                    title: '职位',
                    key: 'position',
                    align: 'center',
                    width: 150
                },
                {
                    title: '部门',
                    key: 'department',
                    align: 'center',
                    width: 150
                },
                {
                    title: '直属上级',
                    key: 'immediateLeader',
                    align: 'center',
                    width: 150
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
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
                                        console.log('on-ok')
                                        console.log(params)
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
            isDeleting: false
        }
    },
    methods: {
        init () {
            axios.get('http://localhost:3000/staff/query').then((res) => {
                console.log(res.data);
                if(res.data.status==1){
                    this.data = res.data.result.list;
                }
            }).catch((err) => {
                console.log(err);
            })
        },
      // 查询用户
        query () {
            axios({
                    url: 'http://localhost:3000/staff/query',
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
        },
        // 添加用户确定提交按钮
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    axios.post('http://localhost:3000/staff/add',this.addStaffData)
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
            axios.post('http://localhost:3000/staff/del', {id})
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
            axios.post('http://localhost:3000/staff/update', {id,name,staffId})
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
            this.$Message.info('点击了取消');
        },

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