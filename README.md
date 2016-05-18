# deepMenufix
Deep-Menufix单页面菜单固定插件

use

    var navWrap = document.getElementById('navwrap');
        var navItem = navWrap.querySelectorAll('.navitem');
        menufix({
            navWrap : navWrap, // *必填项 菜单整体
            navItem : navItem // *必填项 菜单单一链接
    });
