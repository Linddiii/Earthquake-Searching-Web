var express = require('express');
var router = express.Router();
const { Sequelize, DataTypes } = require('sequelize');
const db = require('mysql2');


const sequelize = new Sequelize('earthquake_data', 'root', 'Wu:15900951', {
  host: '127.0.0.1',
  dialect: 'mysql'
});

// 定义模型
const Eq = sequelize.define('Eq', {
  Level: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  Time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  Latitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  Longtitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  Depth: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  Description: {
    type: DataTypes.STRING(255),
    allowNull: false,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
}, {
  tableName: 'eq', // 替换成你的表名
  timestamps: false, // 如果不需要自动添加 createdAt 和 updatedAt 字段，可以设为 false
});

// 同步数据库模型
sequelize.sync()
  .then(() => {
    // 查询所有用户
    return Eq.findAll();
  })
  .then(users => {
    console.log("[Info] SyncDone");
  })
  .catch(error => {
    console.error('Error:', error);
  });

/;* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login',function(req,res,next){
  let username_defined = "uaih3k9x";
  let password_defined = "123456";

  if(req.query.username==undefined|req.query.password==undefined){
    res.json({
      status:-2,
      message:"Not complete"
    })
  }
  let username = req.query.username;
  let password = req.query.password;
  console.log(username == username_defined, password == password_defined)
  if(username == username_defined& password == password_defined){
    console.log("Match")
    res.json({
      status:1,
      message:"Matched"
    })
  }else{
    res.json({
      status:-1,
      message:"Failed"
    })
  }
})

router.get('/getDataLengthApiEqChn',function(req,res,next){
  var levelmax = req.query.levelmax;
  var levelmin = req.query.levelmin;

  var latimax = req.query.latimax;
  var latimin = req.query.latimin;

  var lonmax = req.query.lonmax;
  var lonmin = req.query.lonmin;

  var depthmax = req.query.depthmax;
  var depthmin = req.query.depthmin;

  const conditions = {};

// 添加 level 的条件
if (typeof levelmax !== 'undefined' && levelmax !== "") {
  conditions.level = {
    [Sequelize.Op.lte]: levelmax
  };
}

if (typeof levelmin !== 'undefined' && levelmin !== "") {
  conditions.level = {
    ...conditions.level,
    [Sequelize.Op.gte]: levelmin
  };
}

// 添加 latitude 的条件
if (typeof latimax !== 'undefined' && latimax !== "") {
  conditions.latitude = {
    [Sequelize.Op.lte]: latimax
  };
}

if (typeof latimin !== 'undefined' && latimin !== "") {
  conditions.latitude = {
    ...conditions.latitude,
    [Sequelize.Op.gte]: latimin
  };
}

// 添加 longitude 的条件
if (typeof lonmax !== 'undefined' && lonmax !== "") {
  conditions.longtitude = {
    [Sequelize.Op.lte]: lonmax
  };
}

if (typeof lonmin !== 'undefined' && lonmin !== "") {
  conditions.longtitude = {
    ...conditions.longtitude,
    [Sequelize.Op.gte]: lonmin
  };
}

// 添加 depth 的条件
if (typeof depthmax !== 'undefined' && depthmax !== "") {
  conditions.depth = {
    [Sequelize.Op.lte]: depthmax
  };
}

if (typeof depthmin !== 'undefined' && depthmin !== "") {
  conditions.depth = {
    ...conditions.depth,
    [Sequelize.Op.gte]: depthmin
  };
}
  Eq.count({where:conditions})
  .then(count => {
    console.log('Total rows that match the condition:', count);
    res.json({
      status:1,
      count,
      message:"QueryOK"
    })
  })
  .catch(error => {
    console.error('Error getting row count with condition:', error);
  });})
  

router.get('/getDataByPage',function(req,res,next){
  let pageindex = 0;
  pageindex = req.query.page-1;

  var levelmax = req.query.levelmax;
  var levelmin = req.query.levelmin;

  var latimax = req.query.latimax;
  var latimin = req.query.latimin;

  var lonmax = req.query.lonmax;
  var lonmin = req.query.lonmin;

  var depthmax = req.query.depthmax;
  var depthmin = req.query.depthmin;

  const conditions = {};

  if (typeof levelmax !== 'undefined' && levelmax !== "") {
    conditions.level = {
      [Sequelize.Op.lte]: levelmax
    };
  }
  
  if (typeof levelmin !== 'undefined' && levelmin !== "") {
    conditions.level = {
      ...conditions.level,
      [Sequelize.Op.gte]: levelmin
    };
  }
  
  // 添加 latitude 的条件
  if (typeof latimax !== 'undefined' && latimax !== "") {
    conditions.latitude = {
      [Sequelize.Op.lte]: latimax
    };
  }
  
  if (typeof latimin !== 'undefined' && latimin !== "") {
    conditions.latitude = {
      ...conditions.latitude,
      [Sequelize.Op.gte]: latimin
    };
  }
  
  // 添加 longitude 的条件
  if (typeof lonmax !== 'undefined' && lonmax !== "") {
    conditions.longtitude = {
      [Sequelize.Op.lte]: lonmax
    };
  }
  
  if (typeof lonmin !== 'undefined' && lonmin !== "") {
    conditions.longtitude = {
      ...conditions.longtitude,
      [Sequelize.Op.gte]: lonmin
    };
  }
  
  // 添加 depth 的条件
  if (typeof depthmax !== 'undefined' && depthmax !== "") {
    conditions.depth = {
      [Sequelize.Op.lte]: depthmax
    };
  }
  
  if (typeof depthmin !== 'undefined' && depthmin !== "") {
    conditions.depth = {
      ...conditions.depth,
      [Sequelize.Op.gte]: depthmin
    };
  }
console.log(conditions)
// 执行查询
Eq.findAll({
  where: conditions,
  offset: pageindex * 50, // 设置偏移量
  limit: 50 // 设置每页的数据量
}).then(results => {
  // console.log(results);
  res.json({
    results,
    statusCode:0
  })
})
.catch(error => {
  console.error('Error executing query:', error);
  res.json({
    statusCode:-1
  })
});


})
module.exports = router;
