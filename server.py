from flask import Flask, request, jsonify
from flask_mail import Mail, Message
import firebase_admin
from firebase_admin import credentials, auth, firestore
import backend
import os
from dotenv import load_dotenv

load_dotenv() 

app = Flask(__name__)

# Configure Flask-Mail
app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
app.config['MAIL_PORT'] = os.getenv('MAIL_PORT')
app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS')
app.config['MAIL_USE_SSL'] = os.getenv('MAIL_USE_SSL')
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_DEFAULT_SENDER')

mail = Mail(app)

# firebase admin SDK (downloaded from firebase console)
cred = credentials.Certificate("/Users/xichen/Downloads/goosecart-ed780-firebase-adminsdk-9ss4w-2d66354853.json")
firebase_admin.initialize_app(cred)

db = firestore.client()
verification = {}


#server-backend
# Verify Email Format
@app.route('/emailverification', methods=['POST'])
def emailChecker():
    email = request.json.get("email")
    is_valid = backend.check_email(email)
    return jsonify({"isValid": is_valid})


#TODO
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data["email"]
    password = data["password"]
    try:
        user = auth.create_user(
            email=email,
            password=password
        )
        code = backend.code_generation()
        verification[email] = code

        msg = Message('[GooseCart] Verification Code', sender='xichen.sophia@gmail.com', recipients=[email])
        msg.body = f'Your verification code is {code}'

        #testing
        app.logger.info(f'Sending verification email to {email} with code {code}')
        return jsonify({"message": "User created successfully", "uid": user.uid}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

#TODO
@app.route('/verifyuser', methods=['POST'])
def verify_user():
    data = request.get_json()
    email = data["email"]
    code = data["code"]

    if email in verification and code == verification[email]:
        user = auth.get_user_by_email(email)
        auth.update_user(user.uid, email_verified=True)
        del verification[email]
        return jsonify({"message": "Email verified"}), 200
    else:
        return jsonify({"error": "Invalid verification code"}), 400

#function for role selection
@app.route('/selectrole', methods=['POST'])
def select_role ():
    try:
        data = request.json
        # app.logger.info(f'Received data: {data}')
        id = data.get("uid")
        role = data.get("role")
        password = data.get("password")

        if not id or not role:
            return jsonify({"error": "Missing uid or role"}), 400
        user = auth.get_user_by_email(id)
        uid= user.uid
        app.logger.info(f"{uid}")
        auth.set_custom_user_claims(uid, {'role': role})
        roles_ref = db.collection('roles').document(uid)
        roles_ref.set({'role': role})
        hashed_password = backend.hash_password(password)
        roles_ref.set({"password": hashed_password}, merge=True)

        app.logger.info(f'Role {role} assigned to user {uid} and stored in Firestore')
        return jsonify({"success": True, "message": "Role assigned successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/signin', methods=['POST'])
def signin():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = auth.get_user_by_email(email)
    uid = user.uid
    roles_ref = db.collection('roles').document(uid)
    fields = roles_ref.get()
    try:
        if fields.exists:
            stored_hash = fields.to_dict().get('password')
            if backend.verify_password(stored_hash, password):
                token = auth.create_custom_token(uid)
                roles_ref = db.collection('roles').document(uid)
                roles_ref.set({"token": token}, merge=True)
                return jsonify({"success": True, "token": token.decode('utf-8')}), 200
            else:
                return jsonify({"error": "Invalid password"}), 401
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"message": "Error signing in", "error": str(e)}), 500

@app.route("/tokencheck", methods=["POST"])
def check_token():
    data = request.json
    email = data.get("email")

    user = auth.get_user_by_email(email)
    uid = user.uid
    ref = db.collection("roles").document(uid)
    fields = ref.get()
    try:
        if fields.exists:
            token = fields.to_dict().get("token")
            if token:
                if isinstance(token, bytes):
                    token = token.decode('utf-8')  # Decode
                return jsonify({"success": True, "token": token}), 200
            else:
                return jsonify({"error": "Invalid token"}), 401
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        app.logger.info(e)
        return jsonify({"message": "Error signing in", "error": str(e)}), 500

@app.route('/signout', methods=['POST'])
def signout():
    try:
        data = request.json
        email = data.get("email")

        if not email:
            return jsonify({"error": "Email is required"}), 400
        user = auth.get_user_by_email(email)
        uid = user.uid
        ref = db.collection("roles").document(uid)
        ref.update({"token": firestore.DELETE_FIELD})
        return jsonify({"success": True, "message": "Signed out successfully"}), 200
    except Exception as e:
        return jsonify({"message": "Error signing out", "error": str(e)}), 500
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
#http://127.0.0.1:5001
