(function(){
            
function initApp() {
   app = new Framework7({
        root: "#app",
        id: "io.framework7.YourAppName",
        name: "Framework7",
        theme: "md",
        version: "1.0.0000(20200727)",
        routes: routes,
        scrollIntoViewOnFocus: true,
        scrollIntoViewCentered: true,
        popup: {
            closeByBackdropClick: false,
        },
        data: function() {
            return {
                tpl: {
                                         EmailSchedule: {},
                                         JobProcess: {},
                                         Member: {},
                                         EventSchedule: {},
                                         FlightBookingSeat: {},
                                         RolePermission: {},
                                         User: {},
                                         SecurityCode: {},
                                         Sequence: {},
                                         FlightInfo: {},
                                         Role: {},
                                         Job: {},
                                         Airport: {},
                                         FlightBooking: {},
                                        Home: {}
                }
            };
        }
    });
    initTemplate();
    
         app.on('tabShow', function(tabEl) {
            //console.log('tabShow');
            
            app.data.currentPage = tabEl.id;
            
            //if(app.views.current) app.views.current.router.back();
            
            var view = $$(tabEl);
            createViews([view]);
            var page = $$(view.find(".page")[0]);
            if(page) pageOpen(page);
        });

        app.on('pageReinit', function(pageEl) {
            //console.log("pageReinit");
            var page = $$(pageEl.pageFrom.el);
            if(page) pageClose(page);
        });
        app.on('popupClose', function(popup) {
            //console.log('popupClose');
            var page = $$($$(popup.el).find(".page")[0]);
            if(page) pageClose(page);
        });
        app.on('popupOpen', function(popup) {
            //console.log('popupOpen');
            app.data.currentPage = popup.el.id;
            var views = $$(popup.el).find(".view");
            createViews(views);
        });
        app.on('popupOpened', function(popup) {
            //console.log('popupOpened');
            app.data.currentPage = popup.el.id;
            var page = $$($$(popup.el).find(".page")[0]);
            if(page) pageOpen(page);
        });
        app.on('panelOpen', function(panel) {
            //console.log('panelOpen');
            app.data.currentPage = panel.el.id;
            var views = $$(panel.el).find(".view");
            createViews(views);
        });
        app.on('panelOpened', function(panel) {
            //console.log('panelOpened');
            app.data.currentPage = panel.el.id;
            var page = $$($$(panel.el).find(".page")[0]);
            if(page) pageOpen(page);
        });

    setTimeout(function(){
      app.tab.show('#FlightInfoView');
    },300);    
};

     function createViews(views) {
        views.forEach(function(view, index) {
            if (!app.view.get(view)) {
                app.views.create(view, {
                    on: {
                        pageInit: function(pageEl) {
                            try {
                                var page = $$(pageEl.el);
                                var pageId = page.attr("id");
                                if (pageId) {
                                    var viewJsClass = eval(pageId);
                                    var viewJsObject = viewJsClass();
                                    var pageInit = viewJsObject.pageInit;
                                    if (pageInit) {
                                        pageInit(page);
                                    }
                                    createViews(page.find(".view"));
                                }
                            } catch (e) {
                                console.log("Point: " + pageId, e.message);
                            }
                        }
                    }
                });
            }
        });
    }

    function pageClose(pageEl) {
        var page = $$(pageEl);
        var pageId = page.attr("id");
        try {
            if (pageId) {
                var viewJsClass = eval(pageId);
                var viewJsObject = viewJsClass();
                var pageClose = viewJsObject.pageClose;
                if (pageClose) {
                    pageClose(page);
                }
            }
        } catch (e) {
            console.log("Point: " + pageId, e.message);
        }
    }

    function pageOpen(pageEl) {
        var page = $$(pageEl);
        var pageId = page.attr("id");
        try {
            if (pageId) {
                var viewJsClass = eval(pageId);
                var viewJsObject = viewJsClass();
                var pageOpen = viewJsObject.pageOpen;
                if (pageOpen) {
                    pageOpen(page);
                }
            }
        } catch (e) {
            console.log("Point: " + pageId, e.message);
        }
    }

function initTemplate() {
    app.request.get('EmailSchedule/template/list.html', function(data) {
        app.data.tpl.EmailSchedule['list'] = data;
    });
    app.request.get('EmailSchedule/template/new.html', function(data) {
        app.data.tpl.EmailSchedule['new'] = data;
    });
    app.request.get('EmailSchedule/template/edit.html', function(data) {
        app.data.tpl.EmailSchedule['edit'] = data;
    });
    app.request.get('JobProcess/template/list.html', function(data) {
        app.data.tpl.JobProcess['list'] = data;
    });
    app.request.get('JobProcess/template/new.html', function(data) {
        app.data.tpl.JobProcess['new'] = data;
    });
    app.request.get('JobProcess/template/edit.html', function(data) {
        app.data.tpl.JobProcess['edit'] = data;
    });
    app.request.get('Member/template/list.html', function(data) {
        app.data.tpl.Member['list'] = data;
    });
    app.request.get('Member/template/new.html', function(data) {
        app.data.tpl.Member['new'] = data;
    });
    app.request.get('Member/template/edit.html', function(data) {
        app.data.tpl.Member['edit'] = data;
    });
    app.request.get('EventSchedule/template/list.html', function(data) {
        app.data.tpl.EventSchedule['list'] = data;
    });
    app.request.get('EventSchedule/template/new.html', function(data) {
        app.data.tpl.EventSchedule['new'] = data;
    });
    app.request.get('EventSchedule/template/edit.html', function(data) {
        app.data.tpl.EventSchedule['edit'] = data;
    });
    app.request.get('FlightBookingSeat/template/list.html', function(data) {
        app.data.tpl.FlightBookingSeat['list'] = data;
    });
    app.request.get('FlightBookingSeat/template/new.html', function(data) {
        app.data.tpl.FlightBookingSeat['new'] = data;
    });
    app.request.get('FlightBookingSeat/template/edit.html', function(data) {
        app.data.tpl.FlightBookingSeat['edit'] = data;
    });
    app.request.get('RolePermission/template/list.html', function(data) {
        app.data.tpl.RolePermission['list'] = data;
    });
    app.request.get('RolePermission/template/new.html', function(data) {
        app.data.tpl.RolePermission['new'] = data;
    });
    app.request.get('RolePermission/template/edit.html', function(data) {
        app.data.tpl.RolePermission['edit'] = data;
    });
    app.request.get('User/template/list.html', function(data) {
        app.data.tpl.User['list'] = data;
    });
    app.request.get('User/template/new.html', function(data) {
        app.data.tpl.User['new'] = data;
    });
    app.request.get('User/template/edit.html', function(data) {
        app.data.tpl.User['edit'] = data;
    });
    app.request.get('SecurityCode/template/list.html', function(data) {
        app.data.tpl.SecurityCode['list'] = data;
    });
    app.request.get('SecurityCode/template/new.html', function(data) {
        app.data.tpl.SecurityCode['new'] = data;
    });
    app.request.get('SecurityCode/template/edit.html', function(data) {
        app.data.tpl.SecurityCode['edit'] = data;
    });
    app.request.get('Sequence/template/list.html', function(data) {
        app.data.tpl.Sequence['list'] = data;
    });
    app.request.get('Sequence/template/new.html', function(data) {
        app.data.tpl.Sequence['new'] = data;
    });
    app.request.get('Sequence/template/edit.html', function(data) {
        app.data.tpl.Sequence['edit'] = data;
    });
    app.request.get('FlightInfo/template/list.html', function(data) {
        app.data.tpl.FlightInfo['list'] = data;
    });
    app.request.get('FlightInfo/template/new.html', function(data) {
        app.data.tpl.FlightInfo['new'] = data;
    });
    app.request.get('FlightInfo/template/edit.html', function(data) {
        app.data.tpl.FlightInfo['edit'] = data;
    });
    app.request.get('Role/template/list.html', function(data) {
        app.data.tpl.Role['list'] = data;
    });
    app.request.get('Role/template/new.html', function(data) {
        app.data.tpl.Role['new'] = data;
    });
    app.request.get('Role/template/edit.html', function(data) {
        app.data.tpl.Role['edit'] = data;
    });
    app.request.get('Job/template/list.html', function(data) {
        app.data.tpl.Job['list'] = data;
    });
    app.request.get('Job/template/new.html', function(data) {
        app.data.tpl.Job['new'] = data;
    });
    app.request.get('Job/template/edit.html', function(data) {
        app.data.tpl.Job['edit'] = data;
    });
    app.request.get('Airport/template/list.html', function(data) {
        app.data.tpl.Airport['list'] = data;
    });
    app.request.get('Airport/template/new.html', function(data) {
        app.data.tpl.Airport['new'] = data;
    });
    app.request.get('Airport/template/edit.html', function(data) {
        app.data.tpl.Airport['edit'] = data;
    });
    app.request.get('FlightBooking/template/list.html', function(data) {
        app.data.tpl.FlightBooking['list'] = data;
    });
    app.request.get('FlightBooking/template/new.html', function(data) {
        app.data.tpl.FlightBooking['new'] = data;
    });
    app.request.get('FlightBooking/template/edit.html', function(data) {
        app.data.tpl.FlightBooking['edit'] = data;
    });
    app.request.get('public/about.html', function(data) {
        app.data.tpl.about = data;
    });
}

// setTimeout(function(){
    
//   app.popup.create({
//      el: '#LoginPopup',
//      animate: true
//   }).open();
  
// },800);

  setTimeout(function(){
      toOrder();
  },2000);

initApp();

})();


