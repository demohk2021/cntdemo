function FlightInfoViewPage() {
    return {
        pageInit: function(page) {
            var me = this;
              
               var defOriginQuery = new Query("Airport");
               defOriginQuery.and("eq_code","HKG");
               defOriginQuery.and("eq_deleted",false);
               var defOrigin = defOriginQuery.first();
               
               if(defOrigin.status === 1){
                 // $$('#FlightInfoView .FlightInfo_origin_airport_id').find('.item-after').text(defOrigin.data.name);
                 // $$('#FlightInfoView .FlightInfo_origin_airport_id').find('input').val(defOrigin.data.id);
               }
               
            //   $$('#FlightInfoView .FlightInfo_scheduled_at').find('input').val(getLogDate());
               
                $$('#FlightInfoView .FlightInfoSearch').on('click',function(){
                    // var origin = $$('#FlightInfoView .FlightInfo_origin_airport_id').find('input').val();
                    // var dest = $$('#FlightInfoView .FlightInfo_destination_airport_id').find('input').val();
                    // var sch_at = $$('#FlightInfoView .FlightInfo_scheduled_at').find('input').val();
                    app.ptr.refresh($$('#FlightInfoView .ptr-content'));
                });
                

               
               $$(".FlightInfo_passengers").on("click",function(event){
                    var popup = app.popup.create({
                        el: '#FlightInfoPassengerPopup',
                        animate: true
                    });
                   popup.open();
               });
               
               var calendarModal = app.calendar.create({
                  inputEl: '.FlightInfo_scheduled_at_input',
                  openIn: 'customModal',
                  header: true,
                  footer: true,
                  cssClass: 'testcss',
                  dateFormat: 'dd M yyyy',
                });
                
                calendarModal.setValue([new Date()]);
                               
               app.autocomplete.create({
                  openIn: 'popup',
                  openerEl: '#FlightInfoView .FlightInfo_origin_airport_id',
                  closeOnSelect: true,
                  routableModals: false,
                  requestSourceOnOpen: true,
                  valueProperty: 'id',
                  textProperty: 'name',
                  pageTitle: '$FlightInfo.origin_airport_id',
                  navbarColorTheme: "header",
                  source: function (query, render) {
                    var records = [];
                    
                    if(app.data.autocompleteTimer) clearTimeout(app.data.autocompleteTimer);
                    
                    app.data.autocompleteTimer = setTimeout(function(){
                        app.preloader.show();
                        var q = new Query("Airport");
                        q.success = function(result){
                            if(result.status === 1){
                               render(result.data);
                               app.preloader.hide();
                            }
                        }
                        
                        if(query !== "*") q.and("any_search_keywords",query);
                        
                        q.and("eq_deleted",false);
                        q.find();
                    },1000);

                  },
                  on: {
                    change: function (value) {
                      $$('#FlightInfoView .FlightInfo_origin_airport_id').find('.item-after').text(value[0].name);
                      $$('#FlightInfoView .FlightInfo_origin_airport_id').find('input').val(value[0].id);
                    }
                  }
                });
                
                app.autocomplete.create({
                  openIn: 'popup',
                  openerEl: '#FlightInfoView .FlightInfo_destination_airport_id',
                  closeOnSelect: true,
                  routableModals: false,
                  requestSourceOnOpen: true,
                  valueProperty: 'id',
                  textProperty: 'name',
                  pageTitle: '$FlightInfo.destination_airport_id',
                  navbarColorTheme: "header",
                  source: function (query, render) {
                    var records = [];
                    
                    if(app.data.autocompleteTimer) clearTimeout(app.data.autocompleteTimer);
                    
                    app.data.autocompleteTimer = setTimeout(function(){
                        app.preloader.show();
                        var q = new Query("Airport");
                        q.success = function(result){
                            if(result.status === 1){
                               render(result.data);
                               app.preloader.hide();
                            }
                        }
                        
                        if(query !== "*") q.and("any_search_keywords",query);
                        
                        q.and("eq_deleted",false);
                        q.find();
                    },1000);

                  },
                  on: {
                    change: function (value) {
                      $$('#FlightInfoView .FlightInfo_destination_airport_id').find('.item-after').text(value[0].name);
                      $$('#FlightInfoView .FlightInfo_destination_airport_id').find('input').val(value[0].id);
                    }
                  }
                });
            
            
            me.pageLimit = 15;
            me.pageOffset = 0;
            me.allowInfinite = false;
            console.log('pageInit', page.attr("id"));
            var ptrContent = $$('#FlightInfoView .ptr-content');
            var preloader = ptrContent.find(".infinite-scroll-preloader");
            preloader.hide();
            
            var searchbar = app.searchbar.create({
              el: '#FlightInfoView .searchbar',
              searchContainer: '#FlightInfoView .list',
                          customSearch: true,
              on: {
                search: function(sb, query, previousQuery) {
                  FlightInfoViewPage.createSarchTimer(ptrContent,query);
                }
              }
            });
            
            ptrContent.on('ptr:refresh', function(e) {
                preloader.hide();
                me.allowInfinite = false;
                setTimeout(function() {
                    me.pageOffset = 0;
                    var notFound = $$("#FlightInfoView .searchbar-not-found");
                    notFound.hide();
                    var q = new Query('FlightInfo');
                    q.success = function(result) {
                        if(result.status === 1){
                            me.pageOffset += result.data.length;
                            if(result.data.length === 0){
                                notFound.show();
                            }else if(result.data.length >= me.pageLimit){
                                me.allowInfinite = true;
                            }

                            var tpl = Template7.compile(app.data.tpl.FlightInfo['list']);
                            var html = tpl({
                                list: result.data
                            });
                            ptrContent.find('.list ul').html(html);
                            app.ptr.done(ptrContent);                        
                        }else{
                            app.ptr.done(ptrContent);
                            app.notification.create({
                              title: 'Message',
                              text: result.msg,
                              closeTimeout: 5000
                            }).open();
                        }
                    }
                    q.error = function(result){
                        app.ptr.done(ptrContent);
                        app.notification.create({
                          title: 'Message',
                          text: result.msg,
                          closeTimeout: 5000
                        }).open();
                    }
                    q.limit(me.pageLimit);
                    q.offset(0);

                    var origin = $$('#FlightInfoView .FlightInfo_origin_airport_id').find('input').val();
                    var dest = $$('#FlightInfoView .FlightInfo_destination_airport_id').find('input').val();
                    //var sch_at = "2020-08-08";//$$('#FlightInfoView .FlightInfo_scheduled_at').find('input').val();
                   
                    var sch_at = calendarModal.getValue()[0];
                    
                    // var sch = new Date(sch_at.getYear() + 1900,sch_at.getMonth(),sch_at.getDate() + 1);
                    var sch = ((sch_at.getYear() + 1900) + "-" + (sch_at.getMonth() + 1) + "-" + sch_at.getDate());
                     console.log('debug',sch_at);
                    console.log("origin",origin);
                    console.log("dest",dest);
                    console.log("sch_at",sch);
                    q.and("eq_origin_airport_id",origin);
                    q.and("eq_destination_airport_id",dest);
                    q.and("eq_schedule_date",sch);
                    q.and("eq_deleted",false);
                    // q.skipnil(true);
                    q.find();
                }, 500);
            });
            ptrContent.on('ptr:done', function(e) {
                FlightInfoViewPage.eventSwipoutOpen();
                ptrContent.focus()
                ptrContent.on('infinite', function () {
                    if (!me.allowInfinite) return;
                    me.allowInfinite = false;
                    preloader.show();
                    setTimeout(function() {
                        var q = new Query('FlightInfo');
                        q.success = function(result) {
                            me.allowInfinite = true;
                            me.pageOffset += me.pageLimit;
                            if(result.data.length > 0){
                                var tpl = Template7.compile(app.data.tpl.FlightInfo['list']);
                                var html = tpl({
                                    list: result.data
                                });
                                ptrContent.find('.list ul').append(html);
                                FlightInfoViewPage.eventSwipoutOpen();
                                preloader.show();
                            }else{
                                me.allowInfinite = false;
                                preloader.hide(); 
                            }
                            ptrContent.focus()
                        }
                        q.error = function(result){
                            me.allowInfinite = false;
                            preloader.hide(); 
                            app.notification.create({
                              title: 'Message',
                              text: result.msg,
                              closeTimeout: 5000
                            }).open();
                        }
                        q.limit(me.pageLimit);
                        q.offset(me.pageOffset);
                        //q.asc("");
                        q.and("any_flight_no",searchbar.value);
                        q.and("eq_deleted",false);
                        q.find();
                    }, 1000);
                    
                });                 
            });            

            setTimeout(function() {
                //app.ptr.refresh(ptrContent);
            }, 500);
            
        },
            pageOpen: function(page){
                console.log('pageOpen',  page.attr("id"));
            },
            pageClose: function(page){
                console.log('pageClose',  page.attr("id"));
            }
        
    }
}

