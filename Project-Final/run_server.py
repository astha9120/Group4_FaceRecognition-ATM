import subprocess

node_server = subprocess.Popen("node server.js", shell=True)
flask_server_1 = subprocess.Popen("python ML\Face-Verification\Face_Verification.py")
flask_server_2 = subprocess.Popen("python ML\Fingerprint-Varification\Fingerprint_Verification.py")

node_server.wait()
flask_server_1.kill()
flask_server_2.kill()