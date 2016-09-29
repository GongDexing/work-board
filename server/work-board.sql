create schema if not exists work_board DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

create table if not exists work_board.tbl_user(
  id int not null auto_increment primary key,
  name varchar(16) not null comment '姓名',
  email varchar(32) not null comment '邮箱',
  tel varchar(11) default '' comment '手机号',
  passwd varchar(32)  comment '密码',
  time bigint not null comment '操作时间, 以时间戳的形式保存',
  unique (name),
  unique (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists work_board.tbl_project(
  id int not null auto_increment primary key,
  name varchar(32) not null comment '项目名称',
  start bigint not null comment '项目开始时间',
  end bigint not null comment '项目结束时间',
  owner int not null comment '项目创建者的id',
  intro text not null comment '项目介绍',
  time bigint not null comment '操作时间, 以时间戳的形式保存'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists work_board.tbl_task(
  id int not null auto_increment primary key,
  project_id int not null comment '任务归属项目的id',
  start bigint not null comment '任务开始时间',
  end bigint not null comment '任务结束时间',
  owner int not null comment '任务创建者的id',
  charge int not null comment '任务责任人的id',
  intro text not null comment '任务内容',
  done_intro text comment '完成说明',
  assign_intro text comment '指派说明',
  delay_intro text comment '延期说明',
  discard_intro text comment '废弃说明',
  status tinyint  default 0 comment '任务状态 0:正在进行, 1:完成, 2:延期, 3:废弃',
  time bigint not null comment '操作时间, 以时间戳的形式保存'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists work_board.tbl_project_user(
  project_id int not null comment '任务id',
  user_id int not null comment '用户id'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
