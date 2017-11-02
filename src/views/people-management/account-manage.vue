<template>
    <div>
        <Row type="flex" justify="start">
            <Col Span="22">
                <Card>
                    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                        <FormItem prop="userName">
                            <Input type="text" v-model="formInline.userName" placeholder="用户名"></Input>
                        </FormItem>
                        <FormItem prop="name">
                            <Input type="text" v-model="formInline.name" placeholder="姓名"></Input>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="">查询</Button>
                            <Button type="primary" @click="">新增</Button>
                        </FormItem>
                    </Form>
                    <Row>
                        <Table refs="table2" :columns="columns" :data="data"></Table>
                    </Row>
                    <!-- 修改个人信息弹框 -->
                    <Modal width="600" v-model="showInfo" title="修改个人信息" @on-ok="ok" @on-cancel="cancel">
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
                </Card>
            </Col>
        </Row>
    </div>
</template>
<script type="text/javascript">

import axios from 'axios';
export default {
    data () {
        return {
            formInline: {
                userName: '',
                name: ''
            },
            ruleInline: {

            },
            currStaffData: {
                userName: '',
                name: '',
                staffId: ''
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
                                        this.del(params.index);
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
            showInfo: false,
            index: null,
            isDeleting: false
        }
    },
    methods: {
        init () {
            axios.get('http://59.110.165.79:3000/staff').then((res) => {
                console.log(res.data);
                if(res.data.status==1){
                    this.data = res.data.result.list;
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        update (index) {
            this.showInfo = true;
            this.currStaffData = this.data[index];
            this.index = index;
        },
        del (index) {
            this.data.splice(this.index, 1);
            this.isDeleting = false;
            this.$Message.info('删除成功！');
        },
        ok () {
            console.log(this.currStaffData);
            const {id,name,staffId} = this.currStaffData;
            axios.post('http://59.110.165.79:3000/staff/update', {id,name,staffId})
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