<?php	
	include "../public/lang.php";

if( $LANG == "tw" ){
	include "index-tw.html";
}else if( $LANG == "jp" ){
	include "index-jp.html";
}else if( $LANG == "fr" ){
	include "index-fr.html";
}else if( $LANG == "es" ){
	include "index-es.html";
}else if( $LANG == "kr" ){
	include "index-kr.html";
}else if( $LANG == "en" ){
	include "index-en.html";	
}else{
	include "index-en.html";
}
