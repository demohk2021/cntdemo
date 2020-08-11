
function ActiveRecord() {

	var me = this;	
	me.constructor = function(args){
		//Model Name for args 0
		me.name = args[0];
		switch(args.length){
		    case 2:
		    	//id value for args 1
				me.data.id = args[1];
				var result = ActiveRecord.first(me.name,me.data.id);
				if(result.status === 1){
					me.status = result.status;
					me.data = result.data;
				}else{
					me.status = result.status;
					me.msg = result.msg;
					me.data = null;
				}				
				break;
			default:
				break;
		}
	},	
	me.refresh = function(){
		if(me.data){
			if(arguments[0]){
				me.refreshAt = 0;
			}
			var currentAt = new Date().getTime();				
			if((currentAt - me.refreshAt) > 3000){
				var result = ActiveRecord.first(me.name,me.data.id);
				if(result.status === 1){
					me.refreshAt = currentAt;
					me.status = result.status;				
					me.data = result.data;				
				}else{
					me.refreshAt = 0;
					me.status = result.status;
					me.msg = result.msg
					me.data = null;
				}				
			}
		}		
	},
	me.belongsTo = function(belongName){
		if(me.belongs[belongName]){
			return me.belongs[belongName];
		}else{
			var ar = new ActiveRecord(me.name);
			ar.data = me.data;
			ar.params.belongName = belongName;
			ar.submitParams = true;
			var rs = ar.submit('belongsTo');
			if(rs.status === 1){
				var belongAr = new ActiveRecord(belongName);
				belongAr.data = rs.data;
				belongAr.name = rs.name;
				me.belongs[belongName] = belongAr;
			}else
				me.belongs[belongName] = null;
		}
		return me.belongs[belongName];
	},
	me.hasOne = function(hasName){
		if(me.has[hasName]){
			return me.has[hasName];
		}else{
			var ar = new ActiveRecord(me.name);
			ar.data = me.data;
			ar.params.hasName = hasName;
			ar.submitParams = true;
			var rs = ar.submit('hasOne');
			if(rs.status === 1){
				var hasAr = new ActiveRecord(hasName);
				hasAr.data = rs.data;
				hasAr.name = rs.name;
				me.has[hasName] = hasAr;
			}else
				me.has[hasName] = null;
		}
		return me.has[hasName];
	},
	me.hasMany = function(hasName){
		if(me.has[hasName]){
			return me.has[hasName];
		}else{
			var ar = new ActiveRecord(me.name);
			ar.data = me.data;
			ar.params.hasName = hasName;
			ar.submitParams = true;			
			me.has[hasName] = ar.submit('hasMany');
		}
		return me.has[hasName];
	},
	//Write me.data to form
	me.write = function(form,funs){
		me.form = form;
		var b = true;
		funs = (funs === undefined ? {} : funs);
		if(funs.before)
			b = funs.before(me);
		b = (b === undefined ? true : b);
		if(b)
			ActiveRecord.write(me,funs.after,funs.execute);		
	},
	//Read form data to me.data
	me.read = function(form,funs){
		me.form = form;
		var b = true;
		funs = (funs === undefined ? {} : funs);
		if(funs.before)
			b = funs.before(me);
		b = (b === undefined ? true : b);
		if(b)
			ActiveRecord.read(me,funs.after,funs.execute);
	},
	me.submit = function(){
        // var me = me;
        var action = arguments[0];
        var successBlock = arguments[1];
        var failureBlock = arguments[2]
        var len = arguments.length;
		var result = {status: 0, msg: 'Network Invalid.'};
		if(len === 1){
			Framework7.request({
				method: 'POST',
				async: false,
				url: ActiveRecord.rule(me,action),
				data: ActiveRecord.merge(me.submitParams,me.name,me.data,me.params),
				success: function(response){
					 result = eval('(' + response + ')');
				},
				error: function(event,message){
				    result = {status: event.status,msg: event.responseText};
				}
			});
			if(result.status === 1){
				  me.status = result.status;
				  me.data = result.data;
				}else{
				  me.status = result.status;
				  me.msg = result.msg;
				}			 
				return result;
		}else if(len > 1){
		    Framework7.request({
				method: 'POST',
				async: true,
				timeout: 60000,
				url: ActiveRecord.rule(me,action),
				data: ActiveRecord.merge(me.submitParams,me.name,me.data,me.params),
				success: function(response){
					successBlock(eval('(' + response + ')'));
				},
				error: function(event,message){
				    failureBlock({status: event.status,msg: event.responseText});
				}
			});
		}else{
			result = {status: 0,msg: 'Params not found.'};
			return result;
		}
	},
	//Create me.data to remote
	me.create = function(){
		return me.submit('create');
	},
	//Update me.data to remote
	me.update = function(){
		return me.submit('update');
	},
	//Create or Update (id is null to create else to update) 
	me.save = function(){
		if(me.data.id === undefined || me.data.id === null || me.data.id === '')
			return me.create();
		else
			return me.update();
	},
	//Remove to remote (me.data.id is necessity)
	me.remove = function(){
		return me.submit("remove");
	},
	me.setValidates = function(form,attrs){
// 		var me = me;
	},
	me.submitParams = false,
	me.name,
	me.form,
	me.status = 1,
	me.params = {},
	me.data = {},
	me.belongs = {},
	me.has = {},
	me.refreshAt = 0;
	return me.constructor(arguments);
}

