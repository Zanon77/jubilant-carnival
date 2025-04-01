import os
from flask import Flask, request, jsonify
from flask_cors import CORS  # For better CORS handling
from dotenv import load_dotenv
from sql_connection import get_sql_connection
import products_dao
import orders_dao
import uom_dao

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('FLASK_SECRET_KEY')

# Configure CORS properly
CORS(app, resources={
    r"/*": {
        "origins": os.getenv('FRONTEND_URL', '*')  # Use specific origin in production
    }
})

connection = get_sql_connection()

@app.route('/getUOM', methods=['GET'])
def get_uom():
    response = uom_dao.get_uoms(connection)
    return jsonify(response)

@app.route('/getProducts', methods=['GET'])
def get_products():
    response = products_dao.get_all_products(connection)
    return jsonify(response)

@app.route('/insertProduct', methods=['POST'])
def insert_product():
    request_payload = json.loads(request.form['data'])
    product_id = products_dao.insert_new_product(connection, request_payload)
    return jsonify({'product_id': product_id})

@app.route('/getAllOrders', methods=['GET'])
def get_all_orders():
    response = orders_dao.get_all_orders(connection)
    return jsonify(response)

@app.route('/insertOrder', methods=['POST'])
def insert_order():
    request_payload = json.loads(request.form['data'])
    order_id = orders_dao.insert_order(connection, request_payload)
    return jsonify({'order_id': order_id})

@app.route('/deleteProduct', methods=['POST'])
def delete_product():
    return_id = products_dao.delete_product(connection, request.form['product_id'])
    return jsonify({'product_id': return_id})

if __name__ == "__main__":
    print("Starting Python Flask Server For Grocery Store Management System")
    port = int(os.getenv('SERVER_PORT', 5000))
    app.run(host='0.0.0.0', port=port)