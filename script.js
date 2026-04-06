// ═══════════════════════════════════
// AUTO DATE
// ═══════════════════════════════════
(function () {
  const el = document.querySelector('.menu-date');
  if (!el) return;
  const now = new Date();
  if (now.getDay() === 0) now.setDate(now.getDate() + 1);
  const day = now.toLocaleDateString('en-GB', { weekday: 'long' });
  const d = now.getDate();
  const suffix = d === 1 || d === 21 || d === 31 ? 'st'
               : d === 2 || d === 22 ? 'nd'
               : d === 3 || d === 23 ? 'rd' : 'th';
  const month = now.toLocaleDateString('en-GB', { month: 'long' });
  el.textContent = `${day} ${d}${suffix} ${month}`;
})();

// ═══════════════════════════════════
// AUTO-SELECT FOOD NAME ON CLICK
// ═══════════════════════════════════
document.addEventListener('focusin', (e) => {
  const field = e.target.closest('[contenteditable="true"]');
  if (!field) return;
  const sel = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(field);
  sel.removeAllRanges();
  sel.addRange(range);
});

// ═══════════════════════════════════
// PANINI TOGGLE
// ═══════════════════════════════════
let paniniVisible = true;

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
    title.textContent = 'Sandwiches, Toasties & Paninis';
  } else {
    section.classList.remove('has-panini');
    btn.classList.remove('active');
    btn.textContent = '+ Paninis';
    paniniCols.forEach(el => el.style.display = 'none');
    paniniInfo.style.display = 'none';
    title.textContent = 'Sandwiches & Toasties';
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
  { name:"Cream of Cauliflower Soup", kcal:"94 kcal", allergens:"", price:"£1.80" },
  { name:"Cream of Broccoli Soup", kcal:"110 kcal", allergens:"", price:"£1.80" },

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

// Save food DB to Vercel KV
async function saveFoodDBToKV(items) {
  const res = await fetch('/api/food-db', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(items),
  });
  if (!res.ok) throw new Error('Save failed: ' + res.status);
  return res.json();
}

// Load food DB from Vercel KV, merging in any new hardcoded items
async function initFoodDB() {
  try {
    const res = await fetch('/api/food-db');
    if (!res.ok) throw new Error('API error: ' + res.status);
    const saved = await res.json();

    if (saved.length > 0) {
      const savedNames = new Set(saved.map(i => i.name.toLowerCase()));
      const newDefaults = FOOD_DB.filter(i => !savedNames.has(i.name.toLowerCase()));
      FOOD_DB.length = 0;
      saved.forEach(item => FOOD_DB.push(item));
      newDefaults.forEach(item => FOOD_DB.push(item));
      if (newDefaults.length > 0) await saveFoodDBToKV(FOOD_DB);
    } else {
      // First run — seed KV with hardcoded defaults
      await saveFoodDBToKV(FOOD_DB);
    }
  } catch (e) {
    console.error('Failed to load food DB from KV:', e);
  }
}

initFoodDB();


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

  activeField.setAttribute('data-ac-matched', 'true');

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

  field.removeAttribute('data-ac-matched');
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
// UNDO STACK
// ═══════════════════════════════════
const undoStack = [];
const MAX_UNDO = 10;
const menuContent = document.querySelector('.menu-content');
const undoBtn = document.getElementById('undoBtn');

function saveUndoState() {
  undoStack.push(menuContent.innerHTML);
  if (undoStack.length > MAX_UNDO) undoStack.shift();
  updateUndoBtn();
}

function undo() {
  if (undoStack.length === 0) return;
  menuContent.innerHTML = undoStack.pop();
  updateUndoBtn();
}

function updateUndoBtn() {
  undoBtn.disabled = undoStack.length === 0;
}


// ═══════════════════════════════════
// ADD / DELETE ROW BUTTONS
// ═══════════════════════════════════
function attachRowButtons(item) {
  if (!item.querySelector('.del-row-btn')) {
    const del = document.createElement('button');
    del.className = 'del-row-btn';
    del.setAttribute('aria-label', 'Delete row');
    del.textContent = '−';
    item.prepend(del);
  }
  if (!item.querySelector('.add-row-btn')) {
    const add = document.createElement('button');
    add.className = 'add-row-btn';
    add.setAttribute('aria-label', 'Duplicate row');
    add.textContent = '+';
    item.appendChild(add);
  }
}

document.querySelectorAll('.menu-item').forEach(attachRowButtons);

// ── Featured card delete buttons ──
function attachCardDeleteBtn(card) {
  if (card.querySelector('.del-card-btn')) return;
  const del = document.createElement('button');
  del.className = 'del-card-btn';
  del.setAttribute('aria-label', 'Delete item');
  del.textContent = '×';
  card.appendChild(del);
}

document.querySelectorAll('.featured-card').forEach(attachCardDeleteBtn);

// Delete featured card
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.del-card-btn');
  if (!btn) return;
  const card = btn.closest('.featured-card');
  if (!card) return;

  saveUndoState();
  card.remove();
});

