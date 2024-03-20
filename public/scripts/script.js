const navdropdownBtn = document.getElementById("navdropdownBtn");
let isClassAddedInNavDropdown = true;

navdropdownBtn.addEventListener("click", () => {

    const dropdownLinks = document.getElementById("dropdownLinks");
    if (!isClassAddedInNavDropdown) {
        dropdownLinks.classList.add("hidden");
        isClassAddedInNavDropdown = true;
    } else {
        dropdownLinks.classList.remove("hidden");
        isClassAddedInNavDropdown = false;
    }
});
