create table
    wtu.menu (
        id int auto_increment comment 'Primary Key' primary key,
        create_time datetime default CURRENT_TIMESTAMP null comment 'Create Time',
        name varchar(255) null comment 'Name',
        description varchar(255) null comment 'Description',
        parent_id int default 0 null comment 'Parent Id',
        order_as_child int default 0 null comment 'Order As Child',
        order_as_parent int default 0 null comment 'Order As Parent',
        path varchar(255) null comment 'Path',
        icon varchar(255) default 'ant-design:appstore-outlined' null,
        enabled int default 1 null
    );

create table
    wtu.menu_planet (
        id int auto_increment comment 'Primary Key' primary key,
        create_time datetime default CURRENT_TIMESTAMP null comment 'Create Time',
        name varchar(255) null comment 'Name',
        description varchar(255) null comment 'Description',
        parent_id int default 0 null comment 'Parent Id',
        order_as_child int default 0 null comment 'Order As Child',
        order_as_parent int default 0 null comment 'Order As Parent',
        path varchar(255) null comment 'Path',
        icon varchar(255) default 'ant-design:appstore-outlined' null,
        enabled int default 1 null
    );

create table
    wtu.team_member (
        id int auto_increment comment 'Primary Key' primary key,
        create_time datetime default CURRENT_TIMESTAMP null comment 'Create Time',
        update_time datetime default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP comment 'Update Time',
        team_uuid varchar(255) null comment 'Team UUID',
        is_leader int default 0 null comment 'Is Leader',
        warframe varchar(255) default '任意' null comment 'Warframe',
        focus varchar(255) default '任意' null comment 'Focus',
        enabled int default 1 null
    );

create table
    wtu.transaction_swap (
        id int auto_increment comment 'Primary Key' primary key,
        create_time datetime default CURRENT_TIMESTAMP null comment 'Create Time',
        update_time datetime default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP comment 'Update Time',
        swap_uuid varchar(255) null comment 'Swap UUID',
        creator varchar(255) null comment 'Creator',
        enabled int default 1 null
    );

create table
    wtu.transaction_swap_item (
        id int auto_increment comment 'Primary Key' primary key,
        create_time datetime default CURRENT_TIMESTAMP null comment 'Create Time',
        update_time datetime default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP comment 'Update Time',
        type int null comment 'Type',
        name varchar(255) null,
        icon varchar(255) null,
        code int null,
        swap_uuid varchar(255) null,
        enabled int default 1 null comment 'Enabled'
    );

create table
    wtu.user (
        id int auto_increment comment 'Primary Key' primary key,
        uuid varchar(255) null,
        create_time datetime default CURRENT_TIMESTAMP null comment 'Create Time',
        nickname varchar(255) default '一般路过Tenno' not null comment 'Nickname',
        email varchar(255) not null comment 'Email',
        password varchar(255) not null comment 'Password',
        avatar varchar(255) default 'https://www.neorae.cn/data/avatar/default_avatar_wtu.png' not null comment 'Avatar',
        description varchar(255) default '我是星际大海盗！' null comment 'Description',
        is_guardian int default 0 null,
        state int default 0 null comment 'online state',
        enabled int default 1 null
    );

create table
    wtu.xkyw_team (
        id int auto_increment comment 'Primary Key' primary key,
        create_time datetime default CURRENT_TIMESTAMP null comment 'Create Time',
        update_time datetime default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP comment 'Update Time',
        fissure_id varchar(255) null comment 'Fissure Id',
        uuid varchar(255) null comment 'UUID',
        creator varchar(255) null comment 'Creator',
        title varchar(255) default '任意' null comment 'Title',
        relic_code varchar(255) null comment 'Relic Code',
        relic_level int null comment 'Relic Level',
        relic_tier varchar(255) null comment 'Relic Tier',
        relic_tier_num int null comment 'Relic Tier Num',
        mission_difficulty int null comment 'Mission Difficulty',
        mission_difficulty_name varchar(255) null,
        mission_node varchar(255) null comment 'Mission Node',
        mission_type varchar(255) null comment 'Mission Type',
        enabled int default 1 null
    );