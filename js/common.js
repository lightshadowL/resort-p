$(document).ready(function(){
    //  jqeury 시작위치
    /* ***************************************************** */
    //모바일 네비 drop
    $(".side-list>li").click(function(){
        if($(this).find(".m-drop-list").is(":hidden")){
            $(".m-drop-list").slideUp();
            $("span i").addClass("fa-angle-right")
            $(this).find("span i").removeClass("fa-angle-right")
            $(this).find("span i").addClass("fa-angle-down")
            $(this).find(".m-drop-list").slideDown();
        }else{
            $(this).find(".m-drop-list").slideUp();
            $(this).find("span i").removeClass("fa-angle-down")
            $(this).find("span i").addClass("fa-angle-right")
        }
    })
    /* ********************************************************** */
    //모바일 open side
    $(".open-side").click(function(){
        $(".side-content").addClass("active")
    })
    /* ********************************************************** */
    //모바일 close side
    $(".close-side").click(function(){
        $(".side-content").removeClass("active")
        $(".m-drop-list").slideUp();
        $(".side-list>li span i").removeClass("fa-angle-down");
        $(".side-list>li span i").addClass("fa-angle-right");
    })

})