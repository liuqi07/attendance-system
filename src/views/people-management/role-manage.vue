<template>
    <div>
        <Row>
            <Card>
                <Form :model="queryRoleData" inline>
                    <FormItem>
                        <Input type="text" v-model="queryRoleData.roleName" placeholder="角色名称"/>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="query">查询</Button>
                        <Button type="primary" @click="add">新增</Button>
                    </FormItem>
                </Form>
                <Table :columns="roleColumns" :data="roleData"></Table>
            </Card>
        </Row>
    </div>
</template>

<script type="text/javascript">
    
    import axios from 'axios';
    export default {
        data () {
            return {
                queryRoleData: {},
                roleColumns: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },{
                        title: '角色名称',
                        key: 'roleName',
                        align: 'center'
                    },{
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
                                            this.update(params.row._id); // 更新手机号
                                        }
                                    }
                                }, '修改'),
                                h('Poptip', {
                                    props: {
                                        confirm: true,
                                        title: '确认删除这个角色？',
                                        transfer: true
                                    },
                                    on: {
                                        'on-ok': () => {
                                            this.del(params.row._id);
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
                roleData:[
                    {roleName: '总监角色'},
                    {roleName: '主管角色'},
                    {roleName: '员工角色'},
                    {roleName: '人事角色'}
                ],
            }
        },
        methods: {
            init () {
            
            },
            query () {
                let params = this.queryRoleData.roleName?{roleName:this.queryRoleData.roleName}:{};
                axios({
                    url: 'http://10.0.133.78:8080/api/role/query',
                    params: params
                })
                .then((res) => {
                    if(res.data.status===1){
                        this.roleData = res.data.result.list;
                    }
                })
            },
            add () {
            
            },
            update (_id) {
            
            },
            del (_id) {
            
            }
        },
        mounted () {
            this.query();
        }
    }
</script>