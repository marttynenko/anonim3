$.fn.extend({
	printElement: function() {
		var frameName = 'printIframe';
		var doc = window.frames[frameName];
		if (!doc) {
			$('<iframe>').hide().attr('name', frameName).appendTo(document.body);
			doc = window.frames[frameName];
		}
		doc.document.body.innerHTML = this.html();
		doc.window.print();
		return this;
	}
});

$.fn.Tabs = function() {
	var selector = this;

	this.each(function() {
		var obj = $(this); 
		$(obj.attr('href')).hide();
		$(obj).click(function() {
			$(selector).removeClass('selected');
			
			$(selector).each(function(i, element) {
				$($(element).attr('href')).hide();
			});
			
			$(this).addClass('selected');
			$($(this).attr('href')).fadeIn();
			return false;
		});
	});

	$(this).show();
	$(this).first().click();
	if(location.hash!='' && $('a[href="' + location.hash + '"]').length)
		$('a[href="' + location.hash + '"]').click();	
};


 jQuery.validator.setDefaults({
  errorClass: 'invalid',
	successClass: 'valid',
	focusInvalid: false,
	errorElement: 'span',
	errorPlacement: function (error, element) {
    if ( element.parent().hasClass('jq-checkbox') ||  element.parent().hasClass('jq-radio')) {
      element.closest('label').after(error);
      
    } else if (element.parent().hasClass('jq-selectbox')) {
      element.closest('.jq-selectbox').after(error);
    } else {
      error.insertAfter(element);
    }
  },
  highlight: function(element, errorClass, validClass) {
    if ( $(element).parent().hasClass('jq-checkbox') ||  $(element).parent().hasClass('jq-radio') || $(element).parent().hasClass('jq-selectbox')) {
    	$(element).parent().addClass(errorClass).removeClass(validClass);
    } else {
    	$(element).addClass(errorClass).removeClass(validClass);
    }
  },
  unhighlight: function(element, errorClass, validClass) {
  	if ( $(element).parent().hasClass('jq-checkbox') ||  $(element).parent().hasClass('jq-radio') || $(element).parent().hasClass('jq-selectbox')) {
    	$(element).parent().removeClass(errorClass).addClass(validClass);
    } else {
    	$(element).removeClass(errorClass).addClass(validClass);
    }
  }
});
//дефолтные сообщения, предупреждения
jQuery.extend(jQuery.validator.messages, {
  required: "Обязательное поле",
  email: "Некорректный email адрес",
  url: "Некорректный URL",
  number: "Некорректный номер",
  digits: "Это поле поддерживает только числа",
  equalTo: "Поля не совпадают",
  maxlength: jQuery.validator.format('Максимальная длина поля {0} символа(ов)'),
  minlength: jQuery.validator.format('Минимальная длина поля {0} символа(ов)'),
  require_from_group: jQuery.validator.format('Отметьте миниммум {0} из этих полей')
});
//кастомные методы валидатора
jQuery.validator.addMethod("lettersonly", function(value, element) {
  return this.optional(element) || /^[a-zA-ZА-Яа-я\s]+$/i.test(value);
}, "Только буквы");

jQuery.validator.addMethod("telephone", function(value, element) {
  return this.optional(element) || /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){6,14}(\s*)?$/i.test(value);
}, "Некорректный формат"); 


//функция для навешивания изображений фоном
function backgrounded (selector) {
	$(selector).each(function(){
		var $this = $(this),
		$src = $this.find('.bg').attr('src');
		if($this.find('.bg').length) {
			$this.addClass('backgrounded').css('backgroundImage','url('+$src+')');
		}
	});
}


//lazy load для сторонних либ
function lazyLibraryLoad(scriptSrc,linkHref,callback) {
  let script = document.createElement('script');
  script.src = scriptSrc;
  document.querySelector('script[src*="script.js"]').before(script);

  if (linkHref !== '') {
    let style = document.createElement('link');
    style.href = linkHref;
    style.rel = 'stylesheet';
    document.querySelector('link[href*="style.css"]').before(style);
  }

  script.onload = callback
}





