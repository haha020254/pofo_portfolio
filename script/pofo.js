(function($){
    
    class Pofo{
        init(){
            this.header();
            this.section1();
            this.section2();
            this.section3();
            this.section4();
            this.section5();
            this.section6();
            this.section7();

            this.quick();
            this.gotop();
        }
        header(){
            let t = false; 
            let t2 = false;

            //모바일 메뉴 버튼 이벤트
            $('.mobile-btn').on({
                click: function(){
                    $(this).toggleClass('on');
                    $('#nav').stop().slideToggle(300);
                }
            });

            $('.sub').stop().slideUp(0);

            //반응형
            $(window).resize(function(){ 
                resizeNav();
            });

            //반응형 네비게이션
            function resizeNav(){
                if($(window).width()<=1024){
                    $('#nav').stop().hide();
                    t2=false;
                    if(t===false){
                        t=true;

                        $('.sub').stop().fadeOut(0);
                        $('.main-btn').off('mouseenter');

                        //1024 이하 - 모바일
                        $('.main-btn').bind({
                            click: function(){
                            $(this).next().stop().slideToggle(300);
                            }
                        });
                    }
                }
                else{
                    $('.mobile-btn').removeClass('on');
                    $('#nav').stop().show();

                    t=false;

                    if(t2===false){
                        t2=true;
                        //1024 초과 - 데스크탑
                        $('.main-btn').off('click');
                        $('.main-btn').on('mouseenter');
                        $('.sub').stop().slideUp(0);

                        $('.main-btn').on({
                            mouseenter: function(){
                                $('.sub').fadeOut(0);
                                $(this).next().fadeIn(300);
                            }
                        });

                        $('#nav').on({
                            mouseleave: function(){
                                $('.sub').fadeOut(300);
                            }
                        });

                        //서브메뉴
                        $('.sub-btn').on({
                            mouseenter: function(){
                                $('.sub-sub').fadeOut(0);
                                $(this).next().fadeIn(300);
                            }
                        });
                        $('.col24').on({
                            mouseleave: function(){
                                $('.sub-sub').fadeOut(300);
                            }
                        });
                    }
                }
            }

            resizeNav();

            //스크롤이벤트
            let upDown = '';
            let  newTop = $(window).scrollTop();
            let  oldTop = newTop;

            $(window).scroll(function(){
                
                newTop = $(window).scrollTop();

                upDown = oldTop - newTop > 0 ? 'UP' : 'DOWN';
                if(upDown==='UP'){
                    $('#header').removeClass('hide');
                    $('#header').addClass('show');
                }
                if(upDown==='DOWN'){
                    $('#header').removeClass('show');
                    $('#header').addClass('hide');
                }
                if(newTop===0){
                    $('#header').removeClass('show');
                }

                oldTop = newTop;
            });
        }
        section1(){
            let cnt=0;
            let touchStart = null;
            let touchEnd = null;
            let result = '';
            let dragStart = null;
            let dragEnd = null;
            let mouseDown = false;
            let slideW = $('.slide-container').width();
            
            resizefn();
            $(window).resize(function(){
                resizefn();
            });

            function resizefn(){
                slideW = $('.slide-container').width();
                mainSlide();
                return slideW;
            }


            //1.메인슬라이드함수
            function mainSlide(){
                $('.slide-wrap').stop().animate({left:-slideW*cnt},function(){
                    cnt>2?cnt=0:cnt;
                    cnt<0?cnt=2:cnt;
                    $('.slide-wrap').stop().animate({left:-slideW*cnt},0)
                });
                pageBtn();
            }
            //2.다음카운트함수
            function nextCount(){
                cnt++;
                mainSlide();
            }
            //2-1.이전카운트함수
            function prevCount(){
                cnt--;
                mainSlide();
            }

            //터치 & 드래그
            $('.slide-container').on({
                mousedown: function(e){

                  touchStart = e.clientX;
                  dragStart = e.clientX-$('.slide-wrap').offset().left-slideW;
                  mouseDown = true;
                },
                mouseup: function(e){ 
                  touchEnd = e.clientX;
                  result = touchStart-touchEnd > 0 ? 'NEXT' : 'PREV';
                  if(Math.abs(touchStart - touchEnd) > 30 ){ //터치 길이가 적어도 50픽셀 이상이면 다음, 이전 슬라이드
                        if(result==='NEXT'){
                            nextCount(); 
                        }
                        if(result==='PREV'){
                            prevCount(); 
                        }
                   }
                  mouseDown = false;
                },
                mouseleave: function(e){ 
                    if(!mouseDown){
                        return;
                    } 
                    touchEnd = e.clientX;
                    result = touchStart-touchEnd > 0 ? 'NEXT' : 'PREV';
                    if(Math.abs(touchStart - touchEnd) > 30 ){ //터치 길이가 적어도 50픽셀 이상이면 다음, 이전 슬라이드
                        if(result==='NEXT'){
                            nextCount(); 
                        }
                        if(result==='PREV'){
                            prevCount(); 
                        }
                    }
                    
                    mouseDown = false;
      
                  },
                  mousemove: function(e){
                    if(!mouseDown){
                        return;
                    }
                    dragEnd = e.clientX;
                    $('.slide-wrap').css({left: dragEnd-dragStart }); 
                  }
            });

            //페이지버튼
            function pageBtn(){
                $('.page-btn').removeClass('on');
                $('.page-btn').eq(cnt>2 ? 0 : cnt).addClass('on');
            }

            $('.page-btn').each(function(index){
                $(this).click(function(){
                    cnt=index;
                    mainSlide();
                });
            });

            //모바일 전용 터치 이벤트
            $('.slide-container').on({
                touchstart: function(event){
                  touchStart = event.originalEvent.changedTouches[0].clientX;                        
                  dragStart =  event.originalEvent.changedTouches[0].clientX-$('.slide-wrap').offset().left-slideW;
                  mouseDown = true;
                },
                touchend: function(event){  
                    touchEnd = event.originalEvent.changedTouches[0].clientX;  
                    result = touchStart-touchEnd > 0 ? 'NEXT' : 'PREV';
                    if(Math.abs(touchStart - touchEnd) > 30 ){ //터치 길이가 적어도 50픽셀 이상이면 다음, 이전 슬라이드
                        if(result==='NEXT'){
                            nextCount(); 
                        }
                        if(result==='PREV'){
                            prevCount(); 
                        }
                    }
                    mouseDown = false;
                },
                touchmove: function(event){
                    if(!mouseDown){return;}
                    dragEnd = event.originalEvent.changedTouches[0].clientX;
                    $('.slide-wrap').css({left: dragEnd-dragStart });
                }
            });
            
        }
        section2(){
            let winH = $(window).height();
            let sec2Top= $('#section2').offset().top-winH;

            $(window).scroll(function(){
                if($(window).scrollTop()>sec2Top){
                    $('#section2').addClass('sec2Ani');

                }
                if($(window).scrollTop()===0){
                    $('#section2').removeClass('sec2Ani');
                }
            });
        }
        section3(){
            const svgObj = $('.front rect');
            let svgArr = [];
            let perSize= [];
            let piece = [];
            let per = [.92,.97,.98,.92];
            let second = 2;
            let sum = [0,0,0,0];
            let setId = [0,0,0,0];

            let winH = $(window).height();
            let sec3Top= $('#section3').offset().top-winH;
            let t = false;

            $(window).scroll(function(){
                
                if($(window).scrollTop()===0){
                    t=false;
                    $('#section3').removeClass('sec3Ani');
                    
                }
                if($(window).scrollTop()>sec3Top){
                    if(t===false){
                        t=true;
                        $('#section3').addClass('sec3Ani');
                        svgAnimation();
                    }

                }
                
            });

            function svgAnimation(){

                sum = [0,0,0,0];

                $.each(svgObj, function(idx, obj){
                    svgArr[idx] = obj.getTotalLength();
    
                    //퍼센트 길이
                    perSize[idx]=svgArr[idx] * per[idx];
    
                    //마디 길이
                    piece[idx] = (perSize[idx]/second)/100;
    
                    //마디 카운트
                    function sumfn(){
                        sum[idx] += piece[idx];
                        if(sum[idx]>perSize[idx]){
                            clearInterval(setId[idx]);
                        }
                        else{
                            $('.count-num').eq(idx).html(Math.ceil(sum[idx]/svgArr[idx]*100)+'%');
                        }
                        
                    }
                    setId[idx] = setInterval(sumfn,17);
                });
            }


            
                
            
        }
        section4(){
            let winH = $(window).height();
            let sec4Top= $('#section4').offset().top-winH;

            $(window).scroll(function(){
                if($(window).scrollTop()>sec4Top){
                    $('#section4').addClass('sec4Ani');

                }
                if($(window).scrollTop()===0){
                    $('#section4').removeClass('sec4Ani');
                }
            });
        }
        section5(){
            let winH = $(window).height();
            let sec5Top= $('#section5').offset().top-winH;

            $(window).scroll(function(){
                if($(window).scrollTop()>sec5Top){
                    $('#section5').addClass('sec5Ani');

                }
                if($(window).scrollTop()===0){
                    $('#section5').removeClass('sec5Ani');
                }
            });
        }
        section6(){
            let winH = $(window).height();
            let sec6Top= $('#section6').offset().top-winH;

            $(window).scroll(function(){
                if($(window).scrollTop()>sec6Top){
                    $('#section6').addClass('sec6Ani');

                }
                if($(window).scrollTop()===0){
                    $('#section6').removeClass('sec6Ani');
                }
            });
        }
        section7(){
            let winH = $(window).height();
            let sec7Top= $('#section7').offset().top-winH;

            $(window).scroll(function(){
                if($(window).scrollTop()>sec7Top){
                    $('#section7').addClass('sec7Ani');

                }
                if($(window).scrollTop()===0){
                    $('#section7').removeClass('sec7Ani');
                }
            });
        }
        footer(){

        }

        quick(){
            let quickTop = ($(window).height()-$('#quickBox').height())/2-300;

            $(window).scroll(function(){
                $('#quickBox').stop().animate({top:quickTop+$(window).scrollTop()},500);
            });
        }

        gotop(){
            $(window).scroll(function(){
                if($(window).scrollTop()>100){
                    $('#goTopBox').stop().fadeIn(500);
                }
                else{
                    $('#goTopBox').stop().fadeOut(500);
                }
            });

            $('.gotop-btn').on({
                click: function(){
                    $('html,body').stop().animate({scrollTop: 0 }, 500);
                }
            });
        }
        
    }
    const newPofo = new Pofo();
    newPofo.init();

})(jQuery);