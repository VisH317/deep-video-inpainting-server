from MAT.generate_image import generate_images
from mask import mask
import argparse
import sys
import MAT.dnnlib

BASE_PATH = "./inputs/"

coords = [0, 0, 45, 45]

sys.path.append("/home/vish/projects/deep-video-inpainting-server/MAT/dnnlib")

f = open(sys.argv[1])

# setup args
args = argparse.Namespace()
args.data = f
args.resume = 'cp/SiamMask_DAVIS.pth'
args.x = coords[0]
args.y = coords[1]
args.w = coords[2]
args.h = coords[3]
args.mask_dilation = 32
args.name = "vid"

# inpainting config
network_pkl = "CelebA-HQ_256.pkl"
dpath = "./results/test_frame"
mpath = "./results/test_mask"
resolution = 256
truncation_psi = 1
noise_mode = 'none'
outdir = "./results/res"

mask(args)
generate_images(None, network_pkl, dpath, mpath, resolution, truncation_psi, noise_mode, outdir)