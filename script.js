// ═══════════════════════════════════
// PANINI TOGGLE
// ═══════════════════════════════════
let paniniVisible = false;

function togglePanini() {
  paniniVisible = !paniniVisible;
  const section = document.getElementById('toastieSection');
  const btn = document.querySelector('.btn-toggle-panini');
  const paniniCols = section.querySelectorAll('.panini-col');
  const paniniInfo = section.querySelector('.panini-info');
  const title = document.getElementById('toastieTitle');

  if (paniniVisible) {
    section.classList.add('has-panini');
    btn.classList.add('active');
    btn.textContent = '− Paninis';
    paniniCols.forEach(el => el.style.display = '');
    paniniInfo.style.display = '';
    title.textContent = 'Toasties & Paninis';
  } else {
    section.classList.remove('has-panini');
    btn.classList.remove('active');
    btn.textContent = '+ Paninis';
    paniniCols.forEach(el => el.style.display = 'none');
    paniniInfo.style.display = 'none';
    title.textContent = 'Toasties';
  }
}

// ═══════════════════════════════════
// FOOD DATABASE (from past menus)
// ═══════════════════════════════════
const FOOD_DB = [
  // Soups
  { name:"Carrot & Coriander Soup", kcal:"84 kcal", allergens:"", price:"£1.80" },
  { name:"Butterbean, Coconut & Lime Soup", kcal:"142 kcal", allergens:"", price:"£1.80" },
  { name:"Red Lentil & Vegetable Soup", kcal:"99 kcal", allergens:"", price:"£1.80" },
  { name:"Cream of Vegetable Soup", kcal:"88 kcal", allergens:"", price:"£1.80" },
  { name:"Yellow Pea & Vegetable Soup", kcal:"100 kcal", allergens:"", price:"£1.80" },
  { name:"Green Pea & Vegetable Soup", kcal:"88 kcal", allergens:"", price:"£1.80" },
  { name:"Green Pea & Rocket Soup", kcal:"100 kcal", allergens:"", price:"£1.80" },
  { name:"Scotch Broth", kcal:"82 kcal", allergens:"Barley", price:"£1.80" },
  { name:"Curried Parsnip Soup", kcal:"81 kcal", allergens:"", price:"£1.80" },
  { name:"Cream of Parsnip Soup", kcal:"129 kcal", allergens:"Milk", price:"£1.80" },
  { name:"Garden Pea & Vegetable Soup", kcal:"88 kcal", allergens:"", price:"£1.80" },
  { name:"Leek & Potato Soup", kcal:"94 kcal", allergens:"", price:"£1.80" },

  // Specials
  { name:"Tricolour Fusilli with Steak Mince Bolognese", kcal:"617 kcal", allergens:"Wheat", price:"£4.95" },
  { name:"Soya Mince Bolognese with Wholewheat Penne Pasta", kcal:"679 kcal", allergens:"Wheat, Soya", price:"£4.95" },
  { name:"Macaroni Cheese with Salad", kcal:"626 kcal", allergens:"Wheat, Mustard", price:"£4.95" },
  { name:"Macaroni Cheese & Chips", kcal:"", allergens:"", price:"£4.95" },
  { name:"Scampi, Chips & Peas", kcal:"589 kcal", allergens:"Crustacean, Wheat, m/c Sulphites", price:"£4.95" },
  { name:"Pork Sausage Roll, Chips & Beans", kcal:"791 kcal", allergens:"Wheat, Sulphites", price:"£4.95" },
  { name:"Cheese & Onion Pasty, Chips & Beans", kcal:"891 kcal", allergens:"Wheat, Milk, m/c Soya", price:"£4.95" },
  { name:"Beef & Onion Pasty with Chips", kcal:"", allergens:"", price:"£4.95" },
  { name:"Croque Madame", kcal:"926 kcal", allergens:"Egg, Wheat, Milk, Soya", price:"£4.95" },
  { name:"Garlic Chicken Strip Salad", kcal:"297 kcal", allergens:"", price:"£4.95" },
  { name:"Feta Cheese Salad", kcal:"395 kcal", allergens:"Milk", price:"£4.95" },
  { name:"Chicken Chinese Curry with Steamed Rice", kcal:"379 kcal", allergens:"Wheat, Mustard", price:"£4.95" },
  { name:"Vegetable Chinese Curry with Steamed Rice", kcal:"294 kcal", allergens:"Wheat, Mustard", price:"£4.95" },
  { name:"Haggis, Neeps & Tatties", kcal:"745 kcal", allergens:"", price:"£4.95" },
  { name:"Red Tractor Chicken & Sweetcorn Quiche with Salad & Coleslaw", kcal:"657 kcal", allergens:"Wheat, Egg, Milk, m/c Soya, Tree Nuts", price:"£4.95" },
  { name:"Mature Cheddar & Onion Quiche with Salad & Coleslaw", kcal:"816 kcal", allergens:"Wheat, Egg, Milk, m/c Soya, Tree Nuts", price:"£4.95" },
  { name:"Mini Macaroni Pies, Chips & Beans/Peas", kcal:"656 kcal", allergens:"Wheat, Milk, m/c Sulphites", price:"£4.95" },

  // Sides
  { name:"Chips", kcal:"337 kcal", allergens:"", price:"£2.05" },
  { name:"Tartare Sauce", kcal:"51 kcal", allergens:"Egg, Mustard", price:"" },
  { name:"French Dressing", kcal:"18 kcal", allergens:"Wheat, Mustard", price:"" },

  // Toasties
  { name:"Cheese Toastie", kcal:"w/b 364 · b/b 354", allergens:"Milk", price:"£3.05" },
  { name:"Cheese & Ham Toastie", kcal:"w/b 402 · b/b 392", allergens:"Milk", price:"£3.05" },
  { name:"Cheese & Tomato Toastie", kcal:"w/b 377 · b/b 368", allergens:"Milk", price:"£3.05" },
  { name:"Cheese Panini", kcal:"468 kcal", allergens:"Milk, Soya, Gluten", price:"£4.05" },
  { name:"Cheese & Ham Panini", kcal:"505 kcal", allergens:"Milk, Soya, Gluten", price:"£4.05" },
  { name:"Cheese & Tomato Panini", kcal:"482 kcal", allergens:"Milk, Soya, Gluten", price:"£4.05" },

  // Sandwiches
  { name:"Cheese Sandwich", kcal:"w/b 454 · b/b 444", allergens:"Milk", price:"£3.05" },
  { name:"Ham Sandwich", kcal:"w/b 369 · b/b 359", allergens:"", price:"£3.05" },
  { name:"Tuna Mayo Sandwich", kcal:"w/b 358 · b/b 348", allergens:"Fish, Egg", price:"£3.05" },

  // Deli
  { name:"Cheese & Ham Croissant", kcal:"587 kcal", allergens:"Wheat, Egg, Milk, m/c Nuts, Sesame, Soya", price:"£3.85" },
  { name:"Vegetarian Rainbow Houmous Wrap", kcal:"636 kcal", allergens:"Wheat, m/c Sesame", price:"£3.85" },
  { name:"Red Pepper Conchiglie", kcal:"866 kcal", allergens:"Wheat, Egg, Milk", price:"£4.50" },
  { name:"Chicken Caesar Salad", kcal:"940 kcal", allergens:"Wheat, Egg, Milk", price:"£4.50" },

  // Baked Potato fillings
  { name:"Baked Beans Potato", kcal:"375 kcal", allergens:"", price:"£3.45" },
  { name:"Tuna Mayo Potato", kcal:"649 kcal", allergens:"Egg, Fish", price:"£4.05" },
  { name:"Vegan Coleslaw Potato", kcal:"390 kcal", allergens:"", price:"£3.35" },
  { name:"Cheese Potato", kcal:"692 kcal", allergens:"Milk", price:"£3.45" },

  // Accompaniments
  { name:"Crusty Roll", kcal:"107 kcal", allergens:"Gluten (Wheat)", price:"£0.55" },
  { name:"Butter Portion", kcal:"46 kcal", allergens:"Milk", price:"£0.30" },
  { name:"Vegan Spread Portion", kcal:"31.5 kcal", allergens:"", price:"£0.25" },
];


