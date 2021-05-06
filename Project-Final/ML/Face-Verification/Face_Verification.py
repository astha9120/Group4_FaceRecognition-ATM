from mtcnn.mtcnn import MTCNN
import cv2
import numpy as np
from utils import preprocess_input
from scipy.spatial.distance import cosine 
import tensorflow as tf
import warnings
from models import RESNET50
from flask import Flask
import pathlib

warnings.filterwarnings("ignore", category = FutureWarning)

current_path = str(pathlib.Path(__file__).parent.absolute()) + '/'

app = Flask(__name__)
detector = MTCNN()
model = RESNET50(include_top=False, input_shape=(224,224,3),pooling='avg',
                        weights=current_path + 'rcmalli_vggface_tf_notop_resnet50.h5')
file1 = current_path + '../../Images/face.jpg'
file2 = current_path + '../../Images/face_check.jpg'

@app.route('/', methods=['GET'])
def check():
    return {
        'response': '200 Success'
    }

def extract_face(image, resize=(224,224)):
  image = cv2.imread(image)

  faces = detector.detect_faces(image)
  x1, y1, width, height = faces[0]['box']
  x2, y2 = x1 + width, y1 + height

  face_boundary = image[y1:y2, x1:x2]
  face_image = cv2.resize(face_boundary,resize)

  return face_image

def get_similarity(faces):
  face = np.asarray(faces, 'float32')
  face = preprocess_input(face, version=2)
  embeddings = model.predict(face)

  score = cosine(embeddings[0],embeddings[1])
  
  similar = False
  if score < 0.25:
    similar = True

  return similar

@app.route('/eval', methods=['GET'])
def eval():
    faces = [extract_face(image) for image in [file1, file2]]
    similar = get_similarity(faces)
    return {
      'response':similar
    }

if __name__=='__main__':
  app.run(host='127.0.0.1', port='3001')
