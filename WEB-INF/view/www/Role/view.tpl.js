function RoleViewPage() {
    return {
        pageInit: function(page) {
            var me = this;
            me.pageLimit = 15;
            me.pageOffset = 0;
            me.allowInfinite = false;
            console.log('pageInit', page.attr("id"));
            var ptrContent = $$('#RoleView .ptr-content');
            var preloader = ptrContent.find(".infinite-scroll-preloader");
            preloader.hide();
            
            var searchbar = app.searchbar.create({
              el: '#RoleView .searchbar',
              searchContainer: '#RoleView .list',
                          customSearch: true,
              on: {
                search: function(sb, query, previousQuery) {
                  RoleViewPage.createSarchTimer(ptrContent,query);
                }
              }
            });
            
            ptrContent.on('ptr:refresh', function(e) {
                preloader.hide();
                me.allowInfinite = false;
                setTimeout(function() {
                    me.pageOffset = 0;
                    var notFound = $$("#RoleView .searchbar-not-found");
                    notFound.hide();
                    var q = new Query('Role');
                    q.success = function(result) {
                        if(result.status === 1){
                            me.pageOffset += result.data.length;
                            if(result.data.length === 0){
                                notFound.show();
                            }else if(result.data.length >= me.pageLimit){
                                me.allowInfinite = true;
                            }

                            var tpl = Template7.compile(app.data.tpl.Role['list']);
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
                RoleViewPage.eventSwipoutOpen();
                ptrContent.focus()
                ptrContent.on('infinite', function () {
                    if (!me.allowInfinite) return;
                    me.allowInfinite = false;
                    preloader.show();
                    setTimeout(function() {
                        var q = new Query('Role');
                        q.success = function(result) {
                            me.allowInfinite = true;
                            me.pageOffset += me.pageLimit;
                            if(result.data.length > 0){
                                var tpl = Template7.compile(app.data.tpl.Role['list']);
                                var html = tpl({
                                    list: result.data
                                });
                                ptrContent.find('.list ul').append(html);
                                RoleViewPage.eventSwipoutOpen();
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

RoleViewPage.swipoutOpened = false;

RoleViewPage.eventSwipoutOpen = function(){
        var swipout = $$("#RoleView .swipeout");
        swipout.on("swipeout:open",function(e){
          RoleViewPage.swipoutOpened = true;
        });
        swipout.on("swipeout:closed",function(e){
          RoleViewPage.swipoutOpened = false;
        }); 
        swipout.on("swipeout:deleted",function(e){
          RoleViewPage.swipoutOpened = false;
        });         
}

RoleViewPage.createSarchTimer = function(ptrContent,keywords){
    if(RoleViewPage.searchTimer){
        clearTimeout(RoleViewPage.searchTimer);
    }
    RoleViewPage.searchTimer = setTimeout(function(){
        app.ptr.refresh(ptrContent);
    },1000);
}

function RoleNewPage() {
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

function RoleEditPage() {
    return {
            pageInit: function(page) {
                console.log('pageInit',  page.attr("id"));
            },
            pageClose: function(page){
                console.log('pageClose',  page.attr("id"));
            }
        
    }
}

function UserHasViewPage() {
    return {
            pageInit: function(page) {
                console.log('pageInit',  page.attr("id"));
                var me = this;
                me.pageLimit = 15;
                me.pageOffset = 0;
                me.allowInfinite = false;
                console.log('pageInit', page.attr("id"));
                var ptrContent = $$('#UserHasView .ptr-content');
                var preloader = ptrContent.find(".infinite-scroll-preloader");
                preloader.hide();
                
                var searchbar = app.searchbar.create({
                  el: '#UserHasView .searchbar',
                  searchContainer: '#UserHasView .list',
                              customSearch: true,
                  on: {
                    search: function(sb, query, previousQuery) {
                      UserHasViewPage.createSarchTimer(ptrContent,query);
                    }
                  }
                });
                
                ptrContent.on('ptr:refresh', function(e) {
                    preloader.hide();
                    me.allowInfinite = false;
                    setTimeout(function() {
                        me.pageOffset = 0;
                        var notFound = $$("#UserHasView .searchbar-not-found");
                        notFound.hide();
                        var q = new Query('User');
                        q.success = function(result) {
                            if(result.status === 1){
                                me.pageOffset += result.data.length;
                                if(result.data.length === 0){
                                    notFound.show();
                                }else if(result.data.length >= me.pageLimit){
                                    me.allowInfinite = true;
                                }
    
                                var tpl = Template7.compile(app.data.tpl.User['list']);
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
                    UserHasViewPage.eventSwipoutOpen();
                    ptrContent.focus()
                    ptrContent.on('infinite', function () {
                        if (!me.allowInfinite) return;
                        me.allowInfinite = false;
                        preloader.show();
                        setTimeout(function() {
                            var q = new Query('User');
                            q.success = function(result) {
                                me.allowInfinite = true;
                                me.pageOffset += me.pageLimit;
                                if(result.data.length > 0){
                                    var tpl = Template7.compile(app.data.tpl.User['list']);
                                    var html = tpl({
                                        list: result.data
                                    });
                                    ptrContent.find('.list ul').append(html);
                                    UserHasViewPage.eventSwipoutOpen();
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

UserHasViewPage.swipoutOpened = false;

UserHasViewPage.eventSwipoutOpen = function(){
        var swipout = $$("#UserHasView .swipeout");
        swipout.on("swipeout:open",function(e){
          UserHasViewPage.swipoutOpened = true;
        });
        swipout.on("swipeout:closed",function(e){
          UserHasViewPage.swipoutOpened = false;
        }); 
        swipout.on("swipeout:deleted",function(e){
          UserHasViewPage.swipoutOpened = false;
        });         
}

UserHasViewPage.createSarchTimer = function(ptrContent,keywords){
    if(UserHasViewPage.searchTimer){
        clearTimeout(UserHasViewPage.searchTimer);
    }
    UserHasViewPage.searchTimer = setTimeout(function(){
        app.ptr.refresh(ptrContent);
    },1000);
}

function RolePermissionHasViewPage() {
    return {
            pageInit: function(page) {
                console.log('pageInit',  page.attr("id"));
                var me = this;
                me.pageLimit = 15;
                me.pageOffset = 0;
                me.allowInfinite = false;
                console.log('pageInit', page.attr("id"));
                var ptrContent = $$('#RolePermissionHasView .ptr-content');
                var preloader = ptrContent.find(".infinite-scroll-preloader");
                preloader.hide();
                
                var searchbar = app.searchbar.create({
                  el: '#RolePermissionHasView .searchbar',
                  searchContainer: '#RolePermissionHasView .list',
                              customSearch: true,
                  on: {
                    search: function(sb, query, previousQuery) {
                      RolePermissionHasViewPage.createSarchTimer(ptrContent,query);
                    }
                  }
                });
                
                ptrContent.on('ptr:refresh', function(e) {
                    preloader.hide();
                    me.allowInfinite = false;
                    setTimeout(function() {
                        me.pageOffset = 0;
                        var notFound = $$("#RolePermissionHasView .searchbar-not-found");
                        notFound.hide();
                        var q = new Query('RolePermission');
                        q.success = function(result) {
                            if(result.status === 1){
                                me.pageOffset += result.data.length;
                                if(result.data.length === 0){
                                    notFound.show();
                                }else if(result.data.length >= me.pageLimit){
                                    me.allowInfinite = true;
                                }
    
                                var tpl = Template7.compile(app.data.tpl.RolePermission['list']);
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
                    RolePermissionHasViewPage.eventSwipoutOpen();
                    ptrContent.focus()
                    ptrContent.on('infinite', function () {
                        if (!me.allowInfinite) return;
                        me.allowInfinite = false;
                        preloader.show();
                        setTimeout(function() {
                            var q = new Query('RolePermission');
                            q.success = function(result) {
                                me.allowInfinite = true;
                                me.pageOffset += me.pageLimit;
                                if(result.data.length > 0){
                                    var tpl = Template7.compile(app.data.tpl.RolePermission['list']);
                                    var html = tpl({
                                        list: result.data
                                    });
                                    ptrContent.find('.list ul').append(html);
                                    RolePermissionHasViewPage.eventSwipoutOpen();
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

RolePermissionHasViewPage.swipoutOpened = false;

RolePermissionHasViewPage.eventSwipoutOpen = function(){
        var swipout = $$("#RolePermissionHasView .swipeout");
        swipout.on("swipeout:open",function(e){
          RolePermissionHasViewPage.swipoutOpened = true;
        });
        swipout.on("swipeout:closed",function(e){
          RolePermissionHasViewPage.swipoutOpened = false;
        }); 
        swipout.on("swipeout:deleted",function(e){
          RolePermissionHasViewPage.swipoutOpened = false;
        });         
}

RolePermissionHasViewPage.createSarchTimer = function(ptrContent,keywords){
    if(RolePermissionHasViewPage.searchTimer){
        clearTimeout(RolePermissionHasViewPage.searchTimer);
    }
    RolePermissionHasViewPage.searchTimer = setTimeout(function(){
        app.ptr.refresh(ptrContent);
    },1000);
}


var RoleRoutes = [{
        path: '/new_role/',
        async: function(routeTo, routeFrom, resolve, reject) {
            console.log('new');
                        
                                    if(RoleViewPage.swipoutOpened){
                reject();
            }else{
                resolve({
                    template: app.data.tpl.Role['new']
                }, {
                    context: {
                        data: {}
                    }
                });  
                

                
                $$("#RoleNewPage .save").on("click",function(e){
                        var ar = new ActiveRecord("Role");
                        ar.read("#RoleNewPage form");
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
                                             $$(".back_role").click();
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
        path: '/edit_role/:id',
        async: function(routeTo, routeFrom, resolve, reject) {
            if(RoleViewPage.swipoutOpened){
                reject();
            }else{
                var q = new Query("Role");
                q.success = function(result){
                    resolve({
                        template: app.data.tpl.Role['edit']
                    }, {
                        context: {
                            data: result.data
                        }
                    }); 

              $$('.view_has_user').on('click', function (e) {
                  console.log('Popup','view_has_user');
                  var popup = app.popup.create({
                    el: '#UserHasPopup',
                    animate: true
                  });
                  popup.open();
              });
              $$('.view_has_role_permission').on('click', function (e) {
                  console.log('Popup','view_has_role_permission');
                  var popup = app.popup.create({
                    el: '#RolePermissionHasPopup',
                    animate: true
                  });
                  popup.open();
              });


                    $$("#RoleEditPage .save").on("click",function(e){
                        var ar = new ActiveRecord("Role");
                        ar.read("#RoleEditPage form");
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
                                             $$(".back_role").click();
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
                    $$("#RoleEditPage .remove").on("click",function(e){
                        var deleteActions = app.actions.create({
                            buttons: [
                                [{
                                        text: "Click button \"Delete\" if you're sure?",
                                        label: true,
                                    },
                                    {
                                        text: 'Delete',
                                       onClick: function(actions, e) {
                                            var ar = new ActiveRecord("Role",routeTo.params.id);
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
                                                             $$(".back_role").click();
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
        path: '/delete_role/:id',
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
                                var ar = new ActiveRecord("Role",routeTo.params.id);
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
        path: '/view_role/',
        async: function(routeTo, routeFrom, resolve, reject) {
            console.log('view','RoleView');
            app.tab.show('#RoleView');
            $$(".tab-link-active").removeClass("tab-link-active");
        }
    }
                            
                    
];