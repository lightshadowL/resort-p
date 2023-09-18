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
    
    // 슬라이드 js
    // 변수
    var swidth=0; // slide너비 변수
    var slideCount=1; // slide 분할 변수
    var slideLength=0; // slide 수
    var auto=null; // 자동
    var slidePosition=0; // slide를 움직일 슬라이드 위치 변수
    var $slides=$(".slides"); // .slides요소를 담을 변수
    var $slide=$slides.children(".slide"); //.slides>.slide 요소 저장변수
    // 페이지네이션 변수
    var $page=$(".pagenation");
    var $pageDot=$page.children(".dot"); //페이지 네이션의 dot요소 저장
    var dotCount=0; // slide의 dot수 계산 변수
    var x_pos,x;
    var xDif;
    var drag=false;
    var timeCount;
    var $time=0;

/* ************************************************************************************* */        
    // 슬라이드 초기값 생성
    function init(){
        // 슬라이드 표시되는 슬라이드 구역 너비
        var slider_wrap=$(".slider-wrap").width();
        //슬라이드너비 변수 저장(슬라이드 구역 너비/한 구역에 표시할 슬라이드의 수)
        // swidth=slider_wrap/slideCount; 
        swidth=slider_wrap/slideCount;
        // 슬라이드 너비 재 설정
        $slide.css({"width":swidth})
        //슬라이드 전체 개수 저장
        slideLength=$(".slide").length; 
        // 슬라이드 그룹의 전체 너비 재 설정
        $slides.css({
            width:swidth*slideLength
        })
        // console.log("슬라이드 감싼구역 너비 : "+slider_wrap)
        // console.log("슬라이드 너비 : "+swidth);
        // console.log("슬라이드 수 : "+slideCount);
        // 추가 전체 슬라이드에서 마지막 슬라이드를 dot index에서 사용
        indexDif=slideLength-1
    }
    init();

/* ************************************************************************************* */    
    function dot(){
        // 화면에 표시할 슬라이드와 dot 표시 맞추기
        dotCount=$slide.length-slideCount+1; //슬라이드 페이지네이션 도트 갯수
        // 페이지네이션에 추가된 슬라이드의 수 만큼 dot만들기
        for(var i=1; i<dotCount; i++){
            $page.append('<span class="dot">'+i+'</span>')
        }
        // 페이네이션의 도트 요소 저장
        $pageDot=$page.children(".dot");
        // console.log("도트의 수 : "+dotCount);
        // console.log("slidePosition : "+slidePosition)
    }
    dot();

