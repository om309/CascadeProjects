INSERT OR REPLACE INTO supplier (id,name,phone,city,state,country,lead_time_days) VALUES
 (1,'ABC Transporter','+91 98452 98553','Jabalpur','Madhya Pradesh','India',6);

INSERT OR REPLACE INTO location (id,name,capacity,stock,temperaturec,humidity) VALUES
 (1,'Pyro PPC Yard',10000,3400,23,45),
 (2,'Hydro PPC Yard',10000,6400,28,52),
 (3,'Cryo PPC Yard',10000,1644,30,48);

INSERT OR REPLACE INTO product (id,code,name,type,state,category,material_class,group_name,uom) VALUES
 (1,'PPC-100','Portland Pozzolana Cement (PPC)','Finished Goods','Solid','Cement','PPC','Packed Cement','TON');
