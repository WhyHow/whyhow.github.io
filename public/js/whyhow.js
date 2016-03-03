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
            $(this).append('<div class="writecomments"><a href="'+urls[index-1]+'#comments">我也说两句</a></div>');
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
}

var getIndex = function() {
    $('#getlist').on('click', function(e) {
        e.preventDefault();
        if ($('#indexcontainer').html().length > 0) {
            $('#indexcontainer').html("");
        } else {
            $('#indexcontainer').load($(this).attr('href'));
        }
    })
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

});
