from flask import Flask, request, jsonify
import pymysql
from flask_cors import CORS
import datetime

conn = pymysql.connect(
    host='localhost',
    port=3306,
    user='root',
    password='123456',
    database='calculator'
)

app = Flask(__name__)
CORS(app)
cursor = conn.cursor()


@app.route('/post_history', methods=['POST'])
def post_history(): #存储运算表达式和值
    try:
        data = request.get_json()  # 获取POST请求的JSON数据
        expression = data.get('expression')
        result = data.get('result')

        time = datetime.datetime.now()
        data = (time, expression, result)
        insert = "INSERT INTO calculation VALUES (%s, %s, %s)" #sql插入语句
        cursor.execute(insert, data)
        conn.commit()

        response_message = "ok"
        return jsonify({"message": response_message})

    except Exception as e:
        error_message = str(e)
        return jsonify({"error": error_message}), 500


@app.route('/calculateTax', methods=['POST'])#查税率信息
def calculateTax():
    try:
        data = request.get_json()  # 获取POST请求的JSON数据
        flag = data.get('category')
        money = data.get('money')
        time = data.get('time')
        insert = ""

        if flag == 1:
            insert = "SELECT rate FROM currentinterestrate"
        elif flag == 2:
            insert = "SELECT rate FROM terminterestrate WHERE time = " + time
        else:
            time = int(time)
            month = time
            if time < 12:
                month = "12"
            elif time < 36:
                month = "35"
            elif time < 60:
                month = "59"
            else:
                month = "60"
            insert = "SELECT rate FROM lendingrate WHERE time = " + month

        cursor.execute(insert)
        data = cursor.fetchall()

        if not data:
            return jsonify({"result": "error"})
        else:
            data = data[0][0]
            result = data * float(money) * float(time) / 100.0
            return jsonify({"result": result})

    except Exception as e:
        error_message = str(e)
        return jsonify({"error": error_message}), 500


@app.route('/changeTax', methods=['POST'])
def changeTax():#修改税率信息
    try:
        data = request.get_json()  # 获取POST请求的JSON数据
        flag = data.get('flag')
        rate = data.get('rate')
        time = data.get('time')
        insert = ""

        if flag == 1:
            insert = "UPDATE currentinterestrate SET rate = " + rate
        elif flag == 2:
            insert = "UPDATE terminterestrate SET rate = " + rate + " WHERE time = " + time
        else:
            insert = "UPDATE lendingrate SET rate = " + rate + " WHERE time = " + time

        cursor.execute(insert)
        conn.commit()

        response_message = "ok"
        return jsonify({"message": response_message})

    except Exception as e:
        error_message = str(e)
        return jsonify({"error": error_message}), 500


@app.route('/get_calculation_data', methods=['GET'])
def get_calculation_data():#得到历史值
    try:
        cursor.execute("SELECT expression, result FROM calculation ORDER BY time DESC LIMIT 10")
        data = cursor.fetchall()
        return jsonify({"data": data})

    except Exception as e:
        error_message = str(e)
        return jsonify({"error": error_message}), 500


@app.route('/send_clear', methods=['POST'])
def send_clear():#清除数据库
    try:
        insert = "DELETE FROM calculation"
        cursor.execute(insert)
        conn.commit()

        response_message = "ok"
        return jsonify({"message": response_message})

    except Exception as e:
        error_message = str(e)
        return jsonify({"error": error_message}), 500


if __name__ == '__main__':
    app.run(debug=True)
