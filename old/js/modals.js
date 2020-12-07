var modals=(function($){
    
    var selectors={
        body:'body',
        close:'.js-modal-close'
        },
        classes={
            open:'modal-active',
            active:'modal--active',
            visible:'modal--visible'
        },
        settings={
            transition:300
        },
        nodes;
    
    function show(event,id){
        var modal=$('#'+ id);
        $.publish('/page/closeAll');
        $.publish('/modal/redraw',[modal]);
        modal.addClass(classes.active);
        setTimeout(function(){
            modal.addClass(classes.visible);
        },50);
        nodes.body.addClass(classes.open);
        $('.scene').addClass('psa-blur');
        nodes.close.show();
		disable_scroll();
		$('.view-element').show();
		$('.xzoom-lens').remove();
    }
    
    function hide(){
        var modal=$('.'+ classes.active);
        modal.removeClass(classes.visible);
        setTimeout(function(){
            modal.removeClass(classes.active);
        },
        settings.transition);
        nodes.body.removeClass(classes.open);
        $('.scene').removeClass('psa-blur');
        nodes.close.hide();
        $('.psa-btn-close').hide();
		enable_scroll();
    }
    
    return{
        init:function(){
            nodes=utils.createNodes(selectors);
            nodes.close.on('click',hide);
            $.subscribe('/modals/show',show);
            $.subscribe('/modals/closeAll',hide);
            $.subscribe('/closeAll',hide);
        }
    }
})(jQuery);

$(function(){
    modals.init();
});