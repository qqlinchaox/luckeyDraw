
var nametxt = $('.slot');
var phonetxt = $('.name');
var pcount = xinm.length-1;//参加人数
var runing = true;
var trigger = true;
var inUser = (Math.floor(Math.random() * 10000)) % 5 + 1;
var num = 0;
var Lotterynumber = 3; //设置单次抽奖人数
var maxNumber = 3

function init() {
  nametxt.css('background-image','url('+xinm[0]+')');
  phonetxt.html(phone[0]);
};

// 开始停止
function start() {
  if (runing) {
    console.log(xinm.length)
    if ( xinm.length < Lotterynumber ) {
      alert("抽奖人数不足"+Lotterynumber+"人");
    }else{
      runing = false;
      $('#start').text('停止');
      startNum()
    }

  } else {
    $('#start').text('自动抽取中('+ Lotterynumber+')');
    zd();
  }
  
}

// 开始抽奖

function startLuck() {
  runing = false;
  $('#btntxt').removeClass('start').addClass('stop');
  startNum()
}

// 循环参加名单
function startNum() {
  num = Math.floor(Math.random() * (xinm.length));
  nametxt.css('background-image','url('+xinm[num]+')');
  phonetxt.html(phone[num]);
  t = setTimeout(startNum, 0);
}

// 停止跳动
function stop() {
  pcount = xinm.length;
  clearInterval(t);
  t = 0;
}

// 打印中奖人

function zd(pcount) {
  if (trigger) {
    trigger = false;
    var i = 0;
    if ( xinm.length >= Lotterynumber ) {
      stopTime = window.setInterval(function () {
        if (runing) {
          runing = false;
          $('#btntxt').removeClass('start').addClass('stop');
          startNum();
        } else {
          runing = true;
          $('#btntxt').removeClass('stop').addClass('start');
          stop();

          i++;
          Lotterynumber--;

          $('#start').text('自动抽取中('+ Lotterynumber+')');

          if ( i == maxNumber ) {
            console.log("抽奖结束");
            window.clearInterval(stopTime);
            $('#start').text("开始");
            Lotterynumber = maxNumber;
            trigger = true;
          };

//        if ( Lotterynumber == inUser) {
//          // 指定中奖人
//          nametxt.css('background-image','url(img/7.jpg)');
//          phonetxt.html('指定中奖人');
//          $('.luck-user-list').prepend("<li><div class='portrait' style='background-image:url(img/7.jpg)'></div><div class='luckuserName'>指定中奖人</div></li>");
//          $('.modality-list ul').append("<li><div class='luck-img' style='background-image:url(img/7.jpg)'></div><p>指定中奖人</p></li>");
//          inUser = 9999;
//        }else{
            //打印中奖者名单
            $('.luck-user-list').prepend("<li><div class='portrait' style='background-image:url("+xinm[num]+")'></div><div class='luckuserName'>"+phone[num]+"</div></li>");
            $('.modality-list ul').append("<li><div class='luck-img' style='background-image:url("+xinm[num]+")'></div><p>"+phone[num]+"</p></li>");
            //将已中奖者从数组中"删除",防止二次中奖
            xinm.splice($.inArray(xinm[num], xinm), 1);
            phone.splice($.inArray(phone[num], phone), 1);
//        };
        }
      },20);
    };
  }
}
