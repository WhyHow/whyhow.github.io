var fetchingContent = false;

function yHandler() {
    var wrap = $('.posts')[0];
    var contentHeight = wrap.offsetHeight;
    var yOffset = window.pageYOffset;
    var y = yOffset + window.innerHeight;

    if (y >= contentHeight && !fetchingContent) {
        fetchingContent = true;
        $(".load:last").load(urls[index] + " div.post", function() {
            index += 1;
            $(this).append('<div class="writecomments"><a href="' + urls[index - 1] + '#comments">不吐不快？添加评论吧！</a></div>');
            if (index >= urls.length) {
                fetchingContent = true;
                $('#next').removeAttr('href');
                $('#next').html('未发现更多内容');
            } else {
                fetchingContent = false;
                $('.posts').append('<div class="load"/>');
                $('#next').attr('href', urls[index]);
            }
            yHandler(); //这里不递归不科学
        });
    }
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
}

function handleSaying() {
    var wrap = $('.sayings')[0];
    var contentHeight = wrap.offsetHeight;
    var yOffset = window.pageYOffset;
    var y = yOffset + window.innerHeight;

    if (y >= contentHeight && !fetchingContent) {
        fetchingContent = true;
        $(".load:last").load(urls[index] + " div.saying", function() {
            index += 1;
            $(this).append('<div class="writecomments"><a href="' + urls[index - 1] + '#comments">我也说两句</a></div>');
            if (index >= urls.length) {
                fetchingContent = true;
                $('#next').removeAttr('href');
                $('#next').html('未发现更多内容');
            } else {
                fetchingContent = false;
                $('.sayings').append('<div class="load"/>');
                $('#next').attr('href', urls[index]);
            }
            handleSaying(); //这里不递归不科学
        });
    }
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
}


$(document).ready(function() {

    // hide #back-top first
    $("#back-top").hide();

    // fade in #back-top
    $(function() {
        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                $('#back-top').fadeIn();
            } else {
                $('#back-top').fadeOut();
            }
        });

        // scroll body to 0px on click
        $('#back-top a').click(function() {
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    });

    // get index list
    $('#getlist').on('click', function(e) {
        e.preventDefault();
        if ($('#indexcontainer').html().length > 0) {
            $('#indexcontainer').html("");
        } else {
            $('#indexcontainer').load($(this).attr('href'));
        }
    });

    // Update latest posts list
    $('#news-checkbox').on('click', function(a) {
        if (a.target.checked) {
            $.getJSON('/search/news.json?nocache=' + (new Date()).getTime(), function(rep) {
                $('.postlist').html('');
                $(rep.posts).each(function(i, n) {
                    $('#newslist').append('<li class="posttitle"><a href="' + n.url + '">' + n.title + "</a></li>");
                });
                $('#newslist').append('<li class="posttitle">  <form method="get" action="/search" data-search-form=""><input type="search" name="q" id="q" placeholder="请输入要搜索的字词" data-search-input=""> <input type="submit" value="搜索">  </form></li>');
            })
        }
    })



});

var cat2ind = new Array();
cat2ind['思'] = 1;
cat2ind['行'] = 2;
cat2ind['听'] = 3;
cat2ind['说'] = 4;
cat2ind['读'] = 5;
cat2ind['写'] = 6;