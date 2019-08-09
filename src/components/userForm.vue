<template>
  <a-row type="flex" :key="index" align="middle">
    <a-col :span="3">
      <a-form-item :required="false">
        <a-select  @change="handleChange"  v-model="item.id">
          <a-select-option v-for="(item,k) in selects" :value="item.value" :key="k">{{item.value}}</a-select-option>
        </a-select>
      </a-form-item>
    </a-col>
    <a-col :span="2" style="marginLeft:10px">
      <a-form-item :required="false">
        <a-select @change="handleChange"  v-model="item.name">
          <a-select-option v-for="(item,k) in selects" :value="item.value" :key="k">{{item.value}}</a-select-option>
        </a-select>
      </a-form-item>
    </a-col>
    <a-col :span="5" style="marginLeft:10px">
      <a-form-item :required="false">
        <a-select @change="handleChange" v-model="item.age">
          <a-select-option v-for="(item,k) in selects" :value="item.value" :key="k">{{item.value}}</a-select-option>
        </a-select>
      </a-form-item>
    </a-col>
    <!--添加两种二级表单  一级表单删除 -->
    <a-col v-if="first" :span="10" style="marginLeft:10px">
      <a-button @click="removeUser" type="dashed" size="small">删除一级</a-button>
      <a-button @click="addUserSon('user')" type="dashed" size="small">添加用户属性</a-button>
      <a-button @click="addUserSon('act')" type="dashed" size="small">添加触发事件</a-button>
    </a-col>
    <a-col v-if="!first" :span="10" style="marginLeft:10px">
      <a-icon class="dynamic-delete-button" type="minus-circle-o" @click="removeUserSon" />
    </a-col>
  </a-row>
</template>
<script>
export default {
  props: {
    first: false,
    index: Number,
    item:Object,
  },
  data() {
    return {
      selects: [{ value: "zhansan" }, { value: "lisi" }, { value: "wangwu" }],
    };
  },
  
  methods: {
    removeUser() {
      this.$emit("removeUser");
    },
    addUserSon(flag) {
      if (flag === "user") {
        this.$emit("addUserSonUser");
      } else if (flag === "act") {
        this.$emit("addUserSonAct");
      } else return;
    },
    removeUserSon() {
      this.$emit("removeUserSon");
    },
    handleChange(value) {},
  }
};
</script>
<style scoped>
.ant-form-item {
  margin-bottom: 0px;
}
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  font-size: 17px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