FlightInfoViewPage.swipoutOpened = false;

FlightInfoViewPage.eventSwipoutOpen = function(){
        var swipout = $$("#FlightInfoView .swipeout");
        swipout.on("swipeout:open",function(e){
          FlightInfoViewPage.swipoutOpened = true;
        });
        swipout.on("swipeout:closed",function(e){
          FlightInfoViewPage.swipoutOpened = false;
        }); 
        swipout.on("swipeout:deleted",function(e){
          FlightInfoViewPage.swipoutOpened = false;
        });         
}

FlightInfoViewPage.createSarchTimer = function(ptrContent,keywords){
    if(FlightInfoViewPage.searchTimer){
        clearTimeout(FlightInfoViewPage.searchTimer);
    }
    FlightInfoViewPage.searchTimer = setTimeout(function(){
        app.ptr.refresh(ptrContent);
    },1000);
}

function FlightInfoNewPage() {
    return {
            pageInit: function(page) {
                console.log('pageInit',  page.attr("id"));
            },
            pageOpen: function(page){
                console.log('pageOpen',  page.attr("id"));
            },
            pageClose: function(page){
                console.log('pageClose',  page.attr("id"));
            }
        
    }
}

function FlightInfoEditPage() {
    return {
            pageInit: function(page) {
                console.log('pageInit',  page.attr("id"));
            },
            pageClose: function(page){
                console.log('pageClose',  page.attr("id"));
            }
        
    }
}

