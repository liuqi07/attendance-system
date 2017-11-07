<template>
    <div>
        <Row>
            <Card>
                <Form :model="queryGroupData" inline>
                    <FormItem>
                        <Input type="text" v-model="queryGroupData.groupName" placeholder="组名称"/>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="query">查询</Button>
                        <Button type="primary" @click="add">新增</Button>
                    </FormItem>
                </Form>
                <Table :columns="groupColumns" :data="groupData"></Table>
            </Card>
        </Row>
    </div>
</template>
<script type="text/javascript">
    import axios from 'axios';
    export default {
        data () {
            return {
                queryGroupData: {},
                groupColumns: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },{
                        title: '组名称',
                        key: 'groupName',
                        align: 'center'
                    },{
                        title: '负责人',
                        key: 'groupLeader',
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
                                            this.update(params.row._id);
                                        }
                                    }
                                }, '修改'),
                                h('Poptip', {
                                    props: {
                                        confirm: true,
                                        title: '确认删除这个组？',
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
                groupData:[],
            }
        },
        methods: {
            init () {
            
            },
            query () {
                let params = this.queryGroupData.groupName?{groupName:this.queryGroupData.groupName}:{};
                axios({
                    url: 'http://10.0.133.78:8080/api/group/query',
                    params: params
                })
                .then((res) => {
                    if(res.data.status===1){
                        this.groupData = res.data.result.list;
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