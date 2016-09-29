/*jshint esversion:6*/
const check = (url, callback) => {
  fetch(url)
  .then(res => res.json())
  .then(result => {
    if(result.errcode === 0){
      callback();
    }else{
      callback([new Error(result.errmsg)]);
    }
  })
  .catch(err => {
    callback([new Error('网络连接失败，请检查网络连接')]);
  });
};
const userExists = (rule, value, callback) => {
  if (!value) {
    callback();
  } else {
    check('/user/check?name=' + value, callback);
  }
};
const projectExists = (rule, value, callback) => {
  if (!value) {
    callback();
  } else {
    check('/project/check?name=' + value, callback);
  }
};
const checkDate = (rule, value, callback) => {
  if (value && value.getTime() < Date.now()) {
    callback(new Error('不能选择过去的日期呀!'));
  } else {
    callback();
  }
};
const emailExists = (rule, value, callback) => {
  if (!value) {
    callback();
  } else {
    check('/email/check?email=' + value, callback);
  }
};

export const NameRule = {
  rules: [
    { required: true, min: 2, message: '姓名至少为 2 个字符' },
    { validator: userExists },
  ]
};

export const ProjectNameRule = {
  rules: [
    { required: true, min: 3, message: '项目名称至少为 3 个字符' },
    { validator: projectExists },
  ]
};

export const EmailRuleWithCheck = {
  validate: [{
    rules: [
      { required: true },
      { validator: emailExists },
    ],
    trigger: 'onBlur',
  }, {
    rules: [
      { type: 'email', message: '请输入正确的邮箱地址' },
    ],
    trigger: ['onBlur', 'onChange'],
  }],
};

export const EmailRule = {
  validate: [{
    rules: [
      { required: true }
    ],
    trigger: 'onBlur',
  }, {
    rules: [
      { type: 'email', message: '请输入正确的邮箱地址' },
    ],
    trigger: ['onBlur', 'onChange'],
  }],
};

export const PasswdRule = {
  rules: [
    { required: true, min: 6, whitespace: true, message: '密码至少为 6 个字符' }
  ],
};

export const DateRule = {
  rules: [
     {
       required: true,
       type: 'date',
       message: '请选择一个日期？',
     }
   ],
};

export const TextareaRule = {
  rules: [
    { required: true, message: '真的不打算写点什么吗？', max: 200 },
  ],
};

export const ChargeSelect = {
  rules: [
    { required: true, message: '请选择任务负责人!' },
  ],
};
