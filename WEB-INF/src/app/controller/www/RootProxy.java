package app.controller.www;

import java.io.IOException;
import net.rails.tpl.TplCache;
import app.controller.ApplicationController;
import net.rails.ext.Json;
import app.model.User;
import net.rails.active_record.ActiveRecord;
import java.sql.SQLException;
import app.model.Role;
import java.util.List;
import app.model.RolePermission;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class RootProxy extends ActionProxy {
	
	public RootProxy(ApplicationController contro) throws Exception {
		super(contro);
	}
	
	public void indexAction() throws IOException {
		text(new TplCache(0) {
			@Override
			protected String execution() {
				try {
					return htmlTpl();
				} catch (Exception e) {
					log.error(e.getMessage(), e);
					return null;
				}
			}

		}.toString());
	}
	
	
	public void profileAction() throws IOException {
        Json json = new Json();
        Object id = g.getUserId();
        try{
            User user = new User(g,id);
            user.remove("session_token");
            user.remove("sign_in_password");
            Role role = user.belongsTo(new Role(g));
            user.put("role_name",role.getName());
            
            Map<String,List<String>> rolePermMap = new HashMap<String,List<String>>();
            List<RolePermission> permList = role.hasMany(new RolePermission(g));
            for(RolePermission rp : permList){
                if(rp.isDeleted()) continue;
                String model = rp.getModel();
                String action = rp.getAction();
                if(rolePermMap.containsKey(model)){
                    List<String> actList = rolePermMap.get(model);
                    actList.add(action);
                    rolePermMap.put(model,actList);
                }else{
                    List<String> actList = new ArrayList<String>();
                    actList.add(action);
                    rolePermMap.put(model,actList);
                }
            }
            json.put("status",1);
            json.put("User",user);
            json.put("RolePermission",rolePermMap);
            text(json.toString());
        }catch(Exception e){
			log.error(e.getMessage(), e);
			json.put("status",0);
			json.put("msg",e.getMessage());
			text(json.toString());
        }
	}	
	

}