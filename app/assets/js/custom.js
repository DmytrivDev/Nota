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
  $(".contact__form").submit(function () {
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

const progressItems = document.querySelectorAll(".progress-step__item");
const progressLines = document.querySelectorAll(".progress-step__line");

function createblockMistake(part) {
  const errorBlock = document.createElement("div");
  errorBlock.classList.add("block-mistake");
  errorBlock.innerHTML = `
        <h3 class="block-mistake__title">
          Oops! There seems to have been a mistake.
        </h3>
        <p class="block-mistake__text">
          Please double-check your data and fill in all required fields to continue.
        </p>
      `;
  part.appendChild(errorBlock);
}

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

function checkRequiredInputs(part) {
  const labelDefs = part.querySelectorAll(".label-def");
  let allFilled = true;

  labelDefs.forEach((label) => {
    const input = label.querySelector("input, select, textarea");
    const inputRadio = label.querySelectorAll('input[type="radio"]');
    const canvas = label.querySelector(".block-signature__pad");

    if (input && !label.classList.contains("is-optional")) {
      if (input.type === "radio") {
        const allUnchecked = Array.from(inputRadio).every(
          (radio) => !radio.checked
        );
        if (allUnchecked) {
          label.classList.add("required-field");
          allFilled = false;
        } else {
          label.classList.remove("required-field");
        }
      } else if (input.type === "file") {
        if (!input.files || input.files.length === 0) {
          label.classList.add("required-field");
          allFilled = false;
        } else {
          label.classList.remove("required-field");
        }
      } else if (!input.value.trim()) {
        label.classList.add("required-field");
        allFilled = false;
      } else if (input.dataset.id === "date-info") {
        const datePattern =
          /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        if (!datePattern.test(input.value)) {
          label.classList.add("required-field");
          allFilled = false;
        } else {
          label.classList.remove("required-field");
        }
      } else if (input.type === "email") {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(input.value)) {
          label.classList.add("required-field");
          allFilled = false;
        } else {
          label.classList.remove("required-field");
        }
      } else if (input.dataset.id === "contact-code") {
        const numberPattern = /^\+\d{1,3}$/;
        if (!numberPattern.test(input.value)) {
          label.classList.add("required-field");
          allFilled = false;
        } else {
          label.classList.remove("required-field");
        }
      } else {
        label.classList.remove("required-field");
      }
    }

    // Проверяем заполненность канваса
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const isCanvasFilled = Array.from(data).some(
        (value, index) => index % 4 === 3 && value > 0
      );

      if (!isCanvasFilled) {
        label.classList.add("required-field");
        allFilled = false;
      } else {
        label.classList.remove("required-field");
      }
    }
  });

  return allFilled;
}

function updateNextButtonState(part) {
  const btnNext = part.querySelector(".btn-wrapp__next");
  const btnSubmit = part.querySelector(".btn-wrapp__submit");
  const blockMistake = part.querySelector(".block-mistake");

  if (checkRequiredInputs(part)) {
    btnNext?.classList.remove("disabled");
    btnNext?.removeAttribute("disabled");

    btnSubmit?.classList.remove("disabled");
    btnSubmit?.removeAttribute("disabled");

    // Удалить блок ошибки, если он существует
    if (blockMistake) {
      blockMistake.remove();
    }
  } else {
    btnNext?.classList.add("disabled");
    btnNext?.setAttribute("disabled", "true");

    btnSubmit?.classList.add("disabled");
    btnSubmit?.setAttribute("disabled", "true");

    // Добавить блок ошибки, если его нет
    if (!blockMistake) {
      createblockMistake(part);
    }
  }
}

function handleStepChange(event) {
  event.preventDefault();
  const button = event.currentTarget;
  const dataId = button.dataset.id;
  const targetStep = document.getElementById(dataId);

  const currentStep = document.querySelector(".form-part-visible");

  const buttonStepNow = button.classList.contains("btn-wrapp__next");

  // Проверка обязательных полей перед переходом
  if (buttonStepNow) {
    initializeFormValidation(currentStep);
    if (!checkRequiredInputs(currentStep)) {
      return;
    }
  }

  if (currentStep && targetStep) {
    currentStep.classList.remove("form-part-visible");
    currentStep.classList.add("form-part-hidden");

    targetStep.classList.remove("form-part-hidden");
    targetStep.classList.add("form-part-visible");

    setTimeout(() => {
      currentStep.classList.remove("is-transition");
      targetStep.classList.add("is-transition");
    }, 10);

    window.scrollTo(0, 0);

    const targetStepIndex =
      [...progressItems].findIndex(
        (item) => item.dataset.step === targetStep.id
      ) + 1;
    updateProgress(targetStepIndex);

    const canvas = document.querySelector(".block-signature__pad");
    resizeCanvas(canvas);

    if (buttonStepNow) {
      initializeFormValidation(currentStep);
    }
  }
}

