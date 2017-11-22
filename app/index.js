import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

const splitTextToPages = (text, pageSize) => {
    let words = text.split(' ');
    let splittedText = "", length = 0, rowText = "- ";

    for(let i = 0; i < words.length; i++) {
        if(words[i][words[i].length - 1] === ':') {
            words[i] = words[i].slice(0, words[i].length - 1) + '.';
            words[i + 1] ?
                words[i + 1] = words[i + 1].charAt(0).toUpperCase() + words[i + 1].slice(1) : undefined;
        }
        if (words[i].length > 20) {
            console.log("Skipped: ", words[i]);
        } else if(words[i].length + length <= pageSize) {
            rowText += words[i] + ' ';
            length += words[i].length + 1;
        } else {
            splittedText += rowText + '\n';
            rowText = "- ";
            length = 0;
            i--;
        }
    }
    splittedText += rowText;

    return splittedText;
};

const uploadFile = (data, name) => {
    let a = document.getElementById('hidden-export'),
        blob = new Blob([data], {type: "text/plain"}),
        url = window.URL.createObjectURL(blob),
        filename = name ? name + ".yml" : "book.yml";

    if (window.navigator.msSaveOrOpenBlob)
        window.navigator.msSaveOrOpenBlob(blob, filename);
    else {
        a.href = url;
        a.target = '_blank';
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    }
};

$(document).ready (() => {
    $("#export-button").on("click", (event) => {
        event.preventDefault();
        let filename = $("#file-name-input").val(),
            title = $("#title-input").val(),
            author = $("#author-input").val(),
            text = $("#text-input").val(),
            pageSizeInput = $("#page-size-input"),
            pageSize = pageSizeInput.val() ? pageSizeInput.val() > 250 ?
                250 : pageSizeInput.val() : 225;
        let pages = splitTextToPages(text, pageSize);
        let book = `Title: ${title}\nAuthor: ${author}\nPages:\n${pages}`;
        uploadFile(book, filename)
    })
});