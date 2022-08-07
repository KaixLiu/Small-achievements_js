window.addEventListener('load', function () {
    var mask = document.querySelector('.mask');
    var xmimg = document.querySelector('.xmimg');
    var mabig = document.querySelector('.mabig');
    var bigimg = document.querySelector('.bigimg');
    //添加鼠标事件
    xmimg.addEventListener('mouseover', function () {
        mask.style.display = 'block';
        mabig.style.display = 'block';
    })
    //移开隐藏
    xmimg.addEventListener('mouseout', function () {
        mask.style.display = 'none';
        mabig.style.display = 'none';
    })

    //拖拽效果
    xmimg.addEventListener('mousemove', function (e) {
        //先获取鼠标在当前页面的x和y
        var x = e.pageX;
        var y = e.pageY;
        //让内盒子跟着鼠标走动
        //盒子X为鼠标位置减去外盒子到左距离

        var maskthex = x - this.offsetLeft;
        var maskthey = y - this.offsetTop;

        //使鼠标一直在盒子中心
        var maskX = maskthex - mask.offsetWidth / 2;
        var maskY = maskthey - mask.offsetHeight / 2;

        //当内盒子顶住外盒子线时，不再移动
        maskX <= 0 ? maskX = 0 : maskX;
        maskX >= xmimg.offsetWidth - mask.offsetWidth ? maskX = xmimg.offsetWidth - mask.offsetWidth : maskX;

        maskY <= 0 ? maskY = 0 : maskY;
        maskY >= xmimg.offsetHeight - mask.offsetHeight ? maskY = xmimg.offsetHeight - mask.offsetHeight : maskY;
        //赋值
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        
        
        var maskMax=xmimg.offsetWidth-mask.offsetWidth;
        //背景图最大值为背景图大小减去盒子大小
        var bigMax=bigimg.offsetWidth-mabig.offsetWidth;

        //公式求出最大值
        //内盒移动距离*大图片移动距离/内盒最大移动距离
        var bigX=maskX*bigMax/(xmimg.offsetWidth-mask.offsetWidth);
        var bigY=maskY*bigMax/(xmimg.offsetHeight-mask.offsetHeight);

        bigimg.style.left=-bigX+'px';
        bigimg.style.top=-bigY+'px';

    })


})