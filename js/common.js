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

    // 데스크탑 드롭
    $(".desk-list>ul>li").each(function(index){
        $(this).mouseenter(function(){
            $(".desk-full-drop").stop().slideDown();
            console.log("li에 있습니다.")
            $(this).prev().find("a").removeClass("active");
            $(this).next().find("a").removeClass("active");
            $(this).find("a").addClass("active");
            $(".full-drop-list>div").eq(index).prev().removeClass("active")
            $(".full-drop-list>div").eq(index).next().removeClass("active")

            if($(".full-drop-list>div").eq(index).find("a").length!==0){    
                $(".full-drop-list>div").eq(index).addClass("active")
            }
            
        }) 
    })
    $(".full-drop-list>div").each(function(index){
        $(this).hover(
            function(){
                // console.log("길이 : "+$(this).find("a").length)
                if($(this).find("a").length!==0){
                    $(this).addClass("active");
                }
                
                $(".desk-list>ul>li").eq(index).find("a").addClass("active")
            },
            function(){
                $(".full-drop-list>div").removeClass("active");
                $(".desk-list>ul>li").find("a").removeClass("active");
            }
        )
    })

    $(".desk-list").parent().mouseleave(function(){
        $(".desk-full-drop").stop().slideUp();
        $(".desk-list>ul>li").find("a").removeClass("active")
        console.log("desk-bottom에 있습니다.")
    })
    
        
    

})