<template>
  <div>
    <a-form :form="form" @submit="handleSubmit" class="wrapper">
      <h2>满足条件：</h2>
      <div class="parWrapper">
        <!-- 一级用户表单区 -->
        <div v-for="(item,index) in user" class="parBlock">
          <!-- 一级用户表单 -->
          <userForm
            first="true"
            :index="index"
            :item="item.values"
            @removeUser="removeUser(index)"
            @addUserSonUser="addUserSon(index,'user')"
            @addUserSonAct="addUserSon(index,'act')"
          >
          </userForm>
          <div class="sonWrapper">
            <!--一级用户 二级用户 表单 -->
            <div v-for="(item,k) in item.userSon" style="marginLeft:50px">
              <userForm
                @removeUserSon="removeUserSon('user',index,k)"
                :index="k"
                :item="item"

              ></userForm>
            </div>

            <!--一级用户  二级活动 表单-->
            <div v-for="(item,k) in item.actSon" style="marginLeft:50px">
              <actForm 
                @removeActSon="removeActSon('user',index,k)"
                :index="k"
                :item="item"
                ></actForm>
            </div>

            <!-- 一级用户的连接 -->
            <div
              class="bind"
              v-if="user[index].userSon.length != 0 ||user[index].actSon.length != 0"
            >
              <strong @click="bindChange">{{bindTxt[1]}}</strong>
            </div>
          </div>
        </div>
        <!--一级活动表单区  -->
        <div v-for="(item,index) in act" class="parBlock">
          <!-- 一级活动表单 -->
          <actForm
            first="true"
            :index="index"
            :item="item.values"
            @removeAct="removeAct(index)"
            @addActSonUser="addActSon(index,'user')"
            @addActSonAct="addActSon(index,'act')"
          ></actForm>
          <div class="sonWrapper">
            <!--一级活动 二级用户 表单 -->
            <div v-for="(item,k) in item.userSon" style="marginLeft:50px">
              <userForm 
                @removeUserSon="removeUserSon('act',index,k)"
                :index="k"
                :item="item"
                ></userForm>
            </div>

            <!-- 一级活动 二级活动 表单 -->
            <div v-for="(item,k) in item.actSon" style="marginLeft:50px">
              <actForm 
                :index="k"
                :item="item"
                @removeActSon="removeActSon('act',index,k)"
                ></actForm>
            </div>
            <!-- 一级活动的连接 -->
            <div class="bind" v-if="act[index].userSon.length != 0 ||act[index].actSon.length != 0">
              <strong @click="bindChange">{{bindTxt[1]}}</strong>
            </div>
          </div>
        </div>
        <div class="bind parent" v-if="user.length != 0 ||act.length != 0">
          <strong @click="bindChange">{{bindTxt[1]}}</strong>
        </div>
      </div>
      <a-row>
        <a-col>
          <a-form-item>
            <a-button type="primary" @click="addUser" style="marginRight:20px">用户属性</a-button>
            <a-button type="primary" @click="addAct" style="marginRight:20px">触发事件</a-button>
            <a-button type="primary" @click="handleSubmit">预览</a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <a-table
      :columns="columns"
      :dataSource="tableData"
      :pagination="pagination"
      :loading="loading"
      class="displayTable"
    ></a-table>
  </div>
</template>

<script>
import UserForm from "./userForm";
import ActForm from "./actForm";
// import reqwest from 'reqwest';

let userId = 0;
let actId = 0;
const columns = [
  {
    dataIndex: "name",
    key: "name",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "name" }
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age"
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address"
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    scopedSlots: { customRender: "tags" }
  },
  {
    title: "Action",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];

const tableData = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"]
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"]
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  }
];

