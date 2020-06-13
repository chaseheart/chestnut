function TiMu(){
	var timu = 0
	for(var i in data1){
		var div = document.createElement("div");
		div.className = "entrance-bottom-frame-line";
		document.querySelector(".entrance-bottom-frame").appendChild(div);
		
		
		var div2 = document.createElement("div");
		div2.className = "entrance-bottom-frame-line-title";
		div2.innerHTML = data1[i].title;
		document.querySelectorAll(".entrance-bottom-frame-line")[i].appendChild(div2);
		
		if(data1[i].type == "input"){
			$(".entrance-bottom-frame-line-title").eq(i).append("<input class='blank' id='" + data1[i].id + "'/>");
		}
		
		var divli1 = document.createElement("div");
		divli1.innerHTML = parseInt(i) + 1;
		
		for(var j in data1[i].xuanxiang){
			var div3 = document.createElement("div");
			div3.className = "entrance-bottom-frame-line-button";
			var div3_id = document.createElement("div");
			div3_id.className = "entrance-bottom-frame-line-button-id";
			if(j == 0){
				 div3_id.innerHTML = "A";
			}else if(j == 1){
				 div3_id.innerHTML = "B";
			}else if(j == 2){
				 div3_id.innerHTML = "C";
			}else{
				 div3_id.innerHTML = "D";
			}
			var div4 = document.createElement("div");
			div4.className = "entrance-bottom-frame-line-button-frame";
			div4.innerHTML = data1[i].xuanxiang[j];
			div3.appendChild(div3_id)
			div3.appendChild(div4);
			document.querySelectorAll(".entrance-bottom-frame-line")[i].appendChild(div3);
		}
		timu++
	}
	mintime = 1; 
	var dact = document.querySelector(".entrance-bottom-frame-line")
	var active = "active"
	var none = "none"
	addClass(dact, active)
	var timu_id = 0
	var select1 = 1
	var frame_left = 0
	var anwser = {"0":0,"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":5,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0}
	// 答案
	var right = {"0":4,"1":1,"2":2,"3":2,"4":1,"5":4,"6":1,"7":3,"8":1,"9":5,"10":1,"11":1,"12":2,"13":3,"14":1,"15":1,"16":1,"17":1,"18":2,"19":3}
	var strRight = {"9":"sunrise"}
	document.querySelector(".entrance-bottom-frame").style.marginLeft = frame_left + "%"
	document.querySelector(".topic-frameli").innerHTML = "第 " + "<div>" + select1 + "</div>" + "/" + timu + " 题"
	for(var i = 0;i<document.querySelectorAll(".entrance-bottom-frame-line-button").length;i++){
		document.querySelectorAll(".entrance-bottom-frame-line-button")[i].onclick = function(){
			if(timu_id < document.querySelectorAll(".entrance-bottom-frame-line").length - 1){
				frame_left += -100
				document.querySelector(".entrance-bottom-frame").style.marginLeft = frame_left + "%"
				anwser[timu_id] = $(this).index()
				timu_id++;
				select1++;
				document.querySelector(".topic-frameli").innerHTML = "第 " + "<div>" + select1 + "</div>" + "/" + timu + " 题"
				addClass(document.querySelectorAll(".entrance-bottom-frame-line")[timu_id], active)
				removeClass(document.querySelectorAll(".entrance-bottom-frame-line")[timu_id-1], active)				
			}else{
				anwser[timu_id] = $(this).index()
			}
			$(".selected").removeClass("selected")
			if(anwser[timu_id] != 0){
				$(".entrance-bottom-frame-line").eq(timu_id).find(".entrance-bottom-frame-line-button").eq(anwser[timu_id]-1).addClass("selected")
			}
			if($(".submit").hasClass("submited")){
				$(".entrance-bottom-frame-line").eq(timu_id).find(".entrance-bottom-frame-line-button").eq(right[timu_id]-1).addClass("rightAnwser")
			}
		}
	}
	document.querySelector(".pre").onclick = function(){
		if(timu_id > 0){
			frame_left += 100
			document.querySelector(".entrance-bottom-frame").style.marginLeft = frame_left + "%"
			timu_id--;
			select1--;
			document.querySelector(".topic-frameli").innerHTML = "第 " + "<div>" + select1 + "</div>" + "/" + timu + " 题"
			addClass(document.querySelectorAll(".entrance-bottom-frame-line")[timu_id], active)
			if(anwser[timu_id] != 0){
				$(".entrance-bottom-frame-line").eq(timu_id).find(".entrance-bottom-frame-line-button").eq(anwser[timu_id]-1).addClass("selected")
			}
			removeClass(document.querySelectorAll(".entrance-bottom-frame-line")[timu_id + 1], active)
			if($(".submit").hasClass("submited")){
				$(".entrance-bottom-frame-line").eq(timu_id).find(".entrance-bottom-frame-line-button").eq(right[timu_id]-1).addClass("rightAnwser")
			}
		}
	}
	
	document.querySelector(".next").onclick = function(){
		if(timu_id < 9){
			frame_left += -100
			document.querySelector(".entrance-bottom-frame").style.marginLeft = frame_left + "%"
			
			timu_id++;
			select1++;
			document.querySelector(".topic-frameli").innerHTML = "第 " + "<div>" + select1 + "</div>" + "/" + timu + " 题"
			addClass(document.querySelectorAll(".entrance-bottom-frame-line")[timu_id], active)
			if(anwser[timu_id] != 0){
				$(".entrance-bottom-frame-line").eq(timu_id).find(".entrance-bottom-frame-line-button").eq(anwser[timu_id]-1).addClass("selected")
			}
			removeClass(document.querySelectorAll(".entrance-bottom-frame-line")[timu_id - 1], active)
			if($(".submit").hasClass("submited")){
				$(".entrance-bottom-frame-line").eq(timu_id).find(".entrance-bottom-frame-line-button").eq(right[timu_id]-1).addClass("rightAnwser")
			}
		}
	}
	
	$(".submit").bind("click",function(){
		if($(this).hasClass("submited")){
			$.alertView("不能再交啦！你已经交过卷了！");
			return false;
		}
		let score = 100
		var flag = false
		for(let i in anwser){
			if(anwser[i] == 0){
				flag = true
			}
			if(anwser[i] != right[i] && anwser[i] != 5){
				score = score - 5;
			}else if(anwser[i] == 5){
				let str = $("#" + (parseInt(i) + 1)).val();
				let arr = strRight[i].split(",")
				let TFlag = true;
				for(let n in arr){
					if(str.indexOf(arr[n]) != -1){
						TFlag =false;
					}
				}
				if(TFlag){
					score = score - 5;
					$("#" + (parseInt(i) + 1)).addClass("error");
				}
				
			}
		}
		if(flag){
			$.alertView("栗子，还有空着的哦！");
			return false;
		}
		if(score == 100){
			$.alertView("~~~~(>_<)~~~~，🍭+1！");
			$('.holder').fireworks({ 
				  sound: true, // sound effect
				  opacity: 0.9, 
				  width: '100%', 
				  height: '100%' 
			});
		}else if(score >= 60){
			$.alertView("🍭减一了哦！");
		}else if(score < 60){
			$.alertView("加油");
		}
		$(".submit").addClass("submited")
		if($(".submit").hasClass("submited")){
			$(".entrance-bottom-frame-line").eq(timu_id).find(".entrance-bottom-frame-line-button").eq(right[timu_id]-1).addClass("rightAnwser")
		}
		$(".error").parent().append("<span class='blankAnswer'>(sunrise)</span>")
	});
}

