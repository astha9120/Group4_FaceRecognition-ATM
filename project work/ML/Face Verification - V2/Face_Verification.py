from mtcnn.mtcnn import MTCNN
import cv2
import numpy as np
from utils import preprocess_input
from scipy.spatial.distance import cosine 
import tensorflow as tf
import warnings
from models import RESNET50
warnings.filterwarnings("ignore", category = FutureWarning)


detector = MTCNN()

def extract_face(image, resize=(224,224)):
  image = cv2.imread(image)

  faces = detector.detect_faces(image)
  x1, y1, width, height = faces[0]['box']
  x2, y2 = x1 + width, y1 + height

  face_boundary = image[y1:y2, x1:x2]
  face_image = cv2.resize(face_boundary,resize)

  return face_image

def get_embeddings(faces):
  face = np.asarray(faces, 'float32')
  face = preprocess_input(face, version=2)
  model = RESNET50(include_top=False, input_shape=(224,224,3),pooling='avg',
                        weights='rcmalli_vggface_tf_notop_resnet50.h5')
  model.summary()
  
  #model = load_model('rcmalli_vggface_tf_notop_resnet50.h5')
  #weights = h5py.File('D:\SE\ML Script\Python\rcmalli_vggface_tf_resnet50.h5','r')
  #model = ResNet50(include_top=False, input_shape=(224,224,3),pooling='avg')
  return model.predict(face)

def get_similarity(faces):
  embeddings = get_embeddings(faces)

  score = cosine(embeddings[0],embeddings[1])
  
  if score <= 0.5:
      return "Face Matched", score
  return "Face Not Matched", score


if __name__ == '__main__':
    faces = [extract_face(image) for image in ['Images\Soumya.jpeg','Images\Soumya_2.jpeg']]
    str_face,score = get_similarity(faces)
    print(str_face,score)      
    
