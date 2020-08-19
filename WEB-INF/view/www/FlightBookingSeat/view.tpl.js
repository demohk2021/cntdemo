function FlightBookingSeatViewPage() {
    return {
        pageInit: function(page) {
            
            var me = this;
            me.pageLimit = 15;
            me.pageOffset = 0;
            me.allowInfinite = false;
            console.log('pageInit', page.attr("id"));
            var ptrContent = $$('#FlightBookingSeatView .ptr-content');
            var preloader = ptrContent.find(".infinite-scroll-preloader");
            preloader.hide();
            
            var searchbar = app.searchbar.create({
              el: '#FlightBookingSeatView .searchbar',
              searchContainer: '#FlightBookingSeatView .list',
                          customSearch: true,
              on: {
                search: function(sb, query, previousQuery) {
                  FlightBookingSeatViewPage.createSarchTimer(ptrContent,query);
                }
              }
            });
            
            ptrContent.on('ptr:refresh', function(e) {
        
                preloader.hide();
                me.allowInfinite = false;
                setTimeout(function() {
                    me.pageOffset = 0;
                    var notFound = $$("#FlightBookingSeatView .searchbar-not-found");
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
                    //q.asc("");
                    q.and("any_passenger_name",searchbar.value);
                    q.and("eq_deleted",false);
                    q.find();
                }, 500);
            });
            ptrContent.on('ptr:done', function(e) {
                FlightBookingSeatViewPage.eventSwipoutOpen();
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
                                FlightBookingSeatViewPage.eventSwipoutOpen();
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
                        q.and("any_passenger_name",searchbar.value);
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

FlightBookingSeatViewPage.swipoutOpened = false;

FlightBookingSeatViewPage.eventSwipoutOpen = function(){
        var swipout = $$("#FlightBookingSeatView .swipeout");
        swipout.on("swipeout:open",function(e){
          FlightBookingSeatViewPage.swipoutOpened = true;
        });
        swipout.on("swipeout:closed",function(e){
          FlightBookingSeatViewPage.swipoutOpened = false;
        }); 
        swipout.on("swipeout:deleted",function(e){
          FlightBookingSeatViewPage.swipoutOpened = false;
        });         
}

FlightBookingSeatViewPage.createSarchTimer = function(ptrContent,keywords){
    if(FlightBookingSeatViewPage.searchTimer){
        clearTimeout(FlightBookingSeatViewPage.searchTimer);
    }
    FlightBookingSeatViewPage.searchTimer = setTimeout(function(){
        app.ptr.refresh(ptrContent);
    },1000);
}

function FlightBookingSeatNewPage() {
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

function FlightBookingSeatEditPage() {
    return {
            pageInit: function(page) {
                console.log('pageInit',  page.attr("id"));
            },
            pageClose: function(page){
                console.log('pageClose',  page.attr("id"));
            }
        
    }
}


var FlightBookingSeatRoutes = [{
        path: '/new_flight_booking_seat/',
        async: function(routeTo, routeFrom, resolve, reject) {
            console.log('new');
                        
                                    if(FlightBookingSeatViewPage.swipoutOpened){
                reject();
            }else{
                resolve({
                    template: app.data.tpl.FlightBookingSeat['new']
                }, {
                    context: {
                        data: {}
                    }
                });  
                
            

            
            
              var flightBookingId = $$("#FlightBookingSeatHasPopup .FlightBookingSeat_flight_booking_id").val();
              
              $$("#FlightBookingSeatNewPage .FlightBookingSeat_flight_booking_id").val(flightBookingId);
                
             console.log("flightBookingId: " + $$("#FlightBookingSeatNewPage .FlightBookingSeat_flight_booking_id").val());
                
                
            

            
            var lockedSeats = [];
            var q = new Query("FlightBooking");
            q.inner("flight_info","flight_info_id");
            q.inner("flight_booking_seat","flight_booking_id");
            q.and("eq_deleted",false);
            q.and("eq_deleted_from_flight_booking_seat",false);
            q.and("eq_deleted_from_flight_booking",false);
            q.and("eq_flight_info_id_from_flight_booking",$$(".FlightInfo_id").val());
            q.autoSelect = true;
            var lockedSeatsResult = q.find();
            if(lockedSeatsResult.status === 1){
                for(var index in lockedSeatsResult.data){
                    lockedSeats[index] = lockedSeatsResult.data[index].as_flight_booking_seat_seat_no;
                }
            }
            console.log("locked: ",lockedSeats);

              $$("#FlightBookingSeatNewPage .FlightBookingSeat_seat_no").on("click",function(e){
                  var popup = app.popup.create({
                      el: '#FlightBookingSeatImagePopup',
                      animate: true
                  });
                  popup.open(); 
                  var rows = new Array(22);
                  var columns = ['A','B','C','D','E','F'];
                  
                  var html = "<table class='seat_map_table'>"
                  
                  html += "<tr><td height='330px;'>&nbsp;</td></tr>";
                  for(var r = 3;r <= rows.length;r++){
                      html += "<tr>"
                      
                      html += "<td width='120px'>&nbsp;<td>"
                      
                      html += "<td>";
                      html += "<div class='seat_label_left'>" + r + "</div>";
                      html += "</td>";
                  
                      for(var c = 0;c < columns.length;c++){
                          
                          if(c == 3){
                              html += "<td>";
                              html += "<div  style='width:14px;'>&nbsp;</div>";
                              html += "</td>";
                          }
                          
                          html += "<td>";
                          var value = r + columns[c];
                          var css = "seat_no_div";
                          var isLocked = lockedSeats.indexOf(value) > -1;
                          //console.log(value,isLocked);
                          if(isLocked){
                              css = "seat_no_locked";
                          }
                          html += "<div class='" + css + "' ><a href='#' onclick='selectSeat(this)' seat='"+ value +"' >" + columns[c] + "</a></div>";
                          html += "</td>";
                      }
                      
                      html += "<td>";
                      html += "<div class='seat_label_right'>" + r + "</div>";
                      html += "</td>";
                      
                      html += "<td width='120px'>&nbsp;<td>"
                      
                      html += "</tr>"
                  }
                  
                  html += "<tr><td height='200px;'>&nbsp;</td></tr>";
                  
                  html += "</table>";
                  $$("#FlightBookingSeatImagePopup .SeatMap").html(html);
                  $$(".FlightBookingSeat_seat_no input").val();
                  
              });

                
                $$("#FlightBookingSeatNewPage .save").on("click",function(e){
                        var ar = new ActiveRecord("FlightBookingSeat");
                        ar.read("#FlightBookingSeatNewPage form");
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
                                             $$(".back_flight_booking_seat").click();
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
        path: '/edit_flight_booking_seat/:id',
        async: function(routeTo, routeFrom, resolve, reject) {
            if(FlightBookingSeatViewPage.swipoutOpened){
                reject();
            }else{
                var q = new Query("FlightBookingSeat");
                q.success = function(result){
                    resolve({
                        template: app.data.tpl.FlightBookingSeat['edit']
                    }, {
                        context: {
                            data: result.data
                        }
                    }); 


          var lockedSeats = [];
            var q = new Query("FlightBooking");
            q.inner("flight_info","flight_info_id");
            q.inner("flight_booking_seat","flight_booking_id");
            q.and("eq_deleted",false);
            q.and("eq_deleted_from_flight_booking_seat",false);
            q.and("eq_deleted_from_flight_booking",false);
            q.and("eq_flight_info_id_from_flight_booking",$$(".FlightInfo_id").val());
            q.autoSelect = true;
            var lockedSeatsResult = q.find();
            if(lockedSeatsResult.status === 1){
                for(var index in lockedSeatsResult.data){
                    lockedSeats[index] = lockedSeatsResult.data[index].as_flight_booking_seat_seat_no;
                }
            }
            //console.log("locked: ",lockedSeats);

              $$("#FlightBookingSeatEditPage .FlightBookingSeat_seat_no").on("click",function(e){
                  var popup = app.popup.create({
                      el: '#FlightBookingSeatImagePopup',
                      animate: true
                  });
                  popup.open(); 
                  var rows = new Array(22);
                  var columns = ['A','B','C','D','E','F'];
                  
                  var html = "<table class='seat_map_table'>"
                  html += "<tr><td height='330px;'>&nbsp;</td></tr>";  
                  for(var r = 3;r <= rows.length;r++){
                      html += "<tr>"
                      html += "<td width='120px'>&nbsp;<td>"
                      html += "<td>";
                      html += "<div class='seat_label_left'>" + r + "</div>";
                      html += "</td>";
                  
                      for(var c = 0;c < columns.length;c++){
                          
                          if(c == 3){
                              html += "<td>";
                              html += "<div  style='width:14px;'>&nbsp;</div>";
                              html += "</td>";
                          }
                          
                          html += "<td>";
                          var value = r + columns[c];
                          var css = "seat_no_div";
                          var isLocked = lockedSeats.indexOf(value) > -1;
                          if(isLocked && result.data.seat_no !== value){
                              css = "seat_no_locked";
                          }
                          console.log(result.data.seat_no,value);
                          if(result.data.seat_no === value){
                              css = "seat_no_selected";
                          }
                          html += "<div class='" + css + "' ><a href='#' onclick='selectSeat(this)' seat='"+ value +"' >" + columns[c] + "</a></div>";
                          html += "</td>";
                      }
                      
                      html += "<td>";
                      html += "<div class='seat_label_right'>" + r + "</div>";
                      html += "</td>";
                      
                      html += "<td width='120px'>&nbsp;<td>"
                      
                      html += "</tr>"
                  }
                  

                  html += "<tr><td height='200px;'>&nbsp;</td></tr>";
                  html += "</table>";
                  $$("#FlightBookingSeatImagePopup .SeatMap").html(html);
              });
              
           
              app.autocomplete.create({
                  openIn: 'popup',
                  openerEl: '#FlightBookingSeatEditPage .FlightBookingSeat_flight_booking_id',
                  closeOnSelect: true,
                  routableModals: false,
                  requestSourceOnOpen: true,
                  valueProperty: 'id',
                  textProperty: 'flight_no',
                  pageTitle: '$FlightBookingSeat.flight_booking_id',
                  source: function (query, render) {
                    var records = [];
                    
                    if(app.data.autocompleteTimer) clearTimeout(app.data.autocompleteTimer);
                    
                    app.data.autocompleteTimer = setTimeout(function(){
                        app.preloader.show();
                        var q = new Query("FlightBooking");
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
                      $$('#FlightBookingSeatEditPage .FlightBookingSeat_flight_booking_id').find('.item-after').text(value[0].flight_no);
                      $$('#FlightBookingSeatEditPage .FlightBookingSeat_flight_booking_id').find('input').val(value[0].id);
                    }
                  }
                });
                
              if(result.data.flight_booking_id){
                  $$('#FlightBookingSeatEditPage .FlightBookingSeat_flight_booking_id').find('.item-after').text("...");
                  $$('#FlightBookingSeatEditPage .FlightBookingSeat_flight_booking_id').find('input').val(result.data.flight_booking_id);
                  app.autocomplete.get('#FlightBookingSeatEditPage .FlightBookingSeat_flight_booking_id').value = [{id: result.data.flight_booking_id,flight_no: "..."}];
                  
                  var bolongsToQuery = new Query("FlightBooking");
                  bolongsToQuery.success = function(belongsToResult){
                      if(belongsToResult.status === 1){
                        $$('#FlightBookingSeatEditPage .FlightBookingSeat_flight_booking_id').find('.item-after').text(belongsToResult.data.flight_no);
                        app.autocomplete.get('#FlightBookingSeatEditPage .FlightBookingSeat_flight_booking_id').value = [{id: result.data.flight_booking_id,flight_no: belongsToResult.data.flight_no}];
                      }
                  };
                  bolongsToQuery.and("eq_id",result.data.flight_booking_id);
                  bolongsToQuery.first();
              }
              
              $$('#FlightBookingSeatEditPage .FlightBookingSeat_seat_no').find('.item-after').text(result.data.seat_no);
              $$('#FlightBookingSeatEditPage .FlightBookingSeat_seat_no').find('input').val(result.data.seat_no);
                 

                    $$("#FlightBookingSeatEditPage .save").on("click",function(e){
                        var ar = new ActiveRecord("FlightBookingSeat");
                        ar.read("#FlightBookingSeatEditPage form");
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
                                             $$(".back_flight_booking_seat").click();
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
                    $$("#FlightBookingSeatEditPage .remove").on("click",function(e){
                        var deleteActions = app.actions.create({
                            buttons: [
                                [{
                                        text: "Click button \"Delete\" if you're sure?",
                                        label: true,
                                    },
                                    {
                                        text: 'Delete',
                                       onClick: function(actions, e) {
                                            var ar = new ActiveRecord("FlightBookingSeat",routeTo.params.id);
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
                                                             $$(".back_flight_booking_seat").click();
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
        path: '/delete_flight_booking_seat/:id',
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
                                var ar = new ActiveRecord("FlightBookingSeat",routeTo.params.id);
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
        path: '/view_flight_booking_seat/',
        async: function(routeTo, routeFrom, resolve, reject) {
            console.log('view','FlightBookingSeatView');
            app.tab.show('#FlightBookingSeatView');
            $$(".tab-link-active").removeClass("tab-link-active");
        }
    }
                            
                    
];