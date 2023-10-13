# 计算器后端

## 目录

- [介绍](#introduction)
- [特点](#features)
- [安装](#installation)
- [使用](#usage)
- [API端点](#api-endpoints)
- [数据库架构](#database-schema)

## 介绍

这是一个简单的Flask Web应用程序，用于执行数学计算并提供税率信息。它还允许用户存储计算历史记录和修改税率。该应用程序是使用Flask、MySQL作为数据库，以及Flask-CORS来处理跨域请求构建的。

## 特点

- 根据类别、时间和金额计算税率。
- 存储和检索计算历史记录。
- 修改不同类别的税率。

## 安装

1. 安装所需的Python包：

   ```
   pip install Flask flask-cors pymysql
   ```

3. 设置MySQL数据库。确保您的MySQL服务器正在运行，并在代码中更新数据库连接详细信息。

4. 运行Flask应用程序：

   ```
   python app.py
   ```

## 使用

一旦安装并运行应用程序，您可以通过在Web浏览器中导航到`http://localhost:5000`来访问它。该应用程序提供了一个简单的用户界面，用于执行计算和访问税率信息。

## API端点

该应用程序提供以下API端点：

- `POST /post_history`：存储计算历史记录。
- `POST /calculateTax`：根据类别、时间和金额计算税率。
- `POST /changeTax`：修改不同类别的税率。
- `GET /get_calculation_data`：检索计算历史记录。
- `POST /send_clear`：从数据库中清除计算历史记录。

您可以使用这些端点以编程方式访问应用程序的功能。

## 数据库架构

该应用程序使用以下架构的MySQL数据库：

- `calculation`表：带有`time`、`expression`和`result`列的存储计算历史记录。
- `currentinterestrate`表：有`rate`，表示活期利率
- `terminterestrate` 表：有 `time `和 `rate` 表示定期利率
- `lendingrate`表：有 `time` 和 `rate` 表示贷款利率
