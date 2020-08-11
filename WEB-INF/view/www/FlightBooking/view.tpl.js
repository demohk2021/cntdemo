function FlightBookingViewPage() {
    return {
        pageInit: function(page) {
            var me = this;
            me.pageLimit = 15;
            me.pageOffset = 0;
            me.allowInfinite = false;
            console.log('pageInit', page.attr("id"));
            var ptrContent = $$('#FlightBookingView .ptr-content');
            var preloader = ptrContent.find(".infinite-scroll-preloader");
            preloader.hide();
            
            var searchbar = app.searchbar.create({
              el: '#FlightBookingView .searchbar',
              searchContainer: '#FlightBookingView .list',
                          customSearch: true,
              on: {
                search: function(sb, query, previousQuery) {
                  FlightBookingViewPage.createSarchTimer(ptrContent,query);
                }
              }
            });
            
            ptrContent.on('ptr:refresh', function(e) {
                preloader.hide();
                me.allowInfinite = false;
                setTimeout(function() {
                    me.pageOffset = 0;
                    var notFound = $$("#FlightBookingView .searchbar-not-found");
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
                    q.and("any_flight_no",searchbar.value);
                    q.and("eq_deleted",false);
                    q.find();
                }, 500);
            });
            ptrContent.on('ptr:done', function(e) {
                FlightBookingViewPage.eventSwipoutOpen();
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
                                FlightBookingViewPage.eventSwipoutOpen();
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
                app.ptr.refresh(ptrContent);
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

FlightBookingViewPage.swipoutOpened = false;

FlightBookingViewPage.eventSwipoutOpen = function(){
        var swipout = $$("#FlightBookingView .swipeout");
        swipout.on("swipeout:open",function(e){
          FlightBookingViewPage.swipoutOpened = true;
        });
        swipout.on("swipeout:closed",function(e){
          FlightBookingViewPage.swipoutOpened = false;
        }); 
        swipout.on("swipeout:deleted",function(e){
          FlightBookingViewPage.swipoutOpened = false;
        });         
}

FlightBookingViewPage.createSarchTimer = function(ptrContent,keywords){
    if(FlightBookingViewPage.searchTimer){
        clearTimeout(FlightBookingViewPage.searchTimer);
    }
    FlightBookingViewPage.searchTimer = setTimeout(function(){
        app.ptr.refresh(ptrContent);
    },1000);
}

function FlightBookingNewPage() {
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

function FlightBookingEditPage() {
    return {
            pageInit: function(page) {
                console.log('pageInit',  page.attr("id"));
            },
            pageClose: function(page){
                console.log('pageClose',  page.attr("id"));
            }
        
    }
}

function FlightBookingSeatHasViewPage() {
    return {
            pageInit: function(page) {
                console.log('pageInit',  page.attr("id"));
                var me = this;
                me.pageLimit = 15;
                me.pageOffset = 0;
                me.allowInfinite = false;
                console.log('pageInit', page.attr("id"));
                var ptrContent = $$('#FlightBookingSeatHasView .ptr-content');
                var preloader = ptrContent.find(".infinite-scroll-preloader");
                preloader.hide();
                
                var searchbar = app.searchbar.create({
                  el: '#FlightBookingSeatHasView .searchbar',
                  searchContainer: '#FlightBookingSeatHasView .list',
                              customSearch: true,
                  on: {
                    search: function(sb, query, previousQuery) {
                      FlightBookingSeatHasViewPage.createSarchTimer(ptrContent,query);
                    }
                  }
                });
                
                ptrContent.on('ptr:refresh', function(e) {
                    preloader.hide();
                    me.allowInfinite = false;
                    setTimeout(function() {
                        me.pageOffset = 0;
                        var notFound = $$("#FlightBookingSeatHasView .searchbar-not-found");
                        notFound.hide();
                        var q = new Query('FlightBookingSeat');
                        q.success = function(result) {
                            if(result.status === 1){
                                me.pageOffset += result.data.length;
                                if(result.data.length === 0){
                                    notFound.show();
                                }else if(result.data.length >= me.pageLimit){
                                    me.allowInfinite = true;
                                }
    
                                var tpl = Template7.compile(app.data.tpl.FlightBookingSeat['list']);
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
                        q.asc("passenger_name");
                        var flightBookingId = $$("#FlightBookingSeatHasView .FlightBookingSeat_flight_booking_id").val();
                        q.and("eq_flight_booking_id",flightBookingId);
                        q.and("eq_deleted",false);
                        q.find();
                    }, 500);
                });
                ptrContent.on('ptr:done', function(e) {
                    FlightBookingSeatHasViewPage.eventSwipoutOpen();
                    ptrContent.focus()
                    ptrContent.on('infinite', function () {
                        if (!me.allowInfinite) return;
                        me.allowInfinite = false;
                        preloader.show();
                        setTimeout(function() {
                            var q = new Query('FlightBookingSeat');
                            q.success = function(result) {
                                me.allowInfinite = true;
                                me.pageOffset += me.pageLimit;
                                if(result.data.length > 0){
                                    var tpl = Template7.compile(app.data.tpl.FlightBookingSeat['list']);
                                    var html = tpl({
                                        list: result.data
                                    });
                                    ptrContent.find('.list ul').append(html);
                                    FlightBookingSeatHasViewPage.eventSwipoutOpen();
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
    
                // setTimeout(function() {
                //     app.ptr.refresh(ptrContent);
                // }, 500);                
            },
            pageClose: function(page){
                console.log('pageClose',  page.attr("id"));
            }
        
    }
}

FlightBookingSeatHasViewPage.swipoutOpened = false;

FlightBookingSeatHasViewPage.eventSwipoutOpen = function(){
        var swipout = $$("#FlightBookingSeatHasView .swipeout");
        swipout.on("swipeout:open",function(e){
          FlightBookingSeatHasViewPage.swipoutOpened = true;
        });
        swipout.on("swipeout:closed",function(e){
          FlightBookingSeatHasViewPage.swipoutOpened = false;
        }); 
        swipout.on("swipeout:deleted",function(e){
          FlightBookingSeatHasViewPage.swipoutOpened = false;
        });         
}

FlightBookingSeatHasViewPage.createSarchTimer = function(ptrContent,keywords){
    if(FlightBookingSeatHasViewPage.searchTimer){
        clearTimeout(FlightBookingSeatHasViewPage.searchTimer);
    }
    FlightBookingSeatHasViewPage.searchTimer = setTimeout(function(){
        app.ptr.refresh(ptrContent);
    },1000);
}


var FlightBookingRoutes = [{
        path: '/new_flight_booking/',
        async: function(routeTo, routeFrom, resolve, reject) {
            console.log('new');
                        
                                    if(FlightBookingViewPage.swipoutOpened){
                reject();
            }else{
                resolve({
                    template: app.data.tpl.FlightBooking['new']
                }, {
                    context: {
                        data: {}
                    }
                });  
                
              app.autocomplete.create({
                  openIn: 'popup',
                  openerEl: '#FlightBookingNewPage .FlightBooking_flight_info_id',
                  closeOnSelect: true,
                  routableModals: false,
                  requestSourceOnOpen: true,
                  valueProperty: 'id',
                  textProperty: 'flight_no',
                  pageTitle: '$FlightBooking.flight_info_id',
                  source: function (query, render) {
                    var records = [];
                    
                    if(app.data.autocompleteTimer) clearTimeout(app.data.autocompleteTimer);
                    
                    app.data.autocompleteTimer = setTimeout(function(){
                        app.preloader.show();
                        var q = new Query("FlightInfo");
                        q.success = function(result){
                            if(result.status === 1){
                               render(result.data);
                               app.preloader.hide();
                            }
                        }
                        
                        if(query !== "*") q.and("any_flight_no",query);
                        
                        q.and("eq_deleted",false);
                        q.find();
                    },1000);

                  },
                  on: {
                    change: function (value) {
                      $$('#FlightBookingNewPage .FlightBooking_flight_info_id').find('.item-after').text(value[0].flight_no);
                      $$('#FlightBookingNewPage .FlightBooking_flight_info_id').find('input').val(value[0].id);
                    }
                  }
                });
              app.autocomplete.create({
                  openIn: 'popup',
                  openerEl: '#FlightBookingNewPage .FlightBooking_origin_airport_id',
                  closeOnSelect: true,
                  routableModals: false,
                  requestSourceOnOpen: true,
                  valueProperty: 'id',
                  textProperty: 'name',
                  pageTitle: '$FlightBooking.origin_airport_id',
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
                      $$('#FlightBookingNewPage .FlightBooking_origin_airport_id').find('.item-after').text(value[0].name);
                      $$('#FlightBookingNewPage .FlightBooking_origin_airport_id').find('input').val(value[0].id);
                    }
                  }
                });
              app.autocomplete.create({
                  openIn: 'popup',
                  openerEl: '#FlightBookingNewPage .FlightBooking_destination_airport_id',
                  closeOnSelect: true,
                  routableModals: false,
                  requestSourceOnOpen: true,
                  valueProperty: 'id',
                  textProperty: 'name',
                  pageTitle: '$FlightBooking.destination_airport_id',
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
                      $$('#FlightBookingNewPage .FlightBooking_destination_airport_id').find('.item-after').text(value[0].name);
                      $$('#FlightBookingNewPage .FlightBooking_destination_airport_id').find('input').val(value[0].id);
                    }
                  }
                });
              app.autocomplete.create({
                  openIn: 'popup',
                  openerEl: '#FlightBookingNewPage .FlightBooking_member_id',
                  closeOnSelect: true,
                  routableModals: false,
                  requestSourceOnOpen: true,
                  valueProperty: 'id',
                  textProperty: 'name',
                  pageTitle: '$FlightBooking.member_id',
                  source: function (query, render) {
                    var records = [];
                    
                    if(app.data.autocompleteTimer) clearTimeout(app.data.autocompleteTimer);
                    
                    app.data.autocompleteTimer = setTimeout(function(){
                        app.preloader.show();
                        var q = new Query("Member");
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
                      $$('#FlightBookingNewPage .FlightBooking_member_id').find('.item-after').text(value[0].name);
                      $$('#FlightBookingNewPage .FlightBooking_member_id').find('input').val(value[0].id);
                    }
                  }
                });

                
                $$("#FlightBookingNewPage .save").on("click",function(e){
                        var ar = new ActiveRecord("FlightBooking");
                        ar.read("#FlightBookingNewPage form");
                        app.preloader.show();
                        
                        setTimeout(function(){
                            ar.submit("create",function(result){
                                app.preloader.hide();
                                if(result.status === 1){
                                    app.toast.create({
                                      icon: '<i class="f7-icons">check</i>',
                                      text: "",
                                      position: "center",
                                      closeTimeout: 1000,
                                      on: {
                                         close: function(toast){
                                             //app.views.current.router.back();
                                             $$(".back_flight_booking").click();
                                             setTimeout(function(){
                                                 var ptrContent = getDisplayPage().find(".ptr-content");
                                                 app.ptr.refresh(ptrContent);
                                             },600);
                                          }     
                                      }
                                    }).open();   
                                }else{
                                    app.dialog.alert(result.msg,"Error",function(){
                                    
                                    });
                                }
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
        path: '/edit_flight_booking/:id',
        async: function(routeTo, routeFrom, resolve, reject) {
            if(FlightBookingViewPage.swipoutOpened){
                reject();
            }else{
                var q = new Query("FlightBooking");
                q.success = function(result){
                    resolve({
                        template: app.data.tpl.FlightBooking['edit']
                    }, {
                        context: {
                            data: result.data
                        }
                    }); 

              $$('.view_has_flight_booking_seat').on('click', function (e) {
                  console.log('Popup','view_has_flight_booking_seat');
                  var popup = app.popup.create({
                    el: '#FlightBookingSeatHasPopup',
                    animate: true
                  });
                  popup.open();
              });

              app.autocomplete.create({
                  openIn: 'popup',
                  openerEl: '#FlightBookingEditPage .FlightBooking_flight_info_id',
                  closeOnSelect: true,
                  routableModals: false,
                  requestSourceOnOpen: true,
                  valueProperty: 'id',
                  textProperty: 'flight_no',
                  pageTitle: '$FlightBooking.flight_info_id',
                  source: function (query, render) {
                    var records = [];
                    
                    if(app.data.autocompleteTimer) clearTimeout(app.data.autocompleteTimer);
                    
                    app.data.autocompleteTimer = setTimeout(function(){
                        app.preloader.show();
                        var q = new Query("FlightInfo");
                        q.success = function(belongsToResult){
                            if(belongsToResult.status === 1){
                               render(belongsToResult.data);
                               app.preloader.hide();
                            }
                        }
                        
                        if(query !== "*") q.and("any_flight_no",query);
                        
                        q.and("eq_deleted",false);
                        q.find();
                    },1000);

                  },
                  on: {
                    change: function (value) {
                      $$('#FlightBookingEditPage .FlightBooking_flight_info_id').find('.item-after').text(value[0].flight_no);
                      $$('#FlightBookingEditPage .FlightBooking_flight_info_id').find('input').val(value[0].id);
                    }
                  }
                });
                
              if(result.data.flight_info_id){
                  $$('#FlightBookingEditPage .FlightBooking_flight_info_id').find('.item-after').text("...");
                  $$('#FlightBookingEditPage .FlightBooking_flight_info_id').find('input').val(result.data.flight_info_id);
                  app.autocomplete.get('#FlightBookingEditPage .FlightBooking_flight_info_id').value = [{id: result.data.flight_info_id,flight_no: "..."}];
                  
                  var bolongsToQuery = new Query("FlightInfo");
                  bolongsToQuery.success = function(belongsToResult){
                      if(belongsToResult.status === 1){
                        $$('#FlightBookingEditPage .FlightBooking_flight_info_id').find('.item-after').text(belongsToResult.data.flight_no);
                        app.autocomplete.get('#FlightBookingEditPage .FlightBooking_flight_info_id').value = [{id: result.data.flight_info_id,flight_no: belongsToResult.data.flight_no}];
                      }
                  };
                  bolongsToQuery.and("eq_id",result.data.flight_info_id);
                  bolongsToQuery.first();
              }
              app.autocomplete.create({
                  openIn: 'popup',
                  openerEl: '#FlightBookingEditPage .FlightBooking_origin_airport_id',
                  closeOnSelect: true,
                  routableModals: false,
                  requestSourceOnOpen: true,
                  valueProperty: 'id',
                  textProperty: 'name',
                  pageTitle: '$FlightBooking.origin_airport_id',
                  source: function (query, render) {
                    var records = [];
                    
                    if(app.data.autocompleteTimer) clearTimeout(app.data.autocompleteTimer);
                    
                    app.data.autocompleteTimer = setTimeout(function(){
                        app.preloader.show();
                        var q = new Query("Airport");
                        q.success = function(belongsToResult){
                            if(belongsToResult.status === 1){
                               render(belongsToResult.data);
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
                      $$('#FlightBookingEditPage .FlightBooking_origin_airport_id').find('.item-after').text(value[0].name);
                      $$('#FlightBookingEditPage .FlightBooking_origin_airport_id').find('input').val(value[0].id);
                    }
                  }
                });
                
              if(result.data.origin_airport_id){
                  $$('#FlightBookingEditPage .FlightBooking_origin_airport_id').find('.item-after').text("...");
                  $$('#FlightBookingEditPage .FlightBooking_origin_airport_id').find('input').val(result.data.origin_airport_id);
                  app.autocomplete.get('#FlightBookingEditPage .FlightBooking_origin_airport_id').value = [{id: result.data.origin_airport_id,name: "..."}];
                  
                  var bolongsToQuery = new Query("Airport");
                  bolongsToQuery.success = function(belongsToResult){
                      if(belongsToResult.status === 1){
                        $$('#FlightBookingEditPage .FlightBooking_origin_airport_id').find('.item-after').text(belongsToResult.data.name);
                        app.autocomplete.get('#FlightBookingEditPage .FlightBooking_origin_airport_id').value = [{id: result.data.origin_airport_id,name: belongsToResult.data.name}];
                      }
                  };
                  bolongsToQuery.and("eq_id",result.data.origin_airport_id);
                  bolongsToQuery.first();
              }
              app.autocomplete.create({
                  openIn: 'popup',
                  openerEl: '#FlightBookingEditPage .FlightBooking_destination_airport_id',
                  closeOnSelect: true,
                  routableModals: false,
                  requestSourceOnOpen: true,
                  valueProperty: 'id',
                  textProperty: 'name',
                  pageTitle: '$FlightBooking.destination_airport_id',
                  source: function (query, render) {
                    var records = [];
                    
                    if(app.data.autocompleteTimer) clearTimeout(app.data.autocompleteTimer);
                    
                    app.data.autocompleteTimer = setTimeout(function(){
                        app.preloader.show();
                        var q = new Query("Airport");
                        q.success = function(belongsToResult){
                            if(belongsToResult.status === 1){
                               render(belongsToResult.data);
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
                      $$('#FlightBookingEditPage .FlightBooking_destination_airport_id').find('.item-after').text(value[0].name);
                      $$('#FlightBookingEditPage .FlightBooking_destination_airport_id').find('input').val(value[0].id);
                    }
                  }
                });
                
              if(result.data.destination_airport_id){
                  $$('#FlightBookingEditPage .FlightBooking_destination_airport_id').find('.item-after').text("...");
                  $$('#FlightBookingEditPage .FlightBooking_destination_airport_id').find('input').val(result.data.destination_airport_id);
                  app.autocomplete.get('#FlightBookingEditPage .FlightBooking_destination_airport_id').value = [{id: result.data.destination_airport_id,name: "..."}];
                  
                  var bolongsToQuery = new Query("Airport");
                  bolongsToQuery.success = function(belongsToResult){
                      if(belongsToResult.status === 1){
                        $$('#FlightBookingEditPage .FlightBooking_destination_airport_id').find('.item-after').text(belongsToResult.data.name);
                        app.autocomplete.get('#FlightBookingEditPage .FlightBooking_destination_airport_id').value = [{id: result.data.destination_airport_id,name: belongsToResult.data.name}];
                      }
                  };
                  bolongsToQuery.and("eq_id",result.data.destination_airport_id);
                  bolongsToQuery.first();
              }
              app.autocomplete.create({
                  openIn: 'popup',
                  openerEl: '#FlightBookingEditPage .FlightBooking_member_id',
                  closeOnSelect: true,
                  routableModals: false,
                  requestSourceOnOpen: true,
                  valueProperty: 'id',
                  textProperty: 'name',
                  pageTitle: '$FlightBooking.member_id',
                  source: function (query, render) {
                    var records = [];
                    
                    if(app.data.autocompleteTimer) clearTimeout(app.data.autocompleteTimer);
                    
                    app.data.autocompleteTimer = setTimeout(function(){
                        app.preloader.show();
                        var q = new Query("Member");
                        q.success = function(belongsToResult){
                            if(belongsToResult.status === 1){
                               render(belongsToResult.data);
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
                      $$('#FlightBookingEditPage .FlightBooking_member_id').find('.item-after').text(value[0].name);
                      $$('#FlightBookingEditPage .FlightBooking_member_id').find('input').val(value[0].id);
                    }
                  }
                });
                
              if(result.data.member_id){
                  $$('#FlightBookingEditPage .FlightBooking_member_id').find('.item-after').text("...");
                  $$('#FlightBookingEditPage .FlightBooking_member_id').find('input').val(result.data.member_id);
                  app.autocomplete.get('#FlightBookingEditPage .FlightBooking_member_id').value = [{id: result.data.member_id,name: "..."}];
                  
                  var bolongsToQuery = new Query("Member");
                  bolongsToQuery.success = function(belongsToResult){
                      if(belongsToResult.status === 1){
                        $$('#FlightBookingEditPage .FlightBooking_member_id').find('.item-after').text(belongsToResult.data.name);
                        app.autocomplete.get('#FlightBookingEditPage .FlightBooking_member_id').value = [{id: result.data.member_id,name: belongsToResult.data.name}];
                      }
                  };
                  bolongsToQuery.and("eq_id",result.data.member_id);
                  bolongsToQuery.first();
              }

                    $$("#FlightBookingEditPage .save").on("click",function(e){
                        var ar = new ActiveRecord("FlightBooking");
                        ar.read("#FlightBookingEditPage form");
                        app.preloader.show();
                        
                        setTimeout(function(){
                            ar.submit("update",function(result){
                                app.preloader.hide();
                                if(result.status === 1){
                                    app.toast.create({
                                      icon: '<i class="f7-icons">check</i>',
                                      text: "",
                                      position: "center",
                                      closeTimeout: 1000,
                                      on: {
                                         close: function(toast){
                                             //app.views.current.router.back();
                                             $$(".back_flight_booking").click();
                                             setTimeout(function(){
                                                 var ptrContent = getDisplayPage().find(".ptr-content");
                                                 app.ptr.refresh(ptrContent);
                                             },600);
                                          }     
                                      }
                                    }).open();   
                                }else{
                                    app.dialog.alert(result.msg,"Error",function(){
                                    
                                    });
                                }
                            },function(result){
                                app.preloader.hide();
                                app.dialog.alert(result.msg,"Error",function(){
                                
                                });
                                
                            });                            
                        },600);
                        
                    });  
                    $$("#FlightBookingEditPage .remove").on("click",function(e){
                        var deleteActions = app.actions.create({
                            buttons: [
                                [{
                                        text: "Click button \"Delete\" if you're sure?",
                                        label: true,
                                    },
                                    {
                                        text: 'Delete',
                                       onClick: function(actions, e) {
                                            var ar = new ActiveRecord("FlightBooking",routeTo.params.id);
                                            app.preloader.show();
                                            setTimeout(function(){
                                                var result = ar.remove();
                                                if(result.status === 1){
                                                    app.preloader.hide();
                                                    app.toast.create({
                                                      icon: '<i class="f7-icons">check</i>',
                                                      text: "",
                                                      position: "center",
                                                      closeTimeout: 1000,
                                                      on: {
                                                         close: function(toast){
                                                             //app.views.current.router.back();
                                                             $$(".back_flight_booking").click();
                                                             setTimeout(function(){
                                                                 var ptrContent = getDisplayPage().find(".ptr-content");
                                                                 app.ptr.refresh(ptrContent);
                                                             },600);
                                                          }     
                                                      }
                                                    }).open();   
                                                }else{
                                                    app.preloader.hide();
                                                    app.dialog.alert(result.msg,"Error");
                                                }
                                            },600);

                                        }
                                    }
                                ],
                                [{
                                    text: 'Cancel',
                                    bold: true,
                                    onClick: function(actions, e) {
                                    
                                    }
                                }]
                            ],
                        });
                        deleteActions.open();
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
        path: '/delete_flight_booking/:id',
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
                                var ar = new ActiveRecord("FlightBooking",routeTo.params.id);
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
        path: '/view_flight_booking/',
        async: function(routeTo, routeFrom, resolve, reject) {
            console.log('view','FlightBookingView');
            app.tab.show('#FlightBookingView');
            $$(".tab-link-active").removeClass("tab-link-active");
        }
    }
                            
                    
];