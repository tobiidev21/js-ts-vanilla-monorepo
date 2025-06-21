import { $ } from "./utils.js";

const urlInput = $(".url-input");
const shortLinkInput = $(".short-link-input");
const form = $(".form");
const shortenBtn = $(".shorten-button");
const copyBtn = $(".copy-button");

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

function generateShortCode(length = 6) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

shortenBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(urlInput);

  const originalUrl = urlInput.value.trim();

  if (!isValidUrl(originalUrl)) {
    alert("Por favor ingresa una URL válida.");
    return;
  }

  const code = generateShortCode();
  const fakeShortUrl = `${originalUrl}/r/${code}`;

  shortLinkInput.value = fakeShortUrl;
});

copyBtn.addEventListener("click", async () => {
  await navigator.clipboard.writeText(shortLinkInput.value).then(() => {
    alert("The link has been copied to the clipboard");
  });
});
