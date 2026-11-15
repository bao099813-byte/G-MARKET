// Dữ liệu sản phẩm mẫu (Mô phỏng dữ liệu API)
const mockProducts = [
  {
    id: 1,
    name: "Thẻ Steam Wallet 100$ USD",
    price: 2450000,
    image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=500&q=80",
    category: "Thẻ Game"
  },
  {
    id: 2,
    name: "Chuột Gaming Razer Viper V2 Pro",
    price: 3290000,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&q=80",
    category: "Gaming Gear"
  },
  {
    id: 3,
    name: "Tai Nghe Logitech G Pro X Wireless",
    price: 4150000,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&q=80",
    category: "Gaming Gear"
  },
  {
    id: 4,
    name: "Skin Valorant Elderflame Vandal",
    price: 850000,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&q=80",
    category: "Vật Phẩm"
  }
];

// Hàm định dạng tiền tệ Việt Nam (VND)
function formatCurrency(amount) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

// Render sản phẩm ra giao diện CSS Grid
function renderProducts() {
  const productGrid = document.getElementById('productGrid');
  if (!productGrid) return;

  // Lấy dữ liệu từ LocalStorage nếu có, không thì lấy dữ liệu mẫu
  const products = JSON.parse(localStorage.getItem('gmarket_products')) || mockProducts;
  
  // Lưu lại vào LocalStorage nếu lần đầu truy cập
  if (!localStorage.getItem('gmarket_products')) {
    localStorage.setItem('gmarket_products', JSON.stringify(mockProducts));
  }

  productGrid.innerHTML = products.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" class="product-img">
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-price">${formatCurrency(product.price)}</p>
        <button class="btn btn-primary" onclick="addToCart(${product.id})">
          <i class="fa-solid fa-cart-plus"></i> Thêm vào giỏ
        </button>
      </div>
    </div>
  `).join('');
}

// Xử lý giỏ hàng với LocalStorage
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem('gmarket_cart')) || [];
  cart.push(productId);
  localStorage.setItem('gmarket_cart', JSON.stringify(cart));
  updateCartCount();
  alert("Đã thêm sản phẩm vào giỏ hàng!");
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('gmarket_cart')) || [];
  const cartCountEl = document.getElementById('cartCount');
  if (cartCountEl) {
    cartCountEl.textContent = cart.length;
  }
}

// Xử lý Toggle Menu trên điện thoại
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartCount();

  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }
});