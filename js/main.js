function getStepAndProc(dis,end,aniNum){
    let aniProc = dis/(end/aniNum) - Math.floor(dis/(end/aniNum))
    let aniStep = dis/(end/aniNum) - aniProc
    return {aniProc,aniStep}
}


$(document).ready(function(){

// scroll
// new Scrooth({
//     strength:24

// })

    // loading page
    setTimeout(function(){
        $(".loadingPg").addClass("on")
    },3333)

    
    // greeting
    let time  = 0.1;
    function clipTxtUp(dom){
        let childs = dom.children;
        for(let i=0; i<childs.length; i++){
            childs[i].style.animationDelay = `${time * i}s`
            childs[i].classList.add('on');
        }
    }
        let textUpGroup = document.getElementById('textUpGroup');
    // clipTxtUp(textUpGroup);

    // show after loading 
    setTimeout(function(){
        clipTxtUp(textUpGroup)
    },3333)


    // menu
    $(".menu").click(function(){
        $(".gnb").addClass("on")
    })
    $(".menuClose").click(function(){
        $(".gnb").removeClass("on")
    })   


    //content2 

$(window).scroll(function(){        
    let sct = $(window).scrollTop()
    let scrollBoxTop = $(".scrollBox").offset().top
    let scrollBoxHeight = $(".scrollBox").height()
    let frameHeight = $(".frame").height()
    let end = scrollBoxHeight - frameHeight
    let distance = sct-scrollBoxTop   

    //시작
    if (distance<0){
    $(".frame").removeClass("fixed")
    $(".frame").removeClass("bottom")
    $(".traitList").removeClass("on")
    }

    // 구간1 애니메이션
    if(distance>=0 && distance<end){
        $(".frame").removeClass("bottom")
        $(".frame").addClass("fixed")
        let ani1 = getStepAndProc(distance,end,5)

        if(ani1.aniStep == 0){
            $("svg").addClass("on")
            $(".traitList").addClass("on")
            //reset
            $(".circle").attr("r",`0`)
            $(".circleTitle").css("opacity",`0`)
            $(".traitName").css("display","block")
        }
        if(ani1.aniStep == 1){
            $(".circle").attr("r",ani1.aniProc*10)
            $(".circleTitle").css("opacity",ani1.aniProc)
            $(".circleTitle").css("text-shadow",`0 0 ${ani1.aniProc*10}px #fff`)
        }
        if(ani1.aniStep == 2){
            let homeWidth = ani1.aniProc*100
            $(".traitList").removeClass("on")
            $(".traitName").css("display","none")
            if(homeWidth>50){homeWidth=50}
            $(".circleHome").css("width",`${100-homeWidth}vw`)      
            
            // reset
            $(".projectList").css("display",`none`)
            $(".projectList").css("width",`0vw`)
            $(".circleHome").css("background",`transparent`)
        }
        if(ani1.aniStep == 3){
            $(".projectList").css("display",`flex`)
            $(".projectList").css("width",`50vw`)
            $(".projectList").css("justify-content",`center`)
            $(".projectList>ul").css("opacity",`${ani1.aniProc}`)
            $(".projectList>ul").css("pointer-events",`auto`)
        }
        console.log

        if(ani1.aniStep == 4){
            $(".circleHome").css("width",`${50-(ani1.aniProc*51)}vw`)
            $(".circleHome").css("background",`#344ead`)
            $(".projectList").css("width",`${50+(ani1.aniProc*51)}vw`)   
          }
    }

    // 끝
    if(distance>=end){
    $(".frame").removeClass("fixed")
    $(".frame").addClass("bottom")
    }
})

// content3
$(window).scroll(function(){        
    let sct = $(window).scrollTop()
    let ct3Top = $(".ct-intro").offset().top
    let ct3Height = $(".ct-intro").height()

    let distance = sct-ct3Top
    let ratio = distance*1.5
    
    // console.log(sct,ct3Top,ct3Height,distance,ratio)
    

    if((distance>=0 && distance<600)){
        $(".bnjDecor>img").css("transform","rotate("+ratio/2+"deg)")
        $(".bnjDecor").css("transform","translateY("+ratio+"px)")
    }
    
})


// tabMenu
    $(".tabMenu>dt").click(function(){
        $(".tabMenu>dt").removeClass("on")
        $(this).addClass("on")
    })




    // colorScheme 자동채워넣어지기
    $(".colorSchemeList>li").each(function(){
        let color = $(this).text()
        $(this).html(`<span style="background:${color}"></span><p>${color}</p>`)
        // console.log(color)
    })


// footer
const carouselText = [
    {text: "call", color: "#e5cfa5"},
    {text: "click", color: "#e5cfa5"},
    {text: "message", color: "#e5cfa5"}

  ]
  
  $( document ).ready(async function() {
    carousel(carouselText, "#feature-text")
  });
  async function typeSentence(sentence, eleRef, delay = 100) {
    const letters = sentence.split("");
    let i = 0;
    while(i < letters.length) {
      await waitForMs(delay);
      $(eleRef).append(letters[i]);
      i++
    }
    return;
  }
  async function deleteSentence(eleRef) {
    const sentence = $(eleRef).html();
    const letters = sentence.split("");
    let i = 0;
    while(letters.length > 0) {
      await waitForMs(100);
      letters.pop();
      $(eleRef).html(letters.join(""));
    }
  }
  async function carousel(carouselList, eleRef) {
      var i = 0;
      while(true) {
        updateFontColor(eleRef, carouselList[i].color)
        await typeSentence(carouselList[i].text, eleRef);
        await waitForMs(1500);
        await deleteSentence(eleRef);
        await waitForMs(500);
        i++
        if(i >= carouselList.length) {i = 0;}
      }
  }
  
  function updateFontColor(eleRef, color) {
    $(eleRef).css('color', color);
  }
  function waitForMs(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }





   


})

