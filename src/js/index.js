$(function() {

    //ページトップへ戻る
    pageTop();

    //ページ内スクロール
    pageScroll();

    //PDFの一覧を取得
    pdfDataShow(getData("mdlist"), getData("config"));
});

//ページトップへ戻る
function pageTop() {
    var returnPageTop = $(".returnPageTop");

    var startPos = 0;
    $(window).on("scroll", function(){
        //スクロール距離が400pxより大きければページトップへ戻るボタンを表示
        var currentPos = $(this).scrollTop();
        if (currentPos > 400) {
            returnPageTop.fadeIn();
        } else {
            returnPageTop.fadeOut();
        }
    });

    //ページトップへスクロールして戻る
    returnPageTop.on("click", function () {
        $("body, html").animate({ scrollTop: 0 }, 1000, "easeInOutCirc");
        return false;
    });
}

//ページ内スクロール
function pageScroll() {
    var navbarHeight = parseInt($("#index").attr("data-offset"));
    var $navbar = $("#navbar");
    $navbar.find("a").on("click", function() {
        var speed = 1000;
        var href = $(this).attr("href");
        var target = $(href == "#" || href == "" ? "html" : href);
        var position = target.offset().top - navbarHeight;
        $("body, html").animate({ scrollTop:position }, speed, "easeInOutCirc");
        return false;
    });
}

//jsonを取得
function getData(attrStr) {
    var dataStr = $("#data-" + attrStr).attr("data-" + attrStr);
    var data = JSON.parse(dataStr);
    return data;
}

//PDFを表示
//引数) pdfdata: PDFのファイル名の一覧, param: パス情報
function pdfDataShow(pdfdata, param) {
    var i = 1;
    $.each(pdfdata, function(index, val) {
        var filename = val.slice(0, -3); //「.md」の3文字を削除
        PDFObject.embed("./pdf/" + filename + ".pdf", "#pdf_" + i, {
            fallbackLink: "<p>プレビューを開けませんでした。<a href='[url]'>[url]</a>にアクセスして直接PDFを参照ください。</p>"
        });
        i++;
    });
}