export default {
  components: {
    UserForm,
    ActForm
  },
  mounted() {
  },
  data() {
    return {
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 }
        }
      },
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 }
        }
      },
      sonFlag: true,
      label: "且",
      user: [],
      act: [],
      bindTxt: ["且", "或"],
      data: [],
      pagination: {},
      loading: false,
      columns,
      tableData
    };
  },

  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    //   删除一级表单区域
    removeUser(k) {
      this.user = this.user.filter((ele, index) => index !== k);
    },
    removeAct(k) {
      this.act = this.act.filter((ele, index) => index !== k);
    },

    // 删除 用户 二级表单
    removeUserSon(flag, index, k) {
      if (flag === "user") {
        // 删除 一级用户下的 二级用户
        console.log(this.user[index].userSon,k)
        this.user[index].userSon = this.user[index].userSon.filter(
          (ele, index) => index !== k
        );
      } else if (flag === "act") {
        // 删除的是一级活动下的 二级用户
        this.act[index].userSon = this.act[index].userSon.filter(
          (ele, index) => index !== k
        );
      } else return;
    },
    //删除 活动 二级表单
    removeActSon(flag, index, k) {
      if (flag === "user") {
        // 删除的是一级用户 二级活动
        console.log("delete user", index, k, this.user[index].actSon);
        this.user[index].actSon = this.user[index].actSon.filter(
          (ele, index) => index !== k
        );
      } else if (flag === "act") {
        // 删除的是一级活动 二级活动
        this.act[index].actSon = this.act[index].actSon.filter(
          (ele, index) => index !== k
        );
      } else return;
    },

    // 增加一级表单区域
    addUser() {
      console.log(this.form);
      this.user.push({
        userSon: [],
        actSon: [],
        values: {
          id: "",
          name: "",
          age: ""
        }
      });
    },

    addAct() {
      this.act.push({ 
        userSon: [], 
        actSon: [] ,
        values: {
          id: "",
          name: "",
          age: "",
          add: "",
          time: "",
        }
        });
    },

    //增加一级用户 的 二级表单
    addUserSon(index, type) {
      if (type == "user") {
        // 二级用户
        this.user[index].userSon.push({
          id: "",
          name: "",
          age: ""
        });
      } else if (type == "act") {
        // 二级活动
        this.user[index].actSon.push({
          id: "",
          name: "",
          age: "",
          add: "",
          time: ""
        });
      }
    },
    // 增加一级活动的  二级表单
    addActSon(index, type) {
      if (type == "user") {
        // 二级用户
        this.act[index].userSon.push({
          id: "",
          name: "",
          age: ""
        });
      } else if (type == "act") {
        // 二级活动
        this.act[index].actSon.push({
           id: "",
          name: "",
          age: "",
          add: "",
          time: ""
        });
      }
    },
    bindChange(e) {
      if (e.target.innerHTML == this.bindTxt[0]) {
        e.target.innerHTML = this.bindTxt[1];
      } else {
        e.target.innerHTML = this.bindTxt[0];
      }
    },

    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },

    handleTableChange(pagination, filters, sorter) {
      console.log(pagination);
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      });
    },
    fetch(params = {}) {
      this.loading = true;
      // this.data = [];

      // reqwest({
      //   url: 'https://randomuser.me/api',
      //   method: 'get',
      //   data: {
      //     results: 10,
      //     ...params,
      //   },
      //   type: 'json',
      // }).then((data) => {
      //   const pagination = { ...this.pagination };
      //   // Read total count from server
      //   // pagination.total = data.totalCount;
      //   pagination.total = 200;
      //   this.loading = false;
      //   this.data = data.results;
      //   this.pagination = pagination;
      // });
    }
  }
};
</script>
<style lang="css" scoped>
.wrapper {
  margin: 50px;
}
.parWrapper {
  position: relative;
}
.parBlock {
  padding: 20px;
  border: 1px solid #e0e6ed;
  margin-bottom: 30px;
}
.sonWrapper {
  position: relative;
  margin: 2px 0 0;
}

.bind {
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  width: 18px;
}
.parent {
  left: -40px;
}
.bind strong {
  position: absolute;
  top: 50%;
  left: 12px;
  width: 18px;
  height: 18px;
  margin-top: -9px;
  border-radius: 10px;
  line-height: 18px;
  font-size: 15px;
  background: rgba(0, 152, 225, 0.06);
  color: #1489e2;
  font-weight: 700;
  text-align: center;
  cursor: pointer;
  z-index: 1;
}
.bind::before {
  content: "";
  position: absolute;
  top: 0;
  width: 2px;
  height: 100%;
  background: rgba(0, 152, 225, 0.1);
  left: 20px;
  overflow: hidden;
}
.displayTable {
  padding: 0 50px 50px;
}
</style>