function getDisplayPage(){
    var vs = $$(".popup");
	for(var i = vs.length - 1;i >= 0;i--){
	  var v = $$(vs[i]);
      var id = v.attr("id");
      var display = v.css("display")
	  if(display === 'block') return v;
	}
    var vs = $$(".tab");
	for(var i = vs.length - 1;i >= 0;i--){
	  var v = $$(vs[i]);
      var id = v.attr("id");
      var display = v.css("display")
	  if(display === 'block') return v;
	}
    return null;
}

 function getLogDate(){
	var logDate = "";
	var localTime = new Date();
	var marketTime = new Date(localTime.getTime() + 24*3600*1000);
	
	var y = (marketTime.getYear() + 1900);
	var m = marketTime.getMonth() + 1;
//	m = (m < 10 ? ('0' + m) : m);
	var d = marketTime.getDate();
	d = (d < 10 ? ('0' + d) : d);
	
	var mmm = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][m];
	logDate = d + ' ' + mmm + ' ' + y;
	return logDate;
 }
 
 function selectSeat(link){
     var isLocked = $$(link).parent().hasClass("seat_no_locked");
     if(!isLocked){
         var seat = $$(link).attr("seat");
         $$(".selected_seat").val(seat);
         console.log($$(".selected_seat").val());
         $$(".seat_no_selected").removeClass("seat_no_selected");
         $$(link).parent().addClass("seat_no_selected");
     }
     
 }
 
 
 function submitSeat(){
     var seaNo = $$(".selected_seat").val();
     $$(".FlightBookingSeat_seat_no").find('input').val(seaNo);
     $$(".FlightBookingSeat_seat_no").find('.item-after').text(seaNo);
     $$(".seat_map_close").click();
 }
 
 
 var TO_FLIGHT_BOOKING_RESULT;
 var TO_FLIGHT_BOOKING_SEAT_RESULT;
 var TO_FLIGHT_INFO_RESULT;
 
 function toOrder(){
     try{
       var qs = location.href.split('?',2)[1].split("&");
       //console.log(qs);
       var bkId = qs[0].split("=")[1];
       var email = qs[1].split("=")[1];
       var bkQ = new Query("FlightBooking");
       bkQ.and("eq_id",bkId);
       bkQ.and("eq_deleted",false);
       TO_FLIGHT_BOOKING_RESULT = bkQ.first();
       if(TO_FLIGHT_BOOKING_RESULT.status === 1){
           app.preloader.show();
           var fbs = new Query("FlightBookingSeat");
           fbs.and("eq_flight_booking_id",TO_FLIGHT_BOOKING_RESULT.data.id);
           TO_FLIGHT_BOOKING_SEAT_RESULT = fbs.find();
           
           var biQ = new Query("FlightInfo");
           biQ.and("eq_id",TO_FLIGHT_BOOKING_RESULT.data.flight_info_id);
           TO_FLIGHT_INFO_RESULT = biQ.first();
           console.log(TO_FLIGHT_BOOKING_RESULT.data,TO_FLIGHT_INFO_RESULT.data);
           

           var link = '<a href="/edit_flight_info/'  + TO_FLIGHT_INFO_RESULT.data.id + '" class="link item-link flight_info_link"></a>';
           $$(".hide_flight_info_link").html(link);
           $$(".flight_info_link").click();
           
          setTimeout(function(){
              $$(".FlightBooking_id").val(TO_FLIGHT_BOOKING_RESULT.data.id);
              $$("#FlightBookingSeatHasPopup .FlightBookingSeat_flight_booking_id").val(TO_FLIGHT_BOOKING_RESULT.data.id);
              $$("#FlightBookingSeatHasView .FlightBookingSeat_flight_booking_id").val(TO_FLIGHT_BOOKING_RESULT.data.id);
              //$$("#FlightInfoEditPage .FlightBooking_id").val(TO_FLIGHT_BOOKING_RESULT.data.id);
              
              var price = TO_FLIGHT_INFO_RESULT.data.price.replace(/\D/g,'');
              $$(".FlightBooking_card .FlightBooking_order_no").val(TO_FLIGHT_BOOKING_RESULT.data.order_no);
              $$(".FlightBooking_card .FlightBooking_amount").val(price * TO_FLIGHT_BOOKING_SEAT_RESULT.data.length);
              $$(".FlightBooking_card .FlightBooking_passengers").val(TO_FLIGHT_BOOKING_SEAT_RESULT.data.length + "");
              $$(".FlightBooking_card .FlightBooking_email").val(email);
              $$(".FlightBooking_card").css("display","block");
              $$(".FlightBooking_exit").css("display","block");
              $$(".FlightBooking_confirm").css("display","block");
              $$(".FlightBooking_booking").removeClass("color-blue");
              $$(".FlightBooking_booking").addClass("color-orange");
              $$(".FlightBooking_booking").text("Change Passengers");
                app.preloader.hide();      
                $$(".FlightBooking_exit").on("click",function(){
                    location.href = "https://aademo.query.hk/";
                });
                $$(".FlightBooking_confirm").on("click",function(){
                                                         app.preloader.show();
                                                         if($$(".FlightBooking_email").val() === ""){
                                                             app.preloader.hide();
                                                             var toastIcon = app.toast.create({
                                                                      icon: app.theme === 'ios' ? '<i class="f7-icons">error</i>' : '<i class="material-icons">error</i>',
                                                                      text: 'Please input Email.',
                                                                      position: 'center',
                                                                      closeTimeout: 3000,
                                                                  });
                                                             toastIcon.open();
                                                         }else{
                                                              setTimeout(function(){
                                                                 app.preloader.hide();
                                                                  var toastIcon = app.toast.create({
                                                                      icon: app.theme === 'ios' ? '<i class="f7-icons">star</i>' : '<i class="material-icons">star</i>',
                                                                      text: 'Order successfully, Please check this Email inbox.',
                                                                      position: 'center',
                                                                      closeTimeout: 5000,
                                                                  });
                                                                  toastIcon.open();
                                                                  setTimeout(function(){
                                                                      $$(".back_flight_info").click();
                                                                  },5000);
                                                                  
                                                                  var bkQ = new Query("FlightBooking");
                                                                  bkQ.and("eq_id",bkId);
                                                                  bkQ.and("eq_deleted",false);
                                                                  TO_FLIGHT_BOOKING_RESULT = bkQ.first();
                                                                  
                                                                  fbs = new Query("FlightBookingSeat");
                                                                  fbs.and("eq_flight_booking_id",TO_FLIGHT_BOOKING_RESULT.data.id);
                                                                  TO_FLIGHT_BOOKING_SEAT_RESULT = fbs.find();
                                                                   
                                                                  biQ = new Query("FlightInfo");
                                                                  biQ.and("eq_id",TO_FLIGHT_BOOKING_RESULT.data.flight_info_id);
                                                                  TO_FLIGHT_INFO_RESULT = biQ.first();
                                                                  
                                                                  
                                                                  var emailScheduleAr = new ActiveRecord("EmailSchedule");
                                                                  emailScheduleAr.data.process_host = "%";
                                                                  emailScheduleAr.data.to_list = $$(".FlightBooking_email").val();
                                                                  emailScheduleAr.data.subject = "Updated your order " + TO_FLIGHT_BOOKING_RESULT.data.order_no;
                                                                  var msg = "Order No.: " + TO_FLIGHT_BOOKING_RESULT.data.order_no + "<br/>";
                                                                  msg += "Passengers: " + TO_FLIGHT_BOOKING_SEAT_RESULT.data.length + "<br/>";
                                                                  msg += "Amount: HKD " + (price * TO_FLIGHT_BOOKING_SEAT_RESULT.data.length) + "<br/>";
                                                                  msg += "Link: <a href='https://aademo.query.hk/?id=" + TO_FLIGHT_BOOKING_RESULT.data.id + "&email=" + $$(".FlightBooking_email").val() + "'>Check Your Order</a><br/>";
                                                                  emailScheduleAr.data.message = msg;
                                                                  emailScheduleAr.data.status = "New";
                                                                  emailScheduleAr.save();
                                                                  TO_FLIGHT_BOOKING_RESULT = null;
                                                                  TO_FLIGHT_BOOKING_SEAT_RESULT = null;
                                                                  TO_FLIGHT_INFO_RESULT = null;
                                                                  
                                                                   $$(".FlightBooking_id").val("");
                                                                   $$("#FlightBookingSeatHasPopup .FlightBookingSeat_flight_booking_id").val("");
                                                                   $$("#FlightBookingSeatHasView .FlightBookingSeat_flight_booking_id").val("");
              
                                                             },2000);
                                                         }
                                                     }); 
                                                     $$(".back_flight_info").hide();
          },2000);
           
       }
       //console.log(bkId,email);
     }catch(e){
        console.log(e);  
        app.preloader.hide();
     }
     
 }
 
 
 
 
 
 
 
 
 