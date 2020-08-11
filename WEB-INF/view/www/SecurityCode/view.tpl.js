function SecurityCodeViewPage() {
    return {
        pageInit: function(page) {
            var me = this;
            me.pageLimit = 15;
            me.pageOffset = 0;
            me.allowInfinite = false;
            console.log('pageInit', page.attr("id"));
            var ptrContent = $$('#SecurityCodeView .ptr-content');
            var preloader = ptrContent.find(".infinite-scroll-preloader");
            preloader.hide();
            
            var searchbar = app.searchbar.create({
              el: '#SecurityCodeView .searchbar',
              searchContainer: '#SecurityCodeView .list',
                          customSearch: true,
              on: {
                search: function(sb, query, previousQuery) {
                  SecurityCodeViewPage.createSarchTimer(ptrContent,query);
                }
              }
            });
            
            ptrContent.on('ptr:refresh', function(e) {
                preloader.hide();
                me.allowInfinite = false;
                setTimeout(function() {
                    me.pageOffset = 0;
                    var notFound = $$("#SecurityCodeView .searchbar-not-found");
                    notFound.hide();
                    var q = new Query('SecurityCode');
                    q.success = function(result) {
                        if(result.status === 1){
                            me.pageOffset += result.data.length;
                            if(result.data.length === 0){
                                notFound.show();
                            }else if(result.data.length >= me.pageLimit){
                                me.allowInfinite = true;
                            }

                            var tpl = Template7.compile(app.data.tpl.SecurityCode['list']);
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
                SecurityCodeViewPage.eventSwipoutOpen();
                ptrContent.focus()
                ptrContent.on('infinite', function () {
                    if (!me.allowInfinite) return;
                    me.allowInfinite = false;
                    preloader.show();
                    setTimeout(function() {
                        var q = new Query('SecurityCode');
                        q.success = function(result) {
                            me.allowInfinite = true;
                            me.pageOffset += me.pageLimit;
                            if(result.data.length > 0){
                                var tpl = Template7.compile(app.data.tpl.SecurityCode['list']);
                                var html = tpl({
                                    list: result.data
                                });
                                ptrContent.find('.list ul').append(html);
                                SecurityCodeViewPage.eventSwipoutOpen();
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
            pageOpen: function(page){
                console.log('pageOpen',  page.attr("id"));
            },
            pageClose: function(page){
                console.log('pageClose',  page.attr("id"));
            }
        
    }
}

SecurityCodeViewPage.swipoutOpened = false;

SecurityCodeViewPage.eventSwipoutOpen = function(){
        var swipout = $$("#SecurityCodeView .swipeout");
        swipout.on("swipeout:open",function(e){
          SecurityCodeViewPage.swipoutOpened = true;
        });
        swipout.on("swipeout:closed",function(e){
          SecurityCodeViewPage.swipoutOpened = false;
        }); 
        swipout.on("swipeout:deleted",function(e){
          SecurityCodeViewPage.swipoutOpened = false;
        });         
}

SecurityCodeViewPage.createSarchTimer = function(ptrContent,keywords){
    if(SecurityCodeViewPage.searchTimer){
        clearTimeout(SecurityCodeViewPage.searchTimer);
    }
    SecurityCodeViewPage.searchTimer = setTimeout(function(){
        app.ptr.refresh(ptrContent);
    },1000);
}

function SecurityCodeNewPage() {
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

function SecurityCodeEditPage() {
    return {
            pageInit: function(page) {
                console.log('pageInit',  page.attr("id"));
            },
            pageClose: function(page){
                console.log('pageClose',  page.attr("id"));
            }
        
    }
}


var SecurityCodeRoutes = [{
        path: '/new_security_code/',
        async: function(routeTo, routeFrom, resolve, reject) {
            console.log('new');
                        
                                    if(SecurityCodeViewPage.swipoutOpened){
                reject();
            }else{
                resolve({
                    template: app.data.tpl.SecurityCode['new']
                }, {
                    context: {
                        data: {}
                    }
                });  
                
              app.autocomplete.create({
                  openIn: 'popup',
                  openerEl: '#SecurityCodeNewPage .SecurityCode_user_id',
                  closeOnSelect: true,
                  routableModals: false,
                  requestSourceOnOpen: true,
                  valueProperty: 'id',
                  textProperty: 'email',
                  pageTitle: '$SecurityCode.user_id',
                  source: function (query, render) {
                    var records = [];
                    
                    if(app.data.autocompleteTimer) clearTimeout(app.data.autocompleteTimer);
                    
                    app.data.autocompleteTimer = setTimeout(function(){
                        app.preloader.show();
                        var q = new Query("User");
                        q.success = function(result){
                            if(result.status === 1){
                               render(result.data);
                               app.preloader.hide();
                            }
                        }
                        
                        if(query !== "*") q.and("any_email",query);
                        
                        q.and("eq_deleted",false);
                        q.find();
                    },1000);

                  },
                  on: {
                    change: function (value) {
                      $$('#SecurityCodeNewPage .SecurityCode_user_id').find('.item-after').text(value[0].email);
                      $$('#SecurityCodeNewPage .SecurityCode_user_id').find('input').val(value[0].id);
                    }
                  }
                });

                
                $$("#SecurityCodeNewPage .save").on("click",function(e){
                        var ar = new ActiveRecord("SecurityCode");
                        ar.read("#SecurityCodeNewPage form");
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
                                             $$(".back_security_code").click();
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
        path: '/edit_security_code/:id',
        async: function(routeTo, routeFrom, resolve, reject) {
            if(SecurityCodeViewPage.swipoutOpened){
                reject();
            }else{
                var q = new Query("SecurityCode");
                q.success = function(result){
                    resolve({
                        template: app.data.tpl.SecurityCode['edit']
                    }, {
                        context: {
                            data: result.data
                        }
                    }); 


              app.autocomplete.create({
                  openIn: 'popup',
                  openerEl: '#SecurityCodeEditPage .SecurityCode_user_id',
                  closeOnSelect: true,
                  routableModals: false,
                  requestSourceOnOpen: true,
                  valueProperty: 'id',
                  textProperty: 'email',
                  pageTitle: '$SecurityCode.user_id',
                  source: function (query, render) {
                    var records = [];
                    
                    if(app.data.autocompleteTimer) clearTimeout(app.data.autocompleteTimer);
                    
                    app.data.autocompleteTimer = setTimeout(function(){
                        app.preloader.show();
                        var q = new Query("User");
                        q.success = function(belongsToResult){
                            if(belongsToResult.status === 1){
                               render(belongsToResult.data);
                               app.preloader.hide();
                            }
                        }
                        
                        if(query !== "*") q.and("any_email",query);
                        
                        q.and("eq_deleted",false);
                        q.find();
                    },1000);

                  },
                  on: {
                    change: function (value) {
                      $$('#SecurityCodeEditPage .SecurityCode_user_id').find('.item-after').text(value[0].email);
                      $$('#SecurityCodeEditPage .SecurityCode_user_id').find('input').val(value[0].id);
                    }
                  }
                });
                
              if(result.data.user_id){
                  $$('#SecurityCodeEditPage .SecurityCode_user_id').find('.item-after').text("...");
                  $$('#SecurityCodeEditPage .SecurityCode_user_id').find('input').val(result.data.user_id);
                  app.autocomplete.get('#SecurityCodeEditPage .SecurityCode_user_id').value = [{id: result.data.user_id,email: "..."}];
                  
                  var bolongsToQuery = new Query("User");
                  bolongsToQuery.success = function(belongsToResult){
                      if(belongsToResult.status === 1){
                        $$('#SecurityCodeEditPage .SecurityCode_user_id').find('.item-after').text(belongsToResult.data.email);
                        app.autocomplete.get('#SecurityCodeEditPage .SecurityCode_user_id').value = [{id: result.data.user_id,email: belongsToResult.data.email}];
                      }
                  };
                  bolongsToQuery.and("eq_id",result.data.user_id);
                  bolongsToQuery.first();
              }

                    $$("#SecurityCodeEditPage .save").on("click",function(e){
                        var ar = new ActiveRecord("SecurityCode");
                        ar.read("#SecurityCodeEditPage form");
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
                                             $$(".back_security_code").click();
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
                    $$("#SecurityCodeEditPage .remove").on("click",function(e){
                        var deleteActions = app.actions.create({
                            buttons: [
                                [{
                                        text: "Click button \"Delete\" if you're sure?",
                                        label: true,
                                    },
                                    {
                                        text: 'Delete',
                                       onClick: function(actions, e) {
                                            var ar = new ActiveRecord("SecurityCode",routeTo.params.id);
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
                                                             $$(".back_security_code").click();
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
        path: '/delete_security_code/:id',
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
                                var ar = new ActiveRecord("SecurityCode",routeTo.params.id);
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
        path: '/view_security_code/',
        async: function(routeTo, routeFrom, resolve, reject) {
            console.log('view','SecurityCodeView');
            app.tab.show('#SecurityCodeView');
            $$(".tab-link-active").removeClass("tab-link-active");
        }
    }
                            
                    
];