function FlightBookingHasViewPage() {
    return {
            pageInit: function(page) {
                console.log('pageInit',  page.attr("id"));
                var me = this;
                me.pageLimit = 15;
                me.pageOffset = 0;
                me.allowInfinite = false;
                console.log('pageInit', page.attr("id"));
                var ptrContent = $$('#FlightBookingHasView .ptr-content');
                var preloader = ptrContent.find(".infinite-scroll-preloader");
                preloader.hide();
                
                var searchbar = app.searchbar.create({
                  el: '#FlightBookingHasView .searchbar',
                  searchContainer: '#FlightBookingHasView .list',
                              customSearch: true,
                  on: {
                    search: function(sb, query, previousQuery) {
                      FlightBookingHasViewPage.createSarchTimer(ptrContent,query);
                    }
                  }
                });
                
                ptrContent.on('ptr:refresh', function(e) {
                    preloader.hide();
                    me.allowInfinite = false;
                    setTimeout(function() {
                        me.pageOffset = 0;
                        var notFound = $$("#FlightBookingHasView .searchbar-not-found");
                        notFound.hide();
                        var q = new Query('FlightBooking');
                        q.success = function(result) {
                            if(result.status === 1){
                                me.pageOffset += result.data.length;
                                if(result.data.length === 0){
                                    notFound.show();
                                }else if(result.data.length >= me.pageLimit){
                                    me.allowInfinite = true;
                                }
    
                                var tpl = Template7.compile(app.data.tpl.FlightBooking['list']);
                                var html = tpl({
                                    list: result.data
                                });
                                ptrContent.find('.list ul').html(html);
                                app.ptr.done(ptrContent);                        
                            }else{
                                app.ptr.done(ptrContent);
                                app.notification.create({
                                  title: 'Message',
                                  text: result.msg,
                                  closeTimeout: 5000
                                }).open();
                            }
                        }
                        q.error = function(result){
                            app.ptr.done(ptrContent);
                            app.notification.create({
                              title: 'Message',
                              text: result.msg,
                              closeTimeout: 5000
                            }).open();
                        }
                        q.limit(me.pageLimit);
                        q.offset(0);
                        //q.asc("");
                        q.and("any_id",searchbar.value);
                        q.and("eq_deleted",false);
                        q.find();
                    }, 500);
                });
                ptrContent.on('ptr:done', function(e) {
                    FlightBookingHasViewPage.eventSwipoutOpen();
                    ptrContent.focus()
                    ptrContent.on('infinite', function () {
                        if (!me.allowInfinite) return;
                        me.allowInfinite = false;
                        preloader.show();
                        setTimeout(function() {
                            var q = new Query('FlightBooking');
                            q.success = function(result) {
                                me.allowInfinite = true;
                                me.pageOffset += me.pageLimit;
                                if(result.data.length > 0){
                                    var tpl = Template7.compile(app.data.tpl.FlightBooking['list']);
                                    var html = tpl({
                                        list: result.data
                                    });
                                    ptrContent.find('.list ul').append(html);
                                    FlightBookingHasViewPage.eventSwipoutOpen();
                                    preloader.show();
                                }else{
                                    me.allowInfinite = false;
                                    preloader.hide(); 
                                }
                                ptrContent.focus()
                            }
                            q.error = function(result){
                                me.allowInfinite = false;
                                preloader.hide(); 
                                app.notification.create({
                                  title: 'Message',
                                  text: result.msg,
                                  closeTimeout: 5000
                                }).open();
                            }
                            q.limit(me.pageLimit);
                            q.offset(me.pageOffset);
                            //q.asc("");
                            q.and("any_id",searchbar.value);
                            q.and("eq_deleted",false);
                            q.find();
                        }, 1000);
                        
                    });                 
                });            
    
                setTimeout(function() {
                    app.ptr.refresh(ptrContent);
                }, 500);                
            },
            pageClose: function(page){
                console.log('pageClose',  page.attr("id"));
            }
        
    }
}

