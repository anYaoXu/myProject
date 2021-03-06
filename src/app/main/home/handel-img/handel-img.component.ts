import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-handel-img',
  templateUrl: './handel-img.component.html',
  styleUrls: ['./handel-img.component.less']
})
export class HandelImgComponent implements OnInit {

  @ViewChild('img') myImg: ElementRef;
  @ViewChild('div') myDiv: ElementRef;
  @ViewChild('ul') myUl: ElementRef;
  clickCount = 1;
  bj = 50;
  imgList = [
    {
      a: '../../../../assets/images/a.jpg',
      b: '',
    },
    {
      a: '../../../../assets/images/b.jpg',
      b: '',
    },
    {
      a: '../../../../assets/images/a.jpg',
      b: '',
    },
    {
      a: '../../../../assets/images/b.jpg',
      b: '',
    },
    {
      a: '../../../../assets/images/a.jpg',
      b: '',
    },
    {
      a: '../../../../assets/images/b.jpg',
      b: '',
    },
    {
      a: '../../../../assets/images/a.jpg',
      b: '',
    },
    {
      a: '../../../../assets/images/b.jpg',
      b: '',
    },
    {
      a: '../../../../assets/images/a.jpg',
      b: '',
    },
    {
      a: '../../../../assets/images/b.jpg',
      b: '',
    },
    {
      a: '../../../../assets/images/a.jpg',
      b: '',
    },
    {
      a: '../../../../assets/images/b.jpg',
      b: '',
    },
    {
      a: '../../../../assets/images/a.jpg',
      b: '',
    },
    {
      a: '../../../../assets/images/b.jpg',
      b: '',
    },
    {
      a: '../../../../assets/images/a.jpg',
      b: '',
    },
    {
      a: '../../../../assets/images/b.jpg',
      b: '',
    },
    {
      a: '../../../../assets/images/a.jpg',
      b: '',
    },
    {
      a: '../../../../assets/images/b.jpg',
      b: '',
    },
    {
      a: '../../../../assets/images/a.jpg',
      b: '',
    },
    {
      a: '../../../../assets/images/b.jpg',
      b: '',
    },
  ];
  checkedIndex = 0;
  currentPage = 1;
  currentImgUrl = this.imgList[0].a;
  constructor() { }