function initializeFormValidation(part) {
  const inputs = part.querySelectorAll("input, select, textarea");

  inputs.forEach((input) => {
    if (
      input.tagName.toLowerCase() === "select" ||
      input.type === "radio" ||
      input.type === "file"
    ) {
      input.addEventListener("change", () => {
        updateNextButtonState(part);
      });
    } else {
      input.addEventListener("input", () => {
        updateNextButtonState(part);
      });
    }
  });
  // Добавляем проверку для канваса
  signatureBlocks.forEach((block) => {
    const canvas = block.querySelector(".block-signature__pad");
    if (canvas) {
      const ctx = canvas.getContext("2d");

      // Проверка заполненности канваса
      // const isCanvasFilled = () => {
      //   const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      //   const data = imageData.data;
      //   return Array.from(data).some(
      //     (value, index) => index % 4 === 3 && value > 0
      //   );
      // };

      // Добавляем событие для обновления состояния кнопки
      canvas.addEventListener("mouseup", () => {
        updateNextButtonState(part);
      });

      canvas.addEventListener("mouseup", () => {
        updateNextButtonState(part);
      });

      canvas.addEventListener("mouseout", () => {
        updateNextButtonState(part);
      });

      canvas.addEventListener("touchend", () => {
        updateNextButtonState(part);
      });
    }
  });

  updateNextButtonState(part);
}

document
  .querySelectorAll(".btn-wrapp__next, .btn-wrapp__back")
  .forEach((button) => {
    button.addEventListener("click", handleStepChange);
  });

function handleStepSubmit(btnSubmit) {
  const dataId = btnSubmit.dataset.id;
  const targetStep = document.getElementById(dataId);

  const currentStep = document.querySelector(".form-part-visible");

  initializeFormValidation(currentStep);
  if (!checkRequiredInputs(currentStep)) {
    return false;
  }

  if (currentStep && targetStep) {
    currentStep.classList.remove("form-part-visible");
    currentStep.classList.add("form-part-hidden");

    targetStep.classList.remove("form-part-hidden");
    targetStep.classList.add("form-part-visible");

    setTimeout(() => {
      currentStep.classList.remove("is-transition");
      targetStep.classList.add("is-transition");
    }, 100);

    window.scrollTo(0, 0);

    const targetStepIndex =
      [...progressItems].findIndex(
        (item) => item.dataset.step === targetStep.id
      ) + 1;
    updateProgress(targetStepIndex);

    return true;
  }
}

//=============================================

function validateInputPhone() {
  const inputs = document.querySelectorAll('input[data-id="contact-phone"]');

  inputs.forEach((input) => {
    input.addEventListener("input", (event) => {
      event.target.value = event.target.value.replace(/[^0-9\s]/g, "");

      event.target.value = event.target.value.replace(/\s+/g, " ");
    });

    input.addEventListener("keypress", (event) => {
      const isNumber = /[0-9]/.test(event.key);
      const isSpace = event.key === " ";

      if (!isNumber && !isSpace) {
        event.preventDefault();
      }
    });

    input.addEventListener("change", (event) => {
      event.target.value = event.target.value.replace(/[^0-9\s]/g, "");

      event.target.value = event.target.value.replace(/\s+/g, " ");
    });
  });
}

validateInputPhone();