ActiveRecord.validatesPresence = function(validCnf,me,attr,input){

}

ActiveRecord.validatesFormat = function(validCnf,me,attr,input){

}

ActiveRecord.validatesNumber = function(validCnf,me,attr,input){

}

ActiveRecord.validatesLength = function(validCnf,me,attr,input){

}

ActiveRecord.validatesTimestamp = function(validCnf,me,attr,input){

}

ActiveRecord.validatesDate = function(validCnf,me,attr,input){

}

ActiveRecord.validatesTime = function(validCnf,me,attr,input){

}

ActiveRecord.validatesUniqueness = function(validCnf,me,attr,input){	

}

ActiveRecord.onValid = function(on,me){
	var on = on || 'save';
	var newXtype = me.name.toLowerCase() + 'new';
	var editXtype = me.name.toLowerCase() + 'edit';
	if(on === 'create' && newXtype !== me.form.xtype)
		return false;
	
	if(on === 'update' && editXtype !== me.form.xtype)
		return false;
	
	return true;
}

ActiveRecord.merge = function(merged,name,data,params){
	var allParams = {};
	if(merged){			
		for(var k in params)
			allParams[k] = params[k];
	}
	for(var k in data)
		allParams[name + '[' + k + ']'] = data[k];
		
	return allParams;
}

ActiveRecord.read = function(me, after, execute) {
    var inputs = $$(me.form + " input,textarea");
    inputs.forEach(function(_input,i) {
        var input = $$(_input);
        var name = input.attr('name');
        var value = null;
        var type = input.attr('type');
        if (type == 'checkbox' || type == 'radio') {
            value = input.is(':checked');
        } else {
            value = input.val();
        }
        if (ActiveRecord.NameRegExp(me.name).test(name)) {
            var attr = ActiveRecord.ParseAttr(me.name, name);
            me.data[attr] = value;
        } else {
            var arr = [];
            if (me.params[name] == undefined) {
                me.params[name] = value;
            } else {
                if (typeof(me.params[name]) == 'object') {
                    arr = me.params[name];
                } else {
                    arr = [me.params[name]];
                }
                arr = arr.concat(value);
                me.params[name] = arr;
            }
        }
    });
}

ActiveRecord.write = function(me, after, execute) {
    var inputs = $$(me.form + " input,textarea");
    inputs.forEach(function(_input,i) {
        var input = $$(_input);
        var name = input.attr('name');
        var attr = null;
        var value = null;
        var isAtt = ActiveRecord.NameRegExp(me.name).test(name);
        var values = me.data || {};
        if (isAtt) {
            attr = ActiveRecord.ParseAttr(me.name, name);
            value = values[attr];
        } else {
            value = values[name];
        }
        if (execute)
            execute(me, inputs, input, index, name, attr, value);
        else if (isAtt) {
            var type = input.attr('type');
            if (type == 'checkbox' || type == 'radio') {
                input.attr('checked', value || false);
            } else
                input.val(value || '');
        }
    });
    if (after)
        after(me, inputs);
}

ActiveRecord.NameRegExp = function(model){
	return new RegExp('^'+model+'\\[[_\\w\\d]+\\]$','g');
}

ActiveRecord.ParseAttr = function(model,name){
	return name.replace(new RegExp('^' + model + '\\[','g'),'')
			 .replace(new RegExp('\\]$','g'),'');
}

ActiveRecord.first = function(name,id){
	var q = new Query(name);
	q.and('eq_id',id);
	return q.first();
}


ActiveRecord.rule = function(me,action){
	return ActiveRecord.url + '/' + me.name + '/' + action + '/' + ActiveRecord.args;
}

ActiveRecord.url = "";
ActiveRecord.args = "";
