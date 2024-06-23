function scrollFooter(scrollY, heightFooter) {
    // console.log(scrollFooter);
    const body = document.body;
    const html = document.documentElement;
    const bdheight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
    );
    const n = bdheight - heightFooter - $(window).height();

    if (scrollY >= n) {
        $(".background").css({
            position: "absolute",
        });
    } else {
        $(".background").css({
            position: "fixed",
        });
    }
}