function validateInputCode() {
  const inputs = document.querySelectorAll('input[data-id="contact-code"]');

  inputs.forEach((input) => {
    input.addEventListener("focus", (event) => {
      if (!event.target.value.startsWith("+")) {
        event.target.value = "+";
      }
    });

    input.addEventListener("input", (event) => {
      event.target.value =
        "+" + event.target.value.slice(1).replace(/[^\d\s]/g, "");

      const digits = event.target.value.slice(1).replace(/\s+/g, "");
      event.target.value = "+" + digits.slice(0, 3);

      if (digits.length < 3 && event.data === " ") {
        event.target.value += " ";
      }
    });

    input.addEventListener("keypress", (event) => {
      const isNumber = /[0-9]/.test(event.key);
      const isSpace = event.key === " ";
      const digits = event.target.value.slice(1).replace(/\s+/g, "");

      if ((!isNumber && !isSpace) || (isNumber && digits.length >= 3)) {
        event.preventDefault();
      }
    });

    input.addEventListener("change", (event) => {
      const digits = event.target.value.slice(1).replace(/\s+/g, "");
      event.target.value = "+" + digits.slice(0, 3);
    });

    input.addEventListener("blur", (event) => {
      if (event.target.value === "+") {
        event.target.value = "";
      }
    });
  });
}

validateInputCode();

