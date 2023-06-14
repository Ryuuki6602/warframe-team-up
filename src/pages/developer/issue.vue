<template>
  <div class="p-20px">
    <el-form
      :rules="formRule"
      ref="formRef"
      :model="form"
      label-position="top"
      :show-message="false"
    >
      <el-form-item label="[Bug | 功能请求 | 建议]题目" prop="content">
        <el-input
          v-model="form.content"
          type="textarea"
          :rows="20"
          maxlength="2000"
          placeholder="你的想法说不定会成为我们的下一个功能，并大放异彩！"
          show-word-limit
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit(formRef)">提交</el-button>
      </el-form-item>
    </el-form>
    <div v-for="(item, index) in issueList" class="issueList">
      <div class="flex justify-between w-100%">
        <div class="flex">
          <el-avatar :src="item.avatar"></el-avatar>
          <div class="ml-15px">
            <div>{{ item.nickname }}</div>
            <div>
              {{
                item.createTime == '刚刚'
                  ? '刚刚'
                  : diffTimeFromNow(item.createTime)
              }}
            </div>
            <article class="article">{{ item.content }}</article>
          </div>
        </div>
        <div v-if="item.uuid == _authStore.getUUID()">
          <el-button
            @click="deleteIssue(item.issueId, index)"
            icon="i-ep-delete"
          ></el-button>
        </div>
      </div>
      <el-divider></el-divider>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { ElNotification, FormInstance } from 'element-plus'
import { addIssue, getIssue, deleteIssueByIssueId } from '@api/develop'
import { useLastChanged } from '@vueuse/core'
import { diffTimeFromNow } from '@utils/DateUtil'
import { authStore } from '@store'

const _authStore = authStore()
const formRef = ref<FormInstance>()
const form = reactive({
  content: ''
})
const formRule = reactive({
  content: [
    { required: true, message: '请输入内容' },
    { min: 1, message: '内容太少了' },
    { max: 2000, message: '内容太多了' }
  ]
})
const lastPost = ref<number>(0)
const submit = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid: boolean) => {
    if (valid && Date.now() - lastPost.value > 10000) {
      lastPost.value = Date.now()
      const fb = await addIssue(form)
      if (fb.res) {
        let a = {
          avatar: _authStore.getAvatar(),
          nickname: _authStore.getNickname(),
          createTime: '刚刚',
          content: form.content,
          uuid: _authStore.getUUID()
        }
        issueList.value.unshift(a)
        ElNotification({
          title: '提交成功',
          message: '感谢你的反馈',
          type: 'success'
        })
      }
    } else {
      console.log('error submit!!')
      return false
    }
  })
}

const issueList = ref<any>([])
const getIssueList = async () => {
  const fb = await getIssue()
  issueList.value = fb.res
}

const deleteIssue = async (issueId: string, index: number) => {
  console.log(issueId, index)

  const fb = await deleteIssueByIssueId(issueId)
  if (fb.res) {
    issueList.value.splice(index, 1)
    ElNotification({
      title: '删除成功',
      message: '已删除该条反馈',
      type: 'success'
    })
  } else {
    ElNotification({
      title: '删除失败',
      message: '删除失败，请稍后重试',
      type: 'error'
    })
  }
}
onMounted(() => {
  getIssueList()
})
</script>

<style lang="scss" scoped>
.issueList {
  margin-top: 20px;
  border: 1px solid var(--el-border-color-base);
  border-radius: 5px;
  .title {
    color: var(--el-text-color-secondary);
  }
  .article {
    padding: 10px 0;
    color: var(--el-text-color-secondary);
  }
}
</style>