function addClass(obj, cls){
  var obj_class = obj.className,//获取 class 内容.
  blank = (obj_class != '') ? ' ' : '';//判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
  added = obj_class + blank + cls;//组合原来的 class 和需要添加的 class.
  obj.className = added;//替换原来的 class.
}

function removeClass(obj, cls){
  var obj_class = ' '+obj.className+' ';//获取 class 内容, 并在首尾各加一个空格. ex) 'abc    bcd' -> ' abc    bcd '
  obj_class = obj_class.replace(/(\s+)/gi, ' '),//将多余的空字符替换成一个空格. ex) ' abc    bcd ' -> ' abc bcd '
  removed = obj_class.replace(' '+cls+' ', ' ');//在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
  removed = removed.replace(/(^\s+)|(\s+$)/g, '');//去掉首尾空格. ex) 'bcd ' -> 'bcd'
  obj.className = removed;//替换原来的 class.
}

function hasClass(obj, cls){
  var obj_class = obj.className,//获取 class 内容.
  obj_class_lst = obj_class.split(/\s+/);//通过split空字符将cls转换成数组.
  x = 0;
  for(x in obj_class_lst) {
    if(obj_class_lst[x] == cls) {//循环数组, 判断是否包含cls
      return true;
    }
  }
  return false;
}