function validateInputDate() {
  const inputs = document.querySelectorAll('input[data-id="date-info"]');

  inputs.forEach((input) => {
    input.addEventListener("input", (event) => {
      const cursorPosition = event.target.selectionStart;
      let value = event.target.value.replace(/\D/g, "");

      if (value.length > 2 && value.length <= 4) {
        value = `${value.slice(0, 2)}/${value.slice(2)}`;
      } else if (value.length > 4) {
        value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(
          4,
          8
        )}`;
      }

      event.target.value = value;

      if (value.length <= 2) {
        event.target.setSelectionRange(cursorPosition, cursorPosition);
      } else if (value.length <= 5) {
        event.target.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
      } else {
        event.target.setSelectionRange(cursorPosition + 2, cursorPosition + 2);
      }

      const datePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
      if (!datePattern.test(value)) {
        input.setCustomValidity(
          "Please enter a valid date in DD/MM/YYYY format."
        );
      } else {
        const [day, month, year] = value.split("/").map(Number);
        const date = new Date(year, month - 1, day);

        if (
          date.getDate() !== day ||
          date.getMonth() !== month - 1 ||
          date.getFullYear() !== year
        ) {
          input.setCustomValidity("Invalid date.");
        } else {
          input.setCustomValidity("");
        }
      }
    });

    input.addEventListener("change", (event) => {
      const value = event.target.value;
      const datePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

      if (!datePattern.test(value)) {
        input.setCustomValidity(
          "Please enter a valid date in DD/MM/YYYY format."
        );
      } else {
        const [day, month, year] = value.split("/").map(Number);
        const date = new Date(year, month - 1, day);

        if (
          date.getDate() !== day ||
          date.getMonth() !== month - 1 ||
          date.getFullYear() !== year
        ) {
          input.setCustomValidity("Invalid date.");
        } else {
          input.setCustomValidity("");
        }
      }
    });
  });
}

validateInputDate();

//=============================================

const fileInputs = document.querySelectorAll(".block-file__input");

fileInputs.forEach((fileInput) => {
  fileInput.addEventListener("change", function () {
    const blockFileContent = fileInput.closest(".block-file__content");
    const fileText = blockFileContent.querySelector(".block-file__text");
    const fileImg = blockFileContent.querySelector(".block-file__img");

    if (fileInput.files.length > 0) {
      fileText.classList.add("file-uploaded");
      fileImg.classList.add("file-uploaded");
      fileText.textContent = `Uploaded file name ${fileInput.files[0].name}`;
    } else {
      fileText.classList.remove("file-uploaded");
      fileImg.classList.remove("file-uploaded");
      fileText.textContent = "Drag and drop files here";
    }
  });
});

function clearInputFile(classForm) {
  const fileInputs = classForm.querySelectorAll('input[type="file"]');
  fileInputs.forEach((fileInput) => {
    const blockFileContent = fileInput.closest(".block-file__content");
    const fileText = blockFileContent.querySelector(".block-file__text");
    const fileImg = blockFileContent.querySelector(".block-file__img");

    fileText.classList.remove("file-uploaded");
    fileImg.classList.remove("file-uploaded");
    fileText.textContent = "Drag and drop files here";
  });
}

//=============================================

const signatureBlocks = document.querySelectorAll(".block-signature");

function initializeSignaturePad() {
  signatureBlocks.forEach((block) => {
    const canvas = block.querySelector(".block-signature__pad");
    const clearButton = block.querySelector(".block-signature__clear");
    const contentBlock = block.querySelector(".block-signature__content");

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    block.appendChild(canvas); // Добавляем канвас в блок
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    // Функция для проверки, заполнен ли холст
    function isCanvasFilled() {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      return Array.from(data).some(
        (value, index) => index % 4 === 3 && value > 0
      );
    }

    // Функция для рисования
    function draw(e) {
      if (!isDrawing) return;

      ctx.strokeStyle = "#ffffff";
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.moveTo(lastX, lastY);

      const x =
        e.offsetX || (e.touches ? e.touches[0].clientX - canvas.offsetLeft : 0);
      const y =
        e.offsetY || (e.touches ? e.touches[0].clientY - canvas.offsetTop : 0);

      ctx.lineTo(x, y);
      ctx.stroke();

      [lastX, lastY] = [x, y];

      // Проверка заполненности холста
      if (isCanvasFilled()) {
        contentBlock.style.display = "none";
        const label = block.closest(".label-def");
        if (label) {
          label.classList.remove("required-field");
        }
      } else {
        contentBlock.style.display = "flex";
      }
    }

    // Обработчики событий для мыши
    canvas.addEventListener("mousedown", (e) => {
      isDrawing = true;
      [lastX, lastY] = [e.offsetX, e.offsetY];
    });

    canvas.addEventListener("mousemove", draw);

    canvas.addEventListener("mouseup", () => {
      isDrawing = false;
    });

    canvas.addEventListener("mouseout", () => {
      isDrawing = false;
    });

    // Обработчики событий для сенсорных экранов
    canvas.addEventListener("touchstart", (e) => {
      isDrawing = true;
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      [lastX, lastY] = [touch.clientX - rect.left, touch.clientY - rect.top];
      e.preventDefault();
    });

    canvas.addEventListener("touchmove", (e) => {
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      draw({ offsetX: x, offsetY: y });
      e.preventDefault();
    });

    canvas.addEventListener("touchend", () => {
      isDrawing = false;
    });

    clearButton.addEventListener("click", () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      contentBlock.style.display = "flex";

      const label = block.closest(".label-def");
      if (label) {
        label.classList.add("required-field");
      }
    });
  });
}

function resizeCanvas(canvas) {
  if (canvas && canvas.offsetWidth !== 0) {
    if (canvas.offsetWidth !== canvas.width) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
  }
}

function clearContentCanvas(classForm) {
  const signatureBlocks = classForm.querySelectorAll(".block-signature__pad");
  const contentBlock = classForm.querySelector(".block-signature__content");
  signatureBlocks.forEach((canvas) => {
    const context = canvas.getContext("2d", { willReadFrequently: true });
    context.clearRect(0, 0, canvas.width, canvas.height);
    contentBlock.style.display = "flex";
  });
}

function saveSignatureCanvas(classForm) {
  const signatureBlocks = classForm.querySelectorAll(".block-signature__pad");
  signatureBlocks.forEach((canvas) => {
    const signatureData = canvas.toDataURL("image/png");

    document.getElementById("signInput").value = signatureData;
  });
}

window.addEventListener("resize", () => {
  const canvas = document.querySelectorAll(".block-signature__pad");
  canvas.forEach(resizeCanvas);
});

initializeSignaturePad();

//=============================================

const addBeneficialItem = document
  .getElementById("blockAdd-beneficial")
  ?.querySelector(".block-add__btn");

const addManagementItem = document
  .getElementById("blockAdd-management")
  ?.querySelector(".block-add__btn");

function addBtnItemDisabled(type) {
  const addBtnItem = document
    .getElementById(`blockAdd-${type}`)
    ?.querySelector(".block-add__btn");

  const list = document.getElementById(`${type}List`);

  if (list.children.length === 6) {
    addBtnItem.classList.add("disabled");
    addBtnItem.setAttribute("disabled", "true");
  } else {
    addBtnItem.classList.remove("disabled");
    addBtnItem.removeAttribute("disabled");
  }
}

function addItem(type) {
  return function () {
    const list = document.getElementById(`${type}List`);
    const newItem = document.createElement("li");
    newItem.className = "block-add__item";

    const index = list.children.length;

    newItem.dataset.index = index + 1;

    newItem.innerHTML = `
      <div class="block-add__box">
        <div class="block-add__top">
          <h3 class="block-add__title">#0${index + 1} ${
      type.charAt(0).toUpperCase() + type.slice(1)
    } of the company</h3>
          <button type="button" class="block-add__delete">
            <svg width="24" height="24">
              <use href="https://notapay.co/wp-content/themes/notapay/assets/img/icons/icons.svg#icon-trash"></use>
            </svg>
          </button>
        </div>
        <label class="label-def">
          <p class="label-def__name">Identification Number (Identity Card, Passport No.)</p>
          <input type="text" name="${type}Entity[${index}][${type}Identification]" class="input-def" placeholder="Type here"/>
        </label>
        <label class="label-def">
          <p class="label-def__name">Full Name of Beneficial Owner</p>
          <input type="text" name="${type}Entity[${index}][${type}FullName]" class="input-def" placeholder="Type here"/>
        </label>
        <label class="label-def">
          <p class="label-def__name">Nature of Beneficial Ownership*</p>
          <input type="text" name="${type}Entity[${index}][${type}Nature]" class="input-def" placeholder="Type here"/>
        </label>
      </div>
    `;

    newItem
      .querySelector(".block-add__delete")
      .addEventListener("click", function () {
        deleteItem(this, type);
      });

    list.appendChild(newItem);

    setTimeout(() => {
      newItem.classList.add("is-visible");
    }, 10);

    updateList(type);
  };
}

function deleteItem(button, type) {
  const list = document.getElementById(`${type}List`);
  const item = button.closest(".block-add__item");
  list.removeChild(item);
  updateList(type);
}

function updateList(type) {
  const list = document.getElementById(`${type}List`);
  Array.from(list.children).forEach((item, index) => {
    item.dataset.index = index + 1;

    const title = item.querySelector(".block-add__title");

    if (type === "beneficial") {
      title.textContent = `#0${index + 1} Beneficial owners of the company`;
    } else {
      title.textContent = `#0${index + 1} Senior management of the company`;
    }

    const inputs = item.querySelectorAll("input");
    inputs[0].name = `${type}Entity[${index}][${type}Identification]`;
    inputs[1].name = `${type}Entity[${index}][${type}FullName]`;
    inputs[2].name = `${type}Entity[${index}][${type}Nature]`;

    addBtnItemDisabled(type);
  });
}

