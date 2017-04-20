# operation
拖拽建站项目

项目依赖

node环境
less
mysql数据库

安装mysql 登录修改密码为123456

建一个operation数据库

CREATE TABLE pages
(
  id              INT unsigned NOT NULL AUTO_INCREMENT, # Unique ID for the record

  name            VARCHAR(128) NOT NULL,                # Name of the page

  description           VARCHAR(256) NOT NULL,                # description of the page

  config           LONGTEXT NOT NULL,                # config of the page

  PRIMARY KEY     (id)                                  # Make the id the primary key

);


INSERT INTO pages ( name, description, config) VALUES

  ( 'page1', 'page1', '' );

组件的开发用npm start启动项目

开发完组件用npm run deploy打包

项目的部署用npm run web