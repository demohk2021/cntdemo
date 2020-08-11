package app.model;

import java.sql.SQLException;
import net.rails.active_record.exception.RecordNotFoundException;
import net.rails.ext.AbsGlobal;
import app.helper.UserHelper;

public final class User extends UserHelper {
	
	public User(AbsGlobal g) {
		super(g);
	}

	public User(AbsGlobal g, Object id) throws SQLException,
			RecordNotFoundException {
		super(g, id);
	}
	
	
	@Override
	protected  boolean beforeCreate(){
	    return true;
	}
	
	@Override
	protected  boolean beforeUpdate(){
	   remove("sign_in_password");   
	    return true;
	}	

}