addBeneficialItem?.addEventListener("click", addItem("beneficial"));
addManagementItem?.addEventListener("click", addItem("management"));

//=============================================

const modals = document.querySelectorAll(".modal-success");

function initializeModals() {
  modals.forEach((modal) => {
    const closeButton = modal.querySelector(".modal-success__close");

    function openModal() {
      modal.classList.add("modal-open");
      document.body.classList.add("overHide");
    }

    function closeModal() {
      modal.classList.remove("modal-open");
      document.body.classList.remove("overHide");
    }

    closeButton.addEventListener("click", closeModal);

    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeModal();
      }
    });

    openModal();
  });
}

//=============================================

const preloaders = document.querySelectorAll(".preloader");

function initializePreloader(state) {
  preloaders.forEach((preloader) => {
    if (state) {
      preloader.classList.add("is-visible");
      document.body.classList.add("overHide");
    } else {
      preloader.classList.remove("is-visible");
      document.body.classList.remove("overHide");
    }
  });
}
// initializePreloader(true);

//=============================================

function submitForms(nameForm) {
  const form = document.getElementById(nameForm);

  if (!form) {
    return;
  }

  const btnSubmit = form.querySelector(".btn-wrapp__submit");

  form.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && event.target.tagName === "INPUT") {
      event.preventDefault();
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!handleStepSubmit(btnSubmit)) return;
    saveSignatureCanvas(form);

    const formData = new FormData(form);

    // Відправка даних на сервер
    $.ajax({
      type: "POST",
      url: "/wp-admin/admin-ajax.php",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        form.reset();

        // Очищення полів типу file та їх тексту
        clearInputFile(form);

        // Очищення canvas
        clearContentCanvas(form);

        initializeModals();
      },
      error: function (xhr, status, error) {
        console.error("Error sending data:", error);
      },
    });
  });
}

submitForms("formEntity");
submitForms("formIndividual");
