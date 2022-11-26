(function($){
	
	// Количество секунд в каждом временном разделении
	var minutes	= 60;
	
	// Создание плагина
	$.fn.countdown = function(prop){
		
		var options = $.extend({
			callback	: function(){},
			timestamp	: 0
		},prop);
		
		var left, m, s, positions;

		// Инициализируйте плагин
		init(this, options);
		
		positions = this.find('.position');
		
		(function tick(){
			
			// Времени осталось
			left = Math.floor((options.timestamp - (new Date())) / 1000);
			
			if(left < 0){
				left = 0;
			}
			
			// Количество оставшихся минут
			m = Math.floor(left / minutes);
			updateDuo(4, 5, m);
			left -= m*minutes;
			
			// Количество оставшихся секунд
			s = left;
			updateDuo(6, 7, s);
			
			// Вызов обратного отсчета
			options.callback(m, s);
			
			// Планирование другого вызова этой функции через 1 секунду
			setTimeout(tick, 1000);
		})();
		
		// Эта функция обновляет позиции двух цифр одновременно
		function updateDuo(minor,major,value){
			switchDigit(positions.eq(minor),Math.floor(value/10)%10);
			switchDigit(positions.eq(major),value%10);
		}
		
		return this;
	};


	function init(elem){
		elem.addClass('formOrder__timer');

		// Создание разметки внутри контейнера
		$.each(['Days','Hours','Minutes','Seconds'],function(i){
			$('<span class="count'+this+'">').html(
				'<span class="position">\
					<span class="digit static">0</span>\
				</span>\
				<span class="position">\
					<span class="digit static">0</span>\
				</span>'
			).appendTo(elem);
			
			if(this!="Seconds"){
				elem.append('<span class="colon countDiv'+i+'"></span>');
			}
		});

	}

	// Создает анимированный переход между двумя числами
	function switchDigit(position,number){
		
		var digit = position.find('.digit')
		
		if(digit.is(':animated')){
			return false;
		}
		
		if(position.data('digit') == number){
			// Мы уже показываем этот номер
			return false;
		}
		
		position.data('digit', number);
		
		var replacement = $('<span>',{
			'class':'digit',
			css:{
				top:'-2.1em',
				opacity:0
			},
			html:number
		});
		
		// Класс .static добавляется, когда анимация завершается. Это делает его работу более плавной.
		
		digit
			.before(replacement)
			.removeClass('static')
			.animate({top:'2.5em',opacity:0},'fast',function(){
				digit.remove();
			})

		replacement
			.delay(100)
			.animate({top:0,opacity:1},'fast',function(){
				replacement.addClass('static');
			});
	}
})(jQuery);