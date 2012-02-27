$(document).ready(function(){
	watermark_func();
})

function watermark_func(){
    $(".watermark").each(function(){
    	$(this).val($(this).attr('placeholder'));
    });

    $(".watermark").focus(function(){
        var placeholder = $(this).attr('placeholder');
        var current_value = $(this).val();
        $(this).css('color', '#676767'); //192750
        if(current_value == placeholder) {
            $(this).val('');
        }

    });

    $(".watermark").blur(function(){

        var placeholder = $(this).attr('placeholder');
        var current_value = $(this).val();

        if(current_value == '') {
            $(this).val(placeholder);
            $(this).css('color', '#676767');
        }

    });
	
};