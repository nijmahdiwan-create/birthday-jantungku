const pages = [
  {
    kicker: "Untuk hari istimewamu",
    title: "Selamat bertambah usia.",
    text: "Hari ini adalah tentang kamu—tentang hadirnya seseorang yang punya tempat istimewa di hidupku. Aku senang karena semesta pernah mempertemukan kita, dan hari ini aku punya alasan tambahan untuk mendoakanmu."
  },
  {
    kicker: "Hal yang ingin aku doakan",
    title: "Semoga hidup lebih ramah padamu.",
    text: "Semoga di usia yang baru ini, kamu selalu diberi kesehatan, hati yang lapang, dan keberanian untuk mengejar hal-hal yang kamu impikan. Kalau ada hari yang terasa berat, semoga kamu tetap ingat bahwa kamu sudah sejauh ini dan itu bukan hal kecil."
  },
  {
    kicker: "Jangan lupa, ya",
    title: "Kamu layak dirayakan.",
    text: "Bukan cuma hari ini, tapi juga di hari-hari biasa saat kamu sedang berusaha, belajar, atau bahkan merasa belum sampai ke mana-mana. Aku harap kamu bisa melihat dirimu dengan lebih lembut—karena ada banyak hal baik dalam dirimu yang pantas kamu syukuri."
  },
  {
    kicker: "Dari aku, untuk kamu",
    title: "Terima kasih sudah menjadi kamu.",
    text: "Aku nggak tahu semua hal yang akan menunggu di depan, tapi untuk hari ini, aku cuma ingin kamu bahagia. Semoga tahun yang baru ini membawa cerita baik, kesempatan baru, dan banyak alasan untuk tersenyum. Selamat ulang tahun, Sayang. Kamu spesial, lebih dari yang mungkin kamu sadari."
  }
];

const intro = document.getElementById("intro");
const letter = document.getElementById("letter");
const wish = document.getElementById("wish");
const openLetter = document.getElementById("openLetter");
const nextPage = document.getElementById("nextPage");
const replay = document.getElementById("replay");
const pageCount = document.getElementById("pageCount");
const kicker = document.getElementById("kicker");
const letterTitle = document.getElementById("letterTitle");
const letterText = document.getElementById("letterText");
const dots = [...document.querySelectorAll("#pageDots i")];
let pageIndex = 0;

function showPage(index) {
  const page = pages[index];
  kicker.textContent = page.kicker;
  letterTitle.textContent = page.title;
  letterText.textContent = page.text;
  pageCount.textContent = `${String(index + 1).padStart(2, "0")} / ${String(pages.length).padStart(2, "0")}`;
  dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
  nextPage.innerHTML = index === pages.length - 1 ? 'Baca doa terakhir <span>→</span>' : 'Lanjut <span>→</span>';
}

openLetter.addEventListener("click", () => {
  intro.classList.add("hidden");
  wish.classList.add("hidden");
  letter.classList.remove("hidden");
  pageIndex = 0;
  showPage(pageIndex);
});

nextPage.addEventListener("click", () => {
  if (pageIndex < pages.length - 1) {
    pageIndex += 1;
    showPage(pageIndex);
  } else {
    letter.classList.add("hidden");
    wish.classList.remove("hidden");
  }
});

replay.addEventListener("click", () => {
  wish.classList.add("hidden");
  letter.classList.add("hidden");
  intro.classList.remove("hidden");
  pageIndex = 0;
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Stars are decorative and generated locally; no external images are needed.
const stars = document.getElementById("stars");
for (let i = 0; i < 95; i++) {
  const star = document.createElement("span");
  star.className = "star" + (Math.random() > 0.86 ? " big" : "");
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.animationDelay = `${Math.random() * 4}s`;
  star.style.animationDuration = `${2 + Math.random() * 3}s`;
  stars.appendChild(star);
}

// User selects a legally obtained audio file. The file itself is not bundled.
const audioFile = document.getElementById("audioFile");
const song = document.getElementById("song");
audioFile.addEventListener("change", () => {
  const file = audioFile.files && audioFile.files[0];
  if (!file) return;
  if (song.dataset.objectUrl) URL.revokeObjectURL(song.dataset.objectUrl);
  const url = URL.createObjectURL(file);
  song.dataset.objectUrl = url;
  song.src = url;
  song.load();
  song.play().catch(() => {
    // Browser may require the user to press Play manually.
  });
});