FlightBookingHasViewPage.swipoutOpened = false;

FlightBookingHasViewPage.eventSwipoutOpen = function(){
        var swipout = $$("#FlightBookingHasView .swipeout");
        swipout.on("swipeout:open",function(e){
          FlightBookingHasViewPage.swipoutOpened = true;
        });
        swipout.on("swipeout:closed",function(e){
          FlightBookingHasViewPage.swipoutOpened = false;
        }); 
        swipout.on("swipeout:deleted",function(e){
          FlightBookingHasViewPage.swipoutOpened = false;
        });         
}

FlightBookingHasViewPage.createSarchTimer = function(ptrContent,keywords){
    if(FlightBookingHasViewPage.searchTimer){
        clearTimeout(FlightBookingHasViewPage.searchTimer);
    }
    FlightBookingHasViewPage.searchTimer = setTimeout(function(){
        app.ptr.refresh(ptrContent);
    },1000);
}


var FlightInfoRoutes = [{
        path: '/new_flight_info/',
        async: function(routeTo, routeFrom, resolve, reject) {
            console.log('new');
                        
                                    if(FlightInfoViewPage.swipoutOpened){
                reject();
            }else{
                resolve({
                    template: app.data.tpl.FlightInfo['new']
                }, {
                    context: {
                        data: {}
                    }
                });  
                
              app.autocomplete.create({
                  openIn: 'popup',
                  openerEl: '#FlightInfoNewPage .FlightInfo_origin_airport_id',
                  closeOnSelect: true,
                  routableModals: false,
                  requestSourceOnOpen: true,
                  valueProperty: 'id',
                  textProperty: 'name',
                  pageTitle: '$FlightInfo.origin_airport_id',
                  source: function (query, render) {
                    var records = [];
                    
                    if(app.data.autocompleteTimer) clearTimeout(app.data.autocompleteTimer);
                    
                    app.data.autocompleteTimer = setTimeout(function(){
                        app.preloader.show();
                        var q = new Query("Airport");
                        q.success = function(result){
                            if(result.status === 1){
                               render(result.data);
                               app.preloader.hide();
                            }
                        }
                        
                        if(query !== "*") q.and("any_name",query);
                        
                        q.and("eq_deleted",false);
                        q.find();
                    },1000);

                  },
                  on: {
                    change: function (value) {
                      $$('#FlightInfoNewPage .FlightInfo_origin_airport_id').find('.item-after').text(value[0].name);
                      $$('#FlightInfoNewPage .FlightInfo_origin_airport_id').find('input').val(value[0].id);
                    }
                  }
                });
              app.autocomplete.create({
                  openIn: 'popup',
                  openerEl: '#FlightInfoNewPage .FlightInfo_destination_airport_id',
                  closeOnSelect: true,
                  routableModals: false,
                  requestSourceOnOpen: true,
                  valueProperty: 'id',
                  textProperty: 'name',
                  pageTitle: '$FlightInfo.destination_airport_id',
                  source: function (query, render) {
                    var records = [];
                    
                    if(app.data.autocompleteTimer) clearTimeout(app.data.autocompleteTimer);
                    
                    app.data.autocompleteTimer = setTimeout(function(){
                        app.preloader.show();
                        var q = new Query("Airport");
                        q.success = function(result){
                            if(result.status === 1){
                               render(result.data);
                               app.preloader.hide();
                            }
                        }
                        
                        if(query !== "*") q.and("any_name",query);
                        
                        q.and("eq_deleted",false);
                        q.find();
                    },1000);

                  },
                  on: {
                    change: function (value) {
                      $$('#FlightInfoNewPage .FlightInfo_destination_airport_id').find('.item-after').text(value[0].name);
                      $$('#FlightInfoNewPage .FlightInfo_destination_airport_id').find('input').val(value[0].id);
                    }
                  }
                });

                
                $$("#FlightInfoNewPage .save").on("click",function(e){
                        var ar = new ActiveRecord("FlightInfo");
                        ar.read("#FlightInfoNewPage form");
                        app.preloader.show();
                        
                        setTimeout(function(){
                            ar.submit("create",function(result){
                                app.preloader.hide();
                                
                                var popup = app.popup.create({
                                        el: '#FlightBookingPopup',
                                        animate: true
                                });
                                popup.open();
                  
                                // if(result.status === 1){
                                //     app.toast.create({
                                //       icon: '<i class="f7-icons">check</i>',
                                //       text: "",
                                //       position: "center",
                                //       closeTimeout: 1000,
                                //       on: {
                                //          close: function(toast){
                                //              //app.views.current.router.back();
                                //              $$(".back_flight_info").click();
                                //              setTimeout(function(){
                                //                  var ptrContent = getDisplayPage().find(".ptr-content");
                                //                  app.ptr.refresh(ptrContent);
                                //              },600);
                                //           }     
                                //       }
                                //     }).open();   
                                // }else{
                                //     app.dialog.alert(result.msg,"Error",function(){
                                    
                                //     });
                                // }
                            },function(result){
                                app.preloader.hide();
                                app.dialog.alert(result.msg,"Error",function(){
                                
                                });
                                
                            });                            
                        },600);
                    });  

            }            
        }
    },
    {
        path: '/edit_flight_info/:id',
        async: function(routeTo, routeFrom, resolve, reject) {
            if(FlightInfoViewPage.swipoutOpened){
                reject();
            }else{
                
                
                var q = new Query("FlightInfo");
                q.success = function(result){
                    resolve({
                        template: app.data.tpl.FlightInfo['edit']
                    }, {
                        context: {
                            data: result.data
                        }
                    }); 

              $$('.view_has_flight_booking').on('click', function (e) {
                  console.log('Popup','view_has_flight_booking');
                  var popup = app.popup.create({
                    el: '#FlightBookingHasPopup',
                    animate: true
                  });
                  popup.open();
              });
                
              if(result.data.origin_airport_id){
                  $$('#FlightInfoEditPage .FlightInfo_origin_airport_id').val("...");
                 // $$('#FlightInfoEditPage .FlightInfo_origin_airport_id').find('input').val(result.data.origin_airport_id);
                  //app.autocomplete.get('#FlightInfoEditPage .FlightInfo_origin_airport_id').value = [{id: result.data.origin_airport_id,name: "..."}];
                  
                  var bolongsToQuery = new Query("Airport");
                  bolongsToQuery.success = function(belongsToResult){
                      if(belongsToResult.status === 1){
                        $$('#FlightInfoEditPage .FlightInfo_origin_airport_id').val(belongsToResult.data.name);
                        //app.autocomplete.get('#FlightInfoEditPage .FlightInfo_origin_airport_id').value = [{id: result.data.origin_airport_id,name: belongsToResult.data.name}];
                      }
                  };
                  bolongsToQuery.and("eq_id",result.data.origin_airport_id);
                  bolongsToQuery.first();
              }
            
                
              if(result.data.destination_airport_id){
                  $$('#FlightInfoEditPage .FlightInfo_destination_airport_id').val("...");
                 // $$('#FlightInfoEditPage .FlightInfo_destination_airport_id').find('input').val(result.data.destination_airport_id);
                 // app.autocomplete.get('#FlightInfoEditPage .FlightInfo_destination_airport_id').value = [{id: result.data.destination_airport_id,name: "..."}];
                  
                  var bolongsToQuery = new Query("Airport");
                  bolongsToQuery.success = function(belongsToResult){
                      if(belongsToResult.status === 1){
                        $$('#FlightInfoEditPage .FlightInfo_destination_airport_id').val(belongsToResult.data.name);
                      }
                  };
                  bolongsToQuery.and("eq_id",result.data.destination_airport_id);
                  bolongsToQuery.first();
              }

                    $$("#FlightInfoEditPage .save").on("click",function(e){
                        var ar = new ActiveRecord("FlightInfo");
                        ar.read("#FlightInfoEditPage form");
                        app.preloader.show();
                        var flightbookingIdInput = $$("#FlightInfoEditPage .FlightBooking_id");
                        if(TO_FLIGHT_BOOKING_RESULT){
                            if(TO_FLIGHT_BOOKING_RESULT.status === 1){
                                //TO_FLIGHT_BOOKING_RESULT.data.id;
                                $$("#FlightInfoEditPage .FlightBooking_id").val(TO_FLIGHT_BOOKING_RESULT.data.id);
                            }
                        }

                        setTimeout(function(){
                            app.preloader.hide();
                            if(flightbookingIdInput.val() === ""){
                                ar.refresh();
                                var bkAr = new ActiveRecord("FlightBooking");
                                bkAr.data.flight_info_id = ar.data.id;
                            
                                bkAr.submit("create",function(result){
                                    
                                    if(result.status === 1){
                                        $$("#FlightInfoEditPage .FlightBooking_id").val(result.data.id);
                                        var popup = app.popup.create({
                                            el: '#FlightBookingSeatHasPopup',
                                            animate: true
                                        });
                                        popup.open();
                                        
                                        setTimeout(function(){
                                            
                                            $$(".new_flight_booking_seat").click();
                                        },2000);
                                        
                                        
                                       $$(".submit_seat").on('click',function(event){
                                            //alert("submit_seat");
                                            var flightbookingIdInput = $$("#FlightInfoEditPage .FlightBooking_id");
                                            var fbb = new Query("FlightBookingSeat");
                                             fbb.and("eq_flight_booking_id",flightbookingIdInput.val());
                                             var rs = fbb.find();
                                             if(rs.status === 1){
                                                 if(rs.data.length === 0){
                                                    app.notification.create({
                                                      title: 'Message',
                                                      text: 'No Passengers!',
                                                      closeTimeout: 3000
                                                    }).open();
                                                 }else{
                                                   var fbs = new Query("FlightBookingSeat");
                                                   var fb = new Query("FlightBooking");
                                                   fbs.and("eq_flight_booking_id",flightbookingIdInput.val());
                                                   fbs.and("eq_deleted",false);
                                                   fb.and("eq_id",flightbookingIdInput.val());
                                                   fb.and("eq_deleted",false);
                                                   var fbResult = fb.first();
                                                   var fbsResult = fbs.find();
                                                   
                                                   if(fbResult.status === 1 && fbsResult.status === 1){
                                                      var fi = new Query("FlightInfo");
                                                      fi.and("eq_id",fbResult.data.flight_info_id);
                                                      var fiResult = fi.first();
                                                      console.log(fiResult.data);
                                                      var price = fiResult.data.price.replace(/\D/g,'');
                                                      $$(".FlightBooking_card .FlightBooking_order_no").val(fbResult.data.order_no);
                                                      $$(".FlightBooking_card .FlightBooking_amount").val("HKD " + (price * fbsResult.data.length));
                                                      $$(".FlightBooking_card .FlightBooking_passengers").val(fbsResult.data.length + "");
                                                      $$(".FlightBooking_card").css("display","block");
                                                      $$(".FlightBooking_confirm").css("display","block");
                                                      $$(".FlightBooking_booking").removeClass("color-blue");
                                                      $$(".FlightBooking_booking").addClass("color-orange");
                                                      $$(".FlightBooking_booking").text("Change Passengers");
                                                      $$(".FlightBookingSet_close").click();
                                                      
                                                      
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
                                                                  
                                                                  var emailScheduleAr = new ActiveRecord("EmailSchedule");
                                                                  emailScheduleAr.data.process_host = "%";
                                                                  emailScheduleAr.data.to_list = $$(".FlightBooking_email").val();
                                                                  emailScheduleAr.data.subject = "You have new order " + fbResult.data.order_no;
                                                                  var msg = "Order No.: " + fbResult.data.order_no + "<br/>";
                                                                  msg += "Passengers: " + fbsResult.data.length + "<br/>";
                                                                  msg += "Amount: HKD " + (price * fbsResult.data.length) + "<br/>";
                                                                  msg += "Link: <a href='https://aademo.query.hk/?id=" + fbResult.data.id + "&email=" + $$(".FlightBooking_email").val() + "'>Check Your Order</a><br/>";
                                                                  emailScheduleAr.data.message = msg;
                                                                  emailScheduleAr.data.status = "New";
                                                                  emailScheduleAr.save();
                                                             },2000);
                                                         }
                                                     }); 

                                                      
                                                   }
                                                   
                                                 }
                                             }
                                        });
                                        
                                        var refreshQuery = new Query("FlightBooking");
                                        refreshQuery.and("eq_id",result.data.id);
                                        var refreshBk = refreshQuery.first();

                                        $$("#FlightBookingSeatHasPopup .FlightBookingSeat_flight_booking_id").val(result.data.id);
                                        
                                        setTimeout(function() {
                                            $$("#FlightBookingSeatHasPopup .order_no_title").html(refreshBk.data.order_no);
                                            app.ptr.refresh($$('#FlightBookingSeatHasView .ptr-content'));   
                                        }, 800);  
                                    }else{
                                        app.dialog.alert(result.msg,"Error",function(){
                                    
                                        });
                                    }
                                });
                            }else{
                                //alert(flightbookingIdInput.val());
                                var popup = app.popup.create({
                                            el: '#FlightBookingSeatHasPopup',
                                            animate: true
                                });
                                popup.open();
                                var refreshQuery = new Query("FlightBooking");
                                refreshQuery.and("eq_id",flightbookingIdInput.val());
                                var refreshBk = refreshQuery.first();
                                setTimeout(function() {
                                    $$("#FlightBookingSeatHasPopup .order_no_title").html(refreshBk.data.order_no);
                                    app.ptr.refresh($$('#FlightBookingSeatHasView .ptr-content'));   
                                }, 800);   
                                
                                /**on booking**/
                                var result = TO_FLIGHT_BOOKING_RESULT;
                                 $$(".submit_seat").on('click',function(event){
                                            //alert("submit_seat");
                                            var flightbookingIdInput = $$("#FlightInfoEditPage .FlightBooking_id");
                                            var fbb = new Query("FlightBookingSeat");
                                             fbb.and("eq_flight_booking_id",flightbookingIdInput.val());
                                             var rs = fbb.find();
                                             if(rs.status === 1){
                                                 if(rs.data.length === 0){
                                                    app.notification.create({
                                                      title: 'Message',
                                                      text: 'No Passengers!',
                                                      closeTimeout: 3000
                                                    }).open();
                                                 }else{
                                                   var fbs = new Query("FlightBookingSeat");
                                                   var fb = new Query("FlightBooking");
                                                   fbs.and("eq_flight_booking_id",flightbookingIdInput.val());
                                                   fbs.and("eq_deleted",false);
                                                   fb.and("eq_id",flightbookingIdInput.val());
                                                   fb.and("eq_deleted",false);
                                                   var fbResult = fb.first();
                                                   var fbsResult = fbs.find();
                                                   
                                                   if(fbResult.status === 1 && fbsResult.status === 1){
                                                      var fi = new Query("FlightInfo");
                                                      fi.and("eq_id",fbResult.data.flight_info_id);
                                                      var fiResult = fi.first();
                                                      console.log(fiResult.data);
                                                      var price = fiResult.data.price.replace(/\D/g,'');
                                                      $$(".FlightBooking_card .FlightBooking_order_no").val(fbResult.data.order_no);
                                                      $$(".FlightBooking_card .FlightBooking_amount").val(price * fbsResult.data.length);
                                                      $$(".FlightBooking_card .FlightBooking_passengers").val(fbsResult.data.length + "");
                                                      $$(".FlightBooking_card").css("display","block");
                                                      $$(".FlightBooking_confirm").css("display","block");
                                                      $$(".FlightBooking_booking").removeClass("color-blue");
                                                      $$(".FlightBooking_booking").addClass("color-orange");
                                                      $$(".FlightBooking_booking").text("Change Passengers");
                                                     
                                                      $$(".FlightBookingSet_close").click();
                                                      
                                                      
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
                                                                  
                                                                //   var emailScheduleAr = new ActiveRecord("EmailSchedule");
                                                                //   emailScheduleAr.data.process_host = "%";
                                                                //   emailScheduleAr.data.to_list = $$(".FlightBooking_email").val();
                                                                //   emailScheduleAr.data.subject = "You have new order " + fbResult.data.order_no;
                                                                //   var msg = "Order No.: " + fbResult.data.order_no + "<br/>";
                                                                //   msg += "Passengers: " + fbsResult.data.length + "<br/>";
                                                                //   msg += "Amount: HKD " + (price * fbsResult.data.length) + "<br/>";
                                                                //   msg += "Link: <a href='https://15002.krcloud01-a.killcoding.net/?id=" + fbResult.data.id + "&email=" + $$(".FlightBooking_email").val() + "'>Check Your Order</a><br/>";
                                                                //   emailScheduleAr.data.message = msg;
                                                                //   emailScheduleAr.data.status = "New";
                                                                //   emailScheduleAr.save();
                                                             },2000);
                                                         }
                                                     }); 

                                                      
                                                   }
                                                   
                                                 }
                                             }
                                        });
                                
                                /**end on booking**/
                               
                            }
                                
                                              
                        },600);
                        
                    });  
                                       
                }
                q.error = function(result){
                    reject();
                }
                q.and("eq_id",routeTo.params.id);
                q.and("eq_deleted",false);
                q.first();
            }
        }
    },
    {
        path: '/delete_flight_info/:id',
        async: function(routeTo, routeFrom, resolve, reject) {
            console.log('delete', routeTo.params);
            var deleteActions = app.actions.create({
                buttons: [
                    [{
                            text: "Click button \"Delete\" if you're sure?",
                            label: true,
                        },
                        {
                            text: 'Delete',
                           onClick: function(actions, e) {
                                var link = $$("a[href='" + routeTo.url + "']");
                                var swipeout = link.parents(".swipeout");
                                var ar = new ActiveRecord("FlightInfo",routeTo.params.id);
                                var result = ar.remove();
                                if(result.status === 1){
                                    eval("app.swipeout.delete(swipeout)");
                                }else{
                                    app.dialog.alert(result.msg,"Error");
                                }
                            }
                        }
                    ],
                    [{
                        text: 'Cancel',
                        bold: true,
                        onClick: function(actions, e) {
                            var link = $$("a[href='" + routeTo.url + "']");
                            var swipeout = link.parents(".swipeout");
                            app.swipeout.close(swipeout);
                        }
                    }]
                ],
            });
            deleteActions.open();
        }
    },
    {
        path: '/view_flight_info/',
        async: function(routeTo, routeFrom, resolve, reject) {
            console.log('view','FlightInfoView');
            app.tab.show('#FlightInfoView');
            $$(".tab-link-active").removeClass("tab-link-active");
        }
    }
                            
                    
];