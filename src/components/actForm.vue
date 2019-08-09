<template>
  <a-row :key="index" type="flex" align="middle">
    <a-col :span="3">
      <a-form-item :required="false">
        <a-select  v-model="item.id" @change="handleChange">
          <a-select-option v-for="(item,k) in selects" :key="k" :value="item.value" >{{item.value}}</a-select-option>
        </a-select>
      </a-form-item>
    </a-col>
    <a-col style="marginLeft:10px;lineHeight:40px">的</a-col>
    <a-col :span="2" style="marginLeft:10px">
      <a-form-item :required="false">
        <a-select v-model="item.name" @change="handleChange">
          <a-select-option v-for="(item,k) in selects"  :key="k" :value="item.value">{{item.value}}</a-select-option>
        </a-select>
      </a-form-item>
    </a-col>
    <a-col :span="2" style="marginLeft:10px">
      <a-form-item :required="false">
        <a-select v-model="item.age" @change="handleChange">
          <a-select-option v-for="(item,k) in selects" :key="k" :value="item.value">{{item.value}}</a-select-option>
        </a-select>
      </a-form-item>
    </a-col>
    <a-col :span="2" style="marginLeft:10px">
      <a-form-item :required="false">
        <a-input v-model="item.add" placeholder="1" />
      </a-form-item>
    </a-col>
    <a-col style="marginLeft:10px;lineHeight:40px">在</a-col>
    <a-col :span="2" style="marginLeft:10px">
      <a-form-item :required="false">
        <a-input v-model="item.time"  placeholder="过去七日" />
      </a-form-item>
    </a-col>
    <a-col style="marginLeft:10px;lineHeight:40px">内</a-col>
    <!-- 一级表单删除 二号表单增加 -->
    <a-col v-if="first" :span="8" style="marginLeft:10px">
      <a-button @click="removeAct" type="dashed" size="small">删除一级</a-button>
      <a-button @click="addActSon('user')" type="dashed" size="small">用户属性</a-button>
      <a-button @click="addActSon('act')" type="dashed" size="small">触发事件</a-button>
    </a-col>
    <a-col v-if="!first" :span="8" style="marginLeft:10px">
      <a-icon
        class="dynamic-delete-button"
        type="minus-circle-o"
        @click="removeActSon"
      />
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
  mounted(){
  },
  data() {
    return {
      selects: [{ value: "zhansan" }, { value: "lisi" }, { value: "wangwu" }]
    };
  },
  methods: {
    removeAct() {
      this.$emit("removeAct");
    },
    addActSon(flag) {
      if (flag === "user") {
        this.$emit("addActSonUser");
      } else if (flag === "act") {
        this.$emit("addActSonAct");
      } else return;
    },
    removeActSon() {
      this.$emit("removeActSon");
    },
     handleChange(value) {
    }
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

