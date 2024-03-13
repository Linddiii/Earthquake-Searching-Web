
## 部署环境
```bash
npm i
```

## 启动服务
```bash
npm start
```

## 配置数据库连接

打开 `/routes/index.js`，在第 7-11 行配置数据库连接信息：

```javascript
const sequelize = new Sequelize('cms', 'cms', 'abdn123', {
  host: 'your_server_ip',
  dialect: 'mysql'
});
```

注意替换 `'cms'`、`'cms'` 和 `'abdn123'` 分别为你的数据库名、用户名和密码。`your_server_ip` 为服务器的 IP 地址

## 导入数据库

mysql dump文件位于md同级的eq.sql文件
自行导入即可

## 运行服务

服务将在本地的 3000 端口上运行，远程部署记得放行 3000/tcp 端口
