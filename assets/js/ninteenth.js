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
	var anwser = {"0":0,"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":5}
	// 答案
	var right = {"0":3,"1":3,"2":1,"3":2,"4":3,"5":1,"6":4,"7":4,"8":2,"9":0}
	var strRight = {"9":"revolutionary"}
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
				score = score - 10;
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
					score = score - 10;
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
		$(".error").parent().append("<span class='blankAnswer'>(revolutionary)</span>")
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
             "title": "show favour ____ sb. 偏袒某人",  
            
             "xuanxiang":[
             				"of",
             				"for",
             				"towards",
             				"in ",
             				]
	
        },{  
             "id" : "2",  
             "title": "gang ___ 聚集",  
            
             "xuanxiang":[
             				"at",
             				"on",
             				"up",
             				"off",
             				]
        },{  
             "id" : "3",  
             "title": "constitute（）",  
            
             "xuanxiang":[
             				"give legal or constitutional form to (an institution); establish by law.",
             				"a word or set of words by which a person, animal, place, or thing is known, addressed, or referred to.",
             				"acknowledgment of something's existence, validity, or legality.",
             				"bring one's hand or a tool or weapon into contact with (someone or something) quickly and forcefully.",
             				]
        },{  
             "id" : "4",  
             "title": "squeeze through（）",
            
             "xuanxiang":[
             				"握手",
             				"挤过，勉强通过",
             				"穿梭",
             				"紧捏",
             				]
        },{  
             "id" : "5",  
             "title": "system 没有以下哪个解释（）",  
             
             "xuanxiang":[
             				"系统",
             				"方法",
             				"主干",
             				"身体",
             				]
        },{  
             "id" : "6",  
             "title": "____ around for 寻求，盘算，想办法",  
             
             "xuanxiang":[
             				"cast",
             				"seek",
             				"search",
             				"consider",
             				]
        },{  
             "id" : "7",  
             "title": "拆封（）",  
             
             "xuanxiang":[
             				"seal off",
             				"solid off",
             				"lock off",
             				"break the seal",
             				]
        },{  
             "id" : "8",  
             "title": "This book _______ little _____ our undestanding of the subject.这书对我们了解这门学科助益甚少。",  
             
             "xuanxiang":[
             				"devote to",
             				"attend to",
             				"attribute to",
             				"contribute to",
             				]
        },{  
             "id" : "9",  
             "title": "He who hesitates is lost.（）",  
             
             "xuanxiang":[
             				"犹豫就会败北",
             				"当断不断，反受其乱。",
             				"迷途当知返",
             				"茫然中迷失自我",
             				]
        },{  
             "id" : "10",  
             "title": "革命者: ",  
			 "type": "input",
             "content": ""
        }
        ];
        

