// {
//     id: 1,
//     staffId: '0005242',
//     userName: 'liuqi',
//     password: '123456',
//     name: '刘奇',
//     departement: '前端组',
//     position: 1, //职位 员工 1 主管 2 总监 3 人事 4
//     immediatedLeaderId: 10, // 上级Id
//     immediatedLeader: '王强', // 上级姓名
//     applicationDate: '', // 申请时间
//     leaveDateBegin: '', // 假期开始时间
//     leaveDateEnd: '', // 假期结束时间
//     leaveReason: '', // 申请理由
//     successor: '', // 工作承接人
//     vacationType: 0, // 休假类型 调休 1 年假 2 事假 3 病假 4
//     progressCode: 1, // 审批进度 待审批 1 主管已批 2 总监已批 3 拒绝 4
//     pendingApplications: [], // 待处理申请
//     processedApplications: [], // 已处理申请
//     record: [ // 申请记录
//         {
//             index: 1,
//             applicationDate: '2017-10-26 19:20:19',
//             leaveDateBegin: '2017-10-27 18:00:00',
//             leaveDateEnd: '2017-10-27 9:00:00',
//             leaveReason: '请假理由',
//             successor: '陈燕',
//             result: 1 // 审批结果 同意 1 拒绝 0
//         }
//     ]
// }

export default [
    {
        id: 1,
        staffId: '0005242',
        userName: 'liuqi',
        password: '123456',
        name: '刘奇',
        departement: '前端组',
        position: 1,
        immediatedLeaderId: 10,
        immediatedLeader: '王强',
        applicationDate: '',
        leaveDateBegin: '',
        leaveDateEnd: '',
        leaveReason: '',
        successor: '',
        vacationType: 0,
        progressCode: 1,
        record: [
            {
                index: 1,
                applicationDate: '2017-10-26 19:20:19',
                leaveDateBegin: '2017-10-27 18:00:00',
                leaveDateEnd: '2017-10-27 9:00:00',
                leaveReason: '请假理由',
                successor: '陈燕',
                result: 1
            },
            {
                index: 2,
                applicationDate: '2017-10-26 19:20:19',
                leaveDateBegin: '2017-10-27 18:00:00',
                leaveDateEnd: '2017-10-27 9:00:00',
                leaveReason: '请假理由',
                successor: '陈燕',
                result: 1
            }
        ]
    },
    {
        id: 2,
        staffId: '0005243',
        userName: 'chenyan',
        password: '123456',
        name: '陈燕',
        departement: '前端组',
        position: 1,
        immediatedLeaderId: 10,
        immediatedLeader: '王强',
        applicationDate: '',
        leaveDateBegin: '',
        leaveDateEnd: '',
        leaveReason: '',
        successor: '',
        vacationType: 0,
        progressCode: 1,
        record: [
            {
                index: 1,
                applicationDate: '2017-10-26 19:20:19',
                leaveDateBegin: '2017-10-27 18:00:00',
                leaveDateEnd: '2017-10-27 9:00:00',
                leaveReason: '请假理由',
                successor: '刘奇',
                result: 1
            }
        ]
    },
    {
        id: 3,
        staffId: '0005244',
        userName: 'limeiyan',
        password: '123456',
        name: '李美妍',
        departement: '前端组',
        position: 1,
        immediatedLeaderId: 10,
        immediatedLeader: '王强',
        applicationDate: '',
        leaveDateBegin: '',
        leaveDateEnd: '',
        leaveReason: '',
        successor: '',
        vacationType: 0,
        progressCode: 1,
        record: [
            {
                index: 1,
                applicationDate: '2017-10-26 19:20:19',
                leaveDateBegin: '2017-10-27 18:00:00',
                leaveDateEnd: '2017-10-27 9:00:00',
                leaveReason: '请假理由',
                successor: '陈燕',
                result: 1
            }
        ]
    },
    {
        id: 4,
        staffId: '0005245',
        userName: 'dongchangjie',
        password: '123456',
        name: '董长杰',
        departement: '前端组',
        position: 1,
        immediatedLeaderId: 10,
        immediatedLeader: '王强',
        applicationDate: '',
        leaveDateBegin: '',
        leaveDateEnd: '',
        leaveReason: '',
        successor: '',
        vacationType: 0,
        progressCode: 1,
        record: [
            {
                index: 1,
                applicationDate: '2017-10-26 19:20:19',
                leaveDateBegin: '2017-10-27 18:00:00',
                leaveDateEnd: '2017-10-27 9:00:00',
                leaveReason: '请假理由',
                successor: '陈燕',
                result: 1
            }
        ]
    },
    {
        id: 10,
        staffId: '0005257',
        userName: 'wangqiang',
        password: '123456',
        name: '王强',
        departement: '.net',
        position: 2,
        immediatedLeaderId: 20,
        immediatedLeader: '李建安',
        applicationDate: '',
        leaveDateBegin: '',
        leaveDateEnd: '',
        leaveReason: '',
        successor: '',
        vacationType: 0,
        progressCode: 1,
        pendingApplications: [
            {
                index: 1,
                applicationDate: '2017-10-26 19:20:19',
                leaveDateBegin: '2017-10-27 18:00:00',
                leaveDateEnd: '2017-10-27 9:00:00',
                leaveReason: '请假理由',
                successor: '陈燕',
                result: ''
            }
        ],
        processedApplications: [
            {

            }
        ],
        record: [
            {
                index: 1,
                applicationDate: '2017-10-26 19:20:19',
                leaveDateBegin: '2017-10-27 18:00:00',
                leaveDateEnd: '2017-10-27 9:00:00',
                leaveReason: '请假理由',
                successor: '',
                result: 1
            }
        ]
    },
    {
        id: 20,
        staffId: '0005223',
        userName: 'lijianan',
        password: '123456',
        name: '李建安',
        departement: '技术部',
        position: 3,
        immediatedLeaderId: 0,
        immediatedLeader: '',
        applicationDate: '',
        leaveDateBegin: '',
        leaveDateEnd: '',
        leaveReason: '',
        successor: '',
        vacationType: 0,
        progressCode: 1,
        record: []
    }
];