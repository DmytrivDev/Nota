$(function () {
  $(".lang__nav > li > a").click(function (e) {
    e.preventDefault();
  });

  if ($(".serve__carousel").length > 0) {
    serveCarousell();

    $(".serve__item").hover(function () {
      $(this).find(".serve__dsc").slideToggle(200);
    });
  }

  if ($(".serve__carousel2").length > 0) {
    serveCarousell2();
  }

  if ($(".differs__carousel").length > 0) {
    differsCarousell2();
  }

  $("a.ankor, .ankor a").click(function (e) {
    e.preventDefault();
    var thisAnk = $(this).attr("href"),
      $target = $(thisAnk),
      offset = $target.offset().top;

    $("html, body")
      .stop()
      .animate({ scrollTop: offset }, 1000, "swing", function () {});

    $("body").removeClass("openedNav");
  });

  $(".main__arrow").click(function () {
    var sec = $(this).closest("section"),
      next = sec.next(),
      offset = next.offset().top;

    $("html, body")
      .stop()
      .animate({ scrollTop: offset }, 1000, "swing", function () {});
  });

  //Form submit
  $("form").submit(function () {
    var th = $(this);

    $.ajax({
      type: "POST",
      url: "/wp-admin/admin-ajax.php",
      data: th.serialize(),
    }).done(function (resp) {
      setTimeout(function () {
        $(".popup").fadeOut(300);
        if (resp !== "error") {
          $("#thanks").fadeIn(300);
        } else {
          $("#error").fadeIn(300);
        }
        $("body").addClass("overHide");
      }, 500);
      setTimeout(function () {
        th[0].reset();
      }, 800);
    });
    return false;
  });

  if ($("#contact").length === 0) {
    $(".contactAnkor").each(function () {
      var $this = $(this),
        cont = $this.find("a"),
        text = cont.text(),
        href = cont.attr("href"),
        homeUrl = $("#dataHome").data().home,
        url = homeUrl + "/" + href;

      $this.removeClass("ankor");
      $this.html('<a href="' + url + '">' + text + "</a>");
    });
  }
});

function serveCarousell() {
  var owl = $(".serve__carousel").owlCarousel({
    smartSpeed: 500,
    mouseDrag: true,
    autoplay: false,
    center: false,
    addClassActive: true,
    loop: false,
    dots: false,
    dotsEach: 1,
    touchDrag: true,
    dotsSpeed: 500,
    stagePadding: 0,
    responsive: {
      0: {
        items: 1,
        margin: 16,
        nav: false,
        loop: true,
      },
      620: {
        items: 2,
        margin: 16,
        nav: false,
        loop: false,
      },
      760: {
        items: 3,
        margin: 16,
        nav: false,
        loop: false,
      },
      960: {
        items: 4,
        margin: 24,
        nav: true,
        loop: false,
      },
    },
  });
}

function serveCarousell2() {
  var owl = $(".serve__carousel2").owlCarousel({
    smartSpeed: 500,
    mouseDrag: true,
    autoplay: false,
    center: false,
    addClassActive: true,
    loop: false,
    dots: false,
    dotsEach: 1,
    nav: true,
    touchDrag: true,
    dotsSpeed: 500,
    stagePadding: 0,
    responsive: {
      0: {
        items: 1,
        margin: 16,
        loop: true,
      },
      620: {
        items: 2,
        margin: 16,
        loop: false,
      },
      760: {
        items: 3,
        margin: 16,
        loop: false,
      },
      960: {
        items: 4,
        margin: 24,
        loop: false,
      },
    },
  });
}

function differsCarousell2() {
  var owl = $(".differs__carousel").owlCarousel({
    smartSpeed: 500,
    mouseDrag: true,
    autoplay: false,
    center: false,
    addClassActive: true,
    dots: false,
    autoHeight: true,
    dotsEach: 1,
    items: 1,
    margin: 16,
    loop: false,
    nav: true,
    touchDrag: true,
    dotsSpeed: 500,
    stagePadding: 0,
  });
}

function faq($this) {
  event.preventDefault();

  var item = $this.closest(".faq__item"),
    answer = item.find(".faq__answer");

  item.toggleClass("opened");
  answer.slideToggle(300);
  item.siblings().removeClass("opened");
  item.siblings().find(".faq__answer").slideUp(300);
}

function openNav() {
  event.preventDefault();

  $("body").toggleClass("openedNav");
}

function openPopup($this) {
  event.preventDefault();

  var href = $this.attr("href"),
    popup = $(href);

  popup.fadeToggle(300);
  $("body").toggleClass("overHide");
}

//Submit form
function sendMail($this) {
  event.preventDefault();

  var thisForm = $this.closest("form"),
    thisRequired = thisForm.find(".required");

  var errorsCount = 0;
  thisRequired.each(function () {
    var input = $(this),
      inputVal = input.val(),
      reqType = input.attr("type");

    if (reqType === "tel") {
      if (inputVal.length < 8) {
        errorsCount += 1;

        input.addClass("error");
      }
    }
    if (reqType === "text") {
      if (inputVal.length < 1) {
        errorsCount += 1;

        input.addClass("error");
      }
    }
    if (reqType === "email") {
      if (!isValidEmailAddress(inputVal)) {
        errorsCount += 1;

        input.addClass("error");
      }
    }
  });

  if (errorsCount === 0) {
    thisForm.submit();
  }

  $("input").focusin(function () {
    $(".error").removeClass("error");
  });
}

function isValidEmailAddress(emailAddress) {
  var pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );
  return pattern.test(emailAddress);
}

//=============================================

const buttonsNext = document.querySelectorAll(".btn-wrapp__next");
const buttonsBack = document.querySelectorAll(".btn-wrapp__back");
const progressItems = document.querySelectorAll(".progress-step__item");
const progressLines = document.querySelectorAll(".progress-step__line");

function updateProgress(currentStepIndex) {
  progressItems.forEach((item, index) => {
    if (index === currentStepIndex - 1) {
      item.classList.add("item-part");
    } else {
      item.classList.remove("item-part");
    }

    if (index === currentStepIndex - 1) {
      if (progressLines[index]) {
        progressLines[index].classList.add("line-part");
      }
    } else {
      if (progressLines[index]) {
        progressLines[index].classList.remove("line-part");
      }
    }
  });
}

function handleStepChange(event) {
  event.preventDefault();
  const button = event.currentTarget;
  const dataId = button.dataset.id;
  const targetStep = document.getElementById(dataId);

  const currentStep = document.querySelector(".form-part-visible");

  if (currentStep && targetStep) {
    currentStep.classList.remove("form-part-visible");
    currentStep.classList.add("form-part-hidden");

    targetStep.classList.remove("form-part-hidden");
    targetStep.classList.add("form-part-visible");

    const targetStepIndex =
      [...progressItems].findIndex(
        (item) => item.dataset.step === targetStep.id
      ) + 1;
    updateProgress(targetStepIndex);
  }
}

buttonsNext.forEach((button) => {
  button.addEventListener("click", handleStepChange);
});

buttonsBack.forEach((button) => {
  button.addEventListener("click", handleStepChange);
});

console.log("object");
