window.hypres = (function () {
  const hypres = {
    goToNextSection,
    goToPreviousSection,
    focusNext,
    focusPrevious,
    next: focusNextOrGoToNextSection,
    back: focusPreviousOrGoToPreviousSection,
  };

  addEventListener("DOMContentLoaded", () => {
    try {
      const slideNumber = new URLSearchParams(window.location.search).get("s");
      document
        .querySelector(`section:nth-of-type(${slideNumber})`)
        .classList.add("current");
    } catch {
      document.querySelector("section").classList.add("current");
    }
  });

  addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
      return;
    } else if (e.key === "ArrowDown" || e.key === "j") {
      e.preventDefault();
      goToNextSection();
    } else if (e.key === "ArrowUp" || e.key === "k") {
      e.preventDefault();
      goToPreviousSection();
    } else if (e.key === "ArrowRight" || e.key === "l") {
      e.preventDefault();
      focusNext();
    } else if (e.key === "ArrowLeft" || e.key === "h") {
      e.preventDefault();
      focusPrevious();
    } else if (e.key === "n") {
      e.preventDefault();
      focusNextOrGoToNextSection();
    } else if (e.key === "b") {
      e.preventDefault();
      focusPreviousOrGoToPreviousSection();
    } else if (e.key === "c") {
      document.body.classList.toggle("cursor-hidden");
    }
  });

  (function touchListener() {
    let touchstartX = 0;
    let touchendX = 0;

    function checkDirection() {
      if (touchendX < touchstartX) focusNextOrGoToNextSection();
      if (touchendX > touchstartX) focusPreviousOrGoToPreviousSection();
    }

    document.addEventListener("touchstart", (e) => {
      touchstartX = e.changedTouches[0].screenX;
    });

    document.addEventListener("touchend", (e) => {
      touchendX = e.changedTouches[0].screenX;
      checkDirection();
    });
  })();

  function goToNextSection() {
    const next = nextSection();
    if (!next) {
      return;
    }
    getCurrentSection().classList.remove("current");
    next.scrollIntoView();
    next.classList.add("current");
    refreshSlideQueryParam();
  }

  function goToPreviousSection() {
    const previous = previousSection();
    if (!previous) {
      return;
    }
    getCurrentSection().classList.remove("current");
    previous.scrollIntoView();
    previous.classList.add("current");
    refreshSlideQueryParam();
  }

  function refreshSlideQueryParam() {
    const currentSection = getCurrentSection();
    const currentIndex =
      Array.from(document.querySelectorAll("section")).findIndex(
        (section) => section === currentSection
      ) + 1;
    const params = new URLSearchParams(window.location.search);
    params.set("s", currentIndex);
    window.history.replaceState(
      {},
      "",
      decodeURIComponent(`${window.location.pathname}?${params}`)
    );
  }

  function focusNext() {
    getCurrentSection().scrollIntoView({ behavior: "instant" });
    const nextFocusable = getNextFocusable();
    if (nextFocusable) {
      clearCurrentFocus();
      focus(nextFocusable);
    }
  }

  function focusPrevious() {
    getCurrentSection().scrollIntoView({ behavior: "instant" });
    const previousFocusable = getPreviousFocusable();
    revertCurrentFocus();
    if (previousFocusable) {
      focus(previousFocusable);
    }
  }

  function focusNextOrGoToNextSection() {
    if (getNextFocusable()) {
      focusNext();
    } else {
      goToNextSection();
    }
  }

  function focusPreviousOrGoToPreviousSection() {
    if (getPreviousFocusable()) {
      focusPrevious();
    } else {
      goToPreviousSection();
    }
  }

  function focus(e) {
    e?.classList.add("current-focus", "focus-trace");
    const anchoredSelector = e.attributes["hp-f"].value;
    if (!anchoredSelector) {
      return [];
    }
    getCurrentSection()
      .querySelectorAll(`:is([hp-fa]):is(${anchoredSelector})`)
      .forEach((groupElement) =>
        groupElement.classList.add("current-focus", "focus-trace")
      );
  }

  function revertCurrentFocus() {
    getCurrentSection()
      .querySelectorAll(".current-focus")
      .forEach((el) => el.classList.remove("current-focus", "focus-trace"));
  }

  function clearCurrentFocus() {
    getCurrentSection()
      .querySelectorAll(".current-focus")
      .forEach((e) => e.classList.remove("current-focus"));
  }

  function getCurrentSection() {
    return (
      document.querySelector("section.current") ||
      document.querySelector("section")
    );
  }

  function nextSection() {
    return document.querySelector("section.current+section");
  }

  function previousSection() {
    return document.querySelector("section:has(+ .current)");
  }

  function getNextFocusable() {
    return getCurrentSection().querySelector("[hp-f]:not(.focus-trace)");
  }

  function getPreviousFocusable() {
    const previousFocusTrace = getCurrentSection().querySelectorAll(
      "[hp-f].focus-trace:not(.current-focus)"
    );
    return previousFocusTrace.length === 0
      ? undefined
      : previousFocusTrace[previousFocusTrace.length - 1];
  }

  return hypres;
})();
