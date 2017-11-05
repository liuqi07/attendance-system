<template>
    <div>
        <Row>
            <!-- 申请区域 -->
            <Col span="10">
                <Card>
                    <p slot="title">
                        <Icon type="clipboard"></Icon>
                        调休申请
                    </p>
                    <Form ref="applicationData" :label-width="100" :model="applicationData" :rules="rules">
                        <FormItem label="申请人：" prop="name">
                            <Input v-model="applicationData.name" type="text" style="width: 200px;" placeholder="申请人" disabled/>
                        </FormItem>
                        <FormItem label="部门：">
                            <Input v-model="applicationData.department" type="text" style="width: 200px;" placeholder="请选择部门" disabled/>
                        </FormItem>
                        <FormItem label="开始时间：" required prop="leaveDateBegin">
                            <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss" @on-change="leaveDateBeginChange" placeholder="选择开始时间" style="width: 200px"></DatePicker>
                        </FormItem>
                        <FormItem label="结束时间：" required>
                            <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss" @on-change="leaveDateEndChange" placeholder="选择结束时间" style="width: 200px"></DatePicker>
                        </FormItem>
                        <FormItem label="工作承接人：" required prop="successor">
                            <Input v-model="applicationData.successor" type="text" style="width: 200px;" placeholder="" />
                        </FormItem>
                        <FormItem label="请假理由：" required prop="leaveReason">
                            <Input v-model="applicationData.leaveReason" type="textarea" style="width: 200px;" placeholder="" />
                        </FormItem>
                        <FormItem label="请假类型：" required prop="leaveType">
                            <RadioGroup v-model="applicationData.leaveType">
                                <Radio label="调休" value=1></Radio>
                                <Radio label="事假" value=2></Radio>
                                <Radio label="病假" value=3></Radio>
                                <Radio label="婚假" value=4></Radio>
                            </RadioGroup>
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
            immediateLeaderId: null, // 上级id
            applicationData: {
              id: null,
              name: '',
              userName: '',
              department: '',
              immediateLeader: '',
              immediateLeaderId: null,
              leaveDateBegin: '',
              leaveDateEnd: '',
              successor: '',
              leaveReason: '',
              leaveType: ''
            },
            hasSubmit: false,
            columns: [
                {
                    title: '姓名',
                    key: 'name',
                    align: 'center'
                },{
                    title: '申请时间',
                    key: 'applicationDate',
                    width: 130,
                    align: 'center'
                },{
                    title: '审批进度',
                    key: 'progress',
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
                title: '请假日期',
                key: 'leaveDate',
                align: 'center'
              },{
                title: '请假原因',
                key: 'leaveReason',
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
                          console.log(params)
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
//                          this.refuseApplication();
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
            tableData2: [
              {
                name: '刘奇',
                department: '前端组',
                applicationDate: '10-27 12:34',
                leaveDate: '10/28 09:00 10/28 18:00',
                leaveReason: '修车'
              }
            ],
            rules: {
                leaveDateBegin: [
                    {required: true, type: 'date', message: '请选择开始时间', trigger: 'blur'}
                ],
                leaveDateEnd: [
                    {required: true, type: 'date', message: '请选择结束时间', trigger: 'blur'}
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
//      getCurrentStaffId () {
//        let id = 10;
//        return id;
//      },
//      getCurrentRole () {
//        let role = 2;
//        return role;
//      }
    },
    methods: {
        init () {
            axios({
                  url: 'http://localhost:3000/staff/query',
                  params: {id: this.getCurrentStaffId()}
                })
                .then((res) => {
                if(res.data.status == 1) {
                    let result = res.data.result.list[0];
                    let applicationData = {};
//                    let {id, name, userName, department, immediateLeader, immediateLeaderId, leaveDateBegin, leaveDateEnd, successor, leaveReason, leaveType} = result;
                    
                      console.log(this.applactionData)
                    applicationData.id = result.id;
                    applicationData.name = result.name;
                    applicationData.userName = result.userName;
                    applicationData.department = result.department;
                    applicationData.immediateLeaderId = result.immediateLeaderId;
                    applicationData.immediateLeader = result.immediateLeader;
                    applicationData.role = result.role;
                    this.applicationData = applicationData;
                }else{
                    alert(res.data.msg);
                }
            }).catch((err) => {
                console.log(err);
            });
        },
      queryRecord () {
        // 查询申请记录
        axios.get('http://localhost:3000/application/queryRecord?id='+this.getCurrentStaffId()+'&type=1&pageSize=5')
        .then((res) => {
          if(res.data.status == 1) {
            let result = res.data.result.list;
            result.forEach((item) => {
              switch(item.leaveProgress){
                case 1: item.progress = '待主管审批'; break;
                case 2: item.progress = '待总监审批'; break;
                case 3: item.progress = '总监已批'; break;
              }
            })
            this.tableData = res.data.result.list;
          }else {
            this.tableData = [];
          }
        })
      },
      // 查询待审批记录
      queryNotApprove () {
          axios.post('http://localhost:3000/application/queryNotApprove', {id: this.getCurrentStaffId(), role: this.getCurrentRole()})
            .then((res) => {
                if(res.data.status===1){
//                  this.$Message.success(res.data.msg)
                  this.tableData2 = res.data.result.list;
                }
            })
      },
        // 获取当前登录用户id
        getCurrentStaffId () {
            let id = 10;
            return id;
        },
        getCurrentRole () {
            let role = 2;
            return role;
        },
        show (index) {

        },
        del (_id) {
            axios.post('http://localhost:3000/application/delApplication', {_id})
                .then((res) => {
                    if(res.data.status===1){
                      this.$Message.success(res.data.msg);
                      this.queryRecord();
                    }
                })
        },
        // 提交申请
        handleSubmit () {
            let Count = 0;
            for(var item in this.applicationData){
              if(this.applicationData[item]) Count ++;
            }
            if(Count === 12){
              this.applicationData.applicationDate = new Date().getTime();
              this.applicationData.type = 1;
              axios.post('http://localhost:3000/application/addApplication', this.applicationData)
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
        // 格式化时间
        leaveDateBeginChange (data) {
            this.applicationData.leaveDateBegin = data;
        },
        leaveDateEndChange (data) {
            this.applicationData.leaveDateEnd = data;
        },
        // 同意申请
        agreeApplication (_id,id,role) {
            axios.post('http://localhost:3000/application/approve', {_id, role: this.getCurrentRole(), action: 1})
                .then((res) => {
                    if(res.data.status===1){
                      this.$Message.success(res.data.msg);
                      this.queryNotApprove();
                    }
                })
        }
    },
    mounted () {
        this.init();
        this.queryRecord();
        this.queryNotApprove();
    }
}
</script>