// ═══════════════════════════════════
// AUTOCOMPLETE ENGINE
// ═══════════════════════════════════
const dropdown = document.getElementById('acDropdown');
const acList = document.getElementById('acList');
let activeField = null;
let activeIndex = -1;
let matches = [];

function getTextContent(el) {
  // Get only direct text, not nested .allergens spans
  let text = '';
  el.childNodes.forEach(n => {
    if (n.nodeType === Node.TEXT_NODE) text += n.textContent;
  });
  return text.trim();
}

function searchFood(query) {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase();
  return FOOD_DB.filter(item =>
    item.name.toLowerCase().includes(q)
  ).slice(0, 8);
}

function highlightMatch(name, query) {
  const idx = name.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return name;
  return name.slice(0, idx) + '<mark>' + name.slice(idx, idx + query.length) + '</mark>' + name.slice(idx + query.length);
}

function showDropdown(field, results, query) {
  if (results.length === 0) {
    hideDropdown();
    return;
  }

  matches = results;
  activeIndex = -1;

  acList.innerHTML = results.map((item, i) =>
    `<div class="ac-item" data-index="${i}">
      <span class="ac-item-name">${highlightMatch(item.name, query)}</span>
      <span class="ac-item-meta">${item.kcal}${item.price ? ' · ' + item.price : ''}</span>
    </div>`
  ).join('');

  // Position dropdown below the field
  const rect = field.getBoundingClientRect();
  dropdown.style.left = rect.left + window.scrollX + 'px';
  dropdown.style.top = (rect.bottom + window.scrollY + 4) + 'px';
  dropdown.classList.add('visible');
}

function hideDropdown() {
  dropdown.classList.remove('visible');
  matches = [];
  activeIndex = -1;
  activeField = null;
}

