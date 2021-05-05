import os
import numpy as np
import tensorflow as tf
import cv2
from prepare import prepare_image
from flask import Flask
import pathlib

current_path = str(pathlib.Path(__file__).parent.absolute()) + '/'

app = Flask(__name__)
image_width = image_height = 128
# prepare model
model = tf.keras.models.load_model(current_path + 'fp128_128.h5')
file1 = current_path + '../../Images/finger_check.jpg'
file2 = current_path + '../../Images/finger.jpg'

@app.route('/', methods=['GET'])
def check():
    return {
        'response': '200 Success'
    }

@app.route('/eval', methods=['GET'])
def eval():
    '''
    model: model to extract features
    img: input image (2D grey scale image)
    saved_images: target images (3D array)
    n: number of features
    '''
    img1 = prepare_image(file1, image_width, image_height).reshape((1, image_width, image_height, 1)).astype(np.float32) / 255
    img2 = prepare_image(file2, image_width, image_height).reshape((1, image_width, image_height, 1)).astype(np.float32) / 255

    score = model.predict([img1, img2])

    similar = False
    if score > 0.8:
        similar = True

    return {
        'response':similar
    }

if __name__=='__main__':
    app.run(host='127.0.0.1', port='3002')