jQuery(document).ready(function($){

	if (window.devicePixelRatio == 1) {
		$('html').addClass('no-retina');
	}

	delete $.mask.definitions['9'];
  $.mask.definitions['n'] = '[0-9]';
	$('.mask-phone').mask('+7 (495) nnn-nn-nn');

	$('.offer-form-tabs a').Tabs();



	$(document).on('click','.main-menu a',function(e){
		e.preventDefault();
		const hash = $(this).attr('href');
		if ($(hash).length) {
			let offset = $(hash).offset().top;
			$('html,body').animate({
				scrollTop:offset-50
			},300);
		}
	})

	
	



	if ( $('.ya-share2').length ) {
		var shareScript = document.createElement('script');
		shareScript.src = '//yastatic.net/share2/share.js';
		document.body.appendChild(shareScript);
	}


	$('main table').wrap('<div class="responsive-table"></div>');


	//Замена телефонов и email ссылками
	$('.phone-link, .tel').each(function(){
		var phone = $(this).text().replace(/[^+0-9]/g, '');
		$(this).wrapInner('<a href="tel:' + phone + '"></a>');
	});
	$('.mail-link').each(function(){
		var mail = $(this).text().replace(/\W\@/g, '');
		$(this).wrapInner('<a href="mailto:' + mail + '"></a>');
	});


	//mfp для видео
  $('.mfp-video').magnificPopup({
    type: 'iframe',
    mainClass: 'magnific-video',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
	});
	

	$(document).on('click','.mfp-custom-close',function(e){
		e.preventDefault();
		$.magnificPopup.close();
	});
   

	//инициализация MFP popup для форм
	$(document).on('click','.ajax-mfp',function(){
		var a = $(this);
		$.magnificPopup.open({
			items: { src: a.attr('data-href') },
			type: 'ajax',    
			overflowY: 'scroll',
			removalDelay: 300,
			mainClass: 'my-mfp-zoom-in',
			ajax: {
				tError: 'Ошибка. <a href="%url%">Контент</a> не может быть загружен',
			},
			callbacks: {
				open: function () {
					setTimeout(function(){
						$('.mfp-wrap').addClass('not_delay');
						$('.white-popup').addClass('not_delay');
					},700);
				}
		  }
		});
		return false;
	});


	$(document).on('click','.mm-toggler',function(e){
		e.preventDefault();
		$(this).toggleClass('opened');
		$('.main-menu').toggleClass('opened');
	});

	$(document).on('mouseup',function(e){
		if ($('.header-flex').has(e.target).length === 0){
			$('.main-menu').removeClass('opened');
			$('.mm-toggler').removeClass('opened');
		}
	});




	//стилизация элементов форм
	$('input[type="checkbox"], input[type="radio"], input[type="file"], select').not('.not-styler').styler({
		singleSelectzIndex: '1',
	});


	$('#telegram_login_form').validate({
		rules: {
			f_login: {
				minlength: 3
			}
		}
	})

	$('#check_safety_form').validate({
		rules: {
			f_phone: {
				telephone: true
			}
		}
	})
	$('#free_login_form').validate({
		rules: {
			f_phone: {
				telephone: true
			}
		}
	})


	$('#find_login_fio').validate({
		rules: {
			f_name: {
				lettersonly: true,
			},
			f_surname: {
				lettersonly: true,
			},
			f_patronymic: {
				lettersonly: true,
			}
		}
	})

	$('#find_login_fio').validate({
		rules: {
			f_name: {
				lettersonly: true,
			},
			f_surname: {
				lettersonly: true,
			},
			f_patronymic: {
				lettersonly: true,
			}
		}
	})




	if(matchMedia) {
		var screen768 = window.matchMedia('(max-width:768px)');
		screen768.addListener(changes768);
		changes768(screen768);
	}
	function changes768(screen768) {
		if(screen768.matches) {
		
		} else {
	
		}
	}

});//ready close