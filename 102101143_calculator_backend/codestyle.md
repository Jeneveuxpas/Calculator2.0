# 代码规范 - 基于 PEP 8

该代码规范是基于 [PEP 8](https://www.python.org/dev/peps/pep-0008/)（Python Enhancement Proposal 8）的官方Python代码规范制定的。

PEP 8是Python社区广泛接受的规范，它有助于确保Python代码的一致性和可读性。

## 编程风格

1. 使用4个空格作为缩进。
2. 最大行宽度为79字符，可以适当扩展到80字符。
3. 避免在同一行中混合使用空格和制表符。
5. 采用小写字母命名变量。
6. 采用大写字母命名常量。
7. 使用空行来组织代码，使其更易于阅读。

## 导入模块

1. 导入应该位于文件的顶部，每个导入语句独立一行。
2. 导入语句应该按照标准顺序分组：标准库、第三方库、本地库。
3. 不要使用通配符导入，如 `from module import *`。

```python
from flask import Flask, request, jsonify
import pymysql
from flask_cors import CORS
import datetime
```

## 注释

12. 在代码中添加适当的注释，解释关键步骤或复杂操作。
13. 注释应该清晰、简洁、易于理解，并在必要时提供上下文。

## 变量和连接

1. 变量名应该采用小写字母，使用下划线分隔单词。
2. 避免使用单个字符的变量名，除非是循环变量。
3. 在代码中添加注释，清晰解释变量的用途。

```python
# 创建数据库连接
conn = pymysql.connect(
    host='localhost',
    port=3306,
    user='root',
    password='123456',
    database='calculator'
)

# 初始化Flask应用
app = Flask(__name__)

# 启用跨源资源共享（CORS）支持
CORS(app)

# 创建数据库游标
cursor = conn.cursor()
```

## 函数和方法

1. 函数和方法应该采用小写字母命名，使用下划线分隔单词。
2. 函数和方法应该有清晰的目的和功能，并遵循单一职责原则。
3. 添加函数参数和返回值的类型注解。

## 异常处理

使用try-except块来处理异常，避免捕获所有异常。

## 更多规范

PEP 8包含更多的代码规范，应该遵循。这只是一份简要的摘要。

## 参考

- [PEP 8 -- Style Guide for Python Code](https://www.python.org/dev/peps/pep-0008/)

请确保遵循这些规范以维护代码的一致性和可读性。感谢Python社区和PEP 8的贡献者。