function AirportViewPage() {
    return {
        pageInit: function(page) {
            var me = this;
            me.pageLimit = 15;
            me.pageOffset = 0;
            me.allowInfinite = false;
            console.log('pageInit', page.attr("id"));
            var ptrContent = $$('#AirportView .ptr-content');
            var preloader = ptrContent.find(".infinite-scroll-preloader");
            preloader.hide();
            
            var searchbar = app.searchbar.create({
              el: '#AirportView .searchbar',
              searchContainer: '#AirportView .list',
                          customSearch: true,
              on: {
                search: function(sb, query, previousQuery) {
                  AirportViewPage.createSarchTimer(ptrContent,query);
                }
              }
            });
            
            ptrContent.on('ptr:refresh', function(e) {
                preloader.hide();
                me.allowInfinite = false;
                setTimeout(function() {
                    me.pageOffset = 0;
                    var notFound = $$("#AirportView .searchbar-not-found");
                    notFound.hide();
                    var q = new Query('Airport');
                    q.success = function(result) {
                        if(result.status === 1){
                            me.pageOffset += result.data.length;
                            if(result.data.length === 0){
                                notFound.show();
                            }else if(result.data.length >= me.pageLimit){
                                me.allowInfinite = true;
                            }

                            var tpl = Template7.compile(app.data.tpl.Airport['list']);
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
                    q.and("any_name",searchbar.value);
                    q.and("eq_deleted",false);
                    q.find();
                }, 500);
            });
            ptrContent.on('ptr:done', function(e) {
                AirportViewPage.eventSwipoutOpen();
                ptrContent.focus()
                ptrContent.on('infinite', function () {
                    if (!me.allowInfinite) return;
                    me.allowInfinite = false;
                    preloader.show();
                    setTimeout(function() {
                        var q = new Query('Airport');
                        q.success = function(result) {
                            me.allowInfinite = true;
                            me.pageOffset += me.pageLimit;
                            if(result.data.length > 0){
                                var tpl = Template7.compile(app.data.tpl.Airport['list']);
                                var html = tpl({
                                    list: result.data
                                });
                                ptrContent.find('.list ul').append(html);
                                AirportViewPage.eventSwipoutOpen();
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
                        q.and("any_name",searchbar.value);
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

AirportViewPage.swipoutOpened = false;

AirportViewPage.eventSwipoutOpen = function(){
        var swipout = $$("#AirportView .swipeout");
        swipout.on("swipeout:open",function(e){
          AirportViewPage.swipoutOpened = true;
        });
        swipout.on("swipeout:closed",function(e){
          AirportViewPage.swipoutOpened = false;
        }); 
        swipout.on("swipeout:deleted",function(e){
          AirportViewPage.swipoutOpened = false;
        });         
}

AirportViewPage.createSarchTimer = function(ptrContent,keywords){
    if(AirportViewPage.searchTimer){
        clearTimeout(AirportViewPage.searchTimer);
    }
    AirportViewPage.searchTimer = setTimeout(function(){
        app.ptr.refresh(ptrContent);
    },1000);
}

function AirportNewPage() {
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

function AirportEditPage() {
    return {
            pageInit: function(page) {
                console.log('pageInit',  page.attr("id"));
            },
            pageClose: function(page){
                console.log('pageClose',  page.attr("id"));
            }
        
    }
}

function FlightInfoHasViewPage() {
    return {
            pageInit: function(page) {
                console.log('pageInit',  page.attr("id"));
                var me = this;
                me.pageLimit = 15;
                me.pageOffset = 0;
                me.allowInfinite = false;
                console.log('pageInit', page.attr("id"));
                var ptrContent = $$('#FlightInfoHasView .ptr-content');
                var preloader = ptrContent.find(".infinite-scroll-preloader");
                preloader.hide();
                
                var searchbar = app.searchbar.create({
                  el: '#FlightInfoHasView .searchbar',
                  searchContainer: '#FlightInfoHasView .list',
                              customSearch: true,
                  on: {
                    search: function(sb, query, previousQuery) {
                      FlightInfoHasViewPage.createSarchTimer(ptrContent,query);
                    }
                  }
                });
                
                ptrContent.on('ptr:refresh', function(e) {
                    preloader.hide();
                    me.allowInfinite = false;
                    setTimeout(function() {
                        me.pageOffset = 0;
                        var notFound = $$("#FlightInfoHasView .searchbar-not-found");
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
                        //q.asc("");
                        q.and("any_id",searchbar.value);
                        q.and("eq_deleted",false);
                        q.find();
                    }, 500);
                });
                ptrContent.on('ptr:done', function(e) {
                    FlightInfoHasViewPage.eventSwipoutOpen();
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
                                    FlightInfoHasViewPage.eventSwipoutOpen();
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

FlightInfoHasViewPage.swipoutOpened = false;

FlightInfoHasViewPage.eventSwipoutOpen = function(){
        var swipout = $$("#FlightInfoHasView .swipeout");
        swipout.on("swipeout:open",function(e){
          FlightInfoHasViewPage.swipoutOpened = true;
        });
        swipout.on("swipeout:closed",function(e){
          FlightInfoHasViewPage.swipoutOpened = false;
        }); 
        swipout.on("swipeout:deleted",function(e){
          FlightInfoHasViewPage.swipoutOpened = false;
        });         
}

FlightInfoHasViewPage.createSarchTimer = function(ptrContent,keywords){
    if(FlightInfoHasViewPage.searchTimer){
        clearTimeout(FlightInfoHasViewPage.searchTimer);
    }
    FlightInfoHasViewPage.searchTimer = setTimeout(function(){
        app.ptr.refresh(ptrContent);
    },1000);
}


var AirportRoutes = [{
        path: '/new_airport/',
        async: function(routeTo, routeFrom, resolve, reject) {
            console.log('new');
                        
                                    if(AirportViewPage.swipoutOpened){
                reject();
            }else{
                resolve({
                    template: app.data.tpl.Airport['new']
                }, {
                    context: {
                        data: {}
                    }
                });  
                

                
                $$("#AirportNewPage .save").on("click",function(e){
                        var ar = new ActiveRecord("Airport");
                        ar.read("#AirportNewPage form");
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
                                             $$(".back_airport").click();
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
        path: '/edit_airport/:id',
        async: function(routeTo, routeFrom, resolve, reject) {
            if(AirportViewPage.swipoutOpened){
                reject();
            }else{
                var q = new Query("Airport");
                q.success = function(result){
                    resolve({
                        template: app.data.tpl.Airport['edit']
                    }, {
                        context: {
                            data: result.data
                        }
                    }); 

              $$('.view_has_flight_info').on('click', function (e) {
                  console.log('Popup','view_has_flight_info');
                  var popup = app.popup.create({
                    el: '#FlightInfoHasPopup',
                    animate: true
                  });
                  popup.open();
              });


                    $$("#AirportEditPage .save").on("click",function(e){
                        var ar = new ActiveRecord("Airport");
                        ar.read("#AirportEditPage form");
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
                                             $$(".back_airport").click();
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
                    $$("#AirportEditPage .remove").on("click",function(e){
                        var deleteActions = app.actions.create({
                            buttons: [
                                [{
                                        text: "Click button \"Delete\" if you're sure?",
                                        label: true,
                                    },
                                    {
                                        text: 'Delete',
                                       onClick: function(actions, e) {
                                            var ar = new ActiveRecord("Airport",routeTo.params.id);
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
                                                             $$(".back_airport").click();
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
        path: '/delete_airport/:id',
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
                                var ar = new ActiveRecord("Airport",routeTo.params.id);
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
        path: '/view_airport/',
        async: function(routeTo, routeFrom, resolve, reject) {
            console.log('view','AirportView');
            app.tab.show('#AirportView');
            $$(".tab-link-active").removeClass("tab-link-active");
        }
    }
                            
                    
];