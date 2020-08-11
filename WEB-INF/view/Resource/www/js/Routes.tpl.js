routes = [];

routes = routes.concat(EmailScheduleRoutes);
routes = routes.concat(JobProcessRoutes);
routes = routes.concat(MemberRoutes);
routes = routes.concat(EventScheduleRoutes);
routes = routes.concat(FlightBookingSeatRoutes);
routes = routes.concat(RolePermissionRoutes);
routes = routes.concat(UserRoutes);
routes = routes.concat(SecurityCodeRoutes);
routes = routes.concat(SequenceRoutes);
routes = routes.concat(FlightInfoRoutes);
routes = routes.concat(RoleRoutes);
routes = routes.concat(JobRoutes);
routes = routes.concat(AirportRoutes);
routes = routes.concat(FlightBookingRoutes);

routes.push({
    path: '/about/',
    async: function(routeTo, routeFrom, resolve, reject) {
        var tpl = Template7.compile(app.data.tpl.about);
        var html = tpl({

        });
        app.popup.open(html, true);
    }
});

routes.push({
    path: '(.*)',
    url: 'public/404.html',
});
