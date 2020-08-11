/** 
 * Version 1.0
 */
function Query() {

    var me = this;
    me.constructor = function(args) {
            me.from = args[0],
                me.ands = {},
                me.ors = {},
                me.selects = [],
                me.alias = [],
                me.lefts = [],
                me.rights = [],
                me.inners = [],
                me.counts = [],
                me.avgs = [],
                me.mins = [],
                me.maxs = [],
                me.sums = [],
                me.params = {}, //request params
                me.otherParams = {},
                me.autoSkipnil = Query.False,
                me.autoJoin = Query.False,
                me.autoGroup = Query.False,
                me.autoSelect = Query.False,
                me._limit = null,
                me._offset = null;
        },
        me.join = function(auto) {
            me.autoJoin = auto || Query.False;
            return me;
        },
        me.skipnil = function(skipnil) {
            me.autoSkipnil = skipnil || Query.False;
            return me;
        },
        me.group = function(auto) {
            me.autoGroup = auto || Query.False;
            return me;
        },
        me.select = function() {
            switch (arguments.length) {
                case 1:
                    if (typeof(arguments[0]) == 'boolean') {
                        me.autoSelect = arguments[0];
                    } else {
                        me.selects.push([arguments[0]]);
                    }
                    break;
                case 2:
                    me.selects.push([arguments[0], arguments[1]]);
                    break;
                case 3:
                    me.selects.push([arguments[0], arguments[1], arguments[2]]);
                    break;
                default:
                    break;
            }
            return me;
        }
    me.as = function() {
        switch (arguments.length) {
            case 1:
                me.alias.push([arguments[0]]);
            case 2:
                me.alias.push([arguments[0], arguments[1]]);
                break;
            case 3:
                me.alias.push([arguments[0], arguments[1], arguments[2]]);
                break;
            default:
                break;
        }
        return me;
    }
    me.and = function() {
            switch (arguments.length) {
                case 1:
                    if (typeof(arguments[0]) === 'object') {
                        me.ands = arguments[0];
                    } else {
                        me.ands[arguments[0]] = Query.True;
                    }
                    break;
                case 2:
                    if (arguments[1] == null)
                        me.ands[arguments[0]] = '';
                    else if (typeof(arguments[1]) == 'boolean')
                        me.ands[arguments[0]] = arguments[1].toString();
                    else
                        me.ands[arguments[0]] = arguments[1];
                    break;
                default:
                    break;
            }
            return me;
        }, me.or = function() {
            switch (arguments.length) {
                case 1:
                    if (typeof(arguments[0]) === 'object') {
                        me.ors = arguments[0];
                    } else {
                        me.ors[arguments[0]] = Query.True;
                    }
                    break;
                case 2:
                    if (arguments[1] == null)
                        me.ors[arguments[0]] = '';
                    else if (typeof(arguments[1]) == 'boolean')
                        me.ors[arguments[0]] = arguments[1].toString();
                    else
                        me.ors[arguments[0]] = arguments[1];
                    break;
                default:
                    break;
            }
            return me;
        }, me.order = function() {
            switch (arguments.length) {
                case 2:
                    me.and(arguments[1] + '_' + arguments[0]);
                    break;
                case 3:
                    me.and(arguments[2] + '_' + arguments[1] + '_from_' + arguments[0]);
                    break;
                default:
                    break;
            }
            return me;
        }, me.asc = function() {
            switch (arguments.length) {
                case 1:
                    me.order(arguments[0], 'asc');
                    break;
                case 2:
                    me.order(arguments[0], arguments[1], 'asc');
                    break;
                default:
                    break;
            }
            return me;
        }, me.desc = function() {
            switch (arguments.length) {
                case 1:
                    me.order(arguments[0], 'desc');
                    break;
                case 2:
                    me.order(arguments[0], arguments[1], 'desc');
                    break;
                default:
                    break;
            }
            return me;
        }, me.inner = function(t, fk) {
            if (fk)
                me.inners.push([t, fk]);
            else
                me.inners.push([t]);
            return me;
        }, me.left = function(t, fk) {
            if (fk)
                me.lefts.push([t, fk]);
            else
                me.lefts.push([t]);
            return me;
        }, me.right = function(t, fk) {
            if (fk)
                me.rights.push([t, fk]);
            else
                me.rights.push([t]);
            return me;
        }, me.count = function(t, c) {
            me.counts.push([t, c]);
            return me;
        }, me.sum = function(t, c) {
            me.sums.push([t, c]);
            return me;
        }, me.avg = function(t, c) {
            me.avgs.push([t, c]);
            return me;
        }, me.min = function(t, c) {
            me.mins.push([t, c]);
            return me;
        }, me.max = function(t, c) {
            me.maxs.push([t, c]);
            return me;
        }, me.find = function() {
            me.args(arguments);
            return me.request('query', 'find');
        }, me.first = function() {
            me.args(arguments);
            return me.request('query', 'first');
        }, me.query = function() {
            switch (arguments.length) {
                case 1:
                    break;
                case 2:
                    me.args(arguments[1]);
                    break;
                case 3:
                    me.args(arguments[1], arguments[2]);
                    break;
                case 4:
                    me.args(arguments[1], arguments[2], arguments[3]);
                    break;
                default:
                    break;
            }
            return me.request('query', arguments[0]);
        }, me.limit = function(limit) {
            me._limit = limit;
            return me;
        }, me.offset = function(offset) {
            me._offset = offset;
            return me;
        },
        me.args = function(args) {
            switch (args.length) {
                case 0:
                    me.params['disc'] = Query.False;
                    me.params['first'] = '';
                    me.params['last'] = '';
                    break;
                case 1:
                    me.params['disc'] = args[0];
                    me.params['first'] = '';
                    me.params['last'] = '';
                    break;
                case 2:
                    me.params['disc'] = Query.False;
                    me.params['first'] = args[0];
                    me.params['last'] = args[1];
                    break;
                case 3:
                    me.params['disc'] = args[0];
                    me.params['first'] = args[1];
                    me.params['last'] = args[2];
                    break;
                default:
                    me.params['disc'] = args[0];
                    me.params['first'] = args[1];
                    me.params['last'] = args[2];
                    break;
            }
        }, me.request = function(action, fun) {
            var result = null;
            me.params['fun'] = fun;
            me.params['join'] = me.autoJoin.toString();
            me.params['group'] = me.autoGroup.toString();
            me.params['select'] = me.autoSelect.toString();
            me.params['skipnil'] = me.autoSkipnil.toString();
            me.params['ands'] = Query.encode(me.ands);
            me.params['ors'] = Query.encode(me.ors);
            me.params['selects'] = Query.encode(me.selects);
            me.params['alias'] = Query.encode(me.alias);
            me.params['lefts'] = Query.encode(me.lefts);
            me.params['rights'] = Query.encode(me.rights);
            me.params['inners'] = Query.encode(me.inners);
            me.params['counts'] = Query.encode(me.counts);
            me.params['avgs'] = Query.encode(me.avgs);
            me.params['mins'] = Query.encode(me.mins);
            me.params['maxs'] = Query.encode(me.maxs);
            me.params['sums'] = Query.encode(me.sums);
            me.params['otherParams'] = Query.encode(me.otherParams);
            if (me._offset !== null)
                me.params['offset'] = me._offset;

            if (me._limit !== null)
                me.params['limit'] = me._limit;

            if (me.success) {
                if (!me.error) {
                    me.error = function(result) {
                        app.notification.create({
                            title: 'ERROR',
                            text: result.msg,
                            closeTimeout: 3000,
                        }).open();
                    }
                }
                Framework7.request({
                    method: 'POST',
                    async: true,
                    url: Query.rule(me, me.from, action),
                    data: me.params,
                    success: function(data, status, xhr) {
                        result = eval('(' + data + ')');
                        me.success(result);
                    },
                    error: function(xhr, status) {
                        var msg = xhr.statusText;
                        if (xhr.status === 0) {
                            msg = "Unavailable Network";
                        } else {
                            msg = xhr.statusText;
                        }
                        result = {
                            status: xhr.status,
                            msg: msg
                        };
                        if (me.error) me.error(result);
                    }
                });
            } else {
                Framework7.request({
                    method: 'POST',
                    async: false,
                    url: Query.rule(me, me.from, action),
                    data: me.params,
                    success: function(data, status, xhr) {
                        result = eval('(' + data + ')');
                    },
                    error: function(xhr, status) {
                        result = {
                            status: '0',
                            msg: 'Request Error.'
                        };
                    }
                });
                return result;
            }
        },
        me.clone = function() {
            var copy = new Query(me.from);
            for (var d in me)
                copy[d] = me[d];

            return copy;
        },
        me.destroy = function() {
            for (var d in me)
                delete me[d];
        };
    return me.constructor(arguments);
};

Query.True = 'true';
Query.False = 'false';

Query.rule = function(me, from, action) {
    return Query.url + '/' + from + '/' + action + '/' + Query.args;
}
Query.encode = function(o) {
    return JSON.stringify(o);
}

Query.url = "";
Query.args = "";