var data1 =[ {
             "id" : "1",  
             "title": "grain 没有以下哪个解释 （）",  
            
             "xuanxiang":[
             				"谷物",
             				"颗粒",
             				"少量",
             				"大脑 ",
             				]
	
        },{  
             "id" : "2",  
             "title": "summary judgement（）",  
            
             "xuanxiang":[
             				"草草判决",
             				"初步判断",
             				"大纲，总线",
             				"概括，一览",
             				]
        },{  
             "id" : "3",  
             "title": "faulty的词性（）",  
            
             "xuanxiang":[
             				"名词",
             				"形容词",
             				"动词",
             				"副词",
             				]
        },{  
             "id" : "4",  
             "title": "（）峰会",
            
             "xuanxiang":[
             				"a tea party",
             				"a summit conference",
             				"a final meeting",
             				"a ultimate convocation",
             				]
        },{  
             "id" : "5",  
             "title": "specialize ____ 专攻，专门研究",  
             
             "xuanxiang":[
             				"in",
             				"to",
             				"on",
             				"at",
             				]
        },{  
             "id" : "6",  
             "title": "resident 不含有以下哪个解释（）",  
             
             "xuanxiang":[
             				"居民",
             				"住院医生",
             				"住校的",
             				"残留的",
             				]
        },{  
             "id" : "7",  
             "title": "demonstrate（）",  
             
             "xuanxiang":[
             				"证明",
             				"倾述",
             				"告白",
             				"透露",
             				]
        },{  
             "id" : "8",  
             "title": "bounce （）",  
             
             "xuanxiang":[
             				"(of a person) move in a quick and lively way.",
             				"put down, especially gently or carefully.",
             				"(of a person) jump repeatedly up and down, typically on something springy.",
             				"perform a somersault, or make a similar movement accidentally.",
             				]
        },{  
             "id" : "9",  
             "title": "all manner of （）",  
             
             "xuanxiang":[
             				"各式各样的",
             				"人山人海的",
             				"别具一格的",
             				"习以为常的",
             				]
        },{  
             "id" : "10",  
             "title": "_____ : 日出 ",  
			 "type": "input",
             "content": ""
        },{  
             "id" : "11",  
             "title": "George saw the monitor black out and then a few words faded ____.乔治看见屏幕变暗，接着出现了几个字。",  
             
             "xuanxiang":[
             				"in",
             				"away",
             				"out",
             				"on",
             				]
        },{  
             "id" : "12",  
             "title": "recreation （）",  
             
             "xuanxiang":[
             				"activity done for enjoyment when one is not working.",
             				"the action or process of carrying out or accomplishing an action, task, or function.",
             				"activity involving mental or physical effort done in order to achieve a purpose or result.",
             				"an instance or period of relaxing or ceasing to engage in strenuous or stressful activity.",
             				]
        },{  
             "id" : "13",  
             "title": "the hell（）",  
             
             "xuanxiang":[
             				"十八层地狱(特指)",
             				"到底，究竟",
             				"撒旦",
             				"礼堂",
             				]
        },{  
             "id" : "14",  
             "title": "restore ____  求助于，诉诸于",  
             
             "xuanxiang":[
             				"for help",
             				"from sb.",
             				"to sth.",
             				"on sb.",
             				]
        },{  
             "id" : "15",  
             "title": "fierce （）",  
             
             "xuanxiang":[
             				"狂热的",
             				"暴力的",
             				"可怜的",
             				"过激的",
             				]
        },{  
             "id" : "16",  
             "title": "string _____ 延长",  
             
             "xuanxiang":[
             				"out",
             				"along (with)",
             				"off",
             				"to",
             				]
        },{  
             "id" : "17",  
             "title": " Buying in bulk is more economical than shopping for small quantities.中in bulk （）",  
             
             "xuanxiang":[
             				"大量，批量",
             				"零散地",
             				"少量",
             				"试探性地",
             				]
        },{  
             "id" : "18",  
             "title": "do justice to（）",  
             
             "xuanxiang":[
             				"公平地对待，正义地审判",
             				"对...作出判决",
             				"对...作出判断",
             				"乐于助人",
             				]
        },{  
             "id" : "19",  
             "title": "the rank of sergeant （）",  
             
             "xuanxiang":[
             				"中产阶级",
             				"中士职衔",
             				"中将军衔",
             				"中队长",
             				]
        },{  
             "id" : "20",  
             "title": "take occasion to （）",  
             
             "xuanxiang":[
             				"有时",
             				"造成，导致",
             				"借机",
             				"实施",
             				]
        }
        ];
        

