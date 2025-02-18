import torch
import torchvision
from torch import nn
from torchvision.transforms import ToTensor, Resize
from torch.utils.data import DataLoader
import numpy as np
from PIL import Image
import argparse
import warnings

warnings.filterwarnings("ignore")

class ResNet_Classifier(nn.Module):
    def __init__(self, num_classes):
        super(ResNet_Classifier, self).__init__()
        self.cnn = torch.hub.load('pytorch/vision:v0.10.0', 'resnet18', pretrained=False)
        self.cnn.fc = nn.Linear(self.cnn.fc.in_features, num_classes)

    def forward(self, x):
        return self.cnn(x)

def inference(img_path, model_path):
    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    img = Image.open(img_path).convert("RGB")
    img_tensor = ToTensor()(img).to(device)
    img_tensor = Resize((256,256))(img_tensor)
    
    model = ResNet_Classifier(4).to(device)
    model.load_state_dict(torch.load(f=model_path))
    model.eval()

    with torch.inference_mode():
        output = model(img_tensor.unsqueeze(0))

    ty = {0:"COVID19", 1:"NORMAL", 2:"PNEUMONIA", 3:"TURBERCULOSIS"}

    return ty[int(output.argmax(dim=1)[0])]

def parse_arg():
    parser = argparse.ArgumentParser(description="Chect X Ray Inference")

    parser.add_argument("--img", type=str, required=True, help='Input the path to the image')
    parser.add_argument("--model", type=str, default="chest_x_ray.pth", help='Path to the model')

    return parser.parse_args()

if __name__ == '__main__':
    args = parse_arg()
    output = inference(args.img, args.model)
    print(output)
