import os
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import FileResponse
from pydantic import BaseModel

import argparse
from mask import mask
from inpaint import inpaint

app = FastAPI()

class Item(BaseModel):
    file: UploadFile = File()
    x: int
    y: int
    w: int
    h: int

@app.get("/video")
def getvid():
    return FileResponse('./results/test.mp4')

@app.post("/video")
def video(file: UploadFile = File(), x: str = Form(), y: str = Form(), w: str = Form(), h: str = Form()):
    #os.remove('./results/test.mp4')
    # parser = argparse.ArgumentParser()
    # parser.add_argument('--data')
    # parser.add_argument('--x')
    # parser.add_argument('--y')
    # parser.add_argument('--w')
    # parser.add_argument('--h')
    # parser.add_argument('--resume')
    # parser.add_argument('--mask-dilation')
    # parser.add_argument('--name')
    # arglist = ['--data', file, '--x', x, '--y', y, '--w', w, '--h', h, '--resume', 'cp/SiamMask_DAVIS.pth', '--mask-dilation', 32, '--name', 'vid']
    args = argparse.Namespace()
    args.data = file
    args.resume = 'cp/SiamMask_DAVIS.pth'
    args.x = int(int(x)*256/330)
    args.y = int(int(y)*256/590)
    args.w = int(int(w)*256/330)
    args.h = int(int(h)*256/590)
    args.mask_dilation = 32
    args.name = "vid"
    print("args created")


    mask(args)
    print("masking done")
    inpaint(args)
    return FileResponse('./results/test.mp4')
    # write into a file or find a way to send the direct stream data
    # setup the arguments and run mask and paint, get the returned file and send raw