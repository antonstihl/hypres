const sections = document.querySelectorAll("section");
const iterableSections = getLinkedArray(sections);

const leftArrow = document.querySelectorAll(".arrow-left");
const rightArrow = document.querySelectorAll(".arrow-right");
const downArrow = document.querySelectorAll(".arrow-down");
const upArrow = document.querySelectorAll(".arrow-up");

addEventListener("click", () => {
  if (document.body.style.cursor === "none") {
    document.body.style.cursor = "default";
  } else {
    document.body.style.cursor = "none";
  }
});

let currentSection = iterableSections[0];
focusNext();
refreshControls();

addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") {
    e.preventDefault();
    goToNextSection();
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    goToPreviousSection();
  } else if (e.key === "ArrowRight") {
    e.preventDefault();
    focusNext();
  } else if (e.key === "ArrowLeft") {
    e.preventDefault();
    focusPrevious();
  } else if (e.key === "n") {
    e.preventDefault();
    if (getNextFocusable()) {
      focusNext();
    } else if (currentSection.next) {
      goToNextSection();
    }
  } else if (e.key === "b") {
    e.preventDefault();
    if (getPreviousFocusable()) {
      focusPrevious();
    } else if (currentSection.previous) {
      goToPreviousSection();
    }
  } else if (e.key === "r") {
    currentSection.scrollIntoView();
  }
});

function goToNextSection() {
  if (currentSection.next) {
    currentSection.next.scrollIntoView();
    currentSection = currentSection.next;
    focusNext();
    refreshControls();
  }
}

function goToPreviousSection() {
  if (currentSection.previous) {
    currentSection.previous.scrollIntoView();
    currentSection = currentSection.previous;
    focusPrevious();
    refreshControls();
  }
}

function refreshControls() {
  if (!currentSection.previous) {
    upArrow.forEach((e) => e.classList.add("hide"));
  } else {
    upArrow.forEach((e) => e.classList.remove("hide"));
  }
  if (!currentSection.next) {
    downArrow.forEach((e) => e.classList.add("hide"));
  } else {
    downArrow.forEach((e) => e.classList.remove("hide"));
  }
  if (!getNextFocusable()) {
    rightArrow.forEach((e) => e.classList.add("hide"));
  } else {
    rightArrow.forEach((e) => e.classList.remove("hide"));
  }
  if (!getPreviousFocusable()) {
    leftArrow.forEach((e) => e.classList.add("hide"));
  } else {
    leftArrow.forEach((e) => e.classList.remove("hide"));
  }
}

function focusNext() {
  currentSection.scrollIntoView();
  const nextFocusableElement = getNextFocusable();
  if (!!nextFocusableElement) {
    clearSectionFocus();
    nextFocusableElement.classList.add("focus");
    if (nextFocusableElement.classList.contains("animate-in")) {
      nextFocusableElement.classList.add("animated-in");
    }
    refreshControls();
  }
}

function focusPrevious() {
  currentSection.scrollIntoView();
  const previousFocusableElement = getPreviousFocusable();
  if (!!previousFocusableElement) {
    const focusedElement = currentSection.querySelector(".focus");
    if (previousFocusableElement !== focusedElement) {
      focusedElement.classList.remove("animated-in");
    }
    clearSectionFocus();
    previousFocusableElement.classList.add("focus");
    refreshControls();
  }
}

function clearSectionFocus() {
  currentSection
    .querySelectorAll(".focus")
    .forEach((e) => e.classList.remove("focus"));
}

function getFocusableChildren(p) {
  return Array.from(p.children).flatMap((e) => {
    if (["DIV", "UL", "OL"].includes(e.tagName)) {
      return [...getFocusableChildren(e)];
    } else {
      return [e];
    }
  });
}

function getNextFocusable() {
  const focusableElements = getFocusableChildren(currentSection);
  const focusedElementIndex = focusableElements.findIndex((e) =>
    e.classList.contains("focus")
  );
  if (focusedElementIndex === focusableElements.length - 1) {
    return undefined;
  } else {
    return focusableElements[focusedElementIndex + 1];
  }
}

function getPreviousFocusable() {
  const focusableElements = getFocusableChildren(currentSection);
  const focusedElementIndex = focusableElements.findIndex((e) =>
    e.classList.contains("focus")
  );
  if (focusedElementIndex === 0) {
    return undefined;
  } else {
    return focusableElements[focusedElementIndex - 1];
  }
}

function getLinkedArray(inputArray) {
  const linkedOutputArray = [];
  for (let i = 0; i < inputArray.length; i++) {
    linkedOutputArray[i] = inputArray[i];
  }

  for (let i = 0; i < linkedOutputArray.length; i++) {
    linkedOutputArray[i].previous =
      i > 0 ? linkedOutputArray[i - 1] : undefined;
    linkedOutputArray[i].next =
      i < linkedOutputArray.length - 1 ? linkedOutputArray[i + 1] : undefined;
  }
  return linkedOutputArray;
}
