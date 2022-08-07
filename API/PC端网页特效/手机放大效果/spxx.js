
window.addEventListener('load', function () {
    var btn = document.querySelector('.preview_img');//背景框
    var mask = document.querySelector('.mask');//框内黄色方框
    var imgbig = document.querySelector('.imgbig');
    var masktwo = document.querySelector('.masktwo');
    //给背景框添加鼠标经过事件，显示黄色框和放大图片框
    btn.addEventListener('mouseover', function (e) {
        mask.style.display = 'block';
        masktwo.style.display = 'block';
    })
    //给背景框添加鼠标离开事件，隐藏黄色框和放大图片框
    btn.addEventListener('mouseout', function (e) {
        mask.style.display = 'none';
        masktwo.style.display = 'none';
    })
    //让鼠标移动时，黄色框跟随鼠标走动
    btn.addEventListener('mousemove', function (e) {
        //计算鼠标在盒子内的坐标
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        // mask.style.left=x+'px';
        // mask.style.top=y+'px';
        //因为我们要盒子始终以鼠标为中心，所以要减去盒子高度
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2;


        //不能让黄色的出去
        maskX <= 0 ? maskX = 0 : maskX;
        maskX >= btn.offsetWidth - mask.offsetWidth ? maskX = btn.offsetWidth - mask.offsetWidth : maskX;

        maskY <= 0 ? maskY = 0 : maskY;
        maskY >= btn.offsetHeight - mask.offsetHeight ? maskY = btn.offsetHeight - mask.offsetHeight : maskY;

        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        //图片放大效果
        var maskmax = btn.offsetWidth - mask.offsetWidth;
        var bigMax = imgbig.offsetWidth - masktwo.offsetWidth;

        var bigX = maskX * bigMax / maskmax;
        var bigY = maskY * bigMax / maskmax;
        imgbig.style.left = -bigX + 'px';
        imgbig.style.top = -bigY + 'px';
    })



})