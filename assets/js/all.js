$('document').ready(function(){

  // links in new window
  $("a").filter(function() {
      return this.hostname && this.hostname.replace(/^www\./, '') !== location.hostname.replace(/^www\./, '');
  }).each(function() {
      $(this).attr('target', "_blank");
  });
  $("a[href$='.pdf'], a[href$='.ppt'], a[href$='.doc'], a[href$='.zip'], a[href$='.xls'], a[href$='.rar']").click(function(){
    $(this).attr('target','_blank');
  });

  var browser = $.browser;
  if (( browser.msie && browser.version.slice(0,3) == "6.0" ) || (browser.msie && browser.version.slice(0,3) == "7.0" )) {

  }
  
  $('.hover').hover(
    function(){
      $(this).css({"opacity":"0.5"});
    },
    function(){
      $(this).css({"opacity":"1"});
    }
  );
    
  $('.video').hover(
    function(){
      $("> img",this).css({"opacity":"0.5"});
    },
    function(){
      $("> img", this).css({"opacity":"1"});
    }
  );

  function toggleSearchTabs(tab){
    var $this = $(tab);
    var target = '.drop_down.'+$this.attr('rel');
    var show = true;
    if($(target).is(':visible')){
      show = false;
    }else{
      show = true;
    }

    $('.drop_down').hide();
    $('.drop_down_selector').removeClass('opened');
    if(show==true){
      $this.addClass('opened');
      $(target).show();
    }
  }

  $('.drop_down').hide();
  $('.drop_down_selector').click(function(){
    var $this = $(this);
    toggleSearchTabs($this);
  });

  $('.closeTabButton').click(function(){
    var $tab = $(this).parent();
    toggleSearchTabs($tab);
  });
  
  $('.checkbox_label').click(function(){
    var $this = $(this);
    var $check = $this.prev();
    var value = $this.text();

    if($this.hasClass('checkbox_label_selected')){
      //$check.val('');
      //$this.css("background-position","0 6px");
      $this.removeClass("checkbox_label_selected");
    }else{
      //$check.val(value);
      //$this.css("background-position","0 -37px");
      $this.addClass("checkbox_label_selected");
    }
  });
  
  var sliderRecipeH = $('.slider_recipe .slider .slider_content:first').height();
  $('.slider_recipe').height(sliderRecipeH);
  var sliderQtd = $('.slider_content').size();
  var sliderW = sliderQtd * 960;
  $('.slider').width(sliderW);
  
  $('.areas .item').each(function(indice){
    $('> a', $(this)).click(function(){
      $('html, body').animate({
        scrollTop: $(this).offset().top
      }, 500);
      var left = ((indice + 1) * 960) * (-1);
      if((PSEA_LANG === 'ar'))
      {
        $('.slider').stop().animate({
          right:left
        },1000,itemCallback(indice));
      }
      else
      {
        $('.slider').stop().animate({
          left:left
        },1000,itemCallback(indice));

      }
    });
  });
  function itemCallback(indice){
    var num = indice + 2;
    var newH = $('.slider_recipe .slider .slider_content:nth-child('+num+')').height();
    $('.slider_recipe').stop().animate({
      height:newH
    },250);
  }
  
  $('.slider_back').click(function(){
    var newH = $('.slider_recipe .slider .slider_content:nth-child(1)').height();

    if((PSEA_LANG === 'ar'))
    {
      $('.slider').stop().animate({
        right:0
      },1000,sliderbackCallback(newH));
    }
    else
    {
      $('.slider').stop().animate({
        left:0
      },1000,sliderbackCallback(newH));
    }
  });
  function sliderbackCallback(newH){
    $('.slider_recipe').stop().animate({
      height:newH
    },250);
  }

  $('.text_content .sub').each(function(){
    var $this = $(this);
    var target = $this.next('.tools');
    //console.log($(target).attr('id'));

    var targetHeight = $(target).height();
    $(target).height(targetHeight).hide();

    //console.log(targetHeight);
    $this.click(function()
    {
      if($this.hasClass('marked'))
      {
        // se reclicou recolhe
        $this.removeClass('marked');
        target.slideUp();
      }
      else
      {
        $this.addClass('marked');
        target.slideDown();
      }
      $this.parent().parent('.text').height('auto');

    }); // .click
  });

  
  $('.content_drop_down .open').each(function(){
    var $this = $(this);
    var target = $this.parent().find('.text');
    if(target.hasClass('open')){
      return;
    }
    var view = $this.parent().find('.view_more');
    var targetHeight = $(target).height();
    
    $this.click(function(){
      $(target).stop().animate({
        height:targetHeight
      },500,function(){
        $this.addClass('marked');
        $(view).addClass('show');
        if (( browser.msie && browser.version.slice(0,3) == "6.0" ) || (browser.msie && browser.version.slice(0,3) == "7.0" )) {
          $(view).show();
          $('> .text_content', target).show();
        }
      });
      
      $('.content_drop_down .text').each(function(){
        var open = $(this).parent().find('.open');
        var link = $(this).parent().find('.view_more');
        if($(this).height() > 0){
          $(this).stop().animate({
            height:0
          },500,function(){
            //remove o marcado do link
            var $lebus = $(this).find('.sub');
            $lebus.removeClass('marked');
            //fecha a div
            $lebus.next('.tools').slideUp();

            $(open).removeClass('marked');
            $(link).removeClass('show');
            if (( browser.msie && browser.version.slice(0,3) == "6.0" ) || (browser.msie && browser.version.slice(0,3) == "7.0" )) {
              $(link).hide();
              $('> .text_content', $(this)).hide();
            }
          });
        }
      });
    });
  });
  $('.content_drop_down .text').height(0);
  if (( browser.msie && browser.version.slice(0,3) == "6.0" ) || (browser.msie && browser.version.slice(0,3) == "7.0" )) {
    $('.content_drop_down .text_content').hide();
  }
  
  $('.content_drop_down .text .text_content .close').each(function(){
    var $this = $(this);
    var recipe = $this.closest('.text');
    var open = $this.closest('.content_drop_down').find('.open');
    var link = $this.closest('.content_drop_down').find('.view_more');
    $this.click(function(){
      recipe.stop().animate({
        height:0
      },500,function(){
        $(open).removeClass('marked');
        $(link).removeClass('show');
        if (( browser.msie && browser.version.slice(0,3) == "6.0" ) || (browser.msie && browser.version.slice(0,3) == "7.0" )) {
          $(link).hide();
          $('> .text_content', $(this)).hide();
        }
      });
    });
  });
  
  if(!$('.search').is('.opened')){
    $('.search .area a').each(function(){
      var $this = $(this);
      var target = $this.parent().find('.text');
      var targetHeight = $(target).height();
      $this.click(function(){
        $(target).stop().animate({
          height:targetHeight
        },500,function(){
          $this.css({"background-image":"url(assets/images/bullet05_marked.jpg)"});
        });

        $('.search .area .text').each(function(){
          var link = $(this).parent().find('a');
          if($(this).height() > 0){
            $(this).stop().animate({
              height:0
            },500,function(){
              $(link).css({"background-image":"url(assets/images/bullet05.jpg)"});
            });
          }
        });
      });
    });
  
    $('.search .area .text').height(0);
  }
  
  // normaliza os tamanhos dos li do bloco de informação
  $('#more_info ul li').each(function(){
    var $this = $(this);
    var myHeight = $this.height();
    var prevHeight = $this.prev().height();
    if($this.is(':even') && prevHeight > myHeight){
      $this.height(prevHeight);
    }
  });
  
  // abre e fecha o bloco de informação
  $('#more_info').hide();
  $('#more_button, #close_more_info').click(function(event){
    event.preventDefault(true);
    // calcula o padding de forma dinâmica
    var baseHeight = 180;
    var infoHeight = $('#more_info').outerHeight();
    var padding = 675;
    var newPadding = (infoHeight - baseHeight) + padding + 25; // fim do cálculo
    $('#more_info').stop().animate({
      opacity:'toggle'
    },250,function(){
      if($('#more_info').is(':visible')){
        $('#content').stop().animate({
          'padding-top':newPadding
        },250);
      }else{
         $('#content').stop().animate({
          'padding-top':padding
        },250);
      }
    });
  });
});
$(window).load(function(){
  var container = $('#container');
  var background = "";
  var backIndex = Math.floor(Math.random()*5);
  
  if(container.is('.home')){
    background = "background_home_img" + backIndex;
  }else{
    background = "background_inner_img" + backIndex;
  }
  
  container.css({
    "background-image":"url(/assets/images/" + background + ".jpg)",
    "background-position":"top",
    "background-repeat":"no-repeat"
  });
});
