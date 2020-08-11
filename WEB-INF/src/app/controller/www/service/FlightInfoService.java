package app.controller.www.service;

import app.global.Global;
import app.helper.ApplicationHelper;
import net.rails.ext.AbsGlobal;
import net.rails.sql.worker.FindWorker;
import java.util.List;
import net.rails.sql.query.Query;
import net.rails.active_record.ActiveRecord;
import java.util.Map;
import app.model.Airport;
import net.rails.ext.Json;
import java.util.ArrayList;

public class FlightInfoService extends ActionService {

	public FlightInfoService(AbsGlobal g) {
		super(g);
	}

	@Override
	protected FindWorker makeWorker(FindWorker worker){

	    worker.joins().add("LEFT JOIN airport AS origin_airport_id_table ON origin_airport_id_table.id = flight_info.origin_airport_id");
	    worker.selects().add("origin_airport_id_table.name AS as_flight_info_origin_airport_id_display");  
	    worker.joins().add("LEFT JOIN airport AS destination_airport_id_table ON destination_airport_id_table.id = flight_info.destination_airport_id");
	    worker.selects().add("destination_airport_id_table.name AS as_flight_info_destination_airport_id_display");  
	    return worker;
	}
	
// 	@Override
//     protected Json<String, Object> list(FindWorker fw) throws Exception {
// 		Json<String, Object> json = new Json<String, Object>();
// 		FindWorker cfw = fw.clone();
// 		Number total = 0;
// 		cfw.orders().clear();
// 		cfw.selects().clear();
// 		cfw.setLimit(null);
// 		cfw.setOffset(null);
// 		cfw.firsts().add("SELECT COUNT(*) AS total FROM (");
// 		cfw.lasts().add(") temptable");
// 		total = cfw.first().getNumber("total");
// 		List<Map<String,Object>> data = null;
// 		if (total.longValue() > 0) {
// 			data = formatRecord(fw.find());
// 			if(data != null){
// 			    for (int i = 0;i < data.size();i++){
// 			        Map<String,Object> map = data.get(i);
// 			        Object orginId = map.get("origin_airport_id");
// 			        Object destId = map.get("destination_airport_id");
			        
// 			        Query airportQuery = new Query(new Airport(g));
// 			        airportQuery.and("eq_id",orginId);
// 			        map.put("orgin_airport_name", airportQuery.first().get("name"));
			        
// 			        airportQuery = new Query(new Airport(g));
// 			        airportQuery.and("eq_id",destId);
// 			        map.put("destination_airport_name", airportQuery.first().get("name"));
			        
			        
// 			        data.set(i,map);
			        
// 			    } 
// 			}
// 		} else{
// 			data = new ArrayList<Map<String,Object>>();
// 		}
// 		json.put("total", total);
// 		json.put("data",filterLongTextColumns(data));
// 		return json;
// 	}
	
	@Override
	protected boolean beforeBoxList(Query q,String query) {
	    q.and("any_flight_no",query);
		return true;
	}
	
	@Override
	protected Map<String,Object> formatRecord(ActiveRecord src){
	    Map<String,Object> record = super.formatRecord(src);
	    try{
            Object orginId = record.get("origin_airport_id");
            Object destId = record.get("destination_airport_id");
            
            Query airportQuery = new Query(new Airport(g));
            airportQuery.and("eq_id",orginId);
            record.put("orgin_airport_code", airportQuery.first().get("code"));
            
            airportQuery = new Query(new Airport(g));
            airportQuery.and("eq_id",destId);
            record.put("destination_airport_code", airportQuery.first().get("code"));
            return record;
	    }catch(Exception e){
	        log.error(e.getMessage(),e);
	        return null;
	    }
	}
	
}
