const getNewSizes = (
  width: number,
  height: number,
  maxSide: number,
): { width: number; height: number } => {
  // If width > height and larger than max side, calculate new sized based on width ratio
  if (width > height && width > maxSide) {
    return { width: maxSide, height: (height * maxSide) / width };
  } else if (height > maxSide) {
    // else calculate on height ratio if needs rescaling
    return { width: (width * maxSide) / height, height: maxSide };
  }

  // Return original size of no rescale needed
  return { width, height };
};

export const resizeImage = async ({
  maxSide,
  file,
}: {
  maxSide: number;
  file: File;
}): Promise<string> => {
  const reader = new FileReader();
  const image = new Image();
  const canvas = document.createElement("canvas");

  const resize = () => {
    const { width, height } = getNewSizes(image.width, image.height, maxSide);

    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d").drawImage(image, 0, 0, width, height);
    return canvas.toDataURL("image/jpeg");
  };

  return new Promise<string>((resolve, reject) => {
    if (!file.type.match(/image.*/)) {
      reject(new Error("Not an image"));
      return;
    }

    reader.onload = (readerEvent: any) => {
      image.onload = () => resolve(resize());
      image.src = readerEvent.target.result;
    };
    reader.readAsDataURL(file);
  });
};

export const resizedataURL = ({
  data,
  maxSide,
}: {
  data: string;
  maxSide: number;
}): Promise<string> => {
  return new Promise(async function (resolve, reject) {
    // We create an image to receive the Data URI
    var img = document.createElement("img");
    const { width: currentWidth, height: currentHeight } =
      getImageDataDimensions(data);
    const { width: newWidth, height: newHeight } = getNewSizes(
      currentWidth,
      currentHeight,
      maxSide,
    );

    // When the event "onload" is triggered we can resize the image.
    img.onload = function () {
      // We create a canvas and get its context.
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");

      // We set the dimensions at the wanted size.
      canvas.width = newWidth;
      canvas.height = newHeight;

      // We resize the image with the canvas method drawImage();
      ctx?.drawImage(this, 0, 0, newWidth, newHeight);

      var dataURI = canvas.toDataURL();

      // This is the return of the Promise
      resolve(dataURI);
    };

    // We put the Data URI in the image's src attribute
    img.src = data;
  });
};

function getImageDataDimensions(data: string): {
  width: number;
  height: number;
} {
  var memoryImg = document.createElement("img");
  memoryImg.src = data;
  return { width: memoryImg.width, height: memoryImg.height };
}
