<script lang="ts">
  import { cartStore, cartOpen } from './stores';
  import type { Product } from './types';
  

  function removeFromCart(product: Product) {
    cartStore.update(items => items.filter(item => item.id !== product.id));
  }

  function closeCart() {
    cartOpen.set(false);
  }

  $: total = $cartStore.reduce((sum, item) => sum + item.price, 0);
  
  // Add animation classes
  let animatingOut = false;
  
  async function closeCartWithAnimation() {
    animatingOut = true;
    await new Promise(resolve => setTimeout(resolve, 300));
    closeCart();
    animatingOut = false;
  }
</script>

{#if $cartOpen}
  <div class="cart-overlay" class:animating-out={animatingOut} on:click={closeCartWithAnimation}>
    <div class="cart" on:click|stopPropagation>
      <button class="close-btn" on:click={closeCartWithAnimation}>×</button>
      <h2>La tua collezione di lusso</h2>
      
      {#if $cartStore.length === 0}
        <div class="empty-cart">
          <span class="empty-icon">👑</span>
          <p>La tua collezzione sta aspettando il suo primo pezzo</p>
          <button class="continue-shopping" on:click={closeCartWithAnimation}>
            Continua a sfogliare
          </button>
        </div>
      {:else}
        <div class="cart-items">
          {#each $cartStore as item}
            <div class="cart-item">
              <img src={item.imageUrl} alt={item.name} />
              <div class="item-details">
                <h3>{item.name}</h3>
                <p class="price">${item.price}</p>
                <p class="description">{item.description}</p>
              </div>
              <button class="remove-btn" on:click={() => removeFromCart(item)}>
                <span class="remove-icon">×</span>
              </button>
            </div>
          {/each}
        </div>
        <div class="cart-total">
          <div class="total-row">
            <span>Totale</span>
            <span>${total}</span>
          </div>
          <button class="checkout-btn">
            Procedi al Checkout
            <span class="checkout-icon">→</span>
          </button>
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  .cart-overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: flex-end;
    z-index: 1000;
    backdrop-filter: blur(8px);
    animation: fadeIn 0.3s ease;
  }

  .cart-overlay.animating-out {
    animation: fadeOut 0.3s ease;
  }

  .cart {
    width: 450px;
    background-color: #111111;
    height: 100%;
    padding: 2rem;
    position: relative;
    overflow-y: auto;
    box-shadow: -5px 0 30px rgba(0,0,0,0.5);
    animation: slideIn 0.3s ease;
  }

  .close-btn {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    font-size: 2em;
    background: none;
    border: none;
    cursor: pointer;
    color: #ffd700;
    transition: transform 0.2s ease;
  }

  .close-btn:hover {
    transform: rotate(90deg);
    color: #ffffff;
  }

  .cart h2 {
    color: #ffd700;
    font-size: 1.8em;
    margin-bottom: 2rem;
    font-family: 'Playfair Display', serif;
    border-bottom: 2px solid #333;
    padding-bottom: 1rem;
  }

  .empty-cart {
    text-align: center;
    padding: 3rem 0;
    color: #666;
  }

  .empty-icon {
    font-size: 3em;
    display: block;
    margin-bottom: 1rem;
  }

  .continue-shopping {
    margin-top: 2rem;
    background: #ffd700;
    color: #000000;
    border: none;
    padding: 1rem 2rem;
    border-radius: 2px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .continue-shopping:hover {
    background: #ffffff;
  }

  .cart-item {
    display: flex;
    align-items: start;
    padding: 1.5rem;
    margin-bottom: 1rem;
    background: #1a1a1a;
    border: 1px solid #333;
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  .cart-item:hover {
    border-color: #ffd700;
    transform: translateY(-2px);
  }

  .cart-item img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 2px;
  }

  .item-details {
    margin-left: 1.5rem;
    flex-grow: 1;
  }

  .item-details h3 {
    margin: 0;
    color: #ffffff;
    font-size: 1.1em;
  }

  .price {
    color: #ffd700;
    font-weight: 600;
    margin: 0.5rem 0;
    font-size: 1.2em;
  }

  .description {
    color: #888;
    font-size: 0.9em;
    margin: 0.5rem 0;
  }

  .remove-btn {
    background: none;
    border: none;
    color: #666;
    cursor: pointer;
    padding: 0.5rem;
    transition: all 0.3s ease;
  }

  .remove-btn:hover {
    color: #ff4444;
  }

  .remove-icon {
    font-size: 1.5em;
  }

  .cart-total {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 2px solid #333;
  }

  .total-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #ffffff;
    font-size: 1.2em;
    margin-bottom: 1rem;
  }

  .checkout-btn {
    background: #ffd700;
    color: #000000;
    padding: 1rem 2rem;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    width: 100%;
    font-size: 1.1em;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    transition: all 0.3s ease;
  }

  .checkout-btn:hover {
    background: #ffffff;
    transform: translateY(-2px);
  }

  .checkout-icon {
    transition: transform 0.3s ease;
  }

  .checkout-btn:hover .checkout-icon {
    transform: translateX(5px);
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  @keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
</style>