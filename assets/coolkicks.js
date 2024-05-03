$("#dashboard-section").css({display: 'none'});
$("#customer-section").css({display: 'none'});
$("#items-section").css({display: 'none'});
$("#order-section").css({display: 'none'});

$("#button_dashboard").on("click",()=>{
    $("#dashboard-section").css({display: 'block'});
    $("#customer-section").css({display: 'none'});
    $("#items-section").css({display: 'none'});
    $("#order-section").css({display: 'none'});
});

$("#button_customer").on("click",()=>{
    $("#dashboard-section").css({display: 'none'});
    $("#customer-section").css({display: 'block'});
    $("#items-section").css({display: 'none'});
    $("#order-section").css({display: 'none'});
});

$("#button_items").on("click",()=>{
    $("#dashboard-section").css({display: 'none'});
    $("#customer-section").css({display: 'none'});
    $("#items-section").css({display: 'block'});
    $("#order-section").css({display: 'none'});
});

$("#button_orders").on("click",()=>{
    $("#dashboard-section").css({display: 'none'});
    $("#customer-section").css({display: 'none'});
    $("#items-section").css({display: 'none'});
    $("#order-section").css({display: 'block'});
});