// ── Track empty f-extras fields ──
function checkExtrasEmpty(el) {
  const text = el.textContent.trim();
  el.classList.toggle('is-empty', text.length === 0);
}

document.querySelectorAll('.f-extras').forEach(checkExtrasEmpty);

document.addEventListener('input', (e) => {
  const extras = e.target.closest('.f-extras');
  if (extras) checkExtrasEmpty(extras);
});

document.addEventListener('focusout', (e) => {
  const extras = e.target.closest('.f-extras');
  if (extras) {
    // Clean up stray <br> tags when empty
    if (extras.textContent.trim().length === 0) {
      extras.innerHTML = '';
    }
    checkExtrasEmpty(extras);
  }
});

// Add row (duplicate)
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.add-row-btn');
  if (!btn) return;
  const item = btn.closest('.menu-item');
  if (!item) return;

  saveUndoState();
  const clone = item.cloneNode(true);
  item.after(clone);
  const firstEditable = clone.querySelector('[contenteditable]');
  if (firstEditable) firstEditable.focus();
});

// Delete row
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.del-row-btn');
  if (!btn) return;
  const item = btn.closest('.menu-item');
  if (!item) return;

  saveUndoState();
  item.remove();
});


// ═══════════════════════════════════
// FOOD EDITOR MODAL
// ═══════════════════════════════════
(function () {
  // Build modal DOM
  const overlay = document.createElement('div');
  overlay.className = 'food-editor-overlay';
  overlay.innerHTML = `
    <div class="food-editor">
      <div class="food-editor-header">
        <h2>Saved Food Items</h2>
        <button class="fe-close" onclick="closeFoodEditor()">&times;</button>
      </div>
      <div class="food-editor-body">
        <table>
          <thead>
            <tr><th>Name</th><th>Calories</th><th>Allergens</th><th>Price</th><th></th></tr>
          </thead>
          <tbody id="feTableBody"></tbody>
        </table>
      </div>
      <div class="food-editor-footer">
        <button class="fe-add-btn" onclick="feAddRow()">+ Add Item</button>
        <button class="fe-save-btn" onclick="feSave()">Save Changes</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  // Close on overlay click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeFoodEditor();
  });
})();

function openFoodEditor() {
  const tbody = document.getElementById('feTableBody');
  tbody.innerHTML = '';
  FOOD_DB.forEach((item, i) => {
    tbody.appendChild(feCreateRow(item));
  });
  document.querySelector('.food-editor-overlay').classList.add('open');
}

function closeFoodEditor() {
  document.querySelector('.food-editor-overlay').classList.remove('open');
}

function feCreateRow(item) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td><input type="text" value="${(item.name || '').replace(/"/g, '&quot;')}" data-field="name"></td>
    <td><input type="text" value="${(item.kcal || '').replace(/"/g, '&quot;')}" data-field="kcal"></td>
    <td><input type="text" value="${(item.allergens || '').replace(/"/g, '&quot;')}" data-field="allergens"></td>
    <td><input type="text" value="${(item.price || '').replace(/"/g, '&quot;')}" data-field="price"></td>
    <td><button class="fe-del-btn" onclick="this.closest('tr').remove()" title="Delete">&times;</button></td>`;
  return tr;
}

function feAddRow() {
  const tbody = document.getElementById('feTableBody');
  const tr = feCreateRow({ name: '', kcal: '', allergens: '', price: '' });
  tbody.appendChild(tr);
  tr.querySelector('input').focus();
  tr.scrollIntoView({ block: 'nearest' });
}

async function feSave() {
  const rows = document.querySelectorAll('#feTableBody tr');
  const newDB = [];
  rows.forEach(row => {
    const name = row.querySelector('[data-field="name"]').value.trim();
    if (!name) return;
    newDB.push({
      name,
      kcal: row.querySelector('[data-field="kcal"]').value.trim(),
      allergens: row.querySelector('[data-field="allergens"]').value.trim(),
      price: row.querySelector('[data-field="price"]').value.trim(),
    });
  });

  // Replace FOOD_DB contents
  FOOD_DB.length = 0;
  newDB.forEach(item => FOOD_DB.push(item));

  // Persist to Vercel KV
  try {
    await saveFoodDBToKV(newDB);
  } catch (e) {
    console.error('Failed to save to KV:', e);
    alert('Failed to save food database. Check your connection.');
  }

  closeFoodEditor();
}


// ═══════════════════════════════════
// RESTART (reload page to defaults)
// ═══════════════════════════════════
function restartPage() {
  if (confirm('Reset the menu to its default state?')) {
    window.location.reload();
  }
}


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

    // html2canvas can't render CSS-transformed SVGs — rasterise to a rotated <img>
    const brOrnament = menuPage.querySelector('.corner-ornament.bottom-right');
    let brImg = null;
    if (brOrnament) {
      // Bake the 180° rotation into the SVG via a group transform
      const svgClone = brOrnament.cloneNode(true);
      const vb = svgClone.getAttribute('viewBox');
      if (vb) {
        const [, , w, h] = vb.split(' ').map(Number);
        const g = svgClone.querySelector('g');
        if (g) g.setAttribute('transform', `rotate(180 ${w/2} ${h/2})`);
      }
      const svgData = new XMLSerializer().serializeToString(svgClone);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      // Rasterise SVG to a canvas to avoid html2canvas transform issues
      const tmpImg = new Image();
      tmpImg.src = url;
      await new Promise(r => { tmpImg.onload = r; });
      const offscreen = document.createElement('canvas');
      offscreen.width = tmpImg.naturalWidth * 2;
      offscreen.height = tmpImg.naturalHeight * 2;
      const ctx = offscreen.getContext('2d');
      ctx.drawImage(tmpImg, 0, 0, offscreen.width, offscreen.height);
      URL.revokeObjectURL(url);

      brImg = document.createElement('img');
      brImg.src = offscreen.toDataURL('image/png');
      brImg.className = 'corner-ornament bottom-right';
      brImg.style.transform = 'none';
      await new Promise(r => { brImg.onload = r; });
      brOrnament.style.display = 'none';
      menuPage.appendChild(brImg);
    }

    const canvas = await html2canvas(menuPage, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#faf8f4',
      logging: false,
    });

    menuPage.classList.remove('capturing');

    // Restore bottom-right ornament
    if (brOrnament) {
      brOrnament.style.display = '';
      if (brImg) brImg.remove();
    }

    const imgData = canvas.toDataURL('image/jpeg', 0.92);
    const { jsPDF } = window.jspdf;

    // Size the PDF to match the menu aspect ratio, with margin
    const marginMM = 8;
    const pageWidthMM = 210; // A4 width
    const imgAspect = canvas.height / canvas.width;
    const pageHeightMM = pageWidthMM * imgAspect;

    const pdf = new jsPDF({
      orientation: (pageHeightMM + marginMM * 2) > (pageWidthMM + marginMM * 2) ? 'portrait' : 'landscape',
      unit: 'mm',
      format: [pageWidthMM + marginMM * 2, pageHeightMM + marginMM * 2],
      compress: true,
    });

    // Fill background to match menu colour
    pdf.setFillColor(250, 248, 244);
    pdf.rect(0, 0, pageWidthMM + marginMM * 2, pageHeightMM + marginMM * 2, 'F');

    pdf.addImage(imgData, 'JPEG', marginMM, marginMM, pageWidthMM, pageHeightMM, undefined, 'FAST');

    const dateText = document.querySelector('.menu-date').textContent.trim().replace(/[\/\\:*?"<>|]/g, '') || 'menu';
    pdf.save('JDR ' + dateText + '.pdf');
    showJudyOverlay();
  } catch (err) {
    console.error('PDF generation failed:', err);
    alert('PDF generation failed. Please try again.');
  } finally {
    menuPage.classList.remove('capturing');
    btn.innerHTML = origHTML;
    btn.disabled = false;
  }

  await promptToSaveCustomItems();
}

function showJudyOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'judy-overlay';
  overlay.innerHTML = `
    <div class="judy-content">
      <img src="judy.gif" alt="Judy">
      <button class="judy-close" onclick="this.closest('.judy-overlay').remove()">&times;</button>
    </div>`;
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });
  document.body.appendChild(overlay);
}

async function promptToSaveCustomItems() {
  const existingNames = new Set(FOOD_DB.map(i => i.name.toLowerCase()));
  const newItems = [];

  document.querySelectorAll('[data-ac="food"]:not([data-ac-matched])').forEach(field => {
    const name = getTextContent(field).trim();
    if (!name || existingNames.has(name.toLowerCase())) return;

    // Extract kcal and price from the row
    const row = field.closest('.menu-item') || field.closest('.featured-card');
    if (!row) return;

    const kcal = (row.querySelector('.item-kcal, .f-meta') || {}).textContent || '';
    const price = (row.querySelector('.item-price, .f-price') || {}).textContent || '';
    const allergensEl = field.querySelector('.allergens');
    const allergens = allergensEl ? allergensEl.textContent.replace(/^Contains\s*/i, '') : '';

    newItems.push({ name, kcal: kcal.trim(), allergens: allergens.trim(), price: price.trim() });
    existingNames.add(name.toLowerCase());
  });

  if (newItems.length === 0) return;

  const list = newItems.map(i => '  - ' + i.name).join('\n');
  if (!confirm('Save these new items for future menus?\n\n' + list)) return;

  newItems.forEach(item => FOOD_DB.push(item));

  try {
    await saveFoodDBToKV(FOOD_DB);
  } catch (e) {
    console.error('Failed to save new items to KV:', e);
    alert('Failed to save new food items. Check your connection.');
  }

  // Mark them as matched now that they're saved
  document.querySelectorAll('[data-ac="food"]:not([data-ac-matched])').forEach(field => {
    const name = getTextContent(field).trim().toLowerCase();
    if (newItems.some(i => i.name.toLowerCase() === name)) {
      field.setAttribute('data-ac-matched', 'true');
    }
  });
}
