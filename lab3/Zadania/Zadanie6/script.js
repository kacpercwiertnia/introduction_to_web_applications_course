const phoneBook = document.querySelector("header");
const phoneBookForm = document.getElementById("contactBookForm");

phoneBookForm.addEventListener("submit", e => {
    e.preventDefault();

    let name = phoneBookForm["name"].value;
    let phone = phoneBookForm["tel"].value;

    phoneBookForm["name"].value = "";
    phoneBookForm["tel"].value = "";

    let nowy_article = document.createElement("article");
    let nowy_section = document.createElement("section");
    nowy_article.appendChild(nowy_section);

    let nowy_h5_name = document.createElement("h5");
    nowy_h5_name.className = "fullname";
    nowy_h5_name.innerHTML = name;
    nowy_section.appendChild(nowy_h5_name);

    let nowy_h5_phone = document.createElement("h5");
    nowy_h5_phone.className = "phone";
    nowy_h5_phone.innerHTML = phone;
    nowy_section.appendChild(nowy_h5_phone);

    let nowy_span = document.createElement("span");
    nowy_span.className = "material-symbols-outlined";
    nowy_span.innerHTML = "delete";
    
    nowy_span.addEventListener("click", e => {
        phoneBook.removeChild(nowy_article);
    });

    nowy_article.appendChild(nowy_span);

    phoneBook.appendChild(nowy_article);
});