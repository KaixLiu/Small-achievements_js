window.addEventListener('load', function () {
    var imgul = document.querySelector('.imgul');//轮播图长盒子
    var box = document.querySelector('.box');//最大盒子
    var nav = document.querySelector('.nav');//小圆圈
    var index = 0;
    var w = box.offsetWidth;//显示的窗口大小
    //建立自动播放
    var times = setInterval(function () {
        index++;
        var tranX = -index * w;
        imgul.style.transition = 'all,.3s';//添加过渡效果
        imgul.style.transform = 'translateX(' + tranX + 'px)';//利用transform让元素动起来

    }, 2000)
    //transitionend 检测动画是否完成
    //当动画完成时做出判断
    imgul.addEventListener('transitionend', function () {
        if (index >= 3) {//如果计数器超过图片数量
            index = 0;
            imgul.style.transition = 'none';//为了使他最快回到第一张位置，清除动画效果
            var tranX = -index * w;//重新计算移动值（归0）
            imgul.style.transform = 'translateX(' + tranX + 'px)';//赋新值(从头开始)
        }
        else if (index < 0) {
            index = 2;
            imgul.style.transform = 'none';
            var tranX = -index * w;
            imgul.style.transform = 'translateX(' + tranX + 'px)';
        }

        //小圆点跟随
        //思路：先设置一个名为select的类，classList的作用就是判断当前变量是否有这个类，如果没有就给他添加，如果有就删除这个类
        nav.querySelector('.select').classList.remove('select');
        nav.children[index].classList.add('select');
    })

    //添加手指滑动效果
    var startX = 0;//手指滑动
    var moveX = 0;//图片滑动
    var flag = false;
    imgul.addEventListener('touchstart', function (e) {//手指按下
        startX = e.targetTouches[0].pageX;//获取第一跟手指在imgul的第一个X坐标
        clearInterval(times);//清除自动播放效果
    });
    imgul.addEventListener('touchmove', function (e) {//手指移动
        //计算移动距离
        moveX = e.targetTouches[0].pageX - startX;//计算出最后坐标减去开始坐标，就是移动的距离
        var tranX = -index * w + moveX;//重新计算移动值
        imgul.style.transition = 'none';//清除动画效果
        imgul.style.transform = 'translateX(' + tranX + 'px)';
        flag=true;//如果用户手指移动过就判断，否则不判断
        e.preventDefault();//阻止默认行为
    });
    imgul.addEventListener('touchend', function (e) {//手指离开
        if (flag) {
            if (Math.abs(moveX) > 50) {//手指移动一段然后离开，此距离取绝对值如果大于50px那么就让图片移动
                if (moveX > 0) {//大于0向前移动
                    index--;
                }
                else {//小于0向后移动
                    index++;
                }
                //重新计算距离并移动
                var tranX = -index * w;
                imgul.style.transition = 'all,.3s';
                imgul.style.transform = 'translateX(' + tranX + 'px)';
            }
            else {//移动距离小于50则回弹
                var tranX = -index * w;
                imgul.style.transition = 'all,.3s';
                imgul.style.transform = 'translateX(' + tranX + 'px)';
            }
        }
        //手指离开开启定时器
        clearInterval(times);//保证定时器只有一个
        times = setInterval(function () {
            index++;
            var tranX = -index * w;
            imgul.style.transition = 'all,.3s';
            imgul.style.transform = 'translateX(' + tranX + 'px)';
        }, 2000)
    })
})