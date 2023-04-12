# Prediction interface for Cog ⚙️
# https://github.com/replicate/cog/blob/main/docs/python.md

from cog import BasePredictor, Input, Path, File
import argparse
import test
import mask

args = argparse.Namespace()

class Predictor(BasePredictor):

    def setup(self):
        """Load the model into memory to make running multiple predictions efficient"""
        # self.model = torch.load("./weights.pth")
        args.model = "e2fgvi"
        args.ckpt = "./release_model/e2fgvi.pth"
        args.step = 10
        args.num_ref = -1
        args.neighbor_stride = 5
        args.savefps = 24
        args.set_size = False
        test.setup(args)

    def predict(
        self,
        video: File = Input(description="Grayscale input image"),
    ) -> Path:
        """Run a single prediction on the model"""

        ims, masks = mask.mask(video)
        args.frames = ims
        args.masks = masks
        file = test.main_worker(args)
        return File(file)
