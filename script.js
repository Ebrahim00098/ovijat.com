const banglaMonths = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];
const banglaDays = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

function convertToBanglaNumber(number) {
  return number.toString().split('').map(d => d === '.' ? '.' : banglaDigits[d] || d).join('');
}

// 🔹 তারিখ সেট
const now = new Date();
document.getElementById("currentMonth").innerText = banglaMonths[now.getMonth()];
document.getElementById("todayDate").innerText = `${convertToBanglaNumber(now.getDate().toString().padStart(2, '0'))}/${convertToBanglaNumber((now.getMonth() + 1).toString().padStart(2, '0'))}/${convertToBanglaNumber(now.getFullYear())}`;
document.getElementById("todayDay").innerText = banglaDays[now.getDay()];

// 🔹 যোগ বাটন দেখানো
document.querySelector(".card2").addEventListener("click", () => {
  document.getElementById("addButton").style.display = "block";
});

// 🔹 পপআপ খুলা
document.getElementById("addButton").addEventListener("click", () => {
  document.getElementById("popupForm").style.display = "block";
});

// 🔹 ফর্ম ক্লিয়ার
function clearForm() {
  document.getElementById("productName").value = "";
  document.getElementById("saleAmount").value = "";
  document.getElementById("purchaseAmount").value = "";
  document.getElementById("paymentMethod").value = "";
  document.getElementById("description").value = "";
  document.getElementById("popupForm").style.display = "none";
}

// 🔹 মোট হিসাব
let totalPurchase = 0;
let totalSale = 0;
let totalProfit = 0;
let totalItems = 0;

// 🔹 তারিখ ফরম্যাট
function getTodayDateString() {
  const today = new Date();
  const d = today.getDate().toString().padStart(2, '0');
  const m = (today.getMonth() + 1).toString().padStart(2, '0');
  const y = today.getFullYear();
  return `${d}-${m}-${y}`;
}

// 🔹 ডাটা সাবমিট
function submitForm() {
  const product = document.getElementById("productName").value.trim();
  const sale = parseFloat(document.getElementById("saleAmount").value) || 0;
  const purchase = parseFloat(document.getElementById("purchaseAmount").value) || 0;
  const payment = document.getElementById("paymentMethod").value.trim() || " - ";
  const description = document.getElementById("description").value.trim() || " - ";

  if(product === "") {
    alert("দয়া করে পণ্যের নাম দিন।");
    return;
  }

  const profit = sale - purchase;
  const date = getTodayDateString();

  // হিসাব যোগ
  totalPurchase += purchase;
  totalSale += sale;
  totalProfit += profit;
  totalItems += 1;

  // আপডেট
  updateSummary();

  // নতুন এন্ট্রি HTML
  const entryHTML = `
    <div class="product-entry">
      <div>${product}</div>
      <div>৳${sale.toFixed(1)}</div>
      <div>৳${purchase.toFixed(1)}</div>
      <div>${payment}</div>
      <div>${description}</div>
      <div>⋮</div>
    </div>
  `;

  // DOM-এ যোগ
  document.getElementById("entriesContainer").insertAdjacentHTML('beforeend', entryHTML);

  // ক্লিয়ার
  clearForm();
}

// 🔹 আপডেট সারাংশ
function updateSummary() {
  document.querySelector(".card1 .row div:nth-child(1) div:nth-child(2)").textContent = `৳${convertToBanglaNumber(totalPurchase.toFixed(1))}`;
  document.querySelector(".card1 .row div:nth-child(2) div:nth-child(2)").textContent = `৳${convertToBanglaNumber(totalSale.toFixed(1))}`;
  document.querySelector(".card1 .row div:nth-child(4) div:nth-child(2)").textContent = `৳${convertToBanglaNumber(totalProfit.toFixed(1))}`;
}
// entriesContainer-এ নিচে যোগ করো (beforeend)
document.getElementById("entriesContainer").insertAdjacentHTML('beforeend', entryHTML);

