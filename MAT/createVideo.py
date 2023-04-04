import subprocess as sp
import math
import os
import cv2
import numpy as np

def createVideoClip(clip, folder, name, size=[512,512]):

    vf = clip.shape[0]
    command = [ 'ffmpeg',
    '-y',  # overwrite output file if it exists
    '-f', 'rawvideo',
    '-s', '512x512', #'512x512', # size of one frame
    '-pix_fmt', 'rgb24',
    '-r', '15', # frames per second
    '-an',  # Tells FFMPEG not to expect any audio
    '-i', '-',  # The input comes from a pipe
    '-vcodec', 'libx264',
    '-b:v', '1500k',
    '-vframes', str(vf), # 5*25
    '-s', '%dx%d'%(size[1],size[0]), #'256x256', # size of one frame
    folder+'/'+name ]
    #sfolder+'/'+name 
    pipe = sp.Popen( command, stdin=sp.PIPE, stderr=sp.PIPE)
    out, err = pipe.communicate(clip.tobytes())
    pipe.wait()
    pipe.terminate()
    print(err)


if __name__=="__main__":
    path = "../results/mat_celebA_final/"
    imgs = []
    for i in range(1, 80):
        s = "0000" + str(i) if math.log10(i)<1 else "000" + str(i)
        img = cv2.cvtColor(cv2.imread(path+s+".png"), cv2.COLOR_BGR2RGB)
        imgs.append(img)
    im = np.stack(imgs)
    if not os.path.exists('../results/vid'): os.makedirs("../results/vid")
    
    createVideoClip(im, "../results/vid", "vid.mp4")
    
        