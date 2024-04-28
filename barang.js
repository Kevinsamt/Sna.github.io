document.addEventListener('DOMContentLoaded', function() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  const cartItems = document.querySelector('.cart-items');
  const totalPrice = document.querySelector('.total-price');
  const calculateBtn = document.querySelector('.calculate-btn');
  const orderBtn = document.querySelector('.order-btn');

  let total = 0;

  // Fungsi untuk menambahkan item ke keranjang
  function addToCart(item) {
    const itemName = item.querySelector('h2').textContent;
    const itemPrice = parseFloat(item.querySelector('.price').textContent.slice(7)); // mengambil harga dari teks

    total += itemPrice;
    totalPrice.textContent = total.toFixed(2);

    const li = document.createElement('li');
    li.textContent = `${itemName} - $${itemPrice.toFixed(2)}`;
    cartItems.appendChild(li);

    // Tambahkan tombol hapus untuk item yang baru ditambahkan
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Hapus';
    deleteBtn.classList.add('delete-btn');
    li.appendChild(deleteBtn);

    // Tambahkan event listener untuk tombol hapus
    deleteBtn.addEventListener('click', function() {
      total -= itemPrice;
      totalPrice.textContent = total.toFixed(2);
      cartItems.removeChild(li);
    });
  }

  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const item = this.parentElement;
      addToCart(item);

      // Animasi tambahan
      const cart = document.querySelector('.cart');
      cart.classList.add('cart-shake');
      setTimeout(() => {
        cart.classList.remove('cart-shake');
      }, 500);
    });
  });

  // Fungsi untuk menjumlahkan total harga
  calculateBtn.addEventListener('click', function() {
    let sum = 0;
    const items = document.querySelectorAll('.cart-items li');
    items.forEach(item => {
      const priceText = item.textContent.split(' - ')[1];
      sum += parseFloat(priceText.slice(1));
    });
    totalPrice.textContent = sum.toFixed(2);
  });

  // Fungsi untuk mengirim file ke email Gmail
  orderBtn.addEventListener('click', function() {
    const email = 'kevinsamuelyt04@gmail.com'; // Ganti dengan alamat email tujuan
    const subject = 'Pesanan Barang';
    const body = `Total Harga: $${totalPrice.textContent}\n\nPesanan:\n${cartItems.innerHTML}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
});
