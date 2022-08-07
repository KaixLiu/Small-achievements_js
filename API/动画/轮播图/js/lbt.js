window.addEventListener('load', function () {
    //获取元素
    var box = document.querySelector('.box');
    var prev = document.querySelector('.prev');
    var next = document.querySelector('.next');
    //第一个功能，显示与隐藏
    box.addEventListener('mouseover', function () {
        prev.style.display = 'block';
        next.style.display = 'block';
        clearInterval(times);//鼠标放上时暂停动画
        times = null;
    })
    box.addEventListener('mouseout', function () {
        prev.style.display = 'none';
        next.style.display = 'none';
        //鼠标离开后继续动画
        times = setInterval(function () {
            next.click();
        }, 2000)
    })

    var imgul = document.querySelector('.imgul');
    var nav = document.querySelector('.nav');
    var imgWidth = box.offsetWidth;//背景图片的宽度
    for (var i = 0; i < imgul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('index', i);//添加自定义属性
        nav.appendChild(li);

        li.addEventListener('click', function () {
            //小圆圈排他思想
            for (var i = 0; i < nav.children.length; i++) {
                nav.children[i].className = '';
            }
            this.className = 'select';
            //移动距离为li下标*图片宽度
            var index = this.getAttribute('index');
            //点击li把该索引给num
            num = index;
            cicrle = index;
            animate(imgul, -index * imgWidth);
        })
    }
    nav.children[0].className = 'select';
    //复制第一张图片到右侧
    var first = imgul.children[0].cloneNode(true);//cloneNode深拷贝
    imgul.appendChild(first);

    //点击右侧按钮
    var num = 0;//图片动画
    var cicrle = 0;//控制小圆圈动画
    var flag = true;//节能阀
    next.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == imgul.children.length - 1) {
                imgul.style.left = 0;
                num = 0;
            }
            num++;
            animate(imgul, -num * imgWidth, function () {
                flag = true;
            });
            cicrle++;
            if (cicrle == nav.children.length) {
                cicrle = 0;
            }
            circleCang();
        }
    })
    prev.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = imgul.children.length - 1;
                imgul.style.left = (-num) * imgWidth + 'px';
            }
            num--;
            animate(imgul, -num * imgWidth, function () {
                flag = true;
            });
            cicrle--;
            if (cicrle < 0) {
                cicrle = nav.children.length - 1;
            }
            circleCang();
        }
    })
    //小圆圈的变化
    function circleCang() {
        for (var i = 0; i < nav.children.length; i++) {
            nav.children[i].className = '';
        }
        nav.children[cicrle].className = 'select';
    }

    //定时器自动播放
    var times = setInterval(function () {
        next.click();
    }, 2000)

})