  ngOnInit() {
    this.aa();
  }
  zoomOut() {
    console.log(this.myImg);
    const currwidth = this.myImg.nativeElement.clientWidth;
    if (currwidth >= 800) {

    } else {
      this.myImg.nativeElement.style.width = (currwidth + 50) + 'px';
    }
    // this.bj += 50;
  }
  zoomIn() {
    console.log(this.myImg);
    const currwidth = this.myImg.nativeElement.clientWidth;
    if (currwidth <= 500) {

    } else {
      this.myImg.nativeElement.style.width = (currwidth - 50) + 'px';
    }
  }
  leftRotate() {
    const img = this.myImg.nativeElement;
    const div = this.myDiv.nativeElement;
    let tran = 0;
    const hasRote = img.style.transform.indexOf('rotate(');
    if (hasRote >= 0) {
      const transform = img.style.transform;
      tran = parseInt(transform.substr(transform.indexOf('(') + 1), 10);
    }
    img.style.transform = 'rotate(' + (tran + 90) + 'deg)';
    this.clickCount++;
    // this.bj = 200;
    // const w = img.clientHeight;
    // const h = img.clientWidth;
    // img.style.width = w + 'px';
    // img.style.height = h + 'px';
    // const left = (div.clientWidth - img.clientHeight) / 4;
    // const top = (div.clientHeight - img.clientWidth) / 4;
    // img.style.left = 0 + 'px';
    // img.style.top = 0 + 'px';
  }
  rightRotate() {
    this.myImg.nativeElement.style.transform = 'rotate(-90deg)';

  }
  aa() {
    const _t = this;
    const drag = this.myImg.nativeElement;
    const div = this.myDiv.nativeElement;
    drag.onmousedown = function (event) {
      const e = event || window.event;
      const diffx = e.clientX - drag.offsetLeft;
      const diffy = e.clientY - drag.offsetTop;
      if (typeof drag.setCapture !== 'undefined') {
        drag.setCapture();
      }
      drag.onmousemove = function (event1) {
        const e1 = event1 || window.event;
        let movex = e1.clientX - diffx;
        let movey = e1.clientY - diffy;
        // 如果是竖向
        if (_t.clickCount % 2 === 0) {
          // const sjl = (drag.clientWidth - drag.clientHeight) / 2 + drag.offsetLeft;
          // const sjt = (drag.clientHeight - drag.clientWidth) / 2 - drag.offsetTop;
          // movex = sjl >= div.clientWidth - _t.bj ? div.clientWidth - _t.bj - 62 : movex;
          // movey = sjt >= div.clientHeight - _t.bj ? div.clientHeight - _t.bj - 62 : movey;
          // if (movex < 0) {
          //   movex = drag.clientWidth + movex <= _t.bj ? -drag.clientWidth + _t.bj : movex;
          // }
          // if (movey < 0) {
          //   movey = drag.clientHeight + movey <= _t.bj ? -drag.clientHeight + _t.bj : movey;
          // }
        } else {
          movex = movex >= div.clientWidth - _t.bj ? div.clientWidth - _t.bj : movex;
          movey = movey >= div.clientHeight - _t.bj ? div.clientHeight - _t.bj : movey;
          if (movex < 0) {
            movex = drag.clientWidth + movex <= _t.bj ? -drag.clientWidth + _t.bj : movex;
          }
          if (movey < 0) {
            movey = drag.clientHeight + movey <= _t.bj ? -drag.clientHeight + _t.bj : movey;
          }
        }
        drag.style.left = movex + 'px';
        drag.style.top = movey + 'px';
      };
      drag.onmouseup = function (event2) {
        this.onmousemove = null;
        this.onmouseup = null;
      };
    };
    div.onmouseout = function () {
      drag.onmousemove = null;
      drag.onmouseup = null;
    };
  }
  left(index?) {
    if (this.currentPage === 1) {
      this.myUl.nativeElement.style.left = 0 + 'px';
    } else {
      const currentLeft = this.myUl.nativeElement.offsetLeft;
      this.myUl.nativeElement.style.left = (currentLeft + 770) + 'px';
      this.currentPage--;
    }
    if (!index) {
      this.checkedIndex = (this.currentPage - 1) * 13;
      this.reset();
      this.currentImgUrl = this.imgList[this.checkedIndex].a;
    } else {
      this.reset();
      this.currentImgUrl = this.imgList[index].a;
    }

  }
  right(index?) {
    if (this.currentPage >= Math.ceil(this.imgList.length / 13)) {
    } else {
      const currentLeft = this.myUl.nativeElement.offsetLeft;
      this.myUl.nativeElement.style.left = (currentLeft - 770) + 'px';
      this.currentPage++;
    }
    if (!index) {
      this.checkedIndex = (this.currentPage - 1) * 13;
      this.reset();
      this.currentImgUrl = this.imgList[this.checkedIndex].a;
    } else {
      this.reset();
      this.currentImgUrl = this.imgList[index].a;
    }
  }
  prev() {
    if (this.checkedIndex > 0) {
      this.currentImgUrl = this.imgList[this.checkedIndex].a;
      // 点击上一个正好翻页情况
      if (this.checkedIndex % 13 === 0) {
        this.checkedIndex--;
        this.left(this.checkedIndex);
      } else {
        this.checkedIndex--;
      }
      this.reset();
      this.currentImgUrl = this.imgList[this.checkedIndex].a;
    }
  }
  next() {
    if (this.checkedIndex < this.imgList.length) {
      if ((this.checkedIndex + 1) % 13 === 0) {
        this.checkedIndex++;
        this.right(this.checkedIndex);
      } else {
        this.checkedIndex++;
      }
      this.reset();
      this.currentImgUrl = this.imgList[this.checkedIndex].a;
    }
  }
  checkImg(index) {
    this.checkedIndex = index;
    this.reset();
    this.currentImgUrl = this.imgList[index].a;
  }
  reset() {
    this.myImg.nativeElement.style.left = 0 + 'px';
    this.myImg.nativeElement.style.top = 0 + 'px';
    this.myImg.nativeElement.style.width = '100%';
    this.myImg.nativeElement.style.transform = 'rotate(' + 0 + 'deg)';
  }
  download() {
    // const imgsrc = "https://sflower.oss-cn-beijing.aliyuncs.com/48042517060477523712435.jpg?Expires=1560852953&OSSAccessKeyId=TMP.AgF0FKGUGWewMlt12q1EthdILnAK05W1TtD7Ib5EfRvdG9r4utE0jP35LCt1ADAtAhQNQ5vtaDcbWwhRJSXUuoWg1jRnawIVAJHGSTfhw6sgclwnILCtA1TRWKOc&Signature=Nl2yaatmn8L1QeqMPoZJfmH9AyI%3D";
    // let image = new Image();
    // // 解决跨域 Canvas 污染问题
    // image.setAttribute("crossOrigin", "anonymous");
    // image.onload = function () {
    //   let canvas = document.createElement("canvas");
    //   canvas.width = image.width;
    //   canvas.height = image.height;
    //   let context = canvas.getContext("2d");
    //   context.drawImage(image, 0, 0, image.width, image.height);
    //   let url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
    //   let a = document.createElement("a"); // 生成一个a元素
    //   let event = new MouseEvent("click"); // 创建一个单击事件
    //   a.download = name || "photo"; // 设置图片名称
    //   a.href = url; // 将生成的URL设置为a.href属性
    //   a.dispatchEvent(event); // 触发a的单击事件
    // };
    // image.src = imgsrc;
    // //如有必要设置xhr.responseType = 'blod';
    // //处理后台返回的文件流并下载
    // function handleFileStream(fileStream, downName) {
    //   downName = downName || 'test.txt';
    //   var blod = new Blob([fileStream]);

    //   var a = document.createElement('a');
    //   a.href = URL.createObjectURL(blod);
    //   a.style.display = 'none';
    //   document.body.appendChild(a);
    //   a.download = downName;
    //   a.click();
    //   document.body.removeChild(a);
    // }

  }
}
