$(document).ready(function() {
    $('#langs').on('change',function(){
        var lang=$(this).val()
        var langValue='';
        if(lang === 'tw'){
            langValue='index.html'
        }else if(lang === 'en' ){
            langValue='index-en.html'
        }else if(lang === 'jp' ){
            langValue='index-jp.html'
        }else if(lang === 'fr' ){
            langValue='index-en.html'
        }else if(lang === 'es' ){
            langValue='index-es.html'
        }else if(lang === 'kr' ){
            langValue='index-kr.html'
        }
        location.href=langValue
    })
    var swiper2 = new Swiper('#page2-swiper', {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
            el: '#page2-swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            1024: {
            slidesPerView: 4,
            spaceBetween: 40,
            },
            768: {
            slidesPerView: 3,
            spaceBetween: 30,
            },
            640: {
            slidesPerView: 2,
            spaceBetween: 20,
            },
            320: {
            slidesPerView: 1,
            spaceBetween: 10,
            }
        }
    });
    var swiper6 = new Swiper('#page6-swiper', {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
            el: '#page6-swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            1024: {
            slidesPerView: 4,
            spaceBetween: 40,
            },
            768: {
            slidesPerView: 3,
            spaceBetween: 30,
            },
            640: {
            slidesPerView: 2,
            spaceBetween: 20,
            },
            320: {
            slidesPerView: 1,
            spaceBetween: 10,
            }
        }
    });
    var swiper8 = new Swiper('#page8-swiper', {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
            el: '#page8-swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            1024: {
            slidesPerView: 4,
            spaceBetween: 40,
            },
            768: {
            slidesPerView: 3,
            spaceBetween: 30,
            },
            640: {
            slidesPerView: 2,
            spaceBetween: 20,
            },
            320: {
            slidesPerView: 1,
            spaceBetween: 10,
            }
        }
    });
    $(window).scroll(function(){
        if( $(document).scrollTop() > $('section.page1').offset().top ){
            $('.top').addClass('active')
        }else{
            $('.top').removeClass('active')
        }
    })
    $('.top').on('click',function(){
        $('html,body').animate({
            scrollTop:0
        },500)
    })
    $('#submit').on('click', function(e) {
        e.preventDefault();
        var lang=$('#app').attr('data-lang');
        
        var contact = $('#contact').val();
        var mail = $('#email').val();
        var info = $('#info').val();

        if(contact == '') {
            alert(langNotice(lang).contact);
            return false;
        }
        if(!validateEmail(mail)) {
            alert(langNotice(lang).mail);
            return false;
        }
        $.ajax({
            method: 'GET',
            url: 'session.key.php',
            dataType : 'json'
        })
        .done(function( response ) {
            var key = response.key;
            $.ajax({
                method: 'POST',
                url: 'notification.php',
                data: {
                    contact: contact,
                    mail : mail,
                    info : info,
                    key	 : key,
                },
                dataType : 'json'
            })
            .done(function( response ) {
                if(response.status == 1) {
                    alert(langNotice(lang).done);
                }
                else {
                    alert('您好，佛系工程師不寫錯誤敘述，再試一次，緣分到了，自然就寄出了。');
                }
            })
            .fail(function() {
                alert(langNotice(lang).error);
                return false;
            });
        })
        .fail(function() {
            alert('您正在遭遇不可名狀的錯誤，請稍後再試一次。');
            return false;
        });
    });
});
function langNotice(lang){
    var noticeObj={}
    if(lang == 'tw'){
        noticeObj={
            contact:"請輸入聯絡人",
            mail:"請輸入正確的電子郵件",
            done:"您好，我們已經收到相關內容，會盡速與您聯繫。",
            error:"您正在遭遇無法敘述的錯誤，請稍後再試一次。"
        }
    }else if(lang == 'en'){
        noticeObj={
            contact:"Please enter your name.",
            mail:"Please check your email format and enter again.",
            done:"Thank you for messaging us. We will get back to you as soon as possible.",
            error:"System error. Please try again in a few minutes."
        }
    }else if(lang == 'jp'){
        noticeObj={
            contact:"お名前を入力してください。",
            mail:"メールアドレスの形式に誤りがあります。正しく入力してください。",
            done:"この度はお問い合わせ頂き誠にありがとうございます。",
            error:"内部エラーが発生しました。しばらくしてからもう一度お試しください。"
        }
    }else if(lang == 'fr'){
        noticeObj={
            contact:"Veuillez rentrer votre nom.",
            mail:"Veuillez vérifier le format de votre adresse Email et rentrez la à nouveau.",
            done:"Merci de nous avoir contacté. On vous répondra dès que possible.",
            error:"Erreur. Veuillez réessayer dans quelques minutes."
        }
    }else if(lang == 'es'){
        noticeObj={
            contact:"Por favor, escriba su nombre.",
            mail:"Por favor verifique el formato del correo electrónico y vuelva a ingresarlo.",
            done:"Gracias por contactárnos. Le responderemos lo antes posible.",
            error:"Error. Por favor, inténtelo de nuevo en unos minutos."
        }
    }else if(lang == 'kr'){
        noticeObj={
            contact:"성함을 입력하세요.",
            mail:"이메일 주소를 입력하세요.",
            done:"감사합니다! 메시지가 전송되었습니다. ",
            error:"시스템 에러발생! 잠시후 다시 이용해주세요. "
        }
    }
    return noticeObj;
}
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}