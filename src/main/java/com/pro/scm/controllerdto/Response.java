package com.pro.scm.controllerdto;


import java.util.List;

import lombok.Data;

/* @author VENKAT
* @since 2019-03-30
* @Time 3:58PM
*
*/
@Data
public class Response {
	String status;
	Integer responseCode;
	List<String> errorsMsgs;
	String rtnReponseCount;
	
	
	
}
