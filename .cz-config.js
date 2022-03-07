module.exports = {
  types: [
    { value: 'feat', name: 'feat: 新增 feature' },
    { value: 'fix', name: 'fix: 修复 bug' },
    { value: 'docs', name: 'docs: 仅仅修改了文档，比如 README, CHANGELOG, CONTRIBUTE等等' },
    { value: 'style', name: 'style: 仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑' },
    { value: 'refactor', name: 'refactor: 代码重构，没有加新功能或者修复 bug' },
    { value: 'perf', name: 'perf: 优化相关，比如提升性能、体验' },
    { value: 'test', name: 'test: 测试用例，包括单元测试、集成测试等' },
    { value: 'chore', name: 'chore: 改变构建流程、或者增加依赖库、工具等' },
    { value: 'revert', name: 'revert: 回滚到上一个版本' }
  ],

  scopes: [],

  scopeOverrides: {},

  // override the messages, defaults are as follows
  messages: {
    type: '选择一种你的提交类型:',
    scope: '选择一个scope (可选):',
    // used if allowCustomScopes is true
    customScope: 'Denote the SCOPE of this change:',
    subject: 'commit描述:\n',
    body: '长说明，使用"|"换行(可选)：\n',
    breaking: '是否包含 breaking change (可选):\n',
    footer: '关联关闭的issue，例如：#31, #34(可选):\n',
    confirmCommit: '确定提交说明?'
  },

  allowCustomScopes: false,
  allowBreakingChanges: ['feat', 'fix'],
  // skip any questions you want
  skipQuestions: ['scope', 'customScope', 'body', 'footer'],

  // limit subject length
  subjectLimit: 100
};