function selectItem(index) {
  if (index < 0 || index >= matches.length || !activeField) return;
  const item = matches[index];

  // Determine context: featured-card (.f-name) or menu-item (.item-name)
  const isFeatured = activeField.classList.contains('f-name');
  const isItemName = activeField.classList.contains('item-name');

  if (isFeatured) {
    const card = activeField.closest('.featured-card');
    if (card) {
      activeField.textContent = item.name;
      const meta = card.querySelector('.f-meta');
      const price = card.querySelector('.f-price');
      if (meta) {
        let metaText = item.kcal || '';
        if (item.allergens) metaText += (metaText ? ' · ' : '') + item.allergens;
        meta.textContent = metaText;
      }
      if (price && item.price) price.textContent = item.price;
    }
  } else if (isItemName) {
    const row = activeField.closest('.menu-item');
    if (row) {
      // Set the name and allergens
      if (item.allergens) {
        activeField.innerHTML = item.name + ' <span class="allergens">' + item.allergens + '</span>';
      } else {
        activeField.textContent = item.name;
      }
      const kcalEl = row.querySelector('.item-kcal');
      const priceEl = row.querySelector('.item-price');
      if (kcalEl && item.kcal) kcalEl.textContent = item.kcal;
      if (priceEl && item.price) priceEl.textContent = item.price;
    }
  } else {
    // Generic: just set text
    activeField.textContent = item.name;
  }

  hideDropdown();
}

// Listen for input on [data-ac="food"] fields
document.addEventListener('input', (e) => {
  const field = e.target.closest('[data-ac="food"]');
  if (!field) return;

  activeField = field;
  const query = getTextContent(field);
  const results = searchFood(query);
  showDropdown(field, results, query);
});

// Keyboard nav
document.addEventListener('keydown', (e) => {
  if (!dropdown.classList.contains('visible')) return;

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    activeIndex = Math.min(activeIndex + 1, matches.length - 1);
    updateActiveItem();
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    activeIndex = Math.max(activeIndex - 1, 0);
    updateActiveItem();
  } else if (e.key === 'Tab' || e.key === 'Enter') {
    if (activeIndex >= 0) {
      e.preventDefault();
      selectItem(activeIndex);
    } else if (matches.length === 1) {
      e.preventDefault();
      selectItem(0);
    }
  } else if (e.key === 'Escape') {
    hideDropdown();
  }
});

function updateActiveItem() {
  const items = acList.querySelectorAll('.ac-item');
  items.forEach((el, i) => {
    el.classList.toggle('active', i === activeIndex);
    if (i === activeIndex) el.scrollIntoView({ block: 'nearest' });
  });
}

// Click on dropdown item
acList.addEventListener('click', (e) => {
  const item = e.target.closest('.ac-item');
  if (item) {
    selectItem(parseInt(item.dataset.index));
  }
});

// Hide dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!dropdown.contains(e.target) && !e.target.closest('[data-ac]')) {
    hideDropdown();
  }
});

// Hide on blur with small delay (so clicks register)
document.addEventListener('focusout', (e) => {
  if (e.target.closest('[data-ac]')) {
    setTimeout(() => {
      if (!dropdown.matches(':hover')) hideDropdown();
    }, 150);
  }
});


// ═══════════════════════════════════
// PDF DOWNLOAD (html2canvas + jsPDF)
// ═══════════════════════════════════
async function downloadPDF() {
  hideDropdown();
  if (document.activeElement) document.activeElement.blur();

  const btn = document.querySelector('.btn-download');
  const origHTML = btn.innerHTML;
  btn.innerHTML = '<svg style="width:15px;height:15px;animation:spin 0.8s linear infinite" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg> Generating…';
  btn.disabled = true;

  try {
    const menuPage = document.getElementById('menuPage');

    // html2canvas mishandles the ::before texture overlay — hide it during capture
    menuPage.classList.add('capturing');

    const canvas = await html2canvas(menuPage, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#faf8f4',
      logging: false,
    });

    menuPage.classList.remove('capturing');

    const imgData = canvas.toDataURL('image/jpeg', 0.92);
    const { jsPDF } = window.jspdf;

    // Size the PDF to match the menu aspect ratio
    const pageWidthMM = 210; // A4 width
    const imgAspect = canvas.height / canvas.width;
    const pageHeightMM = pageWidthMM * imgAspect;

    const pdf = new jsPDF({
      orientation: pageHeightMM > pageWidthMM ? 'portrait' : 'landscape',
      unit: 'mm',
      format: [pageWidthMM, pageHeightMM],
      compress: true,
    });

    pdf.addImage(imgData, 'JPEG', 0, 0, pageWidthMM, pageHeightMM, undefined, 'FAST');

    const dateText = document.querySelector('.menu-date').textContent.trim().replace(/[\/\\:*?"<>|]/g, '') || 'menu';
    pdf.save(dateText + '.pdf');
  } catch (err) {
    console.error('PDF generation failed:', err);
    alert('PDF generation failed. Please try again.');
  } finally {
    btn.innerHTML = origHTML;
    btn.disabled = false;
  }
}