/* ************************************************************************************* */    
    // 슬라이드 전체 동작 함수
    function slideEvent(){
        // 슬라이드 이동 함수
        function slideMove(){
            // 슬라이드가 slide의 너비만큼씩 왼쪽으로 이동 애니메이션
            $slides.stop().animate({
                left:-swidth*slidePosition
            },800);
            // 슬라이드의 포시션이 시작위치거나 마지막 위치일 때 컨트롤 버튼 비활성
            if(slidePosition==0){
                // 시작위치
                $(".prevbt").removeClass("btactive")
                $(".nextbt").addClass("btactive")
                
            }else if(slidePosition==slideLength-slideCount){
                // 마지막 위치
                $(".prevbt").addClass("btactive")
                $(".nextbt").removeClass("btactive")
                
            }else{
                // 이동중
                $(".prevbt").addClass("btactive")
                $(".nextbt").addClass("btactive")
                
            }
            
            // console.log("움직입니다.")
            // console.log("slidePosition : "+slidePosition);
        }

        // ///////////////////////////////////////////////////////////////////
        // pagenation 이동함수(페이지네이션 dot활성/비활성 함수)
        function page(){
            // 모든 dot를 비활성
            $pageDot.removeClass("active");
            // 현재 선택된 dot활성
            $pageDot.eq(slidePosition).addClass("active");
            console.log("dotIndex "+slidePosition)
            
        }

        // ///////////////////////////////////////////////////////////////////
        // 슬라이드 왼쪽으로 이동(next)함수
        function nextPlay(){
            // 슬라이드가 마지막 슬라이드 위치에 왔을 때 
            if(slidePosition==slideLength-slideCount){
                // 처음 위치로 이동
                slidePosition=0;
            }else{
                // 마지막 위치가 아닌 경우 현재의 포지션 변경
                slidePosition++;
            }
            
            //조정된 슬라이드 위치를 이용해 slideMove함수에 전달하여 이동
            slideMove();
            // 페이지네이션 dot활성/비활성 함수 호출
            page();
            
        }    
        
        // //////////////////////////////////////////////////////////////
        // 슬라이드 오른쪽으로 이동(prev)함수
        function prevPlay(){
            //슬라이드의 위치가 처음으로 돌아왔을 때 이전 버튼을 클릭하면
            if(slidePosition<=0){
                // 마지막 위치로 포지션 변경
                slidePosition=slideLength-1;
                  
            }else{
                // 처음위치가 아닌 경우 포지션 변경
                slidePosition--; 
            }
            //조정된 슬라이드 위치를 이용해 slideMove함수에 전달하여 이동
            slideMove();
            // 페이지네이션 dot활성/비활성 함수 호출
            page();
        } 
        
        // ////////////////////////////////////////////////////////////////////////////////
        // next버튼
        $(".nextbt").click(function(){
            nextPlay();
  
        });

        // ///////////////////////////////////////////////////////////////////////////////
        // prev버튼
        $(".prevbt").click(function(){
            prevPlay(); 
        });        

        // ///////////////////////////////////////////////////////////////////////////////
        // pagenation 버튼
        $(".pagenation .dot").each(function(index){
            $(this).click(function(){
                // 클릭한 현재 dot의 위치(index)를 슬라이드 포지션의 위치로 변경하여 함께 적용
                
                slidePosition=index;
                // console.log("dot slidePosition : "+slidePosition)
               
                //조정된 슬라이드 위치를 이용해 slideMove함수에 전달하여 이동
                slideMove();
                // 페이지네이션 dot활성/비활성 함수 호출
                page();
                
                
            })  
            
        })

        // //////////////////////////////////////////////////////////////////////////////////
        // 마우스다운 터치스타트
        $slides.on("mousedown touchstart",(event)=>{
            console.log("마우스버튼을 누르고 있어요")
            if(event.type=="touchstart"){
                x_pos=event.touches[0].screenX;
            }else{
                x_pos=event.pageX;
            }
            // x_pos=event.pageX;
            drag=true;
            timeCount=setInterval(function(){ $time++; console.log($time) },10);
            // return false;
        })

        // ///////////////////////////////////////////////////////////////////////////////
        // 마우스업, 터치끝
        $slides.on("mouseup touchend",(event)=>{
            var transhold=50;
            console.log("마우스 버튼을 떼었어요");
            drag=false;
            console.log("xDif : "+xDif)
            if(Math.abs(xDif)>transhold){
                
                if(xDif<-50){
                    prevPlay(); 
                }else if(xDif>50){
                    nextPlay();
                }
            }
            xDif=0;
            clearInterval(timeCount);
            if($time>10){
                $(".slides a").click(function(){
                    return false;
                })
                console.log("이벤트 제거")
                }else{
                    $(".slides a").click(function(){
                        console.log("이벤트 설정");
                        var $href=$(this).attr("href");
                        window.open($href,"_self");
                    })
                    
                }
            $time=0;
               
        })

        // ///////////////////////////////////////////////////////////////////////////////
        // 마우스무브, 터치무브
        $slides.on("mousemove touchmove",(event)=>{
            if(drag){
                console.log("X : "+x);
                console.log("마우스를 드레그 하고 있어요");
                if(event.type=="touchmove"){
                    xDif=parseInt((x_pos-event.touches[0].screenX));
                }else{
                    xDif=parseInt((x_pos-event.pageX));
                } 
            }
            return false;
        })// mousemove, touchmove 끝        

    }
    slideEvent();
    
/* ************************************************************************************* */
    // 창이 조절되었을 때 슬라이더의 크기 변경
    $(window).resize(function(){
        init();
        // slideEvent(); 
        $(".slides").stop().animate({
            left:-swidth*slidePosition
        },0);
    }); // 창 재설정 끝


})