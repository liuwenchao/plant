
function homeList(pageNo){
	var loc = "HomeManage.action";
	$.get(loc,{
		METHOD : "HomeAll",
		PAGENO : pageNo
	},function(data) {dealPage(data);dealHomeList(data);});
}

function homeListPage(pageNo){
	var loc = "HomeManage.action";
	$.get(loc,{
		METHOD : "HomeAll",
		PAGENO : pageNo
	},function(data) {dealHomeList(data);});
}

function dealPage(data){
		 $(data).find('page').each(function() {
        var pageNo = parseInt($(this).children('pageno').text());
        var maxPage = parseInt($(this).children('maxpage').text());
        initPagination(maxPage);
        return false;
    });
	}

function dealHomeList(data) {
	
	var html ="";
var red = 0,blue = 0,brightness = 0;
	$(data).find('domain').each( function ()
	{ 

		html += "<div class='areainfo'><h3>"+ $(this).children('name').text() +"</h3>";
		var onoffCss = $(this).children('onoffST').text()=="0"?"areaOff":"";
		html += "<table class='table table-bordered'><tr><td width='90'>Status：</td><td ><div class='areaOn "+onoffCss +"'></div></td></tr>";
		html += "<tr><td>Operation：</td><td width='197'>"+$(this).children('optionType').text()+"</td></tr>";
		html += "<tr><td>Model：</td><td>"+$(this).children('modelName').text()+"</td></tr>"
		html += "<tr><td colspan='2'><table width='100%' height='100%' border='0' cellspacing='0' cellpadding='0'>";
		html += "<tr><td width='65px'>FREQ(Hz):</td><td width='70px'>"+$(this).children('frequency').text()+"</td><td width='70px'>duty-cycle(%):</td><td>"+$(this).children('duty').text()+"</td></tr>";
		
		html += "</table></td></tr>";
	
		
		html += "<tr><td colspan='2' height='80px'><table width='100%' height='100%' border='0' cellspacing='0' cellpadding='0'><tr>";
		red = parseInt($(this).children('red').text());
		html += "<td width='32%'>PPFD:</td><td width='22%' valign='bottom'><div class='ppfd_border'><div id='PPFD_R' class='ppdf-r' style='height:"+red+"px;margin-top:"+(100-red)+"px;'></div></div>"+$(this).children('PPFD_R').text() +"</td>";
		blue = parseInt($(this).children('blue').text());
		html += "<td width='22%' valign='bottom'><div class='ppfd_border'><div id='PPFD_B' class='ppdf-b' style='height:"+blue+"px;margin-top:"+(100-blue)+"px;'></div></div>"+$(this).children('PPFD_B').text() +"</td>";
		brightness = parseInt($(this).children('brightness').text());
		html += "<td width='22%' valign='bottom'><div class='ppfd_border'><div id='brightness' class='brightness' style='height:"+brightness+"px;margin-top:"+(100-brightness)+"px;'></div></div>"+brightness+"</td>";
		html += "</tr></table></td></tr></table></div>";

	});

	//alert(html);
	$("#AREALIST").html(html);
	
}

function initPagination(maxPage) {
    $('#JQpagination').jqPagination({
    				max_page : maxPage,
    				current_page :1,
        page_string:'Page {current_page}   of {max_page} ',
        paged: function(page) {
        				current_pageNo = page;
            homeListPage(page);
        }
    });
}

//----------------------------refresh------------------------------------------
function refreshArea(){
	
	homeListPage(current_pageNo);
}

function startRefreshInv()
{
	interval = setInterval(refreshArea, "9000");
}

function stopRefreshInv()
{
	clearTimeout(interval);
}


