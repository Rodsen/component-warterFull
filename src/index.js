console.log ("rodsen")

// 获取DOM
var ul = document.getElementById("view")/* ul对象 */
var alis = ul.children; /* li数组 */
// 外部数据
var aImgs = [
    {txt: '当我们正在为生活疲于奔命的时候，生活已经离我们而去。——约翰·列侬', pic: './src/images/0.jpg'},
    {txt: '活在世上，不必什么都知道，只知道最好的就够了。——王小波', pic: './src/images/1.jpg'},
    {txt: '世界上任何书籍都不能带给你好运，但是它们能让你悄悄变成你自己。——黑塞', pic: './src/images/2.jpg'},
    {txt: '很多人不需要再见，只是路过而已。——《彼岸花》', pic: './src/images/3.jpg'},
    {txt: '人生最困难的三件事：保守秘密，忘掉所受的创伤，充分利用余暇。——吉罗', pic: './src/images/4.jpg'},
    {txt: '有些人是离开后，才会发觉那个人是最喜欢的。——《东邪西毒》', pic: './src/images/5.jpg'},
];

// 每个成员宽度;如果大于li实际宽度，多出的宽度则是间隔距离
var nLiWidth = 60;
// 高度数组
var aColHeight = [];
// 设置列数
var ncols = 7;
// 设置加载数量
var nViews =42;
// 调用加载函数
setWarterFull ()





// 封装加载和定位为一个函数
/* 修改内容
1设置函数调用计数器：
    每次调用都会+1
    函数外：var nSet = 0;
    函数内：nSet++
2根据  加载数量、调用次数  设置循环计数器： 
    var i = (nSet-1)*nViews  ;  i< nViews+(nSet-1)*nViews; i++
3添加循环判断，增加aImgs数组成员
    slice( )：截取数组，返回新数组
    a.push.apply(a,b);	把新数组成员合并到数组尾部
    一次性添加nViews个
 */
 /* 测试添加数组
 var addArr = aImgs.slice(0,nViews-1);
 console.log (addArr)
aImgs.push.apply(aImgs,addArr);
console.log (aImgs) */
function setWarterFull () {
    // 加载元素
    for (var i = 0  ;  i< nViews; i++) {
        if (aImgs[i]==undefined) {
            _addImgs () ;
            var src = aImgs[i].pic;
            var sLiHtml = "<li><img src=\""+src+"\" ></li>";
            // 累加内容
            var sInHtml = ul.innerHTML;
            sInHtml = sInHtml+sLiHtml
            ul.innerHTML =  sInHtml;
        }else {
            var src = aImgs[i].pic;
            var sLiHtml = "<li><img src=\""+src+"\" ></li>";
            // 累加内容
            var sInHtml = ul.innerHTML;
            sInHtml = sInHtml+sLiHtml
            ul.innerHTML =  sInHtml;
        }
    };
    // 元素定位
    // 定时器是为了等待元素加载完成
    setTimeout(function(){
        for (var i = 0 ;  i< nViews; i++) {
            if(i<ncols) {
                var nLiLeft = i*nLiWidth;
                alis[i].style.left = nLiLeft+"px";
                // console.log (alis[i].offsetHeight)
                aColHeight[i] = alis[i].offsetHeight;
                
            }else {
                // 获取高度数组最小值所在下标 ： 
                /* 遍历数组，获取最小值
                遍历数组，获取最小值下标 */                
                var minIndex ;
                var minColHeight ;
               
                   minIndex = _fnMinIndex(aColHeight) ;
                   minColHeight = _fnMinColHeight(aColHeight);
                // 把图片定位到该下标所在列
                alis[i].style.left = minIndex*nLiWidth+"px";
                // alis[i].style.top = minColHeight+"px";
                alis[i].style.top = 999+"px";
                // 动画效果
                var imgLeft = minIndex*nLiWidth
                buffer(alis[i], {top:minColHeight})
                // 为下标所在数组成原添加li的高度
                aColHeight[minIndex] = aColHeight[minIndex] + alis[i].offsetHeight;
                // console.log (aColHeight)
            }
         }
    },200)
}
// 增加数组函数
function _addImgs () {
    var addArr = aImgs.slice(0,nViews);
    aImgs.push.apply(aImgs,addArr);
}
// 获取数组最小成员下标
function _fnMinIndex(a) {
    return a.indexOf(Math.min.apply(Math, a));
   }
// 获取数组最小成员
function _fnMinColHeight(a) {
 return Math.min.apply(Math, a);
}