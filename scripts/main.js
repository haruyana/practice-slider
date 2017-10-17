var imageData;
  var fadeMosaicSize = 0;
  var THandle;
  var mem_canvas;
  var mem_context;
  var context;
  var img;

  function loadImage() {
    img = new Image();
    mem_canvas = document.createElement('canvas');

    img.onload = function onImageLoad() {
      mem_canvas.width = img.width;
      mem_canvas.height = img.height;
      mem_context = mem_canvas.getContext('2d');
      mem_context.drawImage(img, 0, 0);

      imageData = mem_context.getImageData(0, 0, mem_canvas.width, mem_canvas.height);
      startFadeIn();
    }
    img.src = 'images/img01.jpg'; //相対URLの場合
    //img.src = 'http://www.ipentec.com/resource/img03.png';

    var canvas = document.getElementById('SimpleCanvas');
    if (!canvas || !canvas.getContext) {
      return false;
    }else{
      context = canvas.getContext('2d');
    }
  }

  function startFadeIn() {
    fadeMosaicSize = 100;
    THandle = setInterval(onFadeIn, 50);
  }

  function startFadeOut() {
    fadeMosaicSize = 1;
    THandle = setInterval(onFadeOut, 50);
  }

  function onFadeIn() {
    if (fadeMosaicSize <= 1) {
      clearInterval(THandle);
      context.drawImage(img, 32, 32);
      THandle = setInterval(onShow, 2000);

    } else {
      CreateMosaic(mem_context, mem_canvas.width, mem_canvas.height, fadeMosaicSize);
      context.drawImage(mem_canvas, 32, 32);
      fadeMosaicSize = Math.floor(fadeMosaicSize / 1.5);
    }
  }

  function onShow() {
    clearInterval(THandle);
    startFadeOut();
  }

  function onFadeOut() {
    if (64 < fadeMosaicSize) {
      clearInterval(THandle);

      context.fillStyle = "#FFFFFF";
      context.fillRect(32, 32, mem_canvas.width, mem_canvas.height);
    } else {
      CreateMosaic(mem_context, mem_canvas.width, mem_canvas.height, fadeMosaicSize);
      context.drawImage(mem_canvas, 32, 32);
      fadeMosaicSize = Math.ceil(fadeMosaicSize * 1.5);
    }
  }

  function CreateMosaic(context, width,height,mosaicSize) {
    var x=0;
    var y=0;

    for (y = 0; y < height; y = y + mosaicSize) {
      for (x = 0; x < width; x = x + mosaicSize) {
        var cR = imageData.data[(y * width + x) * 4];
        var cG = imageData.data[(y * width + x) * 4 + 1];
        var cB = imageData.data[(y * width + x) * 4 + 2];

        context.fillStyle = "rgb("+cR+","+cG+","+cB+")";
        context.fillRect(x, y, x + mosaicSize, y + mosaicSize);
